<template>
  <v-dialog v-model="dialog" max-height="800" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        :color="buttonColor ? buttonColor : 'secondary'"
        v-bind="activatorProps"
        block
        >Register Company</v-btn
      >
    </template>
    <v-sheet elevation="14" rounded="md" max-width="600">
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="validateRegistration"
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
              <label style="font-size: 14px; font-weight: lighter"
                >Company Name
                <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
              </label>
              <v-text-field
                density="compact"
                color="cardColor"
                placeholder="Enter the company's name"
                v-model="req_obj.name"
                rounded="md"
                variant="solo"
                required
                data-testid="company-name-field"
              ></v-text-field
            ></v-col>
            <v-col>
              <label style="font-size: 14px; font-weight: lighter">Type of business </label>
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
                data-testid="type-of-company-autocomplete"
              ></v-autocomplete>
            </v-col>

            <v-col>
              <label style="font-size: 14px; font-weight: lighter"
                >Company email address
                <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
              </label>

              <v-text-field
                density="compact"
                color="cardColor"
                placeholder="Enter the company's email adress"
                type="email"
                :rules="email_rules"
                v-model="req_obj.contactDetails.email"
                rounded="md"
                variant="solo"
                required
                data-testid="company-email-address-field"
              ></v-text-field
            ></v-col>
            <v-col>
              <label style="font-size: 14px; font-weight: lighter"
                >Company phone number
                <label style="font-size: 14px; font-weight: lighter; color: red">*</label>
              </label>

              <v-text-field
                density="compact"
                color="cardColor"
                placeholder="Enter the company's phone number"
                rounded="md"
                variant="solo"
                v-model="req_obj.contactDetails.phoneNumber"
                :rules="phone_number_rules"
                required
                data-testid="company-phone-number-field"
              ></v-text-field
            ></v-col>
            <v-col>
              <label style="font-size: 14px; font-weight: lighter"
                >Company registration number</label
              >

              <v-text-field
                density="compact"
                color="cardColor"
                placeholder="Enter the company's registration number"
                v-model="req_obj.registrationNumber"
                :rules="company_registration_number_rules"
                rounded="md"
                variant="solo"
                required
                data-testid="company-registration-number-field"
              ></v-text-field
            ></v-col>

            <v-col>
              <label style="font-size: 14px; font-weight: lighter">Company VAT number</label>

              <v-text-field
                density="compact"
                color="cardColor"
                placeholder="Enter the company's VAT number"
                :rules="vat_number_rules"
                rounded="md"
                v-model="req_obj.vatNumber"
                variant="solo"
                required
                data-testid="company-VAT-field"
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption">Company logo</small>
              <v-file-input
                variant="solo"
                accept="image/*"
                width="100%"
                placeholder="Company Logo"
                @change="handleImageUpload"
                hint="Image size limit of  5MB"
                persistent-hint
                color="black"
                rounded="md"
                required
                data-testid="company-logo-file-input"
              ></v-file-input>
            </v-col>
            <label style="font-size: 14px; font-weight: lighter"
              >Company address
              <label style="font-size: 14px; font-weight: lighter; color: red">* </label>
            </label>

            <v-row class="d-flex flex-wrap">
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter"
                  >Street
                  <label style="font-size: 14px; font-weight: lighter; color: red">* </label>
                </label>
                <v-text-field
                  density="compact"
                  color="cardColor"
                  placeholder="Street"
                  rounded="md"
                  v-model="req_obj.address.street"
                  variant="solo"
                  required
                  :rules="street_rules"
                  data-testid="street-field"
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter"
                  >Suburb
                  <label style="font-size: 14px; font-weight: lighter; color: red">* </label>
                </label>
                <v-text-field
                  density="compact"
                  color="cardColor"
                  placeholder="Suburb"
                  rounded="md"
                  v-model="req_obj.address.suburb"
                  variant="solo"
                  required
                  :rules="suburb_rules"
                  data-testid="suburb-field"
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter"
                  >Province
                  <label style="font-size: 14px; font-weight: lighter; color: red">* </label>
                </label>
                <v-autocomplete
                  density="compact"
                  placeholder="Province"
                  color="cardColor"
                  v-model="req_obj.address.province"
                  rounded="md"
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
                  :rules="province_rules"
                  data-testid="province-autocomplete"
                ></v-autocomplete
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter"
                  >City/Town
                  <label style="font-size: 14px; font-weight: lighter; color: red">* </label>
                </label>
                <v-text-field
                  density="compact"
                  placeholder="City"
                  rounded="md"
                  v-model="req_obj.address.city"
                  variant="solo"
                  required
                  color="cardColor"
                  :rules="city_rules"
                  data-testid="city-town-field"
                ></v-text-field
              ></v-col>
              <v-col sm="6" cols="12">
                <label style="font-size: 11px; font-weight: lighter"
                  >Postal Code
                  <label style="font-size: 14px; font-weight: lighter; color: red">* </label>
                </label>
                <v-text-field
                  density="compact"
                  color="cardColor"
                  placeholder="Postal Code"
                  rounded="md"
                  v-model="req_obj.address.postalCode"
                  :rules="postal_code_rules"
                  variant="solo"
                  required
                  data-testid="postal-code-field"
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="6">
                <label style="font-size: 12px; font-weight: lighter">Complex/Building</label>
                <v-text-field
                  density="compact"
                  color="primary"
                  placeholder="Complex"
                  rounded="md"
                  v-model="req_obj.address.complex"
                  variant="solo"
                  required
                  hint="Complex or Building Name, unit number or floor"
                  persistent-hint
                  data-testid="complex-field"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn
                  color="secondary"
                  @click="close"
                  rounded="md"
                  boarder="xl"
                  size="large"
                  height="35"
                  variant="elevated"
                  data-testid="back-button"
                  block
                  >Back</v-btn
                >
              </v-col>
              <v-col cols="12" lg="6" order="first" order-lg="last">
                <Toast position="top-center" />
                <v-btn
                  color="primary"
                  type="submit"
                  rounded="md"
                  boarder="md"
                  size="large"
                  height="35"
                  variant="elevated"
                  :disabled="click_create_client"
                  block
                  data-testid="continue-button"
                  :loading="register_request_loading"
                  >Continue</v-btn
                >
              </v-col></v-row
            >
          </v-container>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import Toast from 'primevue/toast'

