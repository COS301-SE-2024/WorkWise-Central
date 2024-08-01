<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-5">
          <v-card-title>Recently Visited Clients</v-card-title>
          <h6 class="bg-cardColor pa-5 ma-0">
            Here are the clients that have been recently visited and the jobs requested.
          </h6>
          <v-data-table
            :headers="recentClientsHeaders"
            :items="recentClients"
            class="elevation-1 bg-cardColor"
            :row-props="getRowProps"
            :header-props="{ class: 'bg-background h6' }"
          ></v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Upcoming Appointments</v-card-title>
          <h6 class="bg-cardColor pa-5 ma-0">
            Here are the upcoming appointments for our employees.
          </h6>
          <v-data-table
            :headers="appointmentsHeaders"
            :items="upcomingAppointments"
            class="elevation-1 bg-cardColor"
            :row-props="getRowProps"
            :header-props="{ class: 'bg-background h6' }"
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
        { title: 'Client Name', value: 'name' },
        { title: 'Job Requested', value: 'jobRequested' },
        { title: 'Job Status', value: 'jobStatus' }
      ],
      appointmentsHeaders: [
        { title: 'Client Name', value: 'clientName', key: 'clientName' },
        { title: 'Employee Name', value: 'employeeName', key: 'employeeName' },
        { title: 'Job', value: 'job', key: 'job' },
        { title: 'Appointment Date', value: 'appointmentDate', key: 'appointmentDate' }
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
  },
  methods: {
    getRowProps(item: number) {
      return {
        class: item % 2 ? 'bg-warning' : ''
      }
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
