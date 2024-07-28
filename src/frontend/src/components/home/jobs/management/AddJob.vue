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
    <v-card elevation="14" rounded="md" max-height="800" max-width="900">
      <v-card-title class="text-center">Job Details</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="validateForm">
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
                  data-testid="job-title-field"
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
                  :items="clientsArray"
                  item-value="id"
                  item-title="name"
                  @update:modelValue="updateClient"
                  required
                  :rules="employees_rules"
                  data-testid="client-select"
                ></v-autocomplete>

                <label style="font-size: 14px; font-weight: lighter"
                  >If it is a new client, create the employee first.
                  <RouterLink to="/client-desk-view" style="color: rgb(0, 149, 246)"
                    >Add new client</RouterLink
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
                  data-testid="job-description-textarea"
                >
                </v-textarea>
              </v-col>

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
                    data-testid="job-start-date-datepicker"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" md="6" align="center">
                  <v-time-picker
                    format="24hr"
                    v-model="startTime"
                    data-testid="job-start-time-timepicker"
                  ></v-time-picker>
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
                    data-testid="job-end-date-datepicker"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" md="6" align="center">
                  <v-time-picker
                    format="24hr"
                    v-model="endTime"
                    data-testid="job-end-time-timepicker"
                  ></v-time-picker>
                </v-col>
              </v-row>
              <v-row>
                <v-col :cols="12">
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
                    data-testid="employee-multi-select"
                  ></v-select
                ></v-col>
                <v-col>
                  <label style="font-size: 14px; font-weight: lighter" :cols="6">Priority</label>

                  <v-select
                    :items="priorityOptionsArray"
                    label="Select the priority level of this job"
                    chips
                    required
                    color="primary"
                    @update:modelValue="updateEmployee"
                    variant="solo"
                    data-testid="priority-select"
                  ></v-select
                ></v-col>

                <v-col>
                  <label style="font-size: 14px; font-weight: lighter" :cols="6">Tags</label>

                  <v-select
                    :items="tagOptionsArray"
                    label="Select some tags you would like to assign to this job"
                    chips
                    multiple
                    required
                    color="primary"
                    @update:modelValue="updateEmployee"
                    variant="solo"
                    data-testid="tags-multi-select"
                  ></v-select
                ></v-col>
              </v-row>

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
                    data-testid="street-field"
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
                    data-testid="suburb-field"
                  ></v-text-field
                ></v-col>
                <v-col sm="6" cols="12">
                  <label style="font-size: 14px; font-weight: lighter">Province</label>
                  <v-autocomplete
                    density="compact"
                    color="primary"
                    placeholder="Province"
                    rounded="md"
                    v-model="req_obj.details.address.province"
                    @update:model-value="hello"
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
                    data-testid="province-autocomplete"
                    required
                  ></v-autocomplete
                ></v-col>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">City/Town</label>
                  <v-text-field
                    density="compact"
                    color="primary"
                    placeholder="City/Town"
                    rounded="md"
                    v-model="req_obj.details.address.city"
                    variant="solo"
                    required
                    data-testid="city-town-field"
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
                    data-testid="postal-code-field"
                  ></v-text-field
                ></v-col>

                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter">Complex/Building</label>
                  <v-text-field
                    density="compact"
                    color="primary"
                    placeholder="Complex"
                    rounded="md"
                    v-model="req_obj.details.address.complex"
                    variant="solo"
                    required
                    hint="Complex or Building Name, unit number or floor"
                    persistent-hint
                    data-testid="complex-field"
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
              data-testid="create-btn"
              >Create Job
            </v-btn>
            <v-btn
              color="error"
              rounded="md"
              boarder="md"
              width="100%"
              height="35"
              variant="text"
              @click="close"
              data-testid="cancel-btn"
              >Cancel
            </v-btn>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { EmployeeJoined, EmployeeInformation, ClientInformation } from '../types'

