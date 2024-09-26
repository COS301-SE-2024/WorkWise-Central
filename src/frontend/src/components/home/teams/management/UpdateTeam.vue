<template>
  <v-dialog
    v-model="editDialog"
    max-height="800"
    max-width="600"
    scrollable
    color="warning"
    :opacity="0.1"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular" color="warning" v-bind="activatorProps">
        <v-icon icon="fa:fa-solid fa-pencil" start color="warning" size="small"></v-icon>
        Edit
      </v-btn>
    </template>
    <v-card class="bg-cardColor">
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
                :rules="teamNameRules"
                required
                color="secondary"
              ></v-text-field>
            </v-col>
            <v-col>
              <small class="text-caption">Team Members</small>
              <v-select
                v-model="selectedTeamMembers"
                :items="teamMemberNames"
                :rules="teamMembersRules"
                multiple
                chips
                required
                variant="solo"
                color="primary"
                background-color="#f5f5f5"
              ></v-select>
            </v-col>
            <v-col>
              <small class="text-caption">Team Leader</small>
              <v-select
                v-model="localEditedItem.teamLeaderId.userInfo.displayName"
                :items="teamMemberNames"
                :rules="teamLeaderIdRules"
                required
                variant="solo"
                color="primary"
                background-color="#f5f5f5"
              ></v-select>
            </v-col>
            <v-col>
              <small class="text-caption">Assign Job</small>
              <v-select
                  v-model="selectedJobs"
                  :items="jobList"
                  multiple
                  item-title="details.heading"
                  item-value="_id"
                  required
                  variant="solo"
                  color="primary"
                  background-color="#f5f5f5"
              ></v-select>
            </v-col>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn @click="close" color="error" block>
                <v-icon
                  icon="fa:fa-solid fa-cancel"
                  color="error"
                  start
                  multiple
                  chips
                  size="small"
                  :loading="isDeleting"
                ></v-icon>
                Cancel
              </v-btn>
            </v-col>
            <Toast position="top-center" />
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                @click="handleSubmission"
                color="success"
                :disabled="!valid"
                block
                :loading="isDeleting"
              >
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
import { API_URL } from '@/main'
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
      selectedJobs: [],
      assignedJobs: [],
      jobList: [],
      localEditedItem: this.editedItem,
      editDialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      valid: false,
      isDeleting: false,
      teamMemberNames: [],
      selectedTeamMembers: [],
      selectedTeamLeader: '',
      teamMemberIds: [],
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      teamNameRules: [(v) => !!v || 'Team Name is required'],
      teamMembersRules: [(v) => (Array.isArray(v) && v.length > 0) || 'Team Members are required'],
      teamLeaderIdRules: [(v) => !!v || 'Team Leader is required']
    }
  },
  async created() {
    this.localEditedItem = this.deepCopy(this.editedItem)
    await this.getEmployees()
    await this.getJobInCompany()
    await this.getCurrentJobAssignment()
  },
  methods: {
    async updateTeam() {
      this.isDeleting = true

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
      const apiURL = await this.getRequestUrl()

      const data = {
        updateTeamDto: {
          teamName: this.localEditedItem.teamName,
          teamMembers: this.selectedTeamMembers.map((name) => this.getEmployeeIdByName(name)),
          teamLeaderId: this.getEmployeeIdByName(this.selectedTeamLeader),
          companyId: localStorage.getItem('currentCompany')
        },
        currentEmployeeId: localStorage.getItem('employeeId')
      }
      console.log(data)

      // Unassign if the job has been removed

      for (const job of this.assignedJobs) {
        if (!this.selectedJobs.includes(job)) {
          console.log('Removing job... :', job)
          await axios.patch(`${API_URL}job/team`, {
                employeeId: localStorage.getItem('employeeId'),
                teamId: this.teamId,
                jobId: job
              }, config
          )
        }
      }

      // Assign new jobs to the team
      for (const job of this.selectedJobs) {
        console.log('Job id:', job)
        if (!this.assignedJobs.includes(job)) {
          await axios.put(`${API_URL}job/team`, {
            employeeId: localStorage.getItem('employeeId'),
            teamId: this.teamId,
            jobId: job
          }, config)
        }
      }

      axios
        .patch(`${apiURL}team/${this.teamId}`, data, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Team updated successfully',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.editDialog = false
            // Emit the event to the parent component with the updated team data
            this.$emit('teamUpdated', response.data.data)
          }, 1500)
        })
        .catch((error) => {
          console.error(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating the team',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
          }, 1500)
        })
    },
    getEmployeeIdByName(name) {
      const index = this.teamMemberNames.indexOf(name)
      return this.teamMemberIds[index]
    },
    populateTeamLeaderName() {
      const teamLeader = this.localEditedItem.teamMembers.find(
        (member) => member === this.localEditedItem.teamLeaderId
      )
      this.selectedTeamLeader =
        this.teamMemberNames[this.localEditedItem.teamMembers.indexOf(teamLeader)]
    },
    populateCurrentTeamMembers() {
      for (let i = 0; i < this.localEditedItem.teamMembers.length; i++) {
        this.selectedTeamMembers.push(this.editedItem.teamMembers[i].userInfo.displayName)
      }
    },
    async getCurrentJobAssignment() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const response = await axios.get(
            `${API_URL}team/id/${this.teamId}`,
            config
        )
        console.log('Selected Jobs:', response.data.data)
        for (const job of response.data.data.currentJobAssignments) {
          this.assignedJobs.push(job)
        }
        for (const job of this.jobList) {
          if (this.assignedJobs.some(assignedJob => assignedJob === job._id)) {
            this.selectedJobs.push(job._id)
          }
        }
      } catch (error) {
        console.error('Failed to fetch current job assignments:', error)
      }
    },
    async getJobInCompany() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const response = await axios.get(
            `${API_URL}job/all/company/${localStorage.getItem('currentCompany')}`,
            config
        )
        response.data.data.forEach((job) => {
          this.jobList.push(job)
        })
        console.log('Job List:', this.jobList)
      } catch (error) {
        console.error(error)
      }
    },
    async getEmployees() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        response.data.data.forEach((employee) => {
          this.teamMemberNames.push(employee.userInfo.displayName)
          this.teamMemberIds.push(employee._id)
        })
        this.populateCurrentTeamMembers()
        this.populateTeamLeaderName()
      } catch (error) {
        console.error(error)
      }
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
