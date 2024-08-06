<template>
  <v-container>
    <v-card>
      <v-card-title class="text-primary font-bold text-center">Edit Tags</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          item-value="role"
          class="bg-cardColor elevation-1"
          :row-props="getRowProps"
          :header-props="{ class: 'bg-secondary h5 ' }"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data: () => ({
    headers: [
      {
        title: 'Tag Name',
        key: 'tagName'
      }
    ],
    items: []
  }),
  methods: {
    getRowProps(index: number) {
      return {
        class: (index % 2 ? 'bg-secondRowColor ' : '') + 'h6'
      }
    },
    getTags() {}
  },
  mounted() {
    this.getTags()
  }
})
</script>
