<template>
  <v-dialog>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="warning" v-bind="activatorProps"
        >Edit</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-center"> Edit Inventory </v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
export default defineComponent({
  name: 'EditInventory',
  props: {
    inventory_id: String,
    inventoryItem: Object
  },
  components: {
    Toast
  },
  data: () => ({}),
  methods: {
    editInventory() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory Updated',
        life: 3000
      })
    }
  }
})
</script>