export default defineComponent({
  name: 'JobDetailsList',

  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      click_create_employee: false,
      valid: false,
      isdarkmode: localStorage['theme'] !== 'false',
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
      startTime: '',
      endDate: null,
      endTime: '',
      priorityOptionsArray: ['High', 'Medium', 'Low'],
      tagOptionsArray: [
        'Cleaning',
        'Landscaping',
        'Plumbing',
        'Electrical',
        'HVAC',
        'Pest Control',
        'Moving',
        'Delivery',
        'Courier',
        'Security',
        'Maintenance',
        'Repair',
        'Installation',
        'Janitorial',
        'Painting',
        'Carpentry',
        'Roofing',
        'Gardening',
        'Window Cleaning',
        'Flooring',
        'Carpet Cleaning',
        'Pool Cleaning',
        'Handyman',
        'Waste Removal',
        'Gutter Cleaning',
        'Pressure Washing',
        'Tree Trimming',
        'Snow Removal',
        'Lawn Care',
        'Irrigation',
        'Appliance Repair',
        'Drywall',
        'Masonry',
        'Fencing',
        'Paving',
        'Locksmith',
        'Home Staging',
        'Furniture Assembly',
        'Pest Inspection',
        'Chimney Sweep',
        'Duct Cleaning',
        'Tile Installation',
        'Cabinet Making',
        'Glass Repair',
        'Garage Door Repair',
        'Solar Panel Installation',
        'Insulation',
        'Septic Tank Cleaning',
        'Waterproofing',
        'Bathroom Remodeling',
        'Kitchen Remodeling',
        'Basement Remodeling',
        'Attic Remodeling',
        'Exterior Painting',
        'Interior Painting',
        'Fence Painting',
        'Deck Painting',
        'Deck Staining',
        'Fence Staining',
        'Driveway Sealing',
        'Siding Installation',
        'Siding Repair',
        'Home Theater Installation',
        'Smart Home Installation',
        'TV Mounting',
        'Internet Setup',
        'Networking',
        'Computer Repair',
        'Printer Repair',
        'Data Recovery',
        'Virus Removal',
        'Backup Solutions',
        'Software Installation',
        'Hardware Upgrade',
        'IT Support',
        'Tech Support',
        'WiFi Setup',
        'Cable Installation',
        'Satellite Installation',
        'Audio Installation',
        'Video Surveillance',
        'Alarm Systems',
        'Access Control',
        'Fire Alarm Installation',
        'Sprinkler Systems',
        'Emergency Lighting',
        'First Aid Training',
        'CPR Training',
        'Disaster Recovery',
        'Business Continuity',
        'Project Management',
        'Construction Management',
        'General Contracting',
        'Subcontracting',
        'Property Management',
        'Facility Management',
        'Real Estate Management',
        'Event Planning',
        'Catering',
        'Wedding Planning',
        'Birthday Planning',
        'Conference Planning',
        'Exhibition Planning',
        'Promotional Events',
        'Trade Shows',
        'Fundraisers',
        'Community Events',
        'Corporate Events',
        'Concerts',
        'Theater',
        'Tour Guide',
        'Travel Planning',
        'Hotel Booking',
        'Flight Booking',
        'Car Rental',
        'Bus Rental',
        'Limousine Service',
        'Shuttle Service',
        'Pet Sitting',
        'Dog Walking',
        'Pet Grooming',
        'Veterinary Services',
        'Pet Training',
        'Aquarium Services',
        'Horse Training',
        'Stable Management',
        'Landscaping Design',
        'Landscape Maintenance',
        'Tree Removal',
        'Stump Grinding',
        'Weed Control',
        'Fertilization',
        'Aeration',
        'Seeding',
        'Lawn Mowing',
        'Mulching',
        'Soil Testing',
        'Land Surveying',
        'Land Clearing',
        'Excavation',
        'Grading',
        'Drainage Solutions',
        'Retaining Walls',
        'Stone Work',
        'Water Features',
        'Irrigation Systems',
        'Lighting Installation',
        'Greenhouse Services',
        'Nursery Services',
        'Plant Delivery',
        'Soil Delivery',
        'Compost Delivery',
        'Firewood Delivery',
        'Junk Removal',
        'Recycling',
        'Hazardous Waste Removal',
        'E-Waste Removal',
        'Document Shredding',
        'Vehicle Removal',
        'Scrap Metal Removal',
        'Estate Cleanout',
        'Hoarding Cleanup',
        'Biohazard Cleanup',
        'Crime Scene Cleanup',
        'Water Damage Restoration',
        'Fire Damage Restoration',
        'Mold Remediation',
        'Storm Damage Repair',
        'Insurance Claims',
        'Legal Services',
        'Accounting',
        'Bookkeeping',
        'Tax Preparation',
        'Payroll Services',
        'HR Services',
        'Recruitment',
        'Staffing',
        'Training',
        'Consulting',
        'Marketing',
        'Advertising',
        'SEO Services',
        'Social Media Management',
        'Content Creation',
        'Graphic Design',
        'Web Design',
        'App Development',
        'Software Development',
        'Cloud Services',
        'Data Analytics',
        'Cybersecurity',
        'Compliance',
        'Auditing',
        'Risk Management',
        'Quality Assurance',
        'Customer Support',
        'Technical Support',
        'Virtual Assistant',
        'Call Center Services',
        'Telemarketing',
        'Sales Training',
        'Lead Generation',
        'Market Research',
        'Brand Development',
        'Public Relations',
        'Crisis Management',
        'Media Buying',
        'Video Production',
        'Photography',
        'Animation',
        'Copywriting',
        'Editing',
        'Proofreading',
        'Translation',
        'Transcription',
        'Interpretation',
        'Voice Over',
        'Podcasting',
        'Blogging',
        'Vlogging'
      ],
      req_obj: {
        companyId: localStorage['currentCompany'],
        // clientId: '',
        assignedBy: localStorage['employeeId'],
        assignedEmployees: {
          employeeIds: [] as string[]
        },
        //default job statuses ['Todo','In Progress','Awaiting Review','Done']
        status: 'Todo',
        details: {
          heading: '',
          description: '',
          address: {
            province: '',
            street: '',
            suburb: '',
            city: '',
            postalCode: '',
            complex: ''
          },
          startDate: '',
          endDate: ''
        }
      },
      jobDialog: false
    }
  },
  methods: {
    async validateForm() {
      if (this.startDate !== null && this.startTime !== '') {
        this.formatDateAndTime(this.startDate, this.startTime)
      }
      if (this.endDate !== null && this.endTime !== '') {
        this.formatDateAndTime(this.endDate, this.endTime)
      }
      await this.handleSubmission()
    },
    formatDateAndTime(date: Date, time: string) {
      const [hrs, min] = time.split(':').map(Number)
      date.setHours(hrs)
      date.setMinutes(min)
      console.log(date.toISOString())
      this.req_obj.details.startDate = date.toISOString()
    },
    async handleSubmission() {
      console.log(this.req_obj)
      const apiURL = await this.getRequestUrl()
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      axios
        .post(apiURL + 'job/create', this.req_obj, config)
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
    hello() {
      console.log(this.req_obj.details.address.province)
    },
    async loadClients() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
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
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const employee_response = await axios.get(
          apiURL + `employee/joined/all/${localStorage['currentCompany']}`,
          config
        )

        let employee_all_data: EmployeeJoined[] = employee_response.data.data

        console.log(employee_all_data)

        let company_employee_arr: EmployeeInformation[] = []

        for (let i = 0; i < employee_all_data.length; i++) {
          if (employee_all_data[i].roleId !== undefined) {
            let company_employee: EmployeeInformation = {
              name:
                employee_all_data[i].userId.personalInfo.firstName +
                ' ' +
                employee_all_data[i].userId.personalInfo.surname +
                ' (' +
                employee_all_data[i].roleId.roleName +
                ')',
              employeeId: employee_all_data[i]._id
            }

            company_employee_arr.push(company_employee)
          } else {
            let company_employee: EmployeeInformation = {
              name:
                employee_all_data[i].userId.personalInfo.firstName +
                ' ' +
                employee_all_data[i].userId.personalInfo.surname +
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
      // console.log(this.req_obj.clientId)
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
