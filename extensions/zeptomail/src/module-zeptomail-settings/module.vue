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


// Hooks
const api = useApi();
const {useCollectionsStore, useSettingsStore, useNotificationsStore} = useStores();
const collectionsStore = useCollectionsStore();
const {settings} = useSettingsStore();
const {fields} = useCollection('zeptomail_settings');
const {add} = useNotificationsStore()
// I18n
const {t} = useI18n({
  locale: resolveLocale(settings.default_language),
  messages: {
    en: {
      zme_please_wait: 'Please wait...',
      zme_please_wait_description: 'Please be patient, we’re checking and loading your settings',
      zme_test: "Send a test email",
      zme_save: "Save Settings"
    }
  }
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

watch(formData, (val) => {
  canSave.value = true;
}, {deep: true});


// Utils
const isCollectionExist = (collection: string) => collectionsStore.getCollection(collection)

async function createSettings() {
  if (!isCollectionExist('zeptomail_settings')) {
    api.post('/collections', settingsCollectionDefinition).then(({data: {data}}) => {
      if (!data) {
      }
    })
  }
}

async function fetchSettings() {
  if (isCollectionExist('zeptomail_settings')) {
    api.get('/items/zeptomail_settings').then(({data: {data}}) => {
      item.value = data
      if (Object.keys(data).length > 0) {
        canTest.value = true;
      }
    })
  }
}

async function fetchUserId() {
  try {
    const {data: {data: {id}}} = await api.get('http://localhost:8055/users/me?fields=id')
    console.log(id)
    userId.value = id
  } catch {

  }
}


async function submit() {
  api.patch('/items/zeptomail_settings', formData.value).then(({data: {data}}) => {
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
    const feedback = await api.post('/notifications', {
      recipient: userId.value,
      sender: userId.value,
      subject: 'Test Email',
      message: 'Test Email',
    })
  } catch {

  } finally {
    testLoading.value = false;
  }

}


(async () => {
  await fetchUserId();
  await createSettings();
  await fetchSettings();
  if (!fields.value.length) {
    window.location.reload()
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