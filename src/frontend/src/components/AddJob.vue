<template>
  <v-dialog max-height="800" max-width="900">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          rounded="md"
          class="text-none font-weight-regular hello"
          prepend-icon="mdi-briefcase"
          text="Add Job"
          variant="elevated"
          color="#5A82AF"
          v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      elevation="14"
      rounded="xl"
      max-height="800"
      max-width="900"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              Job Details
            </h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Job Title</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                label="Enter the title of the job"
                v-model="req_obj.details.heading"
                rounded="xl"
                variant="solo"
                :rules="job_title_rules"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client</small
              >
              <v-autocomplete
                density="compact"
                color="grey-lighten-4"
                label="Choose the client for whom the job must be complete"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                rounded="xl"
                variant="solo"
                v-model="req_obj.client_name"
                :items="clientsArray"
                required
              ></v-autocomplete>

              <small
                >If it is a new client, create the client first.
                <RouterLink to="/client-details" style="color: rgb(0, 149, 246)"
                  >Add new client</RouterLink
                ></small
              ></v-col
            >
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Job description</small
              >
              <v-textarea
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                placeholder="Enter the details of the job"
                rounded="xl"
                variant="solo"
                v-model="req_obj.details.description"
                required
              >
              </v-textarea>
            </v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Comment</small
              >
              <v-textarea
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                placeholder="Enter any additional comments here"
                rounded="xl"
                variant="solo"
                v-model="comment"
                @input="commentUpdate"
                required
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
                  :color="isdarkmode === false ? '#5A82AF' : 'none'"
                  elevation="5"
                  required
                  @update:modelValue="updateDates"
                  :theme="isdarkmode ? 'dark' : 'light'"
                ></v-date-picker>
              </v-col>
              <v-col align="center" cols="12" md="6">
                <v-date-picker
                  title="SELECT END DATE"
                  header="End date of job"
                  border="md"
                  width="unset"
                  max-width="350"
                  v-model="endDate"
                  :color="isdarkmode === false ? '#5A82AF' : 'none'"
                  elevation="5"
                  required
                  @update:modelValue="updateDates"
                  :theme="isdarkmode ? 'dark' : 'light'"
                ></v-date-picker>
              </v-col>
            </v-row>

            <small
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              class="text-caption"
              >Client address</small
            >
            <v-row>
              <v-col cols="12" sm="6"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Street"
                  rounded="xl"
                  v-model="req_obj.details.address.street"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Suburb"
                  rounded="xl"
                  v-model="req_obj.details.address.suburb"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="City"
                  rounded="xl"
                  v-model="req_obj.details.address.city"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Zip Code"
                  rounded="xl"
                  v-model="req_obj.details.address.postalCode"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>

              <v-col cols="12" sm="6"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Complex"
                  rounded="xl"
                  v-model="req_obj.details.address.complex"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="House number"
                  rounded="xl"
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
            color="#5A82AF"
            rounded="xl"
            type="submit"
            boarder="xl"
            width="60%"
            height="35"
            variant="elevated"
            >CREATE JOB</v-btn
          >
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

type CommentType = {
  date: string
  employeeId: string
  comment: string
}
export default defineComponent({
  name: 'JobDetailsList',
  props: ['isdarkmode'],
  data() {
    return {
      click_create_client: false,
      valid: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      job_title_rules: [
        (v: string) => !!v || 'Job title is required',
        (v: string) =>
          /^[A-Za-z\s]+$/.test(v) || 'Job title must be alphabetic characters and spaces only'
      ],
      clientsArray: [] as string[],
      time: '',
      startDate: null,
      endDate: null,
      comment: '',
      req_obj: {
        companyId: sessionStorage['currentCompany'],
        status: 'No Status',
        client_name: '',
        assignedBy: sessionStorage['id'],
        details: {
          heading: '',
          description: '',
          address: {
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
        clientFeedback: {
          jobRating: 0,
          customerServiceRating: 0,
          comments: ''
        },
        taskList: [],
        comments: [] as CommentType[]
      }
    }
  },
  methods: {
    commentUpdate() {
      let comment = {
        employeeId: sessionStorage['id'],
        comment: this.comment,
        date: toIsoString(new Date())
      }
      console.log(this.comment)
      this.req_obj.comments[0] = comment
    },
    handleSubmission() {
      if (this.startDate === null && this.endDate === null) {
        alert('start Date or end date is NULL')
        return
      }
      console.log(JSON.stringify(this.req_obj))
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      axios
        .post('http://localhost:3000/job/create', this.req_obj, config)
        .then((res) => {
          alert('Job Added Successfully added')
          console.log(res)
        })
        .catch((res) => {
          alert('Job NOT Added Successfully added')
          console.log(res)
        })
    },
    updateDates() {
      if (this.endDate && this.startDate) {
        this.req_obj.details.startDate = toIsoString(this.startDate)
        this.req_obj.details.endDate = toIsoString(this.endDate)

        console.log(this.req_obj.details.startDate)
        console.log(this.req_obj.details.endDate)
      }
    },
    loadClients() {
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      axios
        .get('http://localhost:3000/client/all', config)
        .then((res) => {
          console.log(res)

          res.data.data
          for (let i = 0; i < res.data.data.length; i++) {
            this.clientsArray.push(
              res.data.data[i].details.firstName && res.data.data[i].details.surname
                ? res.data.data[i].details.firstName + ' ' + res.data.data[i].details.surname
                : res.data.data[i].details.name ?? 'Unknown Name'
            )
          }
        })
        .catch((res) => {
          console.log(res)
        })
    }
  },
  mounted: function () {
    this.loadClients()
  }
})

function toIsoString(date: Date) {
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
