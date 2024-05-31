<template>
  <v-dialog max-width="500" height="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        color="black"
        text="CONTINUE"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet elevation="14" rounded="xl" width="500" height="800">
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
              <small class="text-caption">Client</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Choose the client for whom the job must be complete"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
              ><small
                >If it is a new client, create the client first.
                <RouterLink to="/client-details" style="color: rgb(0, 149, 246)"
                  >Add new client</RouterLink
                ></small
              ></v-col
            >
            <v-col>
              <small class="text-caption">Job description</small>
              <v-textarea label="Enter the details of the job" rounded="xl" variant="solo">
              </v-textarea>
            </v-col>
            <v-col align="center">
              <v-date-picker
                title="SELECT DATE"
                header="Date of job"
                border="md"
                color="blue"
                elevation="5"
              ></v-date-picker>
            </v-col>

            <v-col>
              <small class="text-caption">Company VAT number</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's VAT number"
                type="number"
                rounded="xl"
                variant="solo"
                required
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
            >Continue</v-btn
          >
        </v-col>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'JobDetailsList',
  data() {
    return {
      click_create_client: false,
      isdarkmode: true,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF'
    }
  },
  methods: {
    flick() {}
  }
}
</script>

<style></style>
