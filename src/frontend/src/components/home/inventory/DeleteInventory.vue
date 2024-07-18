<template>
  <v-dialog
    v-model="deleteDialog"
    max-width="500px"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="warning" v-bind="activatorProps"
        >Delete</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Delete Inventory</span>
      </v-card-title>
      <v-card-text
        ><v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ clientName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container></v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <Toast />
        <v-btn label="Delete" color="error" text :loading="isDeleting" @click="deleteInventory"
          >Delete</v-btn
        >
        <v-btn label="Cancel" color="secondary" text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
export default defineComponent({
  name: 'DeleteInventory',
  props:{
    inventory_id: String
  },
  components: {
    Toast
  },
  data: () => ({
    deleteDialog: false,
    clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
    isDeleting: false,
    isdarkmode: localStorage.getItem('isdarkmode') === 'true' ? true : false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF'
  }),
  methods: {
    deleteInventory() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory Added',
        life: 3000
      })
    },
    close() {
      this.deleteDialog = false
    }
  }
})
</script>
