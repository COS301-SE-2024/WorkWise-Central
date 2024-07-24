<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center">Edit Roles</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <Toast />
        <v-network-graph :nodes="nodes" :edges="edges" :layouts="layouts"></v-network-graph>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <v-col align="center">
          <v-btn color="success" @click="saveChanges">Save</v-btn>
        </v-col>
        <v-col align="center">
          <v-btn color="error" @click="cancel">Cancel</v-btn>
        </v-col>
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
        node1: { name: 'N1' },
        node2: { name: 'N2' },
        node3: { name: 'N3' },
        node4: { name: 'N4' },
        node5: { name: 'N5' },
        node6: { name: 'N6' },
        node7: { name: 'N7' }
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

<style scoped>
.bg-cardColor {
  background-color: #f5f5f5;
}
</style>
