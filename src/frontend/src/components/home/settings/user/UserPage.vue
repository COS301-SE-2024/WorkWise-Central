<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1>Your Profile</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-container class="d-flex flex-column align-center justify-center">
      <v-row>
        <v-col cols="12" md="3" class="text-center" sm="12" order-sm="1" order-md="0" order="1">
          <userAvatar />
        </v-col>
        <!-- Personal Information -->
        <v-col cols="12" md="5" order-sm="2" order-md="1" order="2">
          <v-form ref="form" @submit.prevent>
            <v-row>
              <!-- Personal Information Header -->
              <v-col cols="12">
                <v-divider>
                  <h5 class="mb-2">Personal Information</h5>
                </v-divider>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="firstName" class="v-text-field-label">First Name</label>
                  <v-text-field id="firstName" v-model="user.firstName" hide-details></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="surname" class="v-text-field-label">Surname</label>
                  <v-text-field id="surname" v-model="user.surname" hide-details></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="dateOfBirth" class="v-text-field-label">Date of Birth</label>
                  <v-text-field
                    id="dateOfBirth"
                    v-model="user.dateOfBirth"
                    type="date"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="gender" class="v-text-field-label">Gender</label>
                  <v-select
                    id="gender"
                    v-model="user.gender"
                    :items="genderOptions"
                    variant="solo"
                  ></v-select>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="phone" class="v-text-field-label">Phone</label>
                  <v-text-field
                    id="phone"
                    v-model="user.contactInfo.phone"
                    :rules="phoneRules"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="email" class="v-text-field-label">Email</label>
                  <v-text-field
                    id="email"
                    v-model="user.contactInfo.email"
                    :rules="emailRules"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="preferredLanguage" class="v-text-field-label"
                    >Preferred Language</label
                  >
                  <v-select
                    id="preferredLanguage"
                    v-model="user.preferredLanguage"
                    :items="languageOptions"
                    variant="solo"
                  ></v-select>
                </div>
              </v-col>

              <!-- Address Information Header -->
              <v-col cols="12">
                <v-divider>
                  <h5 class="mb-2">Address Information</h5>
                </v-divider>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="street" class="v-text-field-label">Street</label>
                  <v-text-field
                    id="street"
                    v-model="user.address.street"
                    hide-details
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="suburb" class="v-text-field-label">Suburb</label>
                  <v-text-field
                    id="suburb"
                    v-model="user.address.suburb"
                    hide-details
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="city" class="v-text-field-label">City</label>
                  <v-text-field id="city" v-model="user.address.city" hide-details></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="postalCode" class="v-text-field-label">Postal Code</label>
                  <v-text-field
                    id="postalCode"
                    v-model="user.address.postalCode"
                    hide-details
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="complex" class="v-text-field-label">Complex</label>
                  <v-text-field
                    id="complex"
                    v-model="user.address.complex"
                    hide-details
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="v-text-field-wrapper">
                  <label for="houseNumber" class="v-text-field-label">House Number</label>
                  <v-text-field id="houseNumber" v-model="user.address.houseNumber"></v-text-field>
                </div>
              </v-col>
            </v-row>

            <div class="text-center">
              <v-btn color="primary" @click="submitForm">Update Profile</v-btn>
            </div>
          </v-form>
        </v-col>
        <!-- This should not be visible for       -->
        <v-col cols="12" md="4" order-sm="0" order-md="2" order="0" class="pt-8">
          <settingsMenu />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import settingsMenu from '@/components/home/settings/SettingsMenu.vue'
import userAvatar from '@/components/home/settings/user/UserProfileAvatar.vue'

// Use router
const router = useRouter()

// Define user data
const user = ref({
  firstName: '',
  surname: '',
  dateOfBirth: '',
  gender: '',
  preferredLanguage: '',
  contactInfo: {
    phone: '',
    email: ''
  },
  address: {
    street: '',
    suburb: '',
    city: '',
    postalCode: '',
    complex: '',
    houseNumber: ''
  }
})

// Define form data
const form = ref({
  avatar: null
})

// Define options and rules
const genderOptions = ['Male', 'Female', 'Other']
const languageOptions = [
  'Afrikaans',
  'English',
  'isiNdebele',
  'isiXhosa',
  'isiZulu',
  'Sepedi',
  'Sesotho',
  'Setswana',
  'siSwati',
  'Tshivenda',
  'Xitsonga'
]

//Define rules
const phoneRules = [
  (v: string) => (!!v && /^[0-9]{10}$/.test(v)) || 'Phone number must be 10 digits long and numeric'
]
const emailRules = [(v: string) => (!!v && /.+@.+/.test(v)) || 'E-mail must be valid']

// Define method
const submitForm = () => {
  // Placeholder method for submitting the form
}
</script>
