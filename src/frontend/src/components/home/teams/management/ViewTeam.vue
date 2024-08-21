<template>
  <v-dialog v-model="dialog" max-width="600" :theme="isDarkMode === true ? 'dark' : 'light'">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="success" v-bind="activatorProps">
        <v-icon icon="fa:fa-solid fa-eye" start color="success" size="small"></v-icon>
        View
      </v-btn>
    </template>
    <v-card :theme="isDarkMode === true ? 'dark' : 'light'">
      <v-card-title>
        <v-icon icon="fa:fa-solid fa-users"></v-icon>
        <span>Team Details</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Team Name</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ team.teamName }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Team Leader</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ teamLeaderName }}</small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <label class="font-weight-light" style="font-size: 20px"> Team Members</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">
              <ul>
                <li v-for="member in teamMemberNames" :key="member.id">{{ member }}</li>
              </ul>
            </small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Current Job Assignments</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ team.currentJobAssignments }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Date Created</label>
            <v-spacer></v-spacer>
            <small class="text-caption" style="font-size: 12px">{{ team.createdAt }}</small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <Toast position="top-center" />
        <v-col cols="12">
          <v-btn label="Close" color="secondary" text @click="close">
            <v-icon icon="fa:fa-solid fa-times" start color="secondary" size="small"></v-icon>
            Close
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'

export default defineComponent({
  name: 'ViewTeam',
  props: {
    team: Object
  },
  components: {
    Toast
  },
  data() {
    return {
      dialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true',
      teamLeaderName: '',
      teamMemberNames: []
    }
  },
  methods: {
    close() {
      this.dialog = false
    },
    async fetchTeamLeaderAndMembers() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()

      try {
        const leaderResponse = await axios.get(
          `${apiURL}employee/${this.team.teamLeaderId}`,
          config
        )
        this.teamLeaderName = leaderResponse.data.userInfo.displayName

        const memberResponses = await Promise.all(
          this.team.teamMembers.map(memberId =>
            axios.get(`${apiURL}employee/${memberId}`, config)
          )
        )
        this.teamMemberNames = memberResponses.map(res => res.data.userInfo.displayName)
      } catch (error) {
        console.error('Failed to fetch team leader or members:', error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch team leader or members',
          life: 3000
        })
      }
    },
    async getRequestUrl() {
      const localUrl = 'http://localhost:3000/'
      const remoteUrl = 'https://tuksapi.sharpsoftwaresolutions.net/'
      const isLocalAvailable = await axios
        .get(localUrl)
        .then(() => true)
        .catch(() => false)
      return isLocalAvailable ? localUrl : remoteUrl
    }
  },
  async mounted() {
    await this.fetchTeamLeaderAndMembers()
  }
})
</script>
