<template>
  <private-view title="Zeptomail Settings">
    <div class="padding-box">
      <div class="form w-full">
        <div class="field">
          <v-notice>
            ...
          </v-notice>
        </div>

        <div class="field full">
          <v-form collection="zeptomail_settings" v-model="formData" showValidationErrors="true"  />
        </div>
      </div>
    </div>
  </private-view>
</template>

<script setup lang="ts">
import {useApi, useStores} from "@directus/extensions-sdk";
import {onMounted, ref, watch} from "vue";
import {settingsCollectionDefinition} from "./collections/settingsCollectionDefinition";

// Hooks
const api = useApi();
const {useCollectionsStore} = useStores();
const collectionsStore = useCollectionsStore();

// Refs
const loading = ref(true)
const formData = ref({});


watch(formData, (val) => {
  console.log('Form updated:', val);
}, { deep: true });


// Utils
const isCollectionExist = (collection: string) => collectionsStore.getCollection(collection)

async function createSettings() {
  if (!isCollectionExist('zeptomail_settings')) {
    api.post('/collections', settingsCollectionDefinition).then(({data: {data}}) => {
      if (!data) {
        console.error("Cannot create zeptomail settings collection.")
      }
    })

    // Create fields

  }
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

.form {
  display: grid;
  grid-template-columns: [start] minmax(0, 1fr) [half] minmax(0, 1fr) [full];
  gap: var(--theme--form--row-gap) var(--theme--form--column-gap);

  &.with-fill {
    grid-template-columns:
			[start] minmax(0, var(--form-column-max-width)) [half] minmax(0, var(--form-column-max-width))
			[full] 1fr [fill];
  }

  .type-label {
    margin-bottom: 8px;
  }

  .field {
    grid-column: start / fill;

    @media (min-width: 960px) {
      grid-column: start / full;
    }
  }

  .half,
  .half-left,
  .half-space {
    grid-column: start / fill;

    @media (min-width: 960px) {
      grid-column: start / half;
    }
  }

  .half + .half,
  .half-right {
    grid-column: start / fill;

    @media (min-width: 960px) {
      grid-column: half / full;
    }
  }

  .full {
    grid-column: start / fill;

    @media (min-width: 960px) {
      grid-column: start / full;
    }
  }

  .fill {
    grid-column: start / fill;
  }
}

</style>