<template>
  <v-dialog>
    <template>
      <v-defaults-provider>
        <v-btn> </v-btn>
      </v-defaults-provider>
    </template>
    <v-card>
      <v-card-title>
        <v-icon>mdi-pencil</v-icon>
        <span>Edit Inventory</span>
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
  name: 'EditInventory',
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
