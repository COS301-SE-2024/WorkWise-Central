<template>
  <v-dialog
    max-height="800"
    max-width="900"
    :theme="isdarkmode === true ? 'dark' : 'light'"
    v-model="jobDialog"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          rounded="md"
          class="text-none font-weight-regular hello"
          style="font-size: 20px"
          text="Add Job"
          prepend-icon="mdi-briefcase-plus"
          variant="elevated"
          color="secondary"
          v-bind="activatorProps"
        ></v-btn>
      </v-defaults-provider>
    </template>
    <v-card
      elevation="14"
      rounded="md"
      max-height="800"
      max-width="900"
     
    >
      <v-card-title class="text-center">Job Details</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
          <v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-col>
                <label style="font-size: 14px; font-weight: lighter">Job Title*</label>

                <v-text-field
                 
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Enter the title of the job"
                  v-model="req_obj.details.heading"
                  rounded="md"
                  variant="solo"
                  :rules="job_title_rules"
                  required
                ></v-text-field
              ></v-col>
              <v-col>
                <label style="font-size: 14px; font-weight: lighter">Client</label>

                <v-autocomplete
                  density="compact"
                  color="grey-lighten-4"
                  label="Choose the employee for whom the job must be complete"
                 
                  rounded="md"
                  variant="solo"
                  v-model="req_obj.clientId"
                  :items="clientsArray"
                  item-value="id"
                  item-title="name"
                  @update:modelValue="updateClient"
                  required
                  :rules="employees_rules"
                ></v-autocomplete>

                <label style="font-size: 14px; font-weight: lighter"
                  >If it is a new employee, create the employee first.
                  <RouterLink to="/manager-employees-t" style="color: rgb(0, 149, 246)"
                    >Add new employee</RouterLink
                  ></label
                >
              </v-col>
              <v-col>
                <label style="font-size: 14px; font-weight: lighter">Job description</label>

                <v-textarea
                  
                  placeholder="Enter the details of the job"
                  rounded="md"
                  variant="solo"
                  v-model="req_obj.details.description"
                  :rules="description_rules"
                  required
                >
                </v-textarea>
              </v-col>
              <!--            <v-col>-->
              <!--              <small-->
              <!--                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"-->
              <!--                class="text-caption"-->
              <!--                >Comment</small-->
              <!--              >-->
              <!--              <v-textarea-->
              <!--                :theme="isdarkmode === true ? 'dark' : 'light'"-->
              <!--                placeholder="Enter any additional comments here"-->
              <!--                rounded="md"-->
              <!--                variant="solo"-->
              <!--                v-model="comment"-->
              <!--                @input="commentUpdate"-->
              <!--                required-->
              <!--              >-->
              <!--              </v-textarea>-->
              <!--            </v-col>-->

              <v-row>
                <v-col align="center" cols="12" md="6">
                  <v-date-picker
                    title="SELECT START DATE"
                    header="Start date of job"
                    border="md"
                    width="unset"
                    max-width="350"
                    v-model="startDate"
                    elevation="5"
                    required
                    @update:modelValue="updateDates"
                   
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" md="6" align="center">
                  <v-time-picker format="24hr"></v-time-picker>
                </v-col>
                <v-col align="center" cols="12" md="6">
                  <v-date-picker
                    title="SELECT END DATE"
                    header="End date of job"
                    border="md"
                    width="unset"
                    max-width="350"
                    v-model="endDate"
                   
                    elevation="5"
                    required
                    @update:modelValue="updateDates"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" md="6" align="center">
                  <v-time-picker format="24hr"></v-time-picker>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label style="font-size: 14px; font-weight: lighter">Assign Employees</label>

                  <v-select
                    v-model="req_obj.assignedEmployees.employeeIds"
                    :items="employeesArray"
                    item-value="employeeId"
                    item-title="name"
                    label="Select some employees you would like to assign to this job"
                    chips
                    
                    multiple
                    required
                    color="primary"
                    @update:modelValue="updateEmployee"
                    variant="solo"
                  ></v-select></v-col
              ></v-row>

              <label style="font-size: 14px; font-weight: lighter">Job address</label>

              <v-row>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">Street</label>
                  <v-text-field
                    
                    density="compact"
                    color="primary"
                    placeholder="Street"
                    rounded="md"
                    v-model="req_obj.details.address.street"
                    variant="solo"
                    required
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">Suburb</label>
                  <v-text-field
                    
                    density="compact"
                    color="primary"
                    placeholder="Suburb"
                    rounded="md"
                    v-model="req_obj.details.address.suburb"
                    variant="solo"
                    required
                  ></v-text-field
                ></v-col>
                <v-col sm="6" cols="12">
                  <label style="font-size: 14px; font-weight: lighter">Province</label>
                  <v-autocomplete
                    
                    density="compact"
                    color="primary"
                    placeholder="Province"
                    rounded="md"
                    type="houseNumber"
                    variant="solo"
                    :items="[
                      'Eastern Cape',
                      'Free State',
                      'Gauteng',
                      'KwaZulu-Natal',
                      'Limpopo',
                      'Mpumalanga',
                      'North West',
                      'Northern Cape',
                      'Western Cape'
                    ]"
                    required
                  ></v-autocomplete
                ></v-col>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">City</label>
                  <v-text-field
                   
                    density="compact"
                    color="primary"
                    placeholder="City"
                    rounded="md"
                    v-model="req_obj.details.address.city"
                    variant="solo"
                    required
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">Postal Code</label>
                  <v-text-field
                   
                    density="compact"
                    color="primary"
                    placeholder="Postal Code"
                    :rules="postal_code_rules"
                    rounded="md"
                    v-model="req_obj.details.address.postalCode"
                    variant="solo"
                    required
                  ></v-text-field
                ></v-col>

                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">Complex</label>
                  <v-text-field
                    
                    density="compact"
                    color="primary"
                    placeholder="Complex"
                    rounded="md"
                    v-model="req_obj.details.address.complex"
                    variant="solo"
                    required
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">House number</label>
                  <v-text-field
                   F
                    density="compact"
                    color="primary"
                    placeholder="House number"
                    rounded="md"
                    v-model="req_obj.details.address.houseNumber"
                    variant="solo"
                    required
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-col cols="8" offset="2" align="center">
            <v-btn
              color="success"
              rounded="md"
              type="submit"
              boarder="md"
              width="100%"
              height="35"
              variant="text"
              >Create Job</v-btn
            >
            <v-btn
              color="error"
              rounded="md"
              boarder="md"
              width="100%"
              height="35"
              variant="text"
              @click="close"
              >Cancel</v-btn
            >
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { type EmployeeJoined, type EmployeeInformation, type ClientInformation } from '../types'

