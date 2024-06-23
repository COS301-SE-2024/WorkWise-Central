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
                >Name of client*</small
              >

              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                placeholder="Enter the name of the client"
                v-model="req_obj.details.name"
                rounded="xl"
                variant="solo"
                required
                :rules="first_name_rules"
              ></v-text-field
            ></v-col>
            <!--            <v-col>-->
            <!--              <small-->
            <!--                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"-->
            <!--                class="text-caption white&#45;&#45;text"-->
            <!--                >Surname name of client*</small-->
            <!--              >-->
            <!--              <v-text-field-->
            <!--                density="compact"-->
            <!--                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"-->
            <!--                color="grey-lighten-4"-->
            <!--                placeholder="Enter the Surname name of the client"-->
            <!--                v-model="surName"-->
            <!--                rounded="xl"-->
            <!--                variant="solo"-->
            <!--                required-->
            <!--                :rules="surname_rules"-->
            <!--              ></v-text-field-->
            <!--            ></v-col>-->
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
                v-model="req_obj.details.contactInfo.email"
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
                v-model="req_obj.details.contactInfo.phoneNumber"
                rounded="xl"
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
                  rounded="xl"
                  v-model="req_obj.details.address.street"
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
                  rounded="xl"
                  v-model="req_obj.details.address.suburb"
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
                  rounded="xl"
                  v-model="req_obj.details.address.city"
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
                  rounded="xl"
                  v-model="req_obj.details.address.postalCode"
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
                  rounded="xl"
                  v-model="req_obj.details.address.complex"
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
                  rounded="xl"
                  v-model="req_obj.details.address.houseNumber"
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
                placeholder="Enter the language preferred by the client"
                rounded="xl"
                v-model="req_obj.details.preferredLanguage"
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
import router from '@/router'

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

    firstName: '',
    surName: '',
    req_obj: {
      details: {
        name: '',
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
      }
    }
  }),
  methods: {
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

      axios
        .post('http://localhost:3000/client/create', this.req_obj, config)
        .then((res) => {
          console.log('Client created successfully')
          console.log(res)
          alert('Client created successfully')
          router.push('/client-desk-view')
        })
        .catch((res) => {
          console.log('Client creation failed')
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
