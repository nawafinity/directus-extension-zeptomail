<template>
  <private-view title="Zeptomail Settings">
    <template #actions>
      <v-button
          rounded
          icon
          :disabled="!canSave"
          :tooltip="t('zme_save')"
          @click="submit"
      >
        <v-icon name="check" outline/>
      </v-button>
      <v-button
          rounded
          icon
          kind="warning"
          outlined
          :disabled="!canTest"
          :tooltip="t('zme_test')"
          :loading="testLoading"
          @click="test"
      >
        <v-icon name="mark_email_read" outline/>
      </v-button>
    </template>

    <template v-if="loading">
      <v-info :title="t('zme_please_wait')" center icon="sync">
        {{ t('zme_please_wait_description') }}
      </v-info>
    </template>

    <template v-else>
      <div class="padding-box">
        <v-form :fields="fields" v-model="formData" :initial-values="item" :key="formKey"/>
      </div>
    </template>
  </private-view>
</template>

<script setup lang="ts">
import {useApi, useCollection, useStores} from "@directus/extensions-sdk";
import {ref, watch} from "vue";
import {settingsCollectionDefinition} from "./collections/settingsCollectionDefinition";
import {useI18n} from "vue-i18n";
import {resolveLocale} from "../shared/utils/i18n";
import {COLLECTION_NAME} from "../shared/constants";
import {TRANSLATIONS} from "./translations";


// Hooks
const api = useApi();
const {useCollectionsStore, useSettingsStore, useNotificationsStore} = useStores();
const collectionsStore = useCollectionsStore();
const {settings} = useSettingsStore();
const {fields} = useCollection(COLLECTION_NAME);
const {add} = useNotificationsStore()
// I18n
const {t} = useI18n({
  locale: resolveLocale(settings.default_language),
  messages: TRANSLATIONS
});

// Refs
const loading = ref(true)
const formData = ref({});
const canSave = ref(false);
const canTest = ref(false);
const item = ref(null);
const formKey = ref(0)
const testLoading = ref(false);
const userId = ref(null);
const userEmail = ref(null);

watch(formData, (val) => {
  canSave.value = true;
}, {deep: true});


// Utils
const isCollectionExist = (collection: string) => collectionsStore.getCollection(collection)

async function createSettings() {
  if (!isCollectionExist(COLLECTION_NAME)) {
    api.post('/collections', settingsCollectionDefinition).then(({data: {data}}) => {
      if (!data) {
      }
    })
  }
}

async function fetchSettings() {
  if (isCollectionExist(COLLECTION_NAME)) {
    api.get(`/items/${COLLECTION_NAME}`).then(({data: {data}}) => {
      item.value = data
      if (Object.keys(data).length > 0) {
        canTest.value = true;
      }
    })
  }
}

async function fetchUserInfo() {
  try {
    const {data: {data: {id, email}}} = await api.get('/users/me?fields=id,email')
    userId.value = id
    userEmail.value = email
  } catch {

  }
}


async function submit() {
  api.patch(`/items/${COLLECTION_NAME}`, formData.value).then(({data: {data}}) => {
    canSave.value = false;
    add({
      title: t('zem_settings_saved')
    })
  }).catch(error => {
    if (error.hasOwnProperty("response")) {
      const {data: {errors}} = error.response;
      if (errors) {
        console.log(errors);
      }
    }
  })
}


async function test() {
  testLoading.value = true;
  try {
    await api.post('/notifications', {
      recipient: userId.value,
      sender: userId.value,
      subject: t('zme_test_email_title'),
      message: t('zme_test_email_text'),
    })

    add({
      title: t('zme_test_sent_title'),
      text: t('zme_test_sent_text', {email: userEmail.value}),
      type: 'success'
    })
  } catch {
    add({
      title: t('zme_test_send_error_title'),
      text: t('zme_test_send_error_text'),
      type: 'warning'
    })
  } finally {
    testLoading.value = false;
  }

}


(async () => {
  await fetchUserInfo();
  await createSettings();
  await fetchSettings();

  if (!fields.value.length) {
    setTimeout(() => window.location.reload(), 100);
    return;
  }
  loading.value = false
})()

</script>

<style scoped lang="scss">
.padding-box {
  padding: var(--content-padding);
  padding-top: 0;
}


</style>