<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-5">
          <v-card-title>Recently Visited Clients</v-card-title>
          <v-card-subtitle
            >Here are the clients that have been recently visited and the jobs
            requested.</v-card-subtitle
          >
          <v-data-table
            :headers="recentClientsHeaders"
            :items="recentClients"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Upcoming Appointments</v-card-title>
          <v-card-subtitle>Here are the upcoming appointments for our employees.</v-card-subtitle>
          <v-data-table
            :headers="appointmentsHeaders"
            :items="upcomingAppointments"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Client {
  name: string
  jobRequested: string
  jobStatus: string
}

interface Appointment {
  clientName: string
  employeeName: string
  job: string
  appointmentDate: string
}

export default defineComponent({
  data() {
    return {
      recentClientsHeaders: [
        { text: 'Client Name', value: 'name' },
        { text: 'Job Requested', value: 'jobRequested' },
        { text: 'Job Status', value: 'jobStatus' }
      ],
      appointmentsHeaders: [
        { text: 'Client Name', value: 'clientName' },
        { text: 'Employee Name', value: 'employeeName' },
        { text: 'Job', value: 'job' },
        { text: 'Appointment Date', value: 'appointmentDate' }
      ],
      recentClients: [
        {
          name: 'Alice Brown',
          jobRequested: 'Plumbing',
          jobStatus: 'Completed'
        },
        {
          name: 'Bob Smith',
          jobRequested: 'Electrical',
          jobStatus: 'In Progress'
        }
        // Add more recent clients here
      ] as Client[],
      upcomingAppointments: [
        {
          clientName: 'Charlie Davis',
          employeeName: 'John Doe',
          job: 'Carpentry',
          appointmentDate: '2024-08-05'
        },
        {
          clientName: 'Diana Evans',
          employeeName: 'Jane Smith',
          job: 'Painting',
          appointmentDate: '2024-08-06'
        }
        // Add more upcoming appointments here
      ] as Appointment[]
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
