<template>
  <v-dialog
    v-model="dialog"
    max-height="800"
    max-width="600"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        color="secondary"
        v-bind="activatorProps"
        >Register Company</v-btn
      >
    </template>
    <v-sheet
      elevation="14"
      rounded="md"
      max-width="600"
      :theme="isdarkmode === true ? 'dark' : 'light'"
    >
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="registrationHandler"
        class="bg-background"
      >
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              Register your company
            </h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <label style="font-size: 14px; font-weight: lighter">Company Name</label>
              <v-text-field
                @update:focused="setUserId"
                density="compact"
                color="cardColor"
                placeholder="Enter the company's name"
                v-model="req_obj.name"
                :rules="company_name_rules"
                rounded="md"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <label style="font-size: 14px; font-weight: lighter">Type of business*</label>
              <v-autocomplete
                density="compact"
                color="primary"
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
              <label style="font-size: 14px; font-weight: lighter">Company email address</label>

              <v-text-field
                @update:focused="setUserId"
                density="compact"
                color="cardColor"
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
              <label style="font-size: 14px; font-weight: lighter">Company phone number*</label>

              <v-text-field
                @update:focused="setUserId"
                density="compact"
                color="cardColor"
                placeholder="Enter the company's phone number"
                rounded="md"
                variant="solo"
                v-model="req_obj.contactDetails.phoneNumber"
                :rules="phone_number_rules"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <label style="font-size: 14px; font-weight: lighter"
                >Company registration number*</label
              >

              <v-text-field
                @update:focused="setUserId"
                density="compact"
                color="cardColor"
                placeholder="Enter the company's registration number"
                v-model="req_obj.registrationNumber"
                :rules="company_registration_number_rules"
                rounded="md"
                variant="solo"
                required
              ></v-text-field
            ></v-col>

            <v-col>
              <label style="font-size: 14px; font-weight: lighter">Company VAT number*</label>

              <v-text-field
                @update:focused="setUserId"
                density="compact"
                color="cardColor"
                placeholder="Enter the company's VAT number"
                :rules="vat_number_rules"
                rounded="md"
                v-model="req_obj.vatNumber"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company logo</small
              >
              <v-file-input
                :theme="isdarkmode === true ? 'dark' : 'light'"
                variant="solo"
                accept="image/*"
                width="100%"
                placeholder="Company Logo"
                @change="handleImageUpload"
                color="black"
                rounded="md"
              ></v-file-input>
            </v-col>
            <label style="font-size: 14px; font-weight: lighter">Company address*</label>

            <v-row class="d-flex flex-wrap">
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter">Street</label>
                <v-text-field
                  @update:focused="setUserId"
                  density="compact"
                  color="cardColor"
                  placeholder="Street"
                  rounded="md"
                  v-model="req_obj.address.street"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter">Suburb</label>
                <v-text-field
                  @update:focused="setUserId"
                  density="compact"
                  color="cardColor"
                  placeholder="Suburb"
                  rounded="md"
                  v-model="req_obj.address.suburb"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter">Province</label>
                <v-autocomplete
                  density="compact"
                  placeholder="Province"
                  color="cardColor"
                  v-model="req_obj.address.province"
                  rounded="md"
                  type="houseNumber"
                  variant="solo"
                  :items="[
                    'Eastern Cape',
                    'Free State',
                    'Gauteng',
                    'KwaZulu-Natal',
                    'Limpopo',
                    'Mpumalanga',
                    'North West',
                    'Northern Cape',
                    'Western Cape'
                  ]"
                  required
                ></v-autocomplete
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter">City</label>
                <v-text-field
                  @update:focused="setUserId"
                  density="compact"
                  placeholder="City"
                  rounded="md"
                  v-model="req_obj.address.city"
                  variant="solo"
                  required
                  color="cardColor"
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter">Postal Code</label>
                <v-text-field
                  @update:focused="setUserId"
                  density="compact"
                  color="cardColor"
                  placeholder="Postal Code"
                  rounded="md"
                  v-model="req_obj.address.postalCode"
                  :rules="postal_code_rules"
                  variant="solo"
                  required
                ></v-text-field
              ></v-col>
            </v-row>
            <!--            <v-row>-->
            <!--              <v-col-->
            <!--                > <v-text-field
                @update:focused = "setUserId"-->
            <!--                  :theme="isdarkmode === true ? 'dark' : 'light'"-->
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
            <!--                > <v-text-field
                @update:focused = "setUserId"-->
            <!--                  :theme="isdarkmode === true ? 'dark' : 'light'"-->
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
          <v-col cols="8" offset="2" align="center">
            <Toast />
            <v-btn
              color="primary"
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
          <v-col cols="8" offset="2" align="center">
            <v-btn
              color="secondary"
              @click="close"
              rounded="md"
              boarder="xl"
              width="60%"
              height="35"
              variant="elevated"
              >Back</v-btn
            >
          </v-col>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import Toast from 'primevue/toast'
