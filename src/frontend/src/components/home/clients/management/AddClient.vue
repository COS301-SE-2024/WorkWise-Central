<template>
  <v-dialog max-height="800" max-width="600" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        text="Add Client"
        variant="text"
        color="#5A82AF"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
      elevation="14"
      rounded="md"
      max-height="800"
      overflow-y="auto"
      max-width="600"
    >
      <v-form ref="form" v-model="valid" @submit="handleSubmission">
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
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >Firstname of client*</small
              >

              <v-text-field
                density="compact"
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the firstname of the client"
                v-model="req_obj.details.firstName"
                rounded="md"
                variant="underlined"
                required
                :rules="first_name_rules"
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >Surname of client*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the surname name of the client"
                v-model="req_obj.details.lastName"
                rounded="md"
                variant="underlined"
                required
                :rules="surname_rules"
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >ID of client*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the ID number of the client"
                v-model="req_obj.idNumber"
                rounded="md"
                variant="underlined"
                required
                :rules="id_number_rules"
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >Username of client*</small
              >

              <v-text-field
                density="compact"
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the username of the client"
                v-model="req_obj.clientUsername"
                rounded="md"
                variant="underlined"
                required
                :rules="username_rules"
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client email address*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the client's email address"
                v-model="req_obj.details.contactInfo.email"
                :rules="email_rules"
                type="email"
                rounded="md"
                variant="underlined"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client phone number*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the client's phone number"
                v-model="req_obj.details.contactInfo.phoneNumber"
                rounded="md"
                variant="underlined"
                :rules="phone_number_rules"
                required
              ></v-text-field
            ></v-col>

            <small
              :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
              class="text-caption"
              >Client address</small
            >
            <v-row>
              <v-col sm="6" cols="12"
                ><small
                  :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >Street</small
                ><v-text-field
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Street"
                  v-model="req_obj.details.address.street"
                  rounded="md"
                  variant="underlined"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12"
                ><small
                  :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >Suburb</small
                ><v-text-field
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Suburb"
                  v-model="req_obj.details.address.suburb"
                  rounded="md"
                  variant="underlined"
                  required
                ></v-text-field
              ></v-col>

              <v-col sm="6" cols="12">
                <small
                  :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >City</small
                ><v-text-field
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="City"
                  v-model="req_obj.details.address.city"
                  rounded="md"
                  variant="underlined"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12"
                ><small
                  :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >Zip Code</small
                ><v-text-field
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Zip Code"
                  v-model="req_obj.details.address.postalCode"
                  rounded="md"
                  variant="underlined"
                  required
                ></v-text-field
              ></v-col>

              <v-col sm="6" cols="12"
                ><small
                  :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >Complex</small
                ><v-text-field
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Complex"
                  v-model="req_obj.details.address.complex"
                  rounded="md"
                  variant="underlined"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <small
                  :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >House number</small
                ><v-text-field
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="House number"
                  v-model="req_obj.details.address.houseNumber"
                  rounded="md"
                  variant="underlined"
                  required
                ></v-text-field
              ></v-col>
            </v-row>

            <v-col>
              <small
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Preferred language</small
              >
              <v-autocomplete
                density="compact"
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the language preferred by the client"
                v-model="req_obj.details.preferredLanguage"
                rounded="md"
                variant="underlined"
                :rules="prefered_languages_rules"
                :items="[
                  'Afrikaans',
                  'English',
                  'Ndebele',
                  'Sotho',
                  'Swati',
                  'Tsonga',
                  'Tswana',
                  'Venda',
                  'Xhosa',
                  'Zulu'
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
              variant="text"
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
  props: {
    isDarkMode: Boolean
  },
  data: () => ({
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    valid: false,
    dialog: false,
    isdarkmode: localStorage['theme'] !== 'false',
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
      (v: string) => /^0\d{9}$/.test(v) || 'Phone number must be a valid South African number'
    ],
    prefered_languages_rules: [(v: string) => !!v || 'Preferred language is required'],
    id_number_rules: [
      (v: string) => !!v || 'ID number is required'
      // (v:string) => (v && v.length === 13) || 'ID number must be 13 digits',
      // (v:string) =>
      //   /^(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{4}\d{1}0\d{1})$/.test(v) ||
      //   'ID number must be a valid South African ID number',
      // (v:string) => this.luhnCheck(v) || 'ID number must be a valid South African ID number'
    ],
    username_rules: [
      (v: string) => !!v || 'Username is required',
      (v: string) => (v && v.length >= 3) || 'Username must be at least 3 characters',
      (v: string) => (v && v.length <= 30) || 'Username must be less than 30 characters',
      (v: string) =>
        /^[A-Za-z0-9_]+$/.test(v) || 'Username must be alphanumeric characters and underscores only'
    ],

    req_obj: {
      clientUsername: '',
      details: {
        firstName: '',
        surName: '',
        preferredLanguage: '',
        contactInfo: {
          email: '',
          phoneNumber: ''
        },
        address: {
          street: '',
          suburb: '',
          city: '',
          postalCode: '',
          complex: '',
          houseNumber: ''
        }
      },
      companyId: sessionStorage['currentCompany'],
      idNumber: ''
    }
  }),
  methods: {
    luhnCheck(val: string) {
      let sum = 0
      for (let i = 0; i < val.length; i++) {
        let intVal = parseInt(val.substr(i, 1))
        if (i % 2 == 0) {
          intVal *= 2
          if (intVal > 9) {
            intVal = 1 + (intVal % 10)
          }
        }
        sum += intVal
      }
      return sum % 10 == 0
    },
    phhoneNumberCheck() {
      if (this.req_obj.details.contactInfo.phoneNumber != '') {
        axios
          .get('http://localhost:3000/client/checkPhoneNumber', {
            params: {
              phoneNumber: this.req_obj.details.contactInfo.phoneNumber
            }
          })
          .then((res) => {
            if (res.data == 'Phone number already exists') {
              alert('Phone number already exists')
              this.click_create_client = true
            } else {
              this.click_create_client = false
            }
          })
          .catch((res) => {
            console.log(res)
          })
      }
    },
    handleSubmission() {
      console.log(JSON.stringify(this.req_obj))
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      axios
        .post(apiURL + 'client/create', this.req_obj, config)
        .then((res) => {
          console.log('Client created successfully')
          console.log(res)
          alert('Client created successfully')
          this.$router.push('/client-desk-view')
        })
        .catch((res) => {
          console.log('Client creation failed')
          console.log(res)
        })
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