type ContactDetails = {
  email: string
  phoneNumber: string
}

type Address = {
  province: string
  street: string
  suburb: string
  city: string
  postalCode: string
  complex?: string
}

type RequestBody = {
  userId: string | null
  name: string
  type?: string
  registrationNumber?: string
  vatNumber?: string
  logo?: string
  contactDetails: ContactDetails
  address: Address
}
const email_reg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

export default {
  name: 'RegisterCompanyModal',
  components: {
    Toast
  },
  props: {
    buttonColor: String
  },
  data() {
    return {
      dialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      click_create_client: false,
      valid: true,
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
        (val: string) => !!val || 'Email is requered',
        (val: string) => email_reg.test(val) || 'Email should contain an @ symbol'
      ],
      vat_number_rules: [
        (v: string) =>
          !v || /^\d{10}$/.test(v) || 'VAT number must be a valid South African VAT number'
      ],
      company_registration_number_rules: [
        (v: string) =>
          !v ||
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
      street_rules: [(v: string) => !!v || 'Street is required'],
      suburb_rules: [(v: string) => !!v || 'Suburb is required'],
      province_rules: [(v: string) => !!v || 'Province is required'],
      city_rules: [(v: string) => !!v || 'City is required'],
      register_request_loading: false,
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
          complex: ''
        }
      } as RequestBody
    }
  },
  methods: {
    async validateRegistration() {
      const form = this.$refs.form as InstanceType<typeof HTMLFormElement>
      const validate = await (form as any).validate()

      this.req_obj.registrationNumber || delete this.req_obj.registrationNumber
      this.req_obj.vatNumber || delete this.req_obj.vatNumber
      this.req_obj.address.complex || delete this.req_obj.address.complex
      this.req_obj.logo || delete this.req_obj.logo
      this.req_obj.type || delete this.req_obj.type

      console.log('hello')
      console.log(validate)
      this.req_obj.userId = localStorage['id']
      if (validate.valid) {
        this.register_request_loading = true
        await this.registrationHandler()
      }
    },

    async registrationHandler(): Promise<void> {
      console.log(JSON.stringify(this.req_obj))
      console.log(this.req_obj)
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      axios
        .post(apiURL + 'company/create', this.req_obj, config)
        .then((res) => {
          console.log(res)
          localStorage['currentCompany'] = res.data._id
          localStorage['currentCompanyName'] = res.data.data.name
          localStorage['employeeId'] = res.data.ownerId
          this.register_request_loading = false
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company Registered Successfully',
            life: 3000
          })
          setTimeout(() => {
            this.$router.push({ name: 'dashboard' })
          }, 3000)
        })
        .catch((res) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed Company Registration',
            life: 3000
          })
          console.log(res)
          this.register_request_loading = false
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
    }
  },
  mounted() {
    this.req_obj.userId = localStorage['id']
  }
}
</script>

<style></style>