const email_reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

export default {
  name: 'RegisterCompanyModal',
  components: {
    Toast
  },
  data() {
    return {
      dialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
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
      email_rules: [(val: string) => email_reg.test(val) || 'Email should contain an @ symbol'],
      vat_number_rules: [
        (v: string) => !!v || 'VAT number is required',
        (v: string) => /^\d{10}$/.test(v) || 'VAT number must be a valid South African VAT number'
      ],
      company_registration_number_rules: [
        (v: string) => !!v || 'Company registration number is required',
        (v: string) =>
          /^\d{4}\/\d{6}\/\d{2}$/.test(v) ||
          'Company registration number must be a valid South African number format: YYYY/NNNNNN/XX'
      ],
      phone_number_rules: [
        (v: string) => !!v || 'Phone number is required',
        (v: string) => /^0\d{9}$/.test(v) || 'Phone number must be a valid South African number'
      ],
      postal_code_rules: [
        (v: string) => !!v || 'Postal code  is required',
        (value: string) => /^\d{4}$/.test(value) || 'Postal code must be 4 digits'
      ],
      req_obj: {
        userId: localStorage.getItem('id'),
        name: '',
        type: '',
        registrationNumber: '',
        vatNumber: '',
        logo: '',
        contactDetails: {
          email: '',
          phoneNumber: ''
        },
        address: {
          province: '',
          street: '',
          suburb: '',
          city: '',
          postalCode: '',
          complex: '',
          houseNumber: ''
        }
        // employees: [],
        // inventoryItems: [],
        // private: false
      }
    }
  },
  methods: {
    async registrationHandler() {
      console.log(JSON.stringify(this.req_obj))
      console.log(this.req_obj)
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      axios
        .post(apiURL + 'company/create', this.req_obj, config)
        .then((res) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company registered successfully',
            life: 3000
          })
          console.log(res.data.data.id)

          localStorage['currentCompany'] = res.data.data._id
          // localStorage['employeeId'] = res.data.data.employees[0]

          console.log(res.data)

          axios
            .get(apiURL + 'company/id/' + res.data.data._id, config)
            .then((res) => {
              console.log(res.data.data)
              localStorage['employeeId'] = res.data.data.employees[0]
            })
            .catch((error) => {
              console.log('Error occured when storing employeeId: ', error)
            })

          this.$router.push('/dashboard')
        })
        .catch((res) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed Company Registration',
            life: 3000
          })
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
      this.dialog = false
    },
    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const file: File = target.files[0]
        const reader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === 'string') {
            this.req_obj.logo = e.target.result
          }
        }
        reader.readAsDataURL(file)
      }
      console.log(this.req_obj.logo)
    },
    print_base64_link() {
      console.log(this.req_obj.logo)
    },
    setUserId() {
      this.req_obj.userId = localStorage['id']
      console.log('userid set')
    }

    // base64image() {
    //   let read = new FileReader()
    //   read.readAsDataURL(this.req_obj.image)
    //   read.onload = () => {
    //     this.req_obj.image = read.result
    //   }
    // }
  },
  mounted() {
    this.req_obj.userId = localStorage['id']
  }
}
</script>

<style></style>
