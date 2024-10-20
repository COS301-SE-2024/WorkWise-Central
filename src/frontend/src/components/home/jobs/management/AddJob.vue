<template>
 <v-dialog persistent close-on-back :max-height="800" opacity="0.6" :max-width="900" v-model="jobDialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          rounded="md"
          class="text-none font-weight-regular hello"
          style="font-size: 20px; font-family: Nunito, sans-serif"
          text="Add Job"
          prepend-icon="mdi-briefcase-plus"
          variant="elevated"
          block
          color="secondary"
          v-bind="activatorProps"
        ></v-btn>
      </v-defaults-provider>
    </template>
    <v-card elevation="14" rounded="md" :max-height="800" :max-width="900">
      <v-card-title class="text-center">Job Details</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="validateForm">
          <v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-col>
                <label style="font-size: 14px; font-weight: lighter"
                  >Job Title
                  <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                </label>

                <v-text-field
                  :disabled="request_load"
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
                <label style="font-size: 14px; font-weight: lighter"
                  >Client <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                </label>

                <v-autocomplete
                  :disabled="request_load"
                  density="compact"
                  color="grey-lighten-4"
                  label="Choose the employee for whom the job must be complete"
                  rounded="md"
                  variant="solo"
                  :items="clientsArray"
                  item-value="id"
                  item-title="name"
                  v-model="req_obj.clientId"
                  @update:modelValue="updateClient"
                  required
                  :rules="employees_rules"
                  data-testid="client-select"
                ></v-autocomplete>

                <label style="font-size: 14px; font-weight: lighter"
                  >If it is a new client, create the employee first.
                  <label
                    style="color: rgb(0, 149, 246)"
                    @click="
                      () => {
                        clientDialogVisibility = true
                      }
                    "
                    >Add new client</label
                  ></label
                >
               <v-dialog persistent                   opacity="0.6"
                  v-model="clientDialogVisibility"
                  max-height="800"
                  max-width="600"
                >
                  <AddClient
                    :showDialog="clientDialogVisibility"
                    @close="clientDialogVisibility = false"
                  />
                </v-dialog>
              </v-col>
              <v-col>
                <label style="font-size: 14px; font-weight: lighter"
                  >Job description
                  <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                </label>

                <v-textarea
                  :disabled="request_load"
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

              <v-alert
                density="compact"
                text="End date cannot be before the start date."
                title="Date Warning"
                :model-value="date_error_alert"
                type="warning"
              ></v-alert>
              <v-alert
                density="compact"
                text="Dates was not fully set, check date, hours and minutes are set. "
                title="Date Warning"
                :model-value="date_validation_error_alert"
                type="warning"
              ></v-alert>
              <v-row>
                <v-col align="center" cols="12" md="6">
                  <v-date-picker
                    :disabled="request_load"
                    title="SELECT START DATE"
                    header="Start date of job"
                    border="md"
                    width="unset"
                    max-width="350"
                    v-model="startDate"
                    elevation="5"
                    required
                    :rules="startDateRule"
                    @update:modelValue="updateAllowedTimes"
                    data-testid="job-start-date-datepicker"
                    :min="minDate"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" md="6" align="center">
                  <v-time-picker
                    :disabled="request_load"
                    format="24hr"
                    :allowed-hours="allowedHours"
                    :allowed-minutes="allowedMinutes"
                    v-model="startTime"
                    data-testid="job-start-time-timepicker"
                  ></v-time-picker>
                </v-col>
                <v-col align="center" cols="12" md="6">
                  <v-date-picker
                    :disabled="request_load"
                    title="SELECT END DATE"
                    header="End date of job"
                    border="md"
                    width="unset"
                    max-width="350"
                    :rules="endDateRule"
                    v-model="endDate"
                    elevation="5"
                    required
                    @update:modelValue="updateAllowedTimesEnd"
                    data-testid="job-end-date-datepicker"
                    :min="minDate"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12" md="6" align="center">
                  <v-time-picker
                    :disabled="request_load"
                    :allowed-hours="allowedHours2"
                    :allowed-minutes="allowedMinutes2"
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
                    :disabled="request_load"
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
                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6">
                  <label style="font-size: 14px; font-weight: lighter">Status</label>

                  <v-select
                    :disabled="request_load"
                    :items="statusOptionsArray"
                    label="Select the status of the job"
                    chips
                    item-value="_id"
                    item-title="status"
                    v-model="req_obj.status"
                    required
                    color="primary"
                    variant="solo"
                    clearable
                    data-testid="status-select"
                  >
                  </v-select
                ></v-col>
                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6">
                  <label style="font-size: 14px; font-weight: lighter"
                    >Priority
                    <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                  </label>

                  <v-select
                    :disabled="request_load"
                    :items="priorityOptionsArray"
                    label="Select the priority level of this job"
                    chips
                    item-value="_id"
                    item-title="label"
                    v-model="req_obj.priorityTag"
                    required
                    color="primary"
                    @update:modelValue="updateEmployee"
                    variant="solo"
                    clearable
                    :rules="priorityRules"
                    data-testid="priority-select"
                  >
                    <!--                    <template #chip="{ item, index }">-->
                    <!--                      <v-chip :key="index" :color="item.colour" text-color="white">{{-->
                    <!--                        item.title-->
                    <!--                      }}</v-chip>-->
                    <!--                    </template>-->
                  </v-select></v-col
                >

                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6">
                  <label style="font-size: 14px; font-weight: lighter">Tags</label>

                  <v-select
                    :disabled="request_load"
                    :items="tagOptionsArray"
                    item-value="_id"
                    item-title="label"
                    v-model="req_obj.tags"
                    label="Select some tags you would like to assign to this job"
                    chips
                    multiple
                    required
                    color="primary"
                    @update:modelValue="updateTagsArray"
                    variant="solo"
                    clearable
                    data-testid="tags-multi-select"
                  >
                  </v-select
                ></v-col>
                <v-col>
                  <small class="text-caption">Cover Image</small>
                  <v-file-input
                    :disabled="request_load"
                    variant="solo"
                    accept="image/*"
                    width="100%"
                    placeholder="Cover image for job"
                    @change="handleImageUpload"
                    hint="Image size limit of  5MB"
                    persistent-hint
                    color="black"
                    rounded="md"
                    required
                    data-testid="company-logo-file-input"
                  ></v-file-input>
                </v-col>
              </v-row>

              <label style="font-size: 14px; font-weight: lighter"
                >Job address
                <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
              </label>

              <v-row>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter"
                    >Street
                    <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                  </label>
                  <v-text-field
                    :disabled="request_load"
                    density="compact"
                    color="primary"
                    placeholder="Street"
                    rounded="md"
                    v-model="req_obj.details.address.street"
                    variant="solo"
                    required
                    :rules="street_rules"
                    data-testid="street-field"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter"
                    >Suburb
                    <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                  </label>
                  <v-text-field
                    :disabled="request_load"
                    density="compact"
                    color="primary"
                    placeholder="Suburb"
                    rounded="md"
                    v-model="req_obj.details.address.suburb"
                    variant="solo"
                    required
                    :rules="suburb_rules"
                    data-testid="suburb-field"
                  ></v-text-field
                ></v-col>
                <v-col sm="6" cols="12">
                  <label style="font-size: 14px; font-weight: lighter"
                    >Province
                    <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                  </label>
                  <v-autocomplete
                    density="compact"
                    color="primary"
                    placeholder="Province"
                    rounded="md"
                    v-model="req_obj.details.address.province"
                    @update:model-value="hello"
                    :rules="province_rules"
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
                  <label style="font-size: 12px; font-weight: lighter"
                    >City/Town
                    <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                  </label>
                  <v-text-field
                    :disabled="request_load"
                    density="compact"
                    color="primary"
                    placeholder="City/Town"
                    rounded="md"
                    v-model="req_obj.details.address.city"
                    variant="solo"
                    required
                    :rules="city_rules"
                    data-testid="city-town-field"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="6">
                  <label style="font-size: 12px; font-weight: lighter"
                    >Postal Code
                    <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
                  </label>
                  <v-text-field
                    :disabled="request_load"
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
                    :disabled="request_load"
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
          <v-col cols="8" offset="2" align="center"> </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn
                :disabled="request_load"
                color="error"
                rounded="md"
                boarder="md"
                width="100%"
                height="35"
                variant="text"
                @click="close"
                data-testid="cancel-btn"
                ><v-icon icon="fa: fa-solid fa-cancel" color="error" start></v-icon>Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                color="success"
                rounded="md"
                @click="validateForm"
                boarder="md"
                width="100%"
                :disabled="!valid || request_load"
                height="35"
                variant="text"
                data-testid="create-btn"
                :loading="request_load"
                ><v-icon icon="fa: fa-solid fa-plus" color="success" start></v-icon>Create Job
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
import axios from 'axios'
import type {
  EmployeeJoined,
  EmployeeInformation,
  ClientInformation,
  JobTag,
  JobPriorityTag,
  JobStatuses
} from '../types'
import AddClient from '@/components/home/clients/management/AddClient.vue'
import { API_URL } from '@/main'

