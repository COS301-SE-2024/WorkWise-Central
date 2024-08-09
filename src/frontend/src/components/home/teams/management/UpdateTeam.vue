<template>
  <v-dialog
    v-model="editDialog"
    max-height="800"
    max-width="600"
    scrollable
    color="warning"
    :opacity="0.1"
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular" color="warning" v-bind="activatorProps">
        <v-icon icon="fa:fa-solid fa-pencil" start color="warning" size="small"></v-icon>
        Edit
      </v-btn>
    </template>
    <v-card :theme="isdarkmode === true ? 'dark' : 'light'">
      <v-card-title>
        <v-icon icon="fa: fa-solid fa-users"></v-icon>
        Edit Team
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small class="text-caption">Team Name</small>
              <v-text-field
                v-model="localEditedItem.teamName"
                color="secondary"
                :rules="teamNameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <small class="text-caption">Team Members</small>
              <v-textarea
                v-model="localEditedItem.teamMembers"
                color="secondary"
                :rules="teamMembersRules"
                required
              ></v-textarea>
            </v-col>
            <v-col>
              <small class="text-caption">Team Leader ID</small>
              <v-text-field
                v-model="localEditedItem.teamLeaderId"
                color="secondary"
                :rules="teamLeaderIdRules"
                required
              ></v-text-field>
            </v-col>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6">
              <v-btn @click="close" color="error" block>
                <v-icon icon="fa:fa-solid fa-cancel" start color="error" size="small"></v-icon>
                Cancel
              </v-btn>
            </v-col>
            <Toast position="top-center" />
            <v-col cols="12" lg="6">
              <v-btn @click="updateTeam" color="success" :disabled="!valid" block>
                <v-icon
                  icon="fa:fa-solid fa-floppy-disk"
                  start
                  color="success"
                  size="small"
                ></v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Toast from 'primevue/toast'
import axios from 'axios'

export default {
  name: 'UpdateTeam',
  props: {
    editedItem: Object,
    teamId: String
  },
  components: {
    Toast
  },
  data() {
    return {
      localEditedItem: this.editedItem,
      editDialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      valid: false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      teamNameRules: [(v) => !!v || 'Team Name is required'],
      teamMembersRules: [(v) => (Array.isArray(v) && v.length > 0) || 'Team Members are required'],
      teamLeaderIdRules: [(v) => !!v || 'Team Leader ID is required']
    }
  },
  created() {
    this.localEditedItem = this.deepCopy(this.editedItem)
  },
  methods: {
    updateTeam() {
      if (!this.localEditedItem) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid team data',
          life: 3000
        })
        return
      }

      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = this.getRequestUrl()

      const data = {
        updateTeamDto: {
          teamName: this.localEditedItem.teamName,
          teamMembers: this.localEditedItem.teamMembers,
          teamLeaderId: this.localEditedItem.teamLeaderId,
          companyId: localStorage.getItem('currentCompany')
        },
        currentEmployeeId: localStorage.getItem('employeeId')
      }

      axios
        .patch(`${apiURL}teams/${this.teamId}`, data, config)
        .then((response) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Team updated successfully',
            life: 3000
          })
          this.editDialog = false
        })
        .catch((error) => {
          console.error(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating the team',
            life: 3000
          })
        })
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    handleSubmission() {
      if (this.valid) {
        this.updateTeam()
      }
    },
    close() {
      this.editDialog = false
    },
    async isLocalAvailable(localUrl) {
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
}
</script>
