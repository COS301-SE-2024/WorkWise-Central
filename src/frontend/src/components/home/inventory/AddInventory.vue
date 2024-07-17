<template>
  <v-dialog
    v-model="addDialog"
    max-height="800"
    max-width="600"
    scrollable
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          rounded="md"
          class="text-none font-weight-regular"
          style="font-size: 20px"
          text="Add to Inventory"
          prepend-icon="fa:fa-solid fa-plus"
          variant="elevated"
          color="secondary"
          v-bind="activatorProps"
        >
        </v-btn>
      </v-defaults-provider>
    </template>
    <v-card :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'">
      <v-card-title>
        <v-icon icon="fa: fa-solid fa-warehouse"></v-icon>
        <span>Add Inventory</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission"> </v-form>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
export default defineComponent({
  name: 'AddInventory',
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
