<template>
  <v-dialog
    v-model="addDialog"
    max-height="800"
    max-width="600"
    scrollable
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="warning" v-bind="activatorProps"
        >Add</v-btn
      >
    </template>
    <v-card :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'">
      <v-card-title>
        <v-icon icon="fa: fa-solid fa-warehouse"></v-icon>
        Add Inventory
      </v-card-title>
      <v-divider></v-divider>
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
  data: () => ({
    addDialog: false,
    isdarkmode: localStorage.getItem('isdarkmode') === 'true' ? true : false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    valid: false
  }),
  methods: {
    addInventory() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory Added',
        life: 3000
      })
    },
    handleSubmission() {
      if (this.valid) {
        this.addInventory()
      }
    },
    close() {
      this.addDialog = false
    }
  }
})
</script>
