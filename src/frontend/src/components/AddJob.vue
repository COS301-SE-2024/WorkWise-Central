<template>
  <v-dialog max-height="800" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="xl"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        text="CREATE JOB"
        variant="elevated"
        color="#5A82AF"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      elevation="14"
      rounded="xl"
      max-height="800"
      max-width="600"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-form ref="form" v-model="valid" @submit="handleSubmission">
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
                :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
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
                :items="[
                  'Josh Smith',
                  'Taylor Williams',
                  'Tom Hanks',
                  'Jennifer Lawrence',
                  'Brad Pitt',
                  'Scarlett Johansson',
                  'Leonardo DiCaprio',
                  'Emma Stone',
                  'Johnny Depp',
                  'Angelina Jolie',
                  'Robert Downey Jr.',
                  'Penélope Cruz',
                  'Chadwick Boseman',
                  'Kristen Bell'
                ]"
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
                :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
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
                :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
                class="text-caption"
                >Notes</small
              >
              <v-textarea
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                placeholder="Enter any additional notes here"
                rounded="xl"
                variant="solo"
                v-model="req_obj.details.notes"
                required
              >
              </v-textarea>
            </v-col>

            <v-col align="center">
              <v-date-picker
                title="SELECT DATE"
                header="Date of job"
                border="md"
                width="unset"
                max-width="350"
                :color="isdarkmode === false ? '#5A82AF' : 'none'"
                elevation="5"
                :v-model="req_obj.scheduledDateTime"
                required
                :theme="isdarkmode ? 'dark' : 'light'"
              ></v-date-picker>
            </v-col>

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
// import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
// import axios from "axios";
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

      req_obj: {
        clientId: '665b4cc2f3031b71eb6f2d0a',
        assignedBy: sessionStorage['id'],
        companyId: sessionStorage['currentCompany'],
        scheduledDateTime: '',
        status: 'Not Started',
        client_name: '',
        details: {
          heading: '',
          description: '',
          notes: '',
          address: {
            street: '',
            suburb: '',
            city: '',
            postalCode: '',
            complex: '',
            houseNumber: ''
          }
        }
      }
    }
  },
  methods: {
    handleSubmission() {
      alert('Job Successfully added')
      // axios
      //     .post('http://localhost:3000/client/create', this.req_obj)
      //     .then((res) => {
      //       console.log(res)
      //     })
      //     .catch((res) => {
      //       console.log(res)
      //     })
    }
  }
})
</script>
<style scope>
.hello {
  color: white;
  background-color: #5a82af;
}
</style>