type JobDetails = {
  heading: string
  description: string
  address: {
    province: string
    street: string
    suburb: string
    city: string
    postalCode: string
    complex: string
  }
  startDate: string
  endDate: string
}

type Job = {
  companyId: string
  clientId: string
  assignedBy: string
  assignedEmployees: {
    employeeIds?: string[]
  }
  status?: string
  details: JobDetails
  tags?: string[]
  priorityTag?: string | null
  coverImage?: string
}

export default defineComponent({
  name: 'JobDetailsList',

  components: {
    AddClient
  },
  data() {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    return {
      click_create_employee: false,
      valid: false,
      selectedDate: '',
      selectedTime: '',
      request_load: false,
      clientDialogVisibility: false,
      minDate: new Date().toISOString().substr(0, 10),
      currentHour,
      currentMinute,
      allowedHours: ((hour: number) => true) as (hour: number) => boolean,
      allowedMinutes: ((minute: number) => true) as (minute: number) => boolean,
      allowedHours2: ((hour: number) => true) as (hour: number) => boolean,
      allowedMinutes2: ((minute: number) => true) as (minute: number) => boolean,
      isDarkMode: localStorage['theme'] !== 'false',
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      dark: '#2b2b2b',
      light: '#FFFFFF',
      job_title_rules: [
        (v: string) => !!v || 'Job title is required',
        (v: string) =>
          /^[A-Za-z\s]+$/.test(v) || 'Job title must be alphabetic characters and spaces only'
      ],
      province_rules: [(v: string) => !!v || 'Province is required'],
      street_rules: [(v: string) => !!v || 'Street is required'],
      suburb_rules: [(v: string) => !!v || 'Suburb is required'],
      city_rules: [(v: string) => !!v || 'City/Town is required'],
      postal_code_rules: [
        (v: string) => !!v || 'Postal code  is required',
        (value: string) => /^\d{4}$/.test(value) || 'Postal code must be 4 digits'
      ],
      employees_rules: [(v: string) => !!v || 'Client is required'],
      description_rules: [(v: string) => !!v || 'Description is required'],
      startDateRule: [(v: string) => !!v || 'Start date is required'],
      endDateRule: [(v: string) => !!v || 'End date is required'],
      priorityRules: [(v: string) => !!v || 'Priority tag is required'],
      employeesArray: [] as EmployeeInformation[],
      clientsArray: [] as ClientInformation[],
      time: '',
      startDate: null as string | null,
      startTime: '',
      endDate: null as string | null,
      endTime: '',
      createClientLoadClicked: false,
      priorityOptionsArray: [] as JobPriorityTag[],
      tagOptionsArray: [] as JobTag[],
      statusOptionsArray: [] as JobStatuses[],
      req_obj: {
        companyId: localStorage['currentCompany'],
        clientId: '',
        assignedBy: localStorage['employeeId'],
        assignedEmployees: {
          employeeIds: [] as string[]
        },
        //default job statuses ['Todo','In Progress','Awaiting Review','Done']
        status: '',
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
        },
        tags: [],
        priorityTag: null,
        coverImage: ''
      } as Job,
      jobDialog: false,
      date_error_alert: false,
      date_validation_error_alert: false
    }
  },
  watch: {
    startDate() {
      this.validateDates()
    },
    endDate() {
      this.validateDates()
    }
  },
  // computed: {
  //   selectedTags: {
  //     get(): JobTag[] {
  //       if (this.req_obj.tags != undefined)
  //         return this.req_obj.tags.map((value: string) =>
  //           this.tagOptionsArray.find((item: JobTag) => item._id === value)
  //         ) as JobTag[]
  //     },
  //     set(val: JobTag[]) {
  //       this.req_obj.tags = val.map((item) => item._id)
  //     }
  //   }
  // },
  methods: {
    showAddClientModal() {
      console.log('modal event')
      this.clientDialogVisibility = true
    },
    validateDates() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate)
        const end = new Date(this.endDate)

        if (end < start) {
          this.endDate = null
          this.date_error_alert = true
        } else {
          this.date_error_alert = false
        }
      }
    },
    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const file: File = target.files[0]
        const reader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === 'string') {
            this.req_obj.coverImage = e.target.result
          }
        }
        reader.readAsDataURL(file)
      }
    },
    updateAllowedTimes() {
      const isToday = this.startDate === this.minDate

      console.log('updateAllowedTimes')
      if (isToday) {
        this.allowedHours = (hour: number) => hour > this.currentHour
        this.allowedMinutes = (minute: number) => {
          return this.startTime
            ? minute > this.currentMinute ||
                parseInt(this.startTime.split(':')[0]) !== this.currentHour
            : true
        }
      } else {
        this.allowedHours = () => true
        this.allowedMinutes = () => true
      }
    },
    updateAllowedTimesEnd() {
      const isToday = this.endDate === this.minDate

      console.log('updateAllowedTimes')
      if (isToday) {
        this.allowedHours2 = (hour: number) => hour > this.currentHour
        this.allowedMinutes2 = (minute: number) => {
          return this.endTime
            ? minute > this.currentMinute ||
                parseInt(this.endTime.split(':')[0]) !== this.currentHour
            : true
        }
      } else {
        this.allowedHours2 = () => true
        this.allowedMinutes2 = () => true
      }
    },
    async validateForm() {
      const form = this.$refs.form as InstanceType<typeof HTMLFormElement>
      const validate = await (form as any).validate()

      this.req_obj.tags || delete this.req_obj.tags
      this.req_obj.priorityTag || delete this.req_obj.priorityTag
      this.req_obj.coverImage || delete this.req_obj.coverImage
      this.req_obj.assignedEmployees.employeeIds ||
        delete this.req_obj.assignedEmployees.employeeIds
      this.req_obj.status || delete this.req_obj.status

      if (validate) {
        const update = this.updateDates()
        console.log(this.req_obj)
        console.log(update)
        this.date_validation_error_alert = !update
        if (update) {
          await this.handleSubmission()
        }
      }
    },
    formatStartDateAndTime(date: Date, time: string) {
      const [hrs, min] = time.split(':').map(Number)
      date.setHours(hrs)
      date.setMinutes(min)
      console.log(date.toISOString())
      this.req_obj.details.startDate = date.toISOString()
    },
    formatEndDateAndTime(date: Date, time: string) {
      const [hrs, min] = time.split(':').map(Number)
      date.setHours(hrs)
      date.setMinutes(min)
      console.log(date.toISOString())
      this.req_obj.details.endDate = date.toISOString()
    },
    formatDate(d: Date) {
      const year = d.getFullYear()
      const month = `0${d.getMonth() + 1}`.slice(-2) // Add leading zero and slice last 2 digits
      const day = `0${d.getDate()}`.slice(-2) // Add leading zero and slice last 2 digits
      return `${year}-${month}-${day}`
    },
    async handleSubmission() {
      this.request_load = true

      console.log(this.req_obj)

      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      console.log('before the request')
      axios
        .post(API_URL + 'job/create', this.req_obj, config)
        .then((res) => {
          console.log('request has gone through')
          if (this.req_obj.assignedEmployees.employeeIds === undefined) {
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Job Added Successfully'
            })
          }
          axios
            .put(
              API_URL + 'job/employees',
              {
                employeeId: localStorage['employeeId'],
                employeesToAssignIds: this.req_obj.assignedEmployees.employeeIds,
                jobId: res.data.data._id
              },
              config
            )
            .then((res1) => {
              console.log(res1)
              console.log('The employees were assigned successfully')
              this.$toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Job Added Successfully'
              })
              this.jobDialog = false
              setTimeout(() => {
                this.request_load = false
                // window.location.reload()
                this.$emit('jobCreated')
              }, 1500)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Job not added' })
          console.log(error)
        })
      this.request_load = false
    },
    updateDates() {
      if (this.endDate && this.startDate && this.startTime && this.endTime) {
        this.formatStartDateAndTime(new Date(this.startDate), this.startTime)
        this.formatEndDateAndTime(new Date(this.endDate), this.endTime)
        console.log(this.req_obj.details.startDate)
        console.log(this.req_obj.details.endDate)
        return true
      }
      console.log('Dates were not set properly')
      return false
    },
    hello() {
      console.log(this.req_obj.details.address.province)
    },
    async loadClients() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: {
          currentEmployeeId: localStorage['employeeId']
        }
      }

      console.log(API_URL)
      axios
        .get(API_URL + `client/all/${localStorage['currentCompany']}`, config)
        .then((res) => {
          console.log(res)

          console.log(res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            if (
              res.data.data[i].details.firstName === undefined ||
              res.data.data[i].details.lastName === undefined
            )
              continue

            this.clientsArray.push({
              name: res.data.data[i].details.firstName + ' ' + res.data.data[i].details.lastName,
              id: res.data.data[i]._id
            })
          }
          console.log(this.clientsArray)
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
        },
        data: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }

      try {
        const employee_response = await axios.get(
          API_URL + `employee/detailed/all/${localStorage['employeeId']}`,
          config
        )

        let employee_all_data: EmployeeJoined[] = employee_response.data.data

        console.log(employee_all_data)

        let company_employee_arr: EmployeeInformation[] = []

        for (let i = 0; i < employee_all_data.length; i++) {
          if (employee_all_data[i].role !== undefined) {
            let company_employee: EmployeeInformation = {
              name:
                employee_all_data[i].userId.personalInfo.firstName +
                ' ' +
                employee_all_data[i].userId.personalInfo.surname +
                ' (' +
                employee_all_data[i].role.roleName +
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
    async loadPriorities() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const loaded_priorities_response = await axios.get(
          API_URL + `job/tags/p/${localStorage['currentCompany']}`,
          config
        )
        this.priorityOptionsArray = loaded_priorities_response.data.data
      } catch (err) {
        console.log('Error fetching data:', err)
      }
    },
    async loadTags() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const loaded_tags_response = await axios.get(
          API_URL + `job/tags/${localStorage['currentCompany']}`,
          config
        )
        this.tagOptionsArray = loaded_tags_response.data.data
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    async loadStatues() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const statuses_response = await axios.get(
          API_URL + `company/status/all/${localStorage['currentCompany']}`,
          config
        )
        this.statusOptionsArray = statuses_response.data.data.jobStatuses
        console.log(statuses_response.data)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    updateClient() {
      console.log(this.req_obj.clientId)
    },
    updateEmployee() {
      console.log(this.req_obj.priorityTag)
      console.log(this.req_obj.tags)
    },
    close() {
      this.jobDialog = false
    },
    updateTagsArray() {
      console.log(this.req_obj.tags)
    }
  },
  mounted: function () {
    this.loadClients()
    this.loadAssignableEmployees()
    this.loadPriorities()
    this.loadTags()
    this.loadStatues()
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
