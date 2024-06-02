<template>
  <v-dialog max-width="500" height="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        color="black"
        text="JobDetails"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      elevation="14"
      rounded="xl"
      width="500"
      height="800"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Job Details
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-form ref="form" v-model="valid">
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
                label="Enter the details of the job"
                rounded="xl"
                variant="solo"
                v-model="req_obj.job_description"
                required
              >
              </v-textarea>
            </v-col>
            <v-col align="center">
              <v-date-picker
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                title="SELECT DATE"
                header="Date of job"
                border="md"
                :color="isdarkmode === true ? modal_dark_theme_color : 'blue'"
                elevation="5"
                :v-model="req_obj.job_date"
                required
              ></v-date-picker>
            </v-col>

            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
                class="text-caption"
                >Job address</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                label="Enter the clients address"
                type="number"
                rounded="xl"
                :v-model="req_obj.job_address"
                variant="solo"
              ></v-text-field
            ></v-col>
          </v-form>
        </v-col>
        <v-col cols="8" offset="2" align="center">
          <v-btn
            text
            rounded="xl"
            boarder="xl"
            width="60%"
            height="35"
            variant="elevated"
            color="blue-accent-2"
            >CREATE JOB</v-btn
          >
        </v-col>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
// import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'JobDetailsList',
  props: [],
  data() {
    return {
      click_create_client: false,
      isdarkmode: false, //this should be a prop thats taken in from the user to determin if the modal shoud also be in darkmode or not
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',

      req_obj: {
        client_name: '',
        job_description: '',
        job_date: '',
        job_address: ''
      }
    }
  },
  methods: {
    flick() {}
  }
}
</script>

<style></style>
