<template>
  <v-dialog max-height="800" max-width="600" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        text="NEW CLIENT"
        variant="elevated"
        color="#5A82AF"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
      elevation="14"
      rounded="md"
      max-height="800"
      overflow-y="auto"
      max-width="600"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              Create a Client
            </h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >First name of client*</small
              >

              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the first name of the client"
                v-model="req_obj.firstName"
                rounded="md"
                variant="solo"
                required
                :rules="first_name_rules"
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >Surname name of client*</small
              >

              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the Surname name of the client"
                v-model="req_obj.surname"
                rounded="md"
                variant="solo"
                required
                :rules="surname_rules"
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
                placeholder="Enter the client's email address"
                v-model="req_obj.email"
                :rules="email_rules"
                type="email"
                rounded="md"
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
                placeholder="Enter the client's phone number"
                v-model="req_obj.phoneNumber"
                rounded="md"
                variant="solo"
                required
              ></v-text-field
            ></v-col>

            <small
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              class="text-caption"
              >Client address</small
            >
            <v-row>
              <v-col sm="6" cols="12"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Street"
                  rounded="md"
                  v-model="req_obj.address.street"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Suburb"
                  rounded="md"
                  v-model="req_obj.address.suburb"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>

              <v-col sm="6" cols="12"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="City"
                  rounded="md"
                  v-model="req_obj.address.city"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Zip Code"
                  rounded="md"
                  v-model="req_obj.address.postalCode"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>

              <v-col sm="6" cols="12"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Complex"
                  rounded="md"
                  v-model="req_obj.address.complex"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="House number"
                  rounded="md"
                  v-model="req_obj.address.houseNumber"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
            </v-row>

            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Preferred language</small
              >
              <v-autocomplete
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the language preferred by the client"
                rounded="md"
                v-model="req_obj.preferredLanguage"
                variant="solo"
                :items="[
                  'English',
                  'Afrikaans',
                  'Zulu',
                  'Xhosa',
                  'Sotho',
                  'Tswana',
                  'Venda',
                  'Tsonga',
                  'Swati',
                  'Ndebele'
                ]"
                required
              ></v-autocomplete
            ></v-col>
          </v-col>
          <v-col cols="8" offset="2" align="center">
            <v-btn
              rounded="md"
              boarder="xl"
              width="80%"
              height="35"
              type="submit"
              variant="elevated"
              color="#5A82AF"
              :disabled="click_create_client"
              >CREATE CLIENT</v-btn
            >
          </v-col>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'

const email_reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterCompanyModal ',
  props: ['isdarkmode'],
  data: () => ({
    valid: false,
    dialog: false,
    click_create_client: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    email_rules: [(val: string) => email_reg.test(val) || 'Email should contain an @ symbol'],
    first_name_rules: [
      (v: string) => !!v || 'First name is required',
      (v: string) => /^[A-Za-z]+$/.test(v) || 'First name must be alphabetic characters'
    ],
    surname_rules: [
      (v: string) => !!v || 'Surname is required',
      (v: string) => /^[A-Za-z]+$/.test(v) || 'Surname must be alphabetic characters'
    ],
    phone_number_rules: [
      (v: string) => !!v || 'Phone number is required',
      (v: string) => /^(\+27\d{9})$/.test(v) || 'Phone number must be a valid South African number'
    ],

    req_obj: {
      firstName: '',
      surname: '',
      phoneNumber: '',
      email: '',
      preferredLanguage: '',
      companyId: sessionStorage['currentCompany'],
      address: {
        street: '',
        suburb: '',
        city: '',
        postalCode: '',
        complex: '',
        houseNumber: ''
      }
    }
  }),
  methods: {
    handleSubmission() {
      axios
        .post('http://localhost:3000/client/create', this.req_obj)
        .then((res) => {
          alert('Client created successfully')
          console.log(res)
        })
        .catch((res) => {
          alert('Client creation failed')
          console.log(res)
        })
    }
  }
})
</script>

<style>
.hello {
  color: white;
  background-color: #5a82af;
}
</style>
