<template>
  <v-dialog
    v-model="addDialog"
    max-height="800"
    max-width="600"
    scrollable
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
    :opacity="0.1"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        color="secondary"
        v-bind="activatorProps"
        variant="elevated"
        ><v-icon icon="fa:fa-solid fa-plus" color="" size="xs" />
        <v-icon icon="fa:fa-solid fa-users" color="" />
        Create Team</v-btn
      >
    </template>
    <v-card :theme="isdarkmode === true ? 'dark' : 'light'">
      <v-card-title>
        <v-icon icon="fa: fa-solid fa-users"></v-icon>
        Create Team
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
          <v-col>
            <v-row>
              <v-col>
                <h6>Team Name</h6>
                <v-text-field
                  v-model="teamName"
                  color="secondary"
                  :rules="teamNameRules"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <h6>Team Leader ID</h6>
                <v-select
                  v-model="teamLeaderId"
                  color="secondary"
                  :rules="teamLeaderIdRules"
                  :items="teamLeaderIds"
                  required
                  hide-details="auto"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <h6>Team Members</h6>
                <v-select
                  v-model="model"
                  color="secondary"
                  :items="teamLeaderIds"
                  :rules="teamMembersRules"
                  required
                  multiple
                  hide-details="auto"
                  hint="Enter team members as JSON"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-form>
      </v-card-text>
      <Toast position="top-center" />
      <v-divider></v-divider>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6">
              <v-btn @click="close" color="error" block>
                Cancel
                <v-icon icon="fa:fa-solid fa-cancel" color="error" size="small" end></v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn @click="createTeam" color="success" :disabled="!valid" block>
                Create
                <v-icon icon="fa:fa-solid fa-plus" color="success" size="small" end></v-icon>
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
  name: 'CreateTeam',
  components: {
    Toast
  },
  data: () => ({
    addDialog: false,
    isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
    valid: false,
    teamName: '',
    model: '',
    teamMemberNames: [] as string[],
    teamLeaderIds: [] as string[],
    teamMembers: [] as string[],
    teamLeaderId: '',
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    teamNameRules: [(v: string) => !!v || 'Team Name is required'],
    teamMembersRules: [(v: string) => !!v || 'Team Members are required'],
    teamLeaderIdRules: [(v: string) => !!v || 'Team Leader ID is required']
  }),
  methods: {
    async createTeam() {
      console.log(this.model)
      console.log(this.teamLeaderId)
      console.log(this.teamName)
      console.log(localStorage.getItem('currentCompany'))
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      }
      const apiURL = await this.getRequestUrl()

      const data = {
        teamName: this.teamName,
        teamMembers: this.teamMembers,
        teamLeaderId: this.teamLeaderId,
        companyId: localStorage.getItem('currentCompany')
      }
      try {
        console.log(data)
        const response = await axios.post(`${apiURL}team/create`, data, config)
        console.log(response)
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Team Created',
          life: 3000
        })
        this.addDialog = false
        window.location.reload()
      } catch (error) {
        console.error(error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create team',
          life: 3000
        })
      }
    },
    async getEmployees() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(`${apiURL}employee/all`, config)
        console.log(response.data.data)
        for (const employee of response.data.data) {
          console.log(employee._id)
          this.teamLeaderIds.push(employee._id as string)
        }
      } catch (error) {
        console.error(error)
      }
    },
    handleSubmission() {
      if (this.valid) {
        this.createTeam()
      }
    },
    close() {
      this.addDialog = false
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  },
  mounted() {
    this.getEmployees()
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
