<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Meetings</h2>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-btn color="primary" @click="openDialog" variant="outlined"> Create New Meeting </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <!-- Recently Created Appointments Section -->
      <v-col cols="12" lg="6" order="last" order-lg="first">
        <h3>Recently Created Meetings</h3>
        <v-card
          v-for="appointment in recentAppointments"
          :key="appointment.id"
          class="mb-4"
          color="success"
        >
          <v-card-title>{{ appointment.title }}</v-card-title>
          <v-card-subtitle class="bg-cardColor">{{ formatDate(appointment.date) }}</v-card-subtitle>
          <v-card-text>{{ appointment.details }}</v-card-text>
          <v-card-actions class="bg-cardColor">
            <v-btn color="primary" @click="editAppointment(appointment.id)"
              ><v-icon icon="fa:fa-solid fa-pencil"></v-icon
            ></v-btn>
            <v-btn color="error" @click="deleteAppointment(appointment.id)"
              ><v-icon icon="fa:fa-solid fa-trash"></v-icon
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Most Important Appointments Section -->
      <v-col cols="12" lg="6" order="first" order-lg="last">
        <h3>Most Important Meetings</h3>
        <v-card
          v-for="appointment in importantAppointments"
          :key="appointment.id"
          class="mb-4"
          color="warning"
        >
          <v-card-title>{{ appointment.title }}</v-card-title>
          <v-card-subtitle class="bg-cardColor">{{ formatDate(appointment.date) }}</v-card-subtitle>
          <v-card-text>{{ appointment.details }}</v-card-text>
          <v-card-actions class="bg-cardColor">
            <v-btn color="primary" @click="editAppointment(appointment.id)"
              ><v-icon icon="fa:fa-solid fa-pencil"></v-icon
            ></v-btn>
            <v-btn color="error" @click="deleteAppointment(appointment.id)"
              ><v-icon icon="fa:fa-solid fa-trash"></v-icon
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog for Creating/Editing Appointment -->
  <v-dialog v-model="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{
          isEditing ? 'Edit Appointment' : 'Create New Appointment'
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newAppointment.title"
                  label="Title"
                  :rules="titleRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newAppointment.date"
                  label="Date"
                  type="date"
                  :rules="dateRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newAppointment.details" label="Details"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox v-model="newAppointment.important" label="Important"></v-checkbox>
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
interface Appointment {
  id: number
  title: string
  date: string
  details: string
  important: boolean
}
export default defineComponent({
  name: 'AppointmentsPage',
  data() {
    return {
      showDialog: false,
      isEditing: false,
      editIndex: 0,
      valid: false,
      isGenerating: false,
      newAppointment: {
        id: 0,
        title: '',
        date: '',
        details: '',
        important: false
      },
      recentAppointments: [
        {
          id: 1,
          title: 'Meeting with John Doe',
          date: '2021-10-15',
          details: 'Discuss project timeline and deliverables'
        },
        {
          id: 2,
          title: 'Dentist Appointment',
          date: '2021-10-20',
          details: 'Annual checkup and cleaning'
        },
        {
          id: 3,
          title: 'Team Standup Meeting',
          date: '2021-10-22',
          details: 'Daily sync with the development team'
        },
        {
          id: 4,
          title: 'Project Review with Clients',
          date: '2021-10-23',
          details: 'Review milestones and gather feedback'
        },
        {
          id: 5,
          title: 'Doctor Appointment',
          date: '2021-10-24',
          details: 'Follow-up on health checkup results'
        },
        {
          id: 6,
          title: 'Lunch with Partner',
          date: '2021-10-26',
          details: 'Discuss partnership opportunities'
        }
      ],

      importantAppointments: [
        {
          id: 7,
          title: 'Client Presentation',
          date: '2021-10-25',
          details: 'Present new marketing strategy'
        },
        {
          id: 8,
          title: 'Quarterly Budget Meeting',
          date: '2021-10-28',
          details: 'Discuss and finalize the quarterly budget'
        },
        {
          id: 9,
          title: 'Board Meeting',
          date: '2021-10-30',
          details: 'Present annual report and future plans'
        },
        {
          id: 10,
          title: 'Strategy Planning Session',
          date: '2021-11-01',
          details: 'Plan next quarter’s goals and initiatives'
        },
        {
          id: 11,
          title: 'Investor Meeting',
          date: '2021-11-05',
          details: 'Discuss funding and growth strategies'
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
        id: 0,
        title: '',
        date: '',
        details: '',
        important: false
      }
    },
    saveAppointment() {
      this.isGenerating = true
      if (this.isEditing && this.editIndex !== null) {
        // Update existing appointment
        this.recentAppointments.splice(this.editIndex, 1, { ...this.newAppointment })
        this.updateImportantAppointments(this.newAppointment)
      } else {
        // Add new appointment
        const newId = this.recentAppointments.length + 1
        const appointment = { ...this.newAppointment, id: newId }
        this.recentAppointments.push(appointment)
        if (appointment.important) {
          this.importantAppointments.push(appointment)
        }
      }
      this.showDialog = false
      this.isGenerating = false
    },
    editAppointment(appointment: number) {
      this.isEditing = true
      this.showDialog = true
    },
    deleteAppointment(id: number) {
      this.recentAppointments = this.recentAppointments.filter(
        (appointment) => appointment.id !== id
      )
      this.importantAppointments = this.importantAppointments.filter(
        (appointment) => appointment.id !== id
      )
    },
    updateImportantAppointments(appointment: Appointment) {
      this.isGenerating = true
      const index = this.importantAppointments.findIndex((a) => a.id === appointment.id)
      if (appointment.important && index === -1) {
        this.importantAppointments.push(appointment)
      } else if (!appointment.important && index !== -1) {
        this.importantAppointments.splice(index, 1)
      } else if (index !== -1) {
        this.importantAppointments.splice(index, 1, appointment)
      }
      this.isGenerating = false
      this.showDialog = false
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
