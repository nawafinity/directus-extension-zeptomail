<template>
  <private-view title="Zeptomail Settings">
    <div class="padding-box">
      <v-form :fields="fields" v-model="formData" showValidationErrors="true" ref="formRef"/>
    </div>

    <template #actions>
      <v-button
          rounded
          icon
          class="action-preview"
          :disabled="!canSave"
          @click="submit"
      >
        <v-icon name="check" outline/>
      </v-button>
    </template>
  </private-view>
</template>

<script setup lang="ts">
import {useApi, useCollection, useStores} from "@directus/extensions-sdk";
import {onMounted, ref, watch} from "vue";
import {settingsCollectionDefinition} from "./collections/settingsCollectionDefinition";
// Hooks
const api = useApi();
const {useCollectionsStore} = useStores();
const collectionsStore = useCollectionsStore();
const { info, fields, defaults, primaryKeyField } = useCollection('zeptomail_settings');

// Refs
const loading = ref(true)
const formData = ref({});
const formErrors = ref([]);
const canSave = ref(false);


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

    // Create fields

  }
}

async function submit() {
  api.patch('/items/zeptomail_settings', formData.value).then(({data: {data}}) => {

  }).catch(error => {
    if (error.hasOwnProperty("response")) {
      const { data: {errors}} = error.response;
      if (errors) {
        console.log(errors);
      }
    }
  })
}

onMounted(async () => {
  await createSettings();
})
</script>

<style scoped lang="scss">
.padding-box {
  padding: var(--content-padding);
  padding-top: 0;
}


</style>