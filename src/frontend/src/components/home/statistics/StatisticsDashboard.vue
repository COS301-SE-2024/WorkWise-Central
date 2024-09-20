<template>
  <v-container fluid fill-height>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Statistics Dashboard</h2>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card
          height="auto"
          class="pa-16 ma-0 bg-background"
          rounded="md"
          border="md"
          elevation="0"
        >
          <v-tabs v-model="activeTab" fixed-tabs bg-color="secondary" rounded="md">
            <v-tab v-for="tab in tabs" :key="tab" @click="changeTab(tab)">{{ tab }}</v-tab>
            <v-spacer></v-spacer>
          </v-tabs>
          <v-spacer></v-spacer>
          <v-tabs-items v-model="activeTab">
            <!-- Recent Jobs Completed Chart -->
            <v-tab-item v-if="currentTab === 'Client Breakdown'">
              <v-card border="" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-briefcase mr-2"></v-icon>
                  {{ currentTab }}
                </v-card-title>
                <v-card-text>
                  <v-data-table :items="clientDetails" :headers="headers" class="bg-background">
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-menu max-width="500px">
                        <template v-slot:activator="{ props }">
                          <v-btn rounded="xl" variant="plain" v-bind="props">
                            <v-icon color="primary">mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            ><v-btn
                              ><v-icon icon="fa: fa-solid fa-chart-simple"></v-icon>View
                              Breakdown</v-btn
                            ></v-list-item
                          >
                        </v-list>
                      </v-menu>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
              <v-card>
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-briefcase mr-2"></v-icon>
                  {{ currentTab }}
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="bar"
                    :data="recentJobsChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Most Active Employees Chart -->
            <v-tab-item v-if="currentTab === 'Employee Breakdown'">
              <v-card border="md" rounded="md">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-user-friends mr-2"></v-icon>
                  {{ currentTab }}
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="polarArea"
                    :data="activeEmployeesChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Hours Worked Chart -->
            <v-tab-item v-if="currentTab === 'Job Breakdown'">
              <v-card border="md" rounded="md" height="700px">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-clock mr-2"></v-icon>
                  {{ currentTab }}
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="line"
                    :data="hoursWorkedChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Upcoming Appointments Chart -->
            <v-tab-item v-if="currentTab === 'Inventory Breakdown'">
              <v-card border="md" rounded="md" height="700px">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-calendar-alt mr-2"></v-icon>
                  {{ currentTab }}
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="doughnut"
                    :data="upcomingAppointmentsChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Team Breakdown Chart -->
            <v-tab-item v-if="currentTab === 'Team Breakdown'">
              <v-card border="md" rounded="md" height="700px">
                <v-card-title>
                  <v-icon icon="fa: fa-solid fa-users mr-2"></v-icon>
                  {{ currentTab }}
                </v-card-title>
                <v-card-text>
                  <Chart
                    type="polarArea"
                    :data="teamBreakdownChartData"
                    :options="chartOptions"
                    height="600px"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Chart from 'primevue/chart'
import Toast from 'primevue/toast'
export default defineComponent({
  name: 'StatisticsDashboard',
  components: {
    Chart,
    Toast
  },
  data() {
    return {
      activeTab: 0,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      currentTab: 'Client Breakdown',
      tabs: [
        'Client Breakdown',
        'Employee Breakdown',
        'Job Breakdown',
        'Inventory Breakdown',
        'Team Breakdown'
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      headers: [
        {
          title: 'First Name',
          align: 'start',
          sortable: true,
          value: 'firstName',
          key: 'firstName',
          class: 'text-h3'
        },
        {
          title: 'Surname',
          align: 'start',
          sortable: true,
          value: 'lastName',
          key: 'lastName',
          class: 'h3'
        },
        {
          title: 'Phone',
          value: 'contactInfo.phoneNumber',
          key: 'contactInfo.phoneNumber',
          class: 'h3'
        },
        {
          title: 'Email',
          value: 'contactInfo.email',
          key: 'contactInfo.email',
          class: 'h3'
        },
        {
          title: 'Address',
          value: 'address.street',
          key: 'address.street',
          class: 'h3'
        },
        { title: '', value: 'actions', key: 'actions', sortable: false, class: 'h3' }
      ],
      clientDetails: [],
      clientIds: [],
      detailedJobData: [] as any,
      inventoryItems: [],
      employees: [],
      recentJobsChartData: {
        labels: ['Client 1', 'Client 2', 'Client 3'],
        datasets: [
          {
            label: 'Jobs Completed',
            backgroundColor: '#42A5F5',
            data: [10, 15, 8]
          }
        ]
      },
      activeJobs: [],
      averageRating: [],
      activeEmployeesChartData: {
        labels: ['Alice', 'Bob', 'Charlie'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      hoursWorkedChartData: {
        labels: ['Alice', 'Bob', 'Charlie'],
        datasets: [
          {
            label: 'Hours Worked',
            backgroundColor: '#42A5F5',
            data: [40, 35, 30]
          }
        ]
      },
      upcomingAppointmentsChartData: {
        labels: ['Client Meeting', 'Team Sync', 'Project Deadline'],
        datasets: [
          {
            data: [5, 7, 9],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
          }
        ]
      },
      teamBreakdownChartData: {
        labels: ['Development', 'Marketing', 'Support'],
        datasets: [
          {
            label: 'Team Members',
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            data: [10, 8, 6]
          }
        ]
      }
    }
  },
  methods: {
    changeTab(tab: string) {
      this.currentTab = tab
    },
    async getClients() {
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
      axios
        .get(`${apiURL}client/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response.data)
          this.clients = response.data.data
          console.log(this.clients)

          for (let i = 0; i < this.clients.length; i++) {
            this.clientIds[i] = this.clients[i]._id
            console.log(this.clientIds[i])
            this.clientDetails[i] = this.clients[i].details
            console.log(this.clientDetails[i])
          }
          console.log(this.clientDetails)
        })
        .catch((error) => {
          console.error('Failed to fetch clients:', error)
        })
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async getInventoryItems() {
      // Fetch inventory items from the backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployee: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}inventory/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        this.inventoryItems = response.data.data
      } catch (error) {
        tea
        console.error(error)
      }
    },
    async getTeams() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}team/detailed/all/${localStorage.getItem('currentCompany')}`,
          config
        )
        console.log(response.data.data)
        this.teamItems = response.data.data
        this.teamLeaderId = response.data.data.teamLeaderId
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
        console.log(response.data.data)
        this.employees = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchData() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiUrl = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiUrl}job/all/company/detailed/${localStorage.getItem('currentCompany')}`,
          config
        )
        if (response.status > 199 && response.status < 300) {
          detailedJobData = response.data.data
          console.log('Detailed Job Data', detailedJobData.value)
          console.log(response)
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Fetch Data Error',
            detail: 'Failed to fetch data',
            life: 3000
          })
        }
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Fetch Data Error',
          detail: 'Failed to fetch data',
          life: 3000
        })
      }
    }
  },
  mounted() {
    this.getClients()
    this.getInventoryItems()
    this.getTeams()
    this.fetchData()
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
