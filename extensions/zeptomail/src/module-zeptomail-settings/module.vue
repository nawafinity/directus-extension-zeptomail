<template>
  <private-view title="Zeptomail Settings">
    <template #actions>
      <v-button
          rounded
          icon
          :disabled="!canSave"
          :tooltip="t('zme_save')"
          :loading="saveLoading"
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

    <template #navigation>
      <v-list nav>
        <v-list-item :href="DOCUMENTATION">
          <v-list-item-icon><v-icon name="article" /></v-list-item-icon>
          <v-list-item-content>
            <v-text-overflow :text="t('zme_documentation')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item :href="SPONSORING">
          <v-list-item-icon><v-icon name="heart_plus" color="#b93a86" /></v-list-item-icon>
          <v-list-item-content>
            <v-text-overflow :text="t('zme_sponsor')" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
import {COLLECTION_NAME, DOCUMENTATION, SPONSORING} from "../shared/constants";
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
const saveLoading = ref(false);
const userId = ref(null);
const userEmail = ref(null);

watch(formData, () => {
  canSave.value = true;
}, {deep: true});


// Utils
const isCollectionExist = (collection: string) => collectionsStore.getCollection(collection)

async function createSettings() {
  return isCollectionExist(COLLECTION_NAME)
      ? Promise.resolve(null)
      : api.post('/collections', settingsCollectionDefinition);
}

async function fetchSettings() {
  return isCollectionExist(COLLECTION_NAME)
      ? api.get(`/items/${COLLECTION_NAME}`)
      : Promise.resolve(null);
}

async function fetchUserInfo() {
  return await api.get('/users/me?fields=id,email')
}


async function submit() {
  saveLoading.value = true;
  testLoading.value = true;

  api.patch(`/items/${COLLECTION_NAME}`, formData.value).then(() => {
    canSave.value = false;
    add({
      title: t('zem_settings_saved')
    })
  }).catch(error => {
    add({
      title: t('zme_unexpected_title'),
      type: 'error',
      code: 500,
      dialog: true,
      text: t('zme_unexpected_text'),
      error: error,
    })
  }).finally(() => {
    saveLoading.value = false;
    testLoading.value = false;
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
  try {
    await createSettings();
    const userInfo = await fetchUserInfo();
    const settings = await fetchSettings();

    if (settings && settings.data) {
      const {data} = settings.data
      item.value = data
      canTest.value = true
    }

    if (userInfo && userInfo.data) {
      const {data} = userInfo.data
      userId.value = data.id
      userEmail.value = data.email
    }

    if (!fields.value.length) {
      setTimeout(() => window.location.reload(), 100);
      return;
    }
    loading.value = false
  } catch (error) {
    add({
      title: t('zme_unexpected_title'),
      type: 'error',
      code: 500,
      dialog: true,
      text: t('zme_unexpected_text'),
      error: error,
    })
  }

})()

</script>

<style scoped lang="scss">
.padding-box {
  padding: var(--content-padding);
  padding-top: 0;
}


</style>