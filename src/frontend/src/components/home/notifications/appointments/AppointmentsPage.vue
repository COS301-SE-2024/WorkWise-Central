<template>
  <v-container
    ><v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Appointments</h2> </v-col
      ><v-divider></v-divider>
      <v-col cols="12">
        <v-btn color="primary" @click="showDialog = true" variant="outlined">
          Create New Appointment</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <!-- Recently Created Appointments Section -->
      <v-col cols="12" lg="6" order="last" order-lg="first">
        <h3>Recently Created Appointments</h3>
        <v-card
          v-for="appointment in recentAppointments"
          :key="appointment.id"
          class="mb-4"
          color="success"
        >
          <v-card-title>{{ appointment.title }}</v-card-title>
          <v-card-subtitle>{{ formatDate(appointment.date) }}</v-card-subtitle>
          <v-card-text>{{ appointment.details }}</v-card-text>
        </v-card>
      </v-col>

      <!-- Most Important Appointments Section -->
      <v-col cols="12" lg="6" order="first" order-lg="last">
        <h3>Most Important Appointments</h3>
        <v-card
          v-for="appointment in importantAppointments"
          :key="appointment.id"
          class="mb-4"
          color="warning"
        >
          <v-card-title>{{ appointment.title }}</v-card-title>
          <v-card-subtitle>{{ formatDate(appointment.date) }}</v-card-subtitle>
          <v-card-text>{{ appointment.details }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog for Creating New Appointment -->
  <v-dialog v-model="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create New Appointment</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newAppointment.title"
                label="Title"
                :rules="titleRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newAppointment.date"
                label="Date"
                type="date"
                :rules="dateRules"
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
      </v-card-text>
      <v-card-actions>
        <v-container
          ><v-row
            ><v-col cols="12" lg="6">
              <v-btn color="error" @click="showDialog = false" block
                ><v-icon icon="fa: fa-solid fa-cancel" color="error" start></v-icon>Cancel</v-btn
              ></v-col
            >
            <v-col cols="12" lg="6">
              <v-btn color="success" @click="addAppointment" block
                ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success" start></v-icon
                >Save</v-btn
              ></v-col
            >
          </v-row></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppointmentsPage',
  data() {
    return {
      showDialog: false,
      newAppointment: {
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
        }
      ],
      importantAppointments: [
        {
          id: 3,
          title: 'Client Presentation',
          date: '2021-10-25',
          details: 'Present new marketing strategy'
        }
      ],
      titleRules: [(v: string) => !!v || 'Title is required'],
      dateRules: [(v: string) => !!v || 'Date is required']
    }
  },
  methods: {
    formatDate(date: string) {
      return new Date(date).toDateString()
    },
    addAppointment() {
      this.recentAppointments.push({
        ...this.newAppointment,
        id: this.recentAppointments.length + 1
      })
      if (this.newAppointment.important) {
        this.importantAppointments.push({
          ...this.newAppointment,
          id: this.importantAppointments.length + 1
        })
      }
      this.newAppointment = {
        title: '',
        date: '',
        details: '',
        important: false
      }
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
