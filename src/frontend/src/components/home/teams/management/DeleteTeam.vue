<template>
  <v-dialog v-model="deleteDialog" max-width="500px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <v-icon icon="fa:fa-solid fa-users"></v-icon>
        <span>Delete Team</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete the team <strong>{{ teamName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container>
      </v-card-text>
      <Toast position="top-center" />
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6">
              <v-btn color="secondary" @click="close" block>
                <v-icon icon="fa:fa-solid fa-times" start color="secondary" size="small"></v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn color="error" :loading="isDeleting" block @click="deleteTeam">
                <v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>
                Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import axios from 'axios'

export default defineComponent({
  name: 'DeleteTeam',
  props: {
    team_id: String,
    teamName: String
  },
  components: {
    Toast
  },
  data: () => ({
    deleteDialog: false,
    isDeleting: false,
    isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
  }),
  methods: {
    async deleteTeam() {
      console.log(this.teamName)
      console.log(this.team_id)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        this.isDeleting = true
        await axios.delete(`${apiURL}team/${this.team_id}`, config)
        console.log('Team deleted successfully')
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Team deleted successfully',
          life: 3000
        })
        setTimeout(() => {
          this.isDeleting = false
          this.deleteDialog = false
          window.location.reload()
        }, 1500)
      } catch (error) {
        console.error('Error deleting team:', error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete team',
          life: 3000
        })
      } finally {
        this.isDeleting = false
      }
    },
    close() {
      this.deleteDialog = false
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status >= 200 && res.status < 300
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  }
})
</script>
