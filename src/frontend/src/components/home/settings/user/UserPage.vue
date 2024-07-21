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
        <v-col cols="12" md="3" class="text-center" sm="12">
          <userAvatar />
        </v-col>
        <!-- Personal Information -->
        <v-col cols="12" md="5">
          <v-form ref="form" @submit.prevent>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.firstName"
                  label="First Name"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.surname"
                  label="Surname"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="user.gender"
                  :items="genderOptions"
                  label="Gender"
                  hide-details="auto"
                  variant="solo"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="user.preferredLanguage"
                  :items="languageOptions"
                  label="Preferred Language"
                  variant="solo"
                  hide-details="auto"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.contactInfo.phone"
                  :rules="phoneRules"
                  label="Phone"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.contactInfo.email"
                  :rules="emailRules"
                  label="Email"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <!-- Address fields -->
              <!-- ... (address fields omitted for brevity) -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.address.street"
                  label="Street"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.address.suburb"
                  label="Suburb"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.address.city"
                  label="City"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.address.postalCode"
                  label="Postal Code"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.address.complex"
                  label="Complex"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="user.address.houseNumber"
                  label="House Number"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn color="primary" @click="submitForm">Update Profile</v-btn>
            </div>
          </v-form>
        </v-col>
        <!-- This should not be visible for       -->
        <v-col cols="12" md="4">
          <settingsMenu />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import settingsMenu from '@/components/home/settings/SettingsMenu.vue'
import userAvatar from '@/components/home/settings/user/UserProfileAvatar.vue'

export default defineComponent({
  name: 'UserPage',
  components: {
    settingsMenu,
    userAvatar
  },
  methods: {
    submitForm() {
      // Placeholder method for submitting the form
    }
  },
  data() {
    return {
      user: {
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
      },
      form: {
        avatar: null
      },
      genderOptions: ['Male', 'Female', 'Other'],
      languageOptions: [
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
      ],
      phoneRules: [
        (v: string) =>
          (!!v && /^[0-9]{10}$/.test(v)) || 'Phone number must be 10 digits long and numeric'
      ],
      emailRules: [(v: string) => (!!v && /.+@.+/.test(v)) || 'E-mail must be valid']
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  }
})
</script>

<style scoped></style>
