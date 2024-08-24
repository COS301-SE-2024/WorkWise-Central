<template>
  <v-dialog v-model="deleteDialog" max-width="500px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Delete Status</span>
      </v-card-title>
      <v-card-text
        ><v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ statusName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container></v-card-text
      >

      <Toast position="top-center" />
      <v-card-actions>
        <v-container
          ><v-row justify="end"
            ><v-col cols="12" lg="6" order="last" order-lg="first"
              ><Toast position="bottom-center" />
              <v-btn label="Cancel" color="secondary" @click="close" block
                ><v-icon icon="fa:fa-solid fa-cancel" color="secondary" size="small"></v-icon>Cancel
              </v-btn></v-col
            >
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn label="Delete" color="error" :loading="isDeleting" block @click="deleteStatus"
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
import axios from 'axios'
export default defineComponent({
  name: 'DeleteStatus',
  props: {
    statusName: String,
    statusId: String
  },
  data() {
    return {
      deleteDialog: false,
      isDeleting: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    close() {
      this.deleteDialog = false
    },
    async deleteStatus() {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          companyId: localStorage.getItem('currentCompany'),
          employeeId: localStorage.getItem('employeeId'),
          statusId: this.statusId
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const res = await axios.delete(`${apiURL}job/status`, config)
        if (res.status === 200) {
          console.log(res.data)
          this.isDeleting = false
          this.deleteDialog = false
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Status Deleted',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.deleteDialog = false
            window.location.reload()
          }, 1500)
        }
      } catch (error) {
        console.error(error)
        this.isDeleting = false
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred. Please try again',
          life: 3000
        })
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    }
  }
})
</script>
