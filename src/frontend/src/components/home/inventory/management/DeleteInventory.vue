<template>
  <v-dialog v-model="deleteDialog" max-width="500px" :opacity="0.6">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Delete Inventory</span>
      </v-card-title>
      <v-card-text
        ><v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ inventoryName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container></v-card-text
      >

      <Toast position="top-center" />
      <v-card-actions>
        <v-container
          ><v-row justify="end"
            ><v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn label="Cancel" color="secondary" @click="close" block :disabled="isDeleting"
                ><v-icon icon="fa:fa-solid fa-cancel" color="secondary" size="small"></v-icon>Cancel
              </v-btn></v-col
            >
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                label="Delete"
                color="error"
                :loading="isDeleting"
                block
                @click="deleteInventory"
                ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon
                >Delete
              </v-btn></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import axios from 'axios'
import { API_URL } from '@/main'

export default defineComponent({
  name: 'DeleteInventory',
  props: {
    inventory_id: String,
    inventoryName: String
  },
  components: {
    Toast
  },
  data: () => ({
    deleteDialog: false,
    clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
    isDeleting: false,
    isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
  }),
  methods: {
    async deleteInventory() {
      this.isDeleting = true // Indicate the start of the deletion process
      console.log('meow', this.inventory_id)
      console.log(localStorage.getItem('employeeId'))
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      try {
        await axios.delete(`${API_URL}inventory/${this.inventory_id}`, config).then((response) => {
          console.log(response.data)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Inventory deleted successfully',
            life: 3000
          })
          setTimeout(() => {
            this.deleteDialog = false
            this.$emit('deleteInventory', this.inventory_id)
          }, 3000)
        })
      } catch (error) {
        console.error(error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while deleting the inventory',
          life: 3000
        })
      } finally {
        this.isDeleting = false
      }
    },
    close() {
      this.deleteDialog = false
    },
  }
})
</script>
