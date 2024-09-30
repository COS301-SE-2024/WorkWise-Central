<template>
  <v-dialog v-model="addDialog" max-height="800" max-width="600" scrollable :opacity="0.1">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        color="secondary"
        v-bind="activatorProps"
        variant="elevated"
        block
        ><v-icon icon="fa:fa-solid fa-plus" color="" size="xs" />
        <v-icon icon="fa:fa-solid fa-users" color="" />
        Create Team</v-btn
      >
    </template>
    <v-card class="bg-cardColor">
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
                <h6>Team Leader</h6>
                <v-select
                  v-model="teamLeaderName"
                  color="secondary"
                  :rules="teamLeaderIdRules"
                  :items="teamMemberNames"
                  required
                  hide-details="auto"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <h6>Team Members</h6>
                <v-select
                  color="secondary"
                  :items="teamMemberNames"
                  :rules="teamMembersRules"
                  required
                  v-model="selectedTeamMembers"
                  multiple
                  chips
                  hide-details="auto"
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
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn @click="close" color="error" block>
                Cancel
                <v-icon
                  icon="fa:fa-solid fa-cancel"
                  color="error"
                  size="small"
                  end
                  :loading="isDeleting"
                ></v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                @click="createTeam"
                color="success"
                :disabled="!valid"
                block
                :loading="isDeleting"
              >
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
import { API_URL } from '@/main'

export default defineComponent({
  name: 'CreateTeam',
  components: {
    Toast
  },
  data: () => ({
    addDialog: false,
    isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
    valid: false,
    isDeleting: false,
    teamName: '',
    model: '',
    teamMembers: '',
    teamLeaderIds: [] as string[],
    teamMemberNames: [] as string[],
    teamMemberIds: [] as string[],
    selectedTeamMembers: [] as string[],
    teamLeaderId: '',
    teamLeaderName: '',
    teamNameRules: [(v: string) => !!v || 'Team Name is required'],
    teamMembersRules: [(v: string) => !!v || 'Team Members are required'],
    teamLeaderIdRules: [(v: string) => !!v || 'Team Leader ID is required']
  }),
  methods: {
    async createTeam() {
      this.isDeleting = true
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        params: { currentEmployeeId: localStorage.getItem('employeeId') }
      }
      const data = {
        teamName: this.teamName,
        teamMembers: await this.selectTeamMembers(),
        teamLeaderId: await this.selectTeamLeader(),
        companyId: localStorage.getItem('currentCompany')
      }
      console.log(JSON.stringify(data))
      try {
        const response = await axios.post(`${API_URL}team/create`, data, config)
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Team Created',
          life: 3000
        })
        setTimeout(() => {
          this.isDeleting = false
          this.addDialog = false
          // Emit the event to the parent component with the new team data
          this.resetFields()
          this.$emit('teamCreated', response.data.data)
        }, 1500)
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
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      try {
        const response = await axios.get(
          `${API_URL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        for (const employee of response.data.data) {
          this.teamMemberNames.push(employee.userInfo.displayName)
          this.teamLeaderIds.push(employee._id)
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
    async selectTeamLeader() {
      console.log(this.teamLeaderIds[this.teamMemberNames.indexOf(this.teamLeaderName)])
      return this.teamLeaderIds[this.teamMemberNames.indexOf(this.teamLeaderName)]
    },
    async selectTeamMembers() {
      for (const member of this.selectedTeamMembers) {
        console.log(member)
        this.teamMemberIds.push(this.teamLeaderIds[this.selectedTeamMembers.indexOf(member)])
      }
      console.log(this.teamMemberIds)
      return this.teamMemberIds
    },
    resetFields() {
      this.teamName = ''
      this.teamLeaderName = ''
      this.selectedTeamMembers = []
    },
    close() {
      this.addDialog = false
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
