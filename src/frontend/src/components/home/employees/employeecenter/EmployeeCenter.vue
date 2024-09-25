<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Employee Center</h2>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="bg-cardColor">
          <v-card-title>Employee Reports</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              :headers="tableHeaders"
              :items="employees"
              class="elevation-1 bg-cardColor"
              :row-props="getRowProps"
              dense
            >
              <template v-slot:[`item.currentJobAssignments`]="{ item }">
                <v-chip :color="chipColor(item.currentJobAssignments.length)">{{
                  item.currentJobAssignments.length
                }}</v-chip>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="primary" @click="viewReport(item)"
                  ><v-icon icon="fa: fa-solid fa-chart-simple" color="primary"></v-icon
                ></v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Summary Section -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card class="bg-cardColor">
          <v-card-title>{{ companyName }} Summary</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="bg-cardColor">
                  <v-card-title>Overall Job Performance</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <Chart
                      ref="overallJobPerformanceChart"
                      type="bar"
                      :data="overallJobPerformanceData"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="bg-cardColor">
                  <v-card-title>Overall Productivity</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <Chart
                      ref="overallProductivityChart"
                      type="line"
                      :data="overallProductivityData"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6">
                <v-card class="bg-cardColor">
                  <v-card-title>Average Satisfaction</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <Chart
                      ref="companySatisfactionChart"
                      type="doughnut"
                      :data="companySatisfactionData"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" lg="6">
                <v-card class="bg-cardColor">
                  <v-card-title>Average Project Completion</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <Chart ref="companyProjectsChart" type="pie" :data="companyProjectsData" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Report Dialog -->
    <v-dialog v-model="reportDialog" max-width="800px">
      <v-card class="bg-cardColor">
        <v-card-title>{{ selectedEmployee?.name }}'s Report</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="bg-cardColor">
                <v-card-title>Job Performance Report</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <Chart ref="jobPerformanceChart" type="bar" :data="jobPerformanceData" />
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="bg-cardColor">
                <v-card-title>Productivity Report</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <Chart ref="productivityChart" type="line" :data="productivityData" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="bg-cardColor">
                <v-card-title>Satisfaction Survey Results</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <Chart ref="satisfactionChart" type="doughnut" :data="satisfactionData" />
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="bg-cardColor">
                <v-card-title>Completed Projects</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <Chart ref="completedProjectsChart" type="pie" :data="completedProjectsData" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-container
            ><v-row
              ><v-col cols="12" lg="6" order="first" order-lg="last"
                ><v-btn color="success" variant="elevated" block @click="generatePdfReport">
                  <v-icon icon="fa: fa-solid fa-file" color="success"></v-icon>Generate PDF Report
                </v-btn></v-col
              ><v-col cols="12" lg="6" order="last" order-lg="first"
                ><v-btn @click="reportDialog = false" block color="error" variant="elevated"
                  ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Close</v-btn
                ></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import Chart from 'primevue/chart'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import axios from 'axios'
import { API_URL } from '@/main'

