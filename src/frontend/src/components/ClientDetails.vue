<template>
  <v-dialog max-width="500" height="1000">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        color="black"
        text="ClientDetails"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
      elevation="14"
      rounded="xl"
      width="500"
      height="1000"
    >
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Client Details
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-form ref="form" v-model="valid">
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >Name of client*</small
              >

              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the full name of the client"
                v-model="req_obj.client_name"
                rounded="xl"
                variant="solo"
                required
                :rules="client_name_errors"
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client email address*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the client's email address"
                v-model="req_obj.client_email"
                :rules="email_rules"
                type="email"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client phone number*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the client's phone number"
                v-model="req_obj.client_number"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client address*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the client's address"
                v-model="req_obj.client_address"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company (if applicable)</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the company name"
                v-model="req_obj.company_name"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company address (if applicable)</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the company address"
                v-model="req_obj.company_address"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Preferred language</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the language preferred by the client"
                rounded="xl"
                v-model="req_obj.client_preferred_language"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
          </v-form>
        </v-col>
        <v-col cols="8" offset="2" align="center">
          <v-btn
            rounded="xl"
            boarder="xl"
            width="80%"
            height="35"
            variant="elevated"
            color="blue-accent-2"
            :disabled="click_create_client"
            >CREATE CLIENT</v-btn
          >
        </v-col>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
const name_reg = /^[a-zA-Z]+ [a-zA-Z]+$/
const email_reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterCompanyModal ',
  data: () => ({
    valid: false,
    dialog: false,
    click_create_client: false,
    isdarkmode: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    client_name_errors: [
      (val: string) => name_reg.test(val) || 'Name should contain two names separated by a space',
      (val: string) => val.length !== 0 || 'Should not be empty'
    ],
    email_rules: [(val: string) => email_reg.test(val) || 'Email should contain an @ symbol'],

    req_obj: {
      client_name: '',
      client_email: '',
      client_number: '',
      client_address: '',
      company_name: '',
      company_address: '',
      client_preferred_language: ''
    }
  }),
  methods: {
    validate_userinput() {
      console.log('focus on us')
    }
  }
})
</script>

<style scoped>
.small_dark_text {
  color: white;
}
</style>
