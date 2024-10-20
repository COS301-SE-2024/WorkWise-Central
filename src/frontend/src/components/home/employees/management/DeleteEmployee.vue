<template>
  <Toast position="top-center" />
 <v-dialog persistent v-model="clientDialog" max-width="500px" :opacity="0">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="error"
        variant="text"
        v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card :color="isDarkMode === true ? 'dark' : 'light'">
      <v-card-title>
        <span class="headline">Delete {{ details.firstName + ' ' + details.surname }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p>
              Are you sure you want to delete
              <strong>{{
                details.firstName.charAt(0).toUpperCase() +
                details.firstName.slice(1) +
                ' ' +
                details.surname.charAt(0).toUpperCase() +
                details.surname.slice(1)
              }}</strong>
              as an employee of this company?
            </p>
            <strong> This action cannot be reversed. </strong>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                color="error"
                variant="text"
                @click="deleteEmployee"
                :loading="isDeleting"
                block
                ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon
                >Delete</v-btn
              >
            </v-col>
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn
                :disabled="isDeleting"
                color="secondary"
                variant="text"
                @click="clientDialog = false"
                block
                ><v-icon icon="fa:fa-solid fa-cancel" color="secondary" size="small"></v-icon
                >Cancel</v-btn
              >
            </v-col>
          </v-row></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import Toast from 'primevue/toast'
import { API_URL } from '@/main'

export default {
  name: 'DeleteClient',
  components: { Toast },
  props: {
    details: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      clientDialog: false,
      isDeleting: false,
      isDarkMode: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF'
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    },
    async deleteEmployee() {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: {
          currentEmployeeId: localStorage['employeeId']
        }
      }
      axios
        .delete(API_URL + `employee/${this.details.employeeId}`, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Employee deleted successfully',
            life: 3000
          })

          setTimeout(() => {
            this.$emit('employeeDeleted')
            this.clientDialog = false
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
          this.isDeleting = false
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while deleting the employee',
            life: 3000
          })
        })
      this.isDeleting = false
    }
  }
}
</script>
