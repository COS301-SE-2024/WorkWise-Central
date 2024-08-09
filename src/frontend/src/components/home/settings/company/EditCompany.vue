<template>
  <v-container>
    <v-card>
      <v-card-title class="text-primary font-bold text-center"> Company Details</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" lg="5" class="d-flex justify-center">
              <v-avatar color="grey" size="150">
                <v-img
                  size="50"
                  src="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-circle.png"
                  cover
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" lg="7">
              <v-label> Name</v-label>
              <v-text-field
                v-model="company.name"
                label=" Name"
                :rules="nameRules"
                bg-color="background"
                required
              ></v-text-field>
              <v-label>Type</v-label>
              <v-select
                v-model="company.type"
                label="Type"
                :items="type"
                bg-color="background"
                required
              ></v-select>
              <v-label>Email</v-label>
              <v-text-field
                v-model="company.contactDetails.email"
                label="Email"
                :rules="emailRules"
                bg-color="background"
                required
              ></v-text-field>
              <v-label>Phone</v-label>
              <v-text-field
                v-model="company.contactDetails.phoneNumber"
                label="Phone"
                :rules="phone_number_rules"
                bg-color="background"
                required
              ></v-text-field>
              <v-label>Street</v-label>
              <v-text-field
                v-model="company.address.street"
                label="Street"
                bg-color="background"
                required
              ></v-text-field>
              <v-label>Suburb</v-label>
              <v-text-field
                v-model="company.address.suburb"
                label="Suburb"
                bg-color="background"
                required
              ></v-text-field>

              <v-label>Province</v-label>
              <v-select
                :items="provinces"
                v-model="company.address.province"
                bg-color="background"
                required
              ></v-select>
              <v-label>City</v-label>
              <v-text-field
                v-model="company.address.city"
                label="City"
                bg-color="background"
                required
              ></v-text-field>
              <v-label>Postal Code</v-label>
              <v-text-field
                v-model="company.address.postalCode"
                label="Postal Code"
                bg-color="background"
                required
              ></v-text-field>
            </v-col> </v-row></v-form
      ></v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <v-container
          ><v-row justify="end">
            <v-col align="center" cols="12" lg="6">
              <Toast position="top-center" />
              <v-btn color="success" @click="updateCompanyDetails" :disabled="!valid" block>
                Save
                <v-icon end color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon> </v-btn
            ></v-col>
            <v-col align="center" cols="12" lg="6">
              <Toast />
              <v-btn color="error" @click="cancel" block>
                Cancel<v-icon
                  end
                  color="error"
                  icon="fa: fa-solid fa-cancel"
                ></v-icon> </v-btn></v-col></v-row
        ></v-container>
      </v-card-actions>
      <div class="card flex justify-center"></div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import axios from 'axios'
export default defineComponent({
  name: 'EditCompany',

  components: {
    Toast
  },
  data: () => ({
    isdarkmode: false,
    localUrl: 'http://localhost:3000',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    currentCompanyID: localStorage.getItem('currentCompany'),
    valid: false,
    company: {
      name: '',
      type: '',
      contactDetails: {
        phoneNumber: '',
        email: ''
      },
      address: {
        street: '',
        suburb: '',
        city: '',
        province: '',
        postalCode: '',
        complex: '',
        houseNumber: ''
      },
      vatNumber: '',
      registrationNumber: ''
    },
    type: [
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
    ],
    provinces: [
      'Eastern Cape',
      'Free State',
      'Gauteng',
      'KwaZulu-Natal',
      'Limpopo',
      'Mpumalanga',
      'North West',
      'Northern Cape',
      'Western Cape'
    ],
    nameRules: [(v: string) => !!v || 'Name is required'],
    phone_number_rules: [
      (v: string) => !!v || 'Phone number is required',
      (v: string) => /^0\d{9}$/.test(v) || 'Phone number must be a valid South African number',
      (v: string) => (v && v.length === 10) || 'Phone number must be 10 digits',
      (v: string) => (v && v.startsWith('0')) || 'Phone number must start with 0'
    ],
    emailRules: [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    postalCodeRules: [
      (v: string) => !!v || 'Postal code is required',
      (v: string) => (v && v.length === 4) || 'Postal code must be 4 digits'
    ],
    vatNumberRules: [
      (v: string) => !!v || 'VAT number is required',
      (v: string) => (v && v.length === 10) || 'VAT number must be 10 digits'
    ],
    company_registration_number_rules: [
      (v: string) => !!v || 'Company registration number is required',
      (v: string) =>
        /^\d{4}\/\d{6}\/\d{2}$/.test(v) ||
        'Company registration number must be a valid South African number format: YYYY/NNNNNN/XX'
    ]
  }),
  methods: {
    cancel() {
      this.$toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Company update cancelled',
        life: 3000
      })
      window.location.reload()
    },
    saveChanges() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Company updated',
        life: 3000
      })
    },
    async getCompanyDetails() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      // const apiURL = await this.getRequestUrl()
      const company_id = localStorage.getItem('currentCompany')
      await axios
        .get(`http://localhost:3000/company/id/${company_id}`, config)
        .then((response) => {
          this.company = response.data.data
          console.log(this.company)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async updateCompanyDetails() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      const company_id = localStorage.getItem('currentCompany')
      await axios
        .patch(`http://localhost:3000/company/update/${company_id}`, this.company, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company updated',
            life: 3000
          })
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Sticky Message',
            detail: 'Company update failed',
            life: 3000
          })
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
    toast() {},
    rulesPassed() {
      if (
        this.nameRules &&
        this.phone_number_rules &&
        this.emailRules &&
        this.postalCodeRules &&
        this.vatNumberRules &&
        this.company_registration_number_rules
      ) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
  },
  mounted() {
    this.isdarkmode = localStorage.getItem('theme') === 'true' ? true : false
    this.getCompanyDetails()
  }
})
</script>