export default defineComponent({
  name: 'JobDetailsList',

  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      click_create_employee: false,
      valid: false,
      isdarkmode: sessionStorage['theme'] !== 'false',
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      dark: '#2b2b2b',
      light: '#FFFFFF',
      job_title_rules: [
        (v: string) => !!v || 'Job title is required',
        (v: string) =>
          /^[A-Za-z\s]+$/.test(v) || 'Job title must be alphabetic characters and spaces only'
      ],
      postal_code_rules: [
        (v: string) => !!v || 'Postal code  is required',
        (value: string) => /^\d{4}$/.test(value) || 'Postal code must be 4 digits'
      ],
      employees_rules: [(v: string) => !!v || 'Client is required'],
      description_rules: [(v: string) => !!v || 'Description is required'],

      employeesArray: [] as EmployeeInformation[],
      clientsArray: [] as ClientInformation[],
      time: '',
      startDate: null,
      endDate: null,
      req_obj: {
        companyId: sessionStorage['currentCompany'],
        clientId: '',
        assignedBy: sessionStorage['id'],
        assignedEmployees: {
          employeeIds: [] as string[],
          teamId: ''
        },
        status: 'To do',
        details: {
          heading: '',
          description: '',
          address: {
            province: '',
            street: '',
            suburb: '',
            city: '',
            postalCode: '',
            complex: '',
            houseNumber: ''
          },
          startDate: '',
          endDate: ''
        },
        recordedDetails: {
          imagesTaken: [],
          inventoryUsed: []
        },
        employeeFeedback: {
          jobRating: 0,
          customerServiceRating: 0,
          comments: ''
        },
        taskList: [],
        comments: []
      },
      jobDialog: false
    }
  },
  methods: {
    handleSubmission() {
      console.log(this.req_obj)
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      axios
        .post('http://localhost:3000/job/create', this.req_obj, config)
        .then((res) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Job Added Successfully'
          })
          console.log(res)
        })
        .catch((res) => {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Job not added' })
          console.log(res)
        })
    },
    updateDates() {
      if (this.endDate && this.startDate) {
        this.req_obj.details.startDate = convertToISOStr(this.startDate)
        this.req_obj.details.endDate = convertToISOStr(this.endDate)

        console.log(this.req_obj.details.startDate)
        console.log(this.req_obj.details.endDate)
      }
    },
    async loadClients() {
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      axios
        .get(apiURL + 'client/all', config)
        .then((res) => {
          console.log(res)

          console.log(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].details.firstName === undefined) continue

            this.clientsArray.push({
              name: res.data.data[i].details.firstName + ' ' + res.data.data[i].details.lastName,
              id: res.data.data[i]._id
            })
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    async loadAssignableEmployees() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const employee_response = await axios.get(
          apiURL + `employee/joined/all/${sessionStorage['currentCompany']}`,
          config
        )

        let employee_all_data: EmployeeJoined[] = employee_response.data.data

        console.log(employee_all_data)

        let company_employee_arr: EmployeeInformation[] = []

        for (let i = 0; i < employee_all_data.length; i++) {
          if (employee_all_data[i].userId[0].personalInfo.address !== undefined) continue

          if (employee_all_data[i].roleId !== undefined) {
            let company_employee: EmployeeInformation = {
              name:
                employee_all_data[i].userId[0].personalInfo.firstName +
                ' ' +
                employee_all_data[i].userId[0].personalInfo.surname +
                ' (' +
                employee_all_data[i].roleId[0].roleName +
                ')',
              employeeId: employee_all_data[i]._id
            }

            company_employee_arr.push(company_employee)
          } else {
            let company_employee: EmployeeInformation = {
              name:
                employee_all_data[i].userId[0].personalInfo.firstName +
                ' ' +
                employee_all_data[i].userId[0].personalInfo.surname +
                ' (Unassigned Role)',
              employeeId: employee_all_data[i]._id
            }
            company_employee_arr.push(company_employee)
          }
        }
        console.log(company_employee_arr)
        this.employeesArray = company_employee_arr
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    async isLocalAvailable(localUrl: string) {
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
    updateClient() {
      console.log(this.req_obj.clientId)
    },
    updateEmployee() {
      console.log(this.req_obj.assignedEmployees.employeeIds)
    },
    close() {
      this.jobDialog = false
    }
  },
  mounted: function () {
    this.loadClients()
    this.loadAssignableEmployees()
  }
})

function convertToISOStr(date: Date) {
  let tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num: number) {
      return (num < 10 ? '0' : '') + num
    }

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    '.' +
    (date.getMilliseconds() < 100 ? '0' : '') +
    pad(date.getMilliseconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  )
}
</script>
<style></style>
