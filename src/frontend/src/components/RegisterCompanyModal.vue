<template>
  <v-dialog max-height="800" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="xl"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        text="REGISTER COMPANY"
        variant="elevated"
        color="#5A82AF"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      elevation="14"
      rounded="xl"
      max-width="600"
      max-height="800"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="registrationHandler">
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              Register your company
            </h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company name*</small
              >
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's name"
                v-model="req_obj.name"
                :rules="company_name_rules"
                rounded="xl"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Type of business*</small
              >
              <v-autocomplete
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                placeholder="Select Job Type"
                v-model="req_obj.type"
                rounded="xl"
                variant="solo"
                :items="[
                  'Construction Work',
                  'Landscaping',
                  'Lawn Care',
                  'Gardening',
                  'Tree Trimming',
                  'Roofing',
                  'Painting',
                  'Plumbing',
                  'Electrical Work',
                  'Carpentry',
                  'Masonry',
                  'Welding',
                  'HVAC Installation and Repair',
                  'Window Cleaning',
                  'Janitorial Services',
                  'Carpet Cleaning',
                  'Moving Services',
                  'Packing and Unpacking Services',
                  'Furniture Assembly',
                  'Pest Control',
                  'Extermination Services',
                  'Pool Cleaning',
                  'Snow Removal',
                  'Demolition Services',
                  'Flooring Installation',
                  'Tile Installation',
                  'Drywall Installation and Repair',
                  'Insulation Installation',
                  'Gutter Cleaning',
                  'Pressure Washing',
                  'Automotive Repair',
                  'Auto Detailing',
                  'Boat Cleaning',
                  'Farm Work',
                  'Harvesting',
                  'Fishing Services',
                  'Forestry Work',
                  'Mining Services',
                  'Oil and Gas Extraction',
                  'Construction Site Cleanup',
                  'Warehouse Labor',
                  'Loading and Unloading Services',
                  'Recycling Services',
                  'Scrap Metal Collection',
                  'Junk Removal',
                  'Waste Management',
                  'Event Setup and Teardown',
                  'Concert Setup and Teardown',
                  'Trade Show Setup and Teardown',
                  'Exhibit Installation',
                  'Rigging Services',
                  'Scaffolding Services',
                  'General Handyman Services',
                  'Home Renovation',
                  'Exterior Home Cleaning',
                  'Agricultural Labor',
                  'Livestock Care',
                  'Equestrian Services',
                  'Dog Walking',
                  'Pet Grooming',
                  'House Cleaning',
                  'Maid Services',
                  'Home Health Aide',
                  'Personal Care Assistant',
                  'Childcare Services',
                  'Elderly Care Services',
                  'Disaster Cleanup',
                  'Restoration Services',
                  'Fire Damage Cleanup',
                  'Water Damage Cleanup',
                  'Mold Remediation'
                ]"
              ></v-autocomplete>
            </v-col>

            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company email address</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's email adress"
                type="email"
                :rules="email_rules"
                v-model="req_obj.contactDetails.email"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company phone number</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's phone number"
                rounded="xl"
                variant="solo"
                v-model="req_obj.contactDetails.phoneNumber"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company registration number</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's registration number"
                v-model="req_obj.registrationNumber"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>

            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company VAT number</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's VAT number"
                :rules="vat_number_rules"
                rounded="xl"
                v-model="req_obj.vatNumber"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <!--            <v-col>-->
            <!--              <small-->
            <!--                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"-->
            <!--                class="text-caption"-->
            <!--                >Company logo</small-->
            <!--              >-->
            <!--              <v-file-input-->
            <!--                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"-->
            <!--                variant="solo"-->
            <!--                accept="image/*"-->
            <!--                width="100%"-->
            <!--                placeholder="Company Logo"-->
            <!--                @change="companyLogoHandler"-->
            <!--                color="black"-->
            <!--                rounded="xl"-->
            <!--              ></v-file-input>-->
            <!--            </v-col>-->
            <small
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              class="text-caption"
              >Company address</small
            >
            <v-row class="d-flex flex-wrap">
              <v-col sm="6" cols="12"
                ><v-text-field
                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Street"
                  rounded="xl"
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
                  rounded="xl"
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
                  rounded="xl"
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
                  rounded="xl"
                  v-model="req_obj.address.postalCode"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
            </v-row>
            <!--            <v-row>-->
            <!--              <v-col-->
            <!--                ><v-text-field-->
            <!--                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"-->
            <!--                  density="compact"-->
            <!--                  color="grey-lighten-4"-->
            <!--                  placeholder="Complex"-->
            <!--                  rounded="xl"-->
            <!--                  v-model="req_obj.address.complex"-->
            <!--                  variant="solo"-->
            <!--                  required-->
            <!--                ></v-text-field-->
            <!--              ></v-col>-->
            <!--              <v-col-->
            <!--                ><v-text-field-->
            <!--                  :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"-->
            <!--                  density="compact"-->
            <!--                  color="grey-lighten-4"-->
            <!--                  placeholder="House number"-->
            <!--                  rounded="xl"-->
            <!--                  v-model="req_obj.address.houseNumber"-->
            <!--                  variant="solo"-->
            <!--                  required-->
            <!--                ></v-text-field-->
            <!--              ></v-col>-->
            <!--            </v-row>-->
          </v-col>
          <v-col
            :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
            cols="8"
            offset="2"
            align="center"
          >
            <v-btn
              color="#5A82AF"
              type="submit"
              rounded="xl"
              boarder="xl"
              width="60%"
              height="35"
              variant="elevated"
              :disabled="click_create_client"
              >Continue</v-btn
            >
          </v-col>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  name: 'RegisterCompanyModal',
  props: ['isdarkmode'],
  data() {
    return {
      dialog: false,
      click_create_client: false,
      valid: true,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      company_name_rules: [
        (v: string) => !!v || 'Company name is required',
        (v: string) => /^[A-Z]/.test(v) || 'Company name must start with a capital letter',
        (v: string) =>
          !/[ &-]$/.test(v) || 'Company name must not end with a space or special character',
        (v: string) => v.length <= 50 || 'Company name must be less than 50 characters',
        (v: string) =>
          /^[A-Z][a-zA-Z &-]{0,48}[a-zA-Z]$/.test(v) ||
          'Company name can contain both capital and lowercase letters, spaces, "&", or "-"'
      ],
      email_rules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phone_number_rules: [
        (v: string) => !!v || 'Phone number is required',
        (v: string) =>
          /^(\+27\d{9})$/.test(v) || 'Phone number must be a valid South African number'
      ],
      vat_number_rules: [
        (v: string) => !!v || 'VAT number is required',
        (v: string) => /^\d{10}$/.test(v) || 'VAT number must be a valid South African VAT number'
      ],

      req_obj: {
        creatorId: sessionStorage['id'],
        name: '',
        type: '',
        registrationNumber: '',
        vatNumber: '',
        contactDetails: {
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
        },
        employees: sessionStorage['id']
      }
    }
  },
  methods: {
    companyLogoHandler() {
      console.log('')
    },
    registrationHandler() {
      console.log(JSON.stringify(this.req_obj))
      console.log(this.req_obj)
      axios
        .post('http://localhost:3000/company/create', this.req_obj)
        .then((res) => {
          alert('The Company was registered successfully')
          sessionStorage['currentCompany'] = res.data.data.id
          console.log(res.data)
          this.$router.push('/dashboard')
        })
        .catch((res) => {
          alert('The Company was not registered successfully')
          console.log(res)
        })
    }
    // base64image() {
    //   let read = new FileReader()
    //   read.readAsDataURL(this.req_obj.image)
    //   read.onload = () => {
    //     this.req_obj.image = read.result
    //   }
    // }
  }
}
</script>

<style></style>
