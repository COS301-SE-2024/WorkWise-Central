<template>
  <Toast position="top-center" />
  <v-dialog v-model="clientDialog" max-width="500px" :opacity="0">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete
      </v-btn>
    </template>
    <v-card class="bg-cardColor">
      <v-card-title> Delete {{ client.firstName + ' ' + client.lastName }} </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ clientName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container
          ><v-row justify="end">
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn
                label="Cancel"
                color="secondary"
                text
                @click="clientDialog = false"
                block
                :disabled="isDeleting"
              >
                ><v-icon icon="fa:fa-solid fa-cancel" color="secondary" start size="small"></v-icon
                >Cancel
              </v-btn></v-col
            ><v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                label="Delete"
                color="error"
                text
                :loading="isDeleting"
                @click="deleteClient"
                block
              >
                <v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete
              </v-btn></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import Toast from 'primevue/toast'
import { API_URL } from '@/main'

export default {
  name: 'DeleteClient',
  props: {
    client_id: Number,
    client: Object
  },
  components: { Toast },
  data() {
    return {
      clientDialog: false,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      employeeId: localStorage.getItem('employeeId')
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    },
    Delete() {
      alert('Client deleted')
      // Consider removing this for SPA behavior
    },
    async deleteClient() {
      console.log('meow', this.client_id)
      console.log(localStorage.getItem('employeeId'))
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          empId: localStorage.getItem('employeeId'),
          clientId: this.client_id
        }
      }

      try {
        console.log(this.client_id)
        this.isDeleting = true // Indicate the start of the deletion process

        await axios.delete(`${API_URL}client/delete/`, config).then((response) => {
          console.log(response)

          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Client deleted successfully',
            life: 3000
          })
          setTimeout(() => {
            this.$emit('deleteClient', this.client_id)
          }, 1500)
        })
      } catch (error) {
        console.error('Error deleting client:', error)

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while deleting the client',
          life: 3000
        })
      } finally {
        this.isDeleting = false // Reset the deletion indicator
      }
    },
    
  }
}
</script>
