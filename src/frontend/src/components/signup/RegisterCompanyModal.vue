<template>
  <v-dialog max-height="800" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        variant="elevated"
        color="#5A82AF"
        v-bind="activatorProps"
        >Register Company</v-btn
      >
    </template>
    <v-sheet
      elevation="14"
      rounded="md"
      max-width="600"
      max-height="800"
      :color="isdarkmode === true ? 'dark' : 'light'"
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
                rounded="md"
                :bg-color="isdarkmode === true ? 'dark' : 'light'"
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
                :bg-color="isdarkmode === true ? 'dark' : 'light'"
                density="compact"
                color="grey-lighten-4"
                placeholder="Select Job Type"
                v-model="req_obj.type"
                rounded="md"
                variant="solo"
                :items="[
                  'Agricultural Labor',
                  'Automotive Repair',
                  'Auto Detailing',
                  'Boat Cleaning',
                  'Carpentry',
                  'Carpet Cleaning',
                  'Childcare Services',
                  'Concert Setup and Teardown',
                  'Construction Site Cleanup',
                  'Construction Work',
                  'Demolition Services',
                  'Disaster Cleanup',
                  'Dog Walking',
                  'Drywall Installation and Repair',
                  'Electrical Work',
                  'Elderly Care Services',
                  'Equestrian Services',
                  'Event Setup and Teardown',
                  'Exhibit Installation',
                  'Extermination Services',
                  'Exterior Home Cleaning',
                  'Farm Work',
                  'Fire Damage Cleanup',
                  'Fishing Services',
                  'Flooring Installation',
                  'Forestry Work',
                  'Furniture Assembly',
                  'Gardening',
                  'General Handyman Services',
                  'Gutter Cleaning',
                  'Harvesting',
                  'Home Health Aide',
                  'Home Renovation',
                  'HVAC Installation and Repair',
                  'Insulation Installation',
                  'Janitorial Services',
                  'Junk Removal',
                  'Landscaping',
                  'Lawn Care',
                  'Livestock Care',
                  'Loading and Unloading Services',
                  'Maid Services',
                  'Masonry',
                  'Mining Services',
                  'Mold Remediation',
                  'Moving Services',
                  'Oil and Gas Extraction',
                  'Packing and Unpacking Services',
                  'Painting',
                  'Personal Care Assistant',
                  'Pest Control',
                  'Pet Grooming',
                  'Plumbing',
                  'Pool Cleaning',
                  'Pressure Washing',
                  'Recycling Services',
                  'Restoration Services',
                  'Rigging Services',
                  'Roofing',
                  'Scrap Metal Collection',
                  'Scaffolding Services',
                  'Snow Removal',
                  'Tile Installation',
                  'Trade Show Setup and Teardown',
                  'Tree Trimming',
                  'Warehouse Labor',
                  'Waste Management',
                  'Water Damage Cleanup',
                  'Welding',
                  'Window Cleaning'
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
                :bg-color="isdarkmode === true ? 'dark' : 'light'"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's email adress"
                type="email"
                :rules="email_rules"
                v-model="req_obj.contactDetails.email"
                rounded="md"
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
                :bg-color="isdarkmode === true ? 'dark' : 'light'"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's phone number"
                rounded="md"
                variant="solo"
                v-model="req_obj.contactDetails.phoneNumber"
                :rules="phone_number_rules"
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
                :bg-color="isdarkmode === true ? 'dark' : 'light'"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's registration number"
                v-model="req_obj.registrationNumber"
                :rules="registration_number_rules"
                rounded="md"
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
                :bg-color="isdarkmode === true ? 'dark' : 'light'"
                density="compact"
                color="grey-lighten-4"
                placeholder="Enter the company's VAT number"
                :rules="vat_number_rules"
                rounded="md"
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
            <!--                :bg-color="isdarkmode === true ? 'dark' : 'light'"-->
            <!--                variant="solo"-->
            <!--                accept="image/*"-->
            <!--                width="100%"-->
            <!--                placeholder="Company Logo"-->
            <!--                @change="companyLogoHandler"-->
            <!--                color="black"-->
            <!--                rounded="md"-->
            <!--              ></v-file-input>-->
            <!--            </v-col>-->
            <small
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              class="text-caption"
              >Company address</small
            >
            <v-row class="d-flex flex-wrap">
              <v-col sm="6" cols="12">
                <small
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >Street</small
                ><v-text-field
                  :bg-color="isdarkmode === true ? 'dark' : 'light'"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Street"
                  rounded="md"
                  v-model="req_obj.address.street"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <small
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >Suburb</small
                ><v-text-field
                  :bg-color="isdarkmode === true ? 'dark' : 'light'"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Suburb"
                  rounded="md"
                  v-model="req_obj.address.suburb"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <small
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >City</small
                ><v-text-field
                  :bg-color="isdarkmode === true ? 'dark' : 'light'"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="City"
                  rounded="md"
                  v-model="req_obj.address.city"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <small
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                  class="text-caption"
                  >Zip Code</small
                ><v-text-field
                  :bg-color="isdarkmode === true ? 'dark' : 'light'"
                  density="compact"
                  color="grey-lighten-4"
                  placeholder="Zip Code"
                  rounded="md"
                  v-model="req_obj.address.postalCode"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
            </v-row>
            <!--            <v-row>-->
            <!--              <v-col-->
            <!--                ><v-text-field-->
            <!--                  :bg-color="isdarkmode === true ? 'dark' : 'light'"-->
            <!--                  density="compact"-->
            <!--                  color="grey-lighten-4"-->
            <!--                  placeholder="Complex"-->
            <!--                  rounded="md"-->
            <!--                  v-model="req_obj.address.complex"-->
            <!--                  variant="solo"-->
            <!--                  required-->
            <!--                ></v-text-field-->
            <!--              ></v-col>-->
            <!--              <v-col-->
            <!--                ><v-text-field-->
            <!--                  :bg-color="isdarkmode === true ? 'dark' : 'light'"-->
            <!--                  density="compact"-->
            <!--                  color="grey-lighten-4"-->
            <!--                  placeholder="House number"-->
            <!--                  rounded="md"-->
            <!--                  v-model="req_obj.address.houseNumber"-->
            <!--                  variant="solo"-->
            <!--                  required-->
            <!--                ></v-text-field-->
            <!--              ></v-col>-->
            <!--            </v-row>-->
          </v-col>
          <v-col
            :style="isdarkmode === true ? dark_theme_text_color : 'light'"
            cols="8"
            offset="2"
            align="center"
          >
            <v-btn
              color="#5A82AF"
              type="submit"
              rounded="md"
              boarder="md"
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
  data() {
    return {
      dialog: false,
      isdarkmode: sessionStorage['theme'] !== 'false',
      click_create_client: false,
      valid: true,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      dark: '#2b2b2b',
      light: '#FFFFFF',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
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
      vat_number_rules: [
        (v: string) => !!v || 'VAT number is required',
        (v: string) => /^\d{10}$/.test(v) || 'VAT number must be a valid South African VAT number'
      ],
      company_registration_number_rules: [
        (v: string) => !!v || 'Company registration number is required',
        (v: string) =>
          /^(\d{14})$/.test(v) || 'Company registration number must be a valid South African number'
      ],
      phone_number_rules: [
        (v: string) => !!v || 'Phone number is required',
        (v: string) => /^0\d{9}$/.test(v) || 'Phone number must be a valid South African number'
      ],
    registration_number_rules:[(v:string)=>this.checkRegistrationNumber(v)],
      req_obj: {
        userId: sessionStorage['id'],
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
        employees: [],
        inventoryItems: [],
        private: false
      }
    }
  },
  methods: {
    checkRegistrationNumber()
    {
      const reg_num_rules = [
        (value:string) => /^\d{4}\/\d{6}\/07$/.test(value) ,
        (value:string) => /^\d{4}\/\d{6}\/06$/.test(value) ,
        (value:string) => /^\d{4}\/\d{6}\/08$/.test(value) ,
        (value:string) => /^\d{4}\/\d{6}\/23$/.test(value) ,
        (value:string) => /^\d{4}\/\d{6}\/21$/.test(value) ,
        (value:string) => /^\d{4}\/\d{6}\/30$/.test(value) ,
        (value:string) => /^\d{4}\/\d{6}\/10$/.test(value) ,
        (value:string) => /^\d{4}\/\d{4}$/.test(value),
        (value:string) => /^\d{3}\/\d{4}$/.test(value)]

      const isvalid = reg_num_rules.some(rule=>rule)
      return isvalid || 'Registration number must satisfy at least one format: (YYYY/NNNNNN/07), (YYYY/NNNNNN/06), (YYYY/NNNNNN/08), (YYYY/NNNNNN/23), (YYYY/NNNNNN/30), (YYYY/NNNNNN/10), (NNNN/YYYY), (NNN/YYYY)'
    }

    ,
    companyLogoHandler() {
      console.log('')
    },
    async registrationHandler() {
      console.log(JSON.stringify(this.req_obj))
      console.log(this.req_obj)
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      axios
        .post(apiURL + 'company/create', this.req_obj, config)
        .then((res) => {
          console.log(res.data.data.id)
          alert('The Company was registered successfully')
          sessionStorage['currentCompany'] = res.data.data.id._id
          console.log(res.data)
          this.$router.push('/dashboard')
        })
        .catch((res) => {
          alert('The Company was not registered successfully')
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
