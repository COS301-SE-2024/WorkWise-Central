<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Meetings</h2>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" class="text-center">
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
            color="success"
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
                    ><v-btn color="primary" @click="editAppointment(appointment.id)" block
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
                  item-value="employeeId"
                  item-title="name"
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
              <v-btn color="error" @click="showDialog = false" block>
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
interface Appointment {
  id: string
  title: string
  date: string
  details: string
  important: boolean
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
      editIndex: 0,
      valid: false,
      isGenerating: false,
      newAppointment: {
        id: '',
        title: '',
        date: '',
        details: '',
        important: false
      },
      recentAppointments: [
        {
          id: '1',
          title: 'Meeting with John Doe',
          date: '2021-10-15',
          details: 'Discuss project timeline and deliverables'
        },
        {
          id: '2',
          title: 'Dentist Appointment',
          date: '2021-10-20',
          details: 'Annual checkup and cleaning'
        },
        {
          id: '3',
          title: 'Team Standup Meeting',
          date: '2021-10-22',
          details: 'Daily sync with the development team'
        },
        {
          id: '4',
          title: 'Project Review with Clients',
          date: '2021-10-23',
          details: 'Review milestones and gather feedback'
        },
        {
          id: '5',
          title: 'Doctor Appointment',
          date: '2021-10-24',
          details: 'Follow-up on health checkup results'
        },
        {
          id: '6',
          title: 'Lunch with Partner',
          date: '2021-10-26',
          details: 'Discuss partnership opportunities'
        }
      ],

      titleRules: [(v: string) => !!v || 'Title is required'],
      dateRules: [
        (v: string) => !!v || 'Date is required',
        (v: string) => v <= new Date().toISOString().substr(0, 10) || 'Date cannot be in the past',
        (v: string) => v >= new Date().toISOString().substr(0, 10) || 'Date cannot be in the future'
      ]
    }
  },
  methods: {
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
        important: false
      }
    },
    joiningRoom(appointment: Appointment) {
      this.selectedRoom.id = appointment.id
      console.log(this.selectedRoom.id)
      this.joinRoom = false
      this.conference = true
    },
    leavingRoom() {
      this.joinRoom = true
      this.conference = false
    },
    saveAppointment() {
      this.isGenerating = true
      if (this.isEditing && this.editIndex !== null) {
        // Update existing appointment
        this.recentAppointments.splice(this.editIndex, 1, { ...this.newAppointment })
      } else {
        // Add new appointment
        const newId = this.recentAppointments.length + 1
        const appointment = { ...this.newAppointment}
        this.recentAppointments.push(appointment)
      }
      this.showDialog = false
      this.isGenerating = false
    },
    editAppointment(appointment: string) {
      this.isEditing = true
      this.showDialog = true
    },
    deleteAppointment(id: string) {
      this.recentAppointments = this.recentAppointments.filter(
        (appointment) => appointment.id !== id
      )
    }
  }
})
</script>

<style scoped>
h1,
h2 {
  margin-bottom: 20px;
}
</style>
