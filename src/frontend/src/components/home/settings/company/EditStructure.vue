<template>
  <v-container>
    <v-card max-height="1000px">
      <v-card-title class="text-center">Edit Roles</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <Toast />
        <v-network-graph :nodes="nodes" :edges="edges" :layouts="layouts"></v-network-graph>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <v-container
          ><v-row justify="end">
            <v-col align="center" cols="12" lg="6">
              <v-btn color="success" @click="saveChanges" block>Save</v-btn>
            </v-col>
            <v-col align="center" cols="12" lg="6">
              <v-btn color="error" @click="cancel" block>Cancel</v-btn>
            </v-col></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Toast from 'primevue/toast'

import { reactive } from 'vue'

export default {
  name: 'MyNetworkGraph',
  data() {
    return {
      nodes: {
        node1: { name: 'Joe' },
        node2: { name: 'Alice' },
        node3: { name: 'Bob' },
        node4: { name: 'Carol' },
        node5: { name: 'Dave' },
        node6: { name: 'Eve' },
        node7: { name: 'Frank' }
      },
      edges: {
        edge1: { source: 'node1', target: 'node2' },
        edge2: { source: 'node2', target: 'node3' },
        edge3: { source: 'node3', target: 'node4' },
        edge4: { source: 'node3', target: 'node5' },
        edge5: { source: 'node2', target: 'node6' },
        edge6: { source: 'node6', target: 'node7' }
      },
      layouts: reactive({
        nodes: {}
      })
    }
  },
  components: {
    Toast
  },
  methods: {
    saveChanges() {
      // Logic to save changes
      console.log('Changes saved:')
    },
    cancel() {
      // Logic to cancel changes
      console.log('Changes canceled')
    }
  }
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import * as vNG from "v-network-graph"

</script>

<style scoped>
.bg-cardColor {
  background-color: #f5f5f5;
}
</style>
