<template>
  <v-dialog v-model="addDialog" max-height="800" max-width="600" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular"
        style="font-size: 20px"
        text="Add Client"
        prepend-icon="mdi-account-plus"
        variant="elevated"
        color="secondary"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-card :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
      ><v-card-title>
        <span class="headline text-center">Create a Client </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmission">
          <v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-col>
                <small class="text-caption white--text">First Name of client*</small>

                <v-text-field
                  color="secondary"
                  placeholder="Enter the first name of the client"
                  v-model="req_obj.details.firstName"
                  required
                  :rules="first_name_rules"
                ></v-text-field
              ></v-col>
              <v-col>
                <small class="text-caption white--text">Surname of client*</small>
                <v-text-field
                  color="secondary"
                  placeholder="Enter the surname name of the client"
                  v-model="req_obj.details.lastName"
                  required
                  :rules="surname_rules"
                ></v-text-field
              ></v-col>
              <v-col>
                <small class="text-caption white--text">ID of client*</small>
                <v-text-field
                  placeholder="Enter the ID number of the client"
                  v-model="req_obj.idNumber"
                  required
                  :rules="south_africa_id_rules"
                ></v-text-field
              ></v-col>
              <v-col>
                <small class="text-caption white--text">Username of client*</small>

                <v-text-field
                  color="secondary"
                  placeholder="Enter the username of the client"
                  v-model="req_obj.clientUsername"
                  required
                  :rules="username_rules"
                ></v-text-field
              ></v-col>

              <v-col>
                <small class="text-caption">Client email address*</small>
                <v-text-field
                  color="secondary"
                  placeholder="Enter the client's email address"
                  v-model="req_obj.details.contactInfo.email"
                  :rules="email_rules"
                  type="email"
                  required
                ></v-text-field
              ></v-col>
              <v-col>
                <small class="text-caption">Client phone number*</small>
                <v-text-field
                  color="secondary"
                  placeholder="Enter the client's phone number"
                  v-model="req_obj.details.contactInfo.phoneNumber"
                  type="number"
                  :rules="phone_number_rules"
                  required
                ></v-text-field
              ></v-col>

              <small class="text-caption">Client address</small>
              <v-row>
                <v-col sm="6" cols="12"
                  ><small class="text-caption">Street</small
                  ><v-text-field
                    color="secondary"
                    placeholder="Street"
                    v-model="req_obj.details.address.street"
                    type="street"
                    required
                  ></v-text-field
                ></v-col>
                <v-col sm="6" cols="12"
                  ><small class="text-caption">Suburb</small
                  ><v-text-field
                    color="secondary"
                    placeholder="Suburb"
                    v-model="req_obj.details.address.suburb"
                    type="suburb"
                    required
                  ></v-text-field
                ></v-col>

                <v-col sm="6" cols="12">
                  <small class="text-caption">City</small
                  ><v-text-field
                    color="secondary"
                    placeholder="City"
                    v-model="req_obj.details.address.city"
                    type="city"
                    required
                  ></v-text-field
                ></v-col>
                <v-col sm="6" cols="12"
                  ><small class="text-caption">Zip Code</small
                  ><v-text-field
                    color="secondary"
                    placeholder="Zip Code"
                    v-model="req_obj.details.address.postalCode"
                    type="postalCode"
                    required
                  ></v-text-field
                ></v-col>

                <v-col sm="6" cols="12"
                  ><small class="text-caption">Complex</small
                  ><v-text-field
                    color="secondary"
                    placeholder="Complex"
                    v-model="req_obj.details.address.complex"
                    type="complex"
                    required
                  ></v-text-field
                ></v-col>
                <v-col sm="6" cols="12">
                  <small class="text-caption">House number</small
                  ><v-text-field
                    color="secondary"
                    placeholder="House number"
                    v-model="req_obj.details.address.houseNumber"
                    type="houseNumber"
                    required
                  ></v-text-field
                ></v-col>
              </v-row>

              <v-col>
                <small class="text-caption">Preferred language</small>
                <v-autocomplete
                  color="secondary"
                  placeholder="Enter the language preferred by the client"
                  v-model="req_obj.details.preferredLanguage"
                  type="preferredLanguage"
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
                color="success"
                :disabled="click_create_client"
                >Create Client</v-btn
              >
            </v-col>
            <v-col cols="8" offset="2" align="center">
              <v-btn color="error" width="85%" height="35" variant="text" @click="close">
                Cancel
              </v-btn>
            </v-col>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'

const email_reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterCompanyModal ',

  data: () => ({
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    valid: false,
    addDialog: false,
    isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false,
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
    south_africa_id_rules: [
      (v: string) => !!v || 'ID number is required',
      (v: string) => v.length === 13 || 'ID number must be 13 digits long',
      (v: string) => /^\d{13}$/.test(v) || 'ID number must contain only digits',
      (v: string) => {
        const dob = v.slice(0, 6)
        const year = parseInt(dob.slice(0, 2), 10) + 1900
        const month = parseInt(dob.slice(2, 4), 10) - 1 // JS months are 0-indexed
        const day = parseInt(dob.slice(4, 6), 10)
        const date = new Date(year, month, day)
        return (
          (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) ||
          'Invalid date of birth in ID number'
        )
      },
      (v: string) => ['0', '1'].includes(v[10]) || 'Invalid citizenship status digit',
      (v: string) => {
        // Implementing Luhn algorithm for checksum validation
        let sum = 0
        for (let i = 0; i < 13; i++) {
          let digit = parseInt(v[i], 10)
          if (i % 2 === 0) {
            sum += digit
          } else {
            let doubled = digit * 2
            sum += doubled > 9 ? doubled - 9 : doubled
          }
        }
        return sum % 10 === 0 || 'Invalid ID number checksum'
      }
    ],

    req_obj: {
      clientUsername: '',
      details: {
        firstName: '',
        lastName: '',
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
    async handleSubmission() {
      console.log(JSON.stringify(this.req_obj))
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      axios
        .post(apiURL + 'client/create', this.req_obj, config)
        .then((res) => {
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
    },
    close() {
      console.log(this.addDialog)
      this.addDialog = false
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
