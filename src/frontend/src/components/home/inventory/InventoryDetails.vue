<template>
  <v-dialog>
    <template>
      <v-defaults-provider>
        <v-btn> </v-btn>
      </v-defaults-provider>
    </template>
    <v-card>
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Inventory Details</span>
      </v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
export default defineComponent({
  name: 'InventoryDetails',
  components: {
    Toast
  },
  data: () => ({}),
  methods: {
    addInventory() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory Added',
        life: 3000
      })
    }
  }
})
</script>
