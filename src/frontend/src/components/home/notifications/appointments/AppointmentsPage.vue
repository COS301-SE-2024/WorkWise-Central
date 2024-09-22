<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Meetings</h2>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" class="text-center" v-show="joinRoom">
        <v-btn color="primary" block @click="openDialog" variant="outlined">
          Create New Meeting
        </v-btn>
      </v-col>
    </v-row>

    <v-card rounded="md" class="pa-0 ma-3 bg-background" border="md" v-show="joinRoom">
      <v-row>
        <!-- Recently Created Appointments Section -->
        <v-col cols="12" order="last" order-lg="first">
          <h3 class="pa-0 ma-5">Recently Created Meetings</h3>
          <v-card
            v-for="appointment in recentAppointments"
            :key="appointment.id"
            class="pa-1 ma-5 bg-background"
            color="cardColor"
          >
            <v-card-title>{{ appointment.title }}</v-card-title>
            <v-card-subtitle class="bg-cardColor">{{
              formatDate(appointment.date)
            }}</v-card-subtitle>
            <v-card-text>{{ appointment.details }}</v-card-text>
            <v-card-actions class="bg-cardColor">
              <v-container
                ><v-row
                  ><v-col cols="12" lg="4"
                    ><v-btn color="primary" @click="editAppointment(appointment)" block
                      ><v-icon icon="fa:fa-solid fa-pencil" color="primary"></v-icon>Edit</v-btn
                    ></v-col
                  ></v-row
                ></v-container
              >
              <v-col cols="12" lg="4">
                <v-btn color="error" @click="deleteAppointment(appointment.id)" block
                  ><v-icon icon="fa:fa-solid fa-trash" color="error"></v-icon>Delete</v-btn
                ></v-col
              >
              <v-col cols="12" lg="4">
                <v-btn @click="joiningRoom" color="success" block>
                  <v-icon icon="fa:fa-solid fa-right-to-bracket" color="success"></v-icon>Join Room
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Most Important Appointments Section -->
      </v-row>
    </v-card>

    <VideoConferencing :roomId="selectedRoom.id" v-show="conference" @return="leavingRoom" />
  </v-container>

  <!-- Dialog for Creating/Editing Appointment -->
  <v-dialog v-model="showDialog" persistent max-width="600px">
    <v-card class="bg-cardColor">
      <v-card-title>
        <span class="headline">{{ isEditing ? 'Edit Appointment' : 'Create a new meeting' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <h6>Meeting Title</h6>
                <v-text-field
                  v-model="newAppointment.title"
                  label="Title"
                  :rules="titleRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h6>Meeting Date</h6>
                <v-text-field
                  v-model="newAppointment.date"
                  label="Date"
                  type="date"
                  :rules="dateRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h6>Details</h6>
                <v-text-field v-model="newAppointment.details" label="Details"></v-text-field>
              </v-col>
              <v-col :cols="12">
                <h6>Choose Participants</h6>
                <v-select
                  clearable
                  label="Participants"
                  hint="Select the employee you'd like to join the meeting"
                  persistent-hint
                  @update:model-value="selected_participants"
                  v-model="newAppointment.participants"
                  item-value="employeeId"
                  item-title="name"
                  :items="teamMemberNames"
                  multiple
                  chips
                  bg-color="background"
                  variant="solo"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-btn color="error" @click="cancel" block>
                <v-icon icon="fa: fa-solid fa-cancel" color="error" start></v-icon>Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn
                color="success"
                @click="saveAppointment"
                block
                :loading="isGenerating"
                :disabled="!valid"
              >
                <v-icon icon="fa: fa-solid fa-floppy-disk" color="success" start> </v-icon>Save
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
import VideoConferencing from './VideoConferencing.vue'
import axios from 'axios'
interface Appointment {
  id: string
  title: string
  date: string
  details: string
  important: boolean
  participants: string[]
}
type EmployeeInformation = {
  name: string
  employeeId: string
}
export default defineComponent({
  name: 'AppointmentsPage',
  components: {
    VideoConferencing
  },
  data() {
    return {
      showDialog: false,
      selectedRoom: {
        id: ''
      },
      isEditing: false,
      joinRoom: true,
      conference: false,
      teamLeaderIds: [] as string[],
      teamMemberNames: [] as string[],
      participants: [] as string[],
      editIndex: 0,
      valid: false,
      isGenerating: false,
      participantsItemNames: [] as EmployeeInformation[],
      req_obj: {
        participants: [] as string[]
      },
      newAppointment: {
        id: '',
        title: '',
        date: '',
        details: '',
        important: false,
        participants: []
      } as Appointment,
      recentAppointments: [
        {
          id: '1',
          title: 'Meeting with John Doe',
          date: '2021-10-15',

          details: 'Discuss project timeline and deliverables'
        }
      ] as Appointment[],
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      companyId: '',

      titleRules: [(v: string) => !!v || 'Title is required'],
      dateRules: [
        (v: string) => !!v || 'Date is required',
        (v: string) => v >= new Date().toISOString().substr(0, 10) || 'Date cannot be in the past'
      ]
    }
  },
  methods: {
    selected_participants(a: any) {
      console.log(a)
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
        console.log(response.data.data)
        for (const employee of response.data.data) {
          this.teamMemberNames.push(employee.userInfo.displayName)
          this.teamLeaderIds.push(employee._id)
        }
        this.companyId = response.data.data[0].companyId
      } catch (error) {
        console.error(error)
      }
    },
    formatDate(date: string) {
      return new Date(date).toDateString()
    },
    openDialog() {
      this.isEditing = false
      this.showDialog = true
      this.newAppointment = {
        id: '',
        title: '',
        date: '',
        details: '',
        important: false,
        participants: []
      }
    },
    joiningRoom(appointment: Appointment) {
      this.selectedRoom.id = appointment.id
      console.log(this.selectedRoom.id)
      this.joinRoom = false
      this.conference = true
    },
    clearFields() {
      this.newAppointment = {
        id: '',
        title: '',
        date: '',
        details: '',
        important: false,
        participants: []
      }
      this.req_obj.participants = []
    },
    leavingRoom() {
      this.joinRoom = true
      this.conference = false
    },
    async saveAppointment() {
      this.isGenerating = true
      if (this.isEditing && this.editIndex !== null) {
        // Update existing appointment
        this.recentAppointments.splice(this.editIndex, 1, { ...this.newAppointment })
        //Integrate with backend
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        const url = await this.getRequestUrl()
        if (localStorage.getItem('currentCompany') !== null) {
          this.companyId = localStorage.getItem('currentCompany') as string
        }

        const data = {
          title: this.newAppointment.title,
          scheduledTime: new Date(this.newAppointment.date).toISOString(),
          details: this.newAppointment.details,
          participants: await this.selectTeamMembers(),
          companyId: this.companyId
        }
        const id = this.newAppointment.id
        console.log(data)
        await axios
          .patch(`${url}videoCalls/${id}`, data, config)
          .then((response) => {
            console.log('response: ', response)
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        // Add new appointment
        const appointment = { ...this.newAppointment }
        this.recentAppointments.push(appointment)
        //Integrate with backend
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        const url = await this.getRequestUrl()
        const data = {
          title: this.newAppointment.title,
          scheduledTime: new Date(this.newAppointment.date).toISOString(),
          details: this.newAppointment.details,
          participants: await this.selectTeamMembers(),
          companyId: this.companyId
        }
        console.log(data)
        await axios
          .post(`${url}videoCalls/create`, data, config)
          .then((response) => {
            console.log(response)
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Review Submitted'
            })
          })
          .catch((error) => {
            console.error(error)
          })
      }
      this.showDialog = false
      this.isGenerating = false
      this.clearFields()
    },
    editAppointment(appointment: Appointment) {
      this.newAppointment = appointment
      this.isEditing = true
      this.showDialog = true
      //populating the form with the selected appointment
    },
    cancel() {
      this.showDialog = false
      this.clearFields()
    },
    deleteAppointment(id: string) {
      this.recentAppointments = this.recentAppointments.filter(
        (appointment) => appointment.id !== id
      )
    },
    async selectTeamMembers() {
      for (const member of this.newAppointment.participants) {
        console.log(member)
        this.participants.push(this.teamLeaderIds[this.newAppointment.participants.indexOf(member)])
      }
      console.log(this.participants)
      return this.participants
    }
  },
  mounted() {
    this.getEmployees()
  }
})
</script>

<style scoped>
h1,
h2 {
  margin-bottom: 20px;
}
</style>
