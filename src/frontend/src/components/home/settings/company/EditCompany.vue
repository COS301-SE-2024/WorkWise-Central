<template>
  <v-container>
    <v-card max-width="600">
      <v-card-title class="text-center"> Edit Company </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="5" class="pl-15">
              <v-avatar color="grey" size="150">
                <v-img
                  src="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-circle.png"
                  cover
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="7" class="pl-15">
              <v-label> Name</v-label>
              <v-text-field
                v-model="company.name"
                label=" Name"
                :rules="nameRules"
                bg-color="background"
              ></v-text-field>
              <v-label>Type</v-label>
              <v-select
                v-model="company.type"
                label="Type"
                :items="type"
                bg-color="background"
              ></v-select>
              <v-label>Email</v-label>
              <v-text-field
                v-model="company.contactDetails.email"
                label="Email"
                :rules="emailRules"
                bg-color="background"
              ></v-text-field>
              <v-label>Phone</v-label>
              <v-text-field
                v-model="company.contactDetails.phone"
                label="Phone"
                :rules="phone_number_rules"
                bg-color="background"
              ></v-text-field>
              <v-label>Street</v-label>
              <v-text-field
                v-model="company.address.street"
                label="Street"
                bg-color="background"
              ></v-text-field>
              <v-label>Suburb</v-label>
              <v-text-field
                v-model="company.address.suburb"
                label="Suburb"
                bg-color="background"
              ></v-text-field>

              <v-label>Province</v-label>
              <v-select
                :items="provinces"
                v-model="company.address.province"
                bg-color="background"
              ></v-select>
              <v-label>City</v-label>
              <v-text-field
                v-model="company.address.city"
                label="City"
                bg-color="background"
              ></v-text-field>
              <v-label>Postal Code</v-label>
              <v-text-field
                v-model="company.address.postalCode"
                label="Postal Code"
                bg-color="background"
              ></v-text-field>
            </v-col> </v-row></v-form
      ></v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <v-col align="center"> <v-btn color="success" @click="saveChanges"> Save </v-btn></v-col>

        <v-col align="center"><v-btn color="error" @click="cancel"> Cancel </v-btn></v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditCompany',
  props: {
    company: Object
  },
  data: () => ({
    isdarkmode: false,
    company: {
      name: '',
      type: '',
      contactDetails: {
        phone: '',
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
    nameRules: [
      (v: string) => !!v || 'Name is required',
      (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    phone_number_rules: [
      (v: string) => !!v || 'Phone number is required',
      (v: string) => /^0\d{9}$/.test(v) || 'Phone number must be a valid South African number',
      (v: string) => (v && v.length === 10) || 'Phone number must be 10 digits'
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
      this.$emit('cancel')
    },
    saveChanges() {
      this.$emit('save', this.company)
    }
  },
  mounted() {
    this.isdarkmode = sessionStorage.getItem('theme') === 'true' ? true : false
  }
})
</script>
