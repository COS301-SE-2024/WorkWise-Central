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
                item-title="name"
                item-value="id"
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
                item-title="name"
                item-value="id"
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
                item-title="name"
                item-value="id"
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
      initalTeamName: this.editedItem.teamName,
      intialTeamLeader: this.editedItem.teamLeaderId,
      editDialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      valid: false,
      isDeleting: false,
      teamMemberNames: [],
      allTeamMembers:[],
      currentTeamLeader:'',
      allAssignableJob:[],
      currentlyselectedDBAssignableJob:[],
      selectedTeamMembers: [],
      currentlyselectedDBTeamMemebers:[],
      initialTeamMembers: [],
      selectedTeamLeader: '',
      currentlyselectedDBTeamLeader:'',
      teamMemberIds: [],
      teamNameRules: [(v) => !!v || 'Team Name is required'],
      teamMembersRules: [(v) => (Array.isArray(v) && v.length > 0) || 'Team Members are required'],
      teamLeaderIdRules: [(v) => !!v || 'Team Leader is required']
    }
  },
  async created() {
    this.localEditedItem = this.deepCopy(this.editedItem)
    await this.getEmployees()
    await this.getJobInCompany()
    await this.getCurrentJobAssignments()
    this.initialTeamMembers = [...this.localEditedItem.teamMembers] // Store the initial members
  },
  watch: {
    selectedTeamMembers(newMembers) {
      // Ensure team leader is always part of the selected team members
      if (!newMembers.includes(this.selectedTeamLeader)) {
        newMembers.push(this.selectedTeamLeader)
      }
    }
  },
  methods: {
    compareTeamMembers() {
      let addedMembers = this.selectedTeamMembers.filter(
        (member) =>
          !this.initialTeamMembers.some(
            (initialMember) => initialMember.userInfo.displayName === member || initialMember.userInfo.displayName ===''
          )
      )


      const removedMembers = this.initialTeamMembers.filter(
        (initialMember) => !this.selectedTeamMembers.includes(initialMember.userInfo.displayName) || initialMember.userInfo.displayName ===''
      )

      return { addedMembers, removedMembers }
    },
    isTeamLeader(name) {
      return name === this.selectedTeamLeader // Disable if the name is the team leader
    },
    populateTeamLeaderName() {

      this.localEditedItem.teamLeaderId.userInfo.displayName = this.editedItem.teamLeaderId._id
      this.currentlyselectedDBTeamLeader=this.editedItem.teamLeaderId._id
      console.log('localEditedItem: ', this.editedItem)
    },
    arraysHaveSameValues(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
},
    updateTeam() {
      this.isDeleting = true

      console.log(this.localEditedItem.teamLeaderId.userInfo.displayName)

      let change = false
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
      let data

      const remove_emp_subarray = this.currentlyselectedDBTeamMemebers.filter(
          (item) => !this.selectedTeamMembers.includes(item)
      ).filter(item=> item !=='')

      let add_emp_subarray = this.selectedTeamMembers.filter(
          (item) => !this.currentlyselectedDBTeamMemebers.includes(item)
      ).filter(item=> item !=='')

      if (
        this.localEditedItem.teamName !== this.initalTeamName
      ) {
        data = {
            teamName: this.localEditedItem.teamName,
          }
        axios
            .patch(`${API_URL}team/${this.teamId}`, data, config)
            .then((response) => {
              console.log(response)
              change = true}).catch((error) => {
          console.log(error)
        })

      }
      if(this.currentlyselectedDBTeamLeader !== this.localEditedItem.teamLeaderId.userInfo.displayName)
      {
        data = {
          teamLeaderId: this.localEditedItem.teamLeaderId.userInfo.displayName,
        }
        axios
            .patch(`${API_URL}team/${this.teamId}`, data, config)
            .then((response) => {
              console.log(response)
              change = true}).catch((error) => {
          console.log(error)
        })
      }
      if(this.arraysHaveSameValues(this.currentlyselectedDBAssignableJob, this.selectedJobs) === false)
      {
        data = {
          currentJobAssignments: this.selectedJobs
        }
        axios
            .patch(`${API_URL}team/${this.teamId}`, data, config)
            .then((response) => {
              console.log(response)
              change = true}).catch((error) => {
                console.log(error)
        })
      }
      console.log('remove_emp_subarray', remove_emp_subarray)
      if(remove_emp_subarray.length !== 0)
      {
        axios
            .patch(`${API_URL}team/remove/${this.teamId}`, { teamMembersToBeRemoved:remove_emp_subarray}, config)
            .then((response) => {
              console.log(response)
              change = true}).catch((error) => {
          console.log(error)
        })
      }

      console.log('add_emp_subarray', add_emp_subarray)
      if(add_emp_subarray.length !== 0)
      {
        axios
            .patch(`${API_URL}team/add/${this.teamId}`, {newTeamMembers:add_emp_subarray}, config)
            .then((response) => {
              console.log(response)
              change = true}).catch((error) => {
          console.log(error)
        })
      }

      this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Team updated successfully',
              life: 3000
            })
        this.editDialog = false
        window.location.reload()


    },
    getEmployeeIdByName(name) {
      const index = this.teamMemberNames.indexOf(name)
      return this.teamMemberIds[index]
    },
    populateCurrentTeamMembers() {
      for (let i = 0; i < this.localEditedItem.teamMembers.length; i++) {
        this.selectedTeamMembers.push(this.editedItem.teamMembers[i]._id)
        this.currentlyselectedDBTeamMemebers.push(this.editedItem.teamMembers[i]._id)
      }
    },
    async getCurrentJobAssignments() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const response = await axios.get(`${API_URL}team/id/${this.teamId}`, config)
        for (const job of response.data.data.currentJobAssignments) {
          this.assignedJobs.push(job)
        }

            this.selectedJobs = this.assignedJobs


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
          `${API_URL}job/all/company/${localStorage.getItem('currentCompany')}?currentEmployeeId=${localStorage.getItem(
            'employeeId'
          )}`,
          config
        )
        console.log(response.data.data)
        response.data.data.forEach((job) => {
          this.jobList.push({id: job._id, name: job.details.heading})
        })
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
      try {
        const response = await axios.get(
          `${API_URL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        response.data.data.forEach((employee) => {
          this.teamMemberNames.push({ name: employee.userInfo.displayName, id: employee._id })
          this.allTeamMembers.push(employee._id)
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
    }
  }
}
</script>