export default defineComponent({
  name: 'EmployeeCenter',
  components: {
    Chart
  },
  data() {
    return {
      companyName: '',
      employees: [],
      tableHeaders: [
        { title: 'Name', value: 'userInfo.displayName', key: 'userInfo.displayName' },
        { title: 'Role', value: 'roleName', key: 'role.roleName' },
        {
          title: 'Current Assignments',
          value: 'currentJobAssignments',
          key: 'currentJobAssignments'
        },
        { title: 'View Report', value: 'actions', sortable: false }
      ],
      selectedEmployee: null,
      reportDialog: false,
      jobPerformanceData: {},
      productivityData: {},
      satisfactionData: {},
      completedProjectsData: {},
      overallJobPerformanceData: {
        labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
        datasets: [
          {
            label: 'Company Completed Tasks',
            backgroundColor: '#42A5F5',
            data: [100, 150, 75, 120, 60] // Simulated data
          }
        ]
      },
      overallProductivityData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Company Hours Worked',
            borderColor: '#66BB6A',
            data: [500, 450, 600, 550], // Simulated data
            fill: false
          }
        ]
      },
      companySatisfactionData: {
        labels: ['Satisfaction', 'Engagement'],
        datasets: [
          {
            label: 'Company Satisfaction',
            data: [80, 70], // Simulated data
            backgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      },
      companyProjectsData: {
        labels: this.jobStatusLabels,
        datasets: [
          {
            label: 'Company Project Status',
            data: [50, 20], // Simulated data
            backgroundColor: ['#4BC0C0', '#FFCE56']
          }
        ]
      },
      employeeData: [],
      selectedItem: '',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      items: [],
      jobStatusLabels: []
    }
  },
  methods: {
    viewReport(employee) {
      this.selectedEmployee = employee
      this.generateEmployeeData(employee)
      this.reportDialog = true
    },
    generateEmployeeData(employee) {
      // Simulate dynamic data based on the selected employee
      this.jobPerformanceData = {
        labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
        datasets: [
          {
            label: `${employee.name}'s Completed Tasks`,
            backgroundColor: '#42A5F5',
            data: [12, 19, 3, 5, 2]
          }
        ]
      }
      this.productivityData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: `${employee.name}'s Hours Worked`,
            borderColor: '#66BB6A',
            data: [40, 35, 50, 45],
            fill: false
          }
        ]
      }
      this.satisfactionData = {
        labels: ['Satisfaction', 'Engagement'],
        datasets: [
          {
            label: `${employee.name}'s Satisfaction`,
            data: [85, 75],
            backgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      }
      this.completedProjectsData = {
        labels: this.jobStatusLabels,
        datasets: [
          {
            label: `${employee.name}'s Project Status`,
            data: [8, 3],
            backgroundColor: ['#4BC0C0', '#FFCE56']
          }
        ]
      }
    },
    getRowProps(item) {
      return {
        class: item % 2 ? 'bg-background' : ''
      }
    },
    chipColor(numAssignments) {
      if (numAssignments > 0) {
        return 'success'
      } else {
        return 'error'
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
        console.log(response.data.data[0].role)
        this.employees = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async setJobStatusLabels() {
      for (const item of this.items) {
        console.log(item.status)
        this.jobStatusLabels.push(item.status)
      }
      console.log(this.jobStatusLabels)
    },
    async getStatuses() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const res = await axios.get(
          `${API_URL}job/status/all/${localStorage.getItem('currentCompany')}`,
          config
        )
        this.items = res.data.data
        this.jobStatusLabels = this.items.map((item) => item.status)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    selectItem(item) {
      console.log(item)
      this.selectedItem = item
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async convertJobIdtoJobName(id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const res = await axios.get(`${API_URL}job/id/${id}`, config)
        return res.data.data.jobName
      } catch (error) {
        console.error(error)
      }
    },
    async generatePdfReport() {
      const pdf = new jsPDF()
      pdf.setFont('Arial', 'normal')
      pdf.setFontSize(12)
      pdf.text('Employee Report', 15, 10)
      pdf.setFontSize(10)
      pdf.text('Generated on: ' + new Date().toLocaleDateString(), 15, 20)
      pdf.setProperties({
        title: 'Employee Report',
        author: 'Your Company',
        subject: 'Employee Performance Report'
      })

      // Capture charts
      const jobPerformanceCanvas = await this.captureChart(this.$refs.jobPerformanceChart)
      pdf.addImage(jobPerformanceCanvas, 'PNG', 15, 15, 180, 80)

      const productivityCanvas = await this.captureChart(this.$refs.productivityChart)
      pdf.addPage()
      pdf.addImage(productivityCanvas, 'PNG', 15, 15, 180, 80)

      const satisfactionCanvas = await this.captureChart(this.$refs.satisfactionChart)
      pdf.addPage()
      pdf.addImage(satisfactionCanvas, 'PNG', 15, 15, 180, 80)

      const completedProjectsCanvas = await this.captureChart(this.$refs.completedProjectsChart)
      pdf.addPage()
      pdf.addImage(completedProjectsCanvas, 'PNG', 15, 15, 180, 80)

      // Save the PDF
      pdf.save(`${this.selectedEmployee?.name}-report.pdf`)
    },
    async captureChart(chartRef) {
      const canvas = await html2canvas(chartRef.$el.querySelector('canvas'))
      return canvas.toDataURL('image/png')
    }
  },
  mounted() {
    this.getStatuses()
    this.getEmployees()
    this.setJobStatusLabels(), (this.companyName = localStorage.getItem('currentCompanyName'))
  }
})
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
}
</style>
