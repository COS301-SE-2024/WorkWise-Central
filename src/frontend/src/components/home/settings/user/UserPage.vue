<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1>Your Profile</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="pl-15">
        <settingsMenu/>
      </v-col>
      <!-- Personal Information -->
      <v-col cols="5" class="pl-15">
        <v-label>First Name</v-label>
        <v-text-field v-model="user.firstName" label="First Name"></v-text-field>
        <v-label>Surname</v-label>
        <v-text-field v-model="user.surname" label="Surname"></v-text-field>
        <v-label>Date of Birth</v-label>
        <v-text-field v-model="user.dateOfBirth" label="Date of Birth" type="date"></v-text-field>
        <v-label>Gender</v-label>
        <v-text-field v-model="user.gender" label="Gender"></v-text-field>
        <v-label>Preferred Language</v-label>
        <v-text-field v-model="user.preferredLanguage" label="Preferred Language"></v-text-field>
        <v-label>Phone</v-label>
        <v-text-field v-model="user.contactInfo.phone" label="Phone"></v-text-field>
        <v-label>Email address</v-label>
        <v-text-field v-model="user.contactInfo.email" label="Email"></v-text-field>
        <v-label>Street</v-label>
        <v-text-field v-model="user.address.street" label="Street"></v-text-field>
        <v-label>Surburb</v-label>
        <v-text-field v-model="user.address.suburb" label="Suburb"></v-text-field>
        <v-label>City</v-label>
        <v-text-field v-model="user.address.city" label="City"></v-text-field>
        <v-label>Postal Code</v-label>
        <v-text-field v-model="user.address.postalCode" label="Postal Code"></v-text-field>
        <v-label>Complex</v-label>
        <v-text-field v-model="user.address.complex" label="Complex"></v-text-field>
        <v-label>House Number</v-label>
        <v-text-field v-model="user.address.houseNumber" label="House Number"></v-text-field>
      </v-col>
      <v-col cols="2" class="pl-15">
        <v-avatar color="grey" size="150">
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" cover></v-img>
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Menu from 'primevue/menu'
import { useRouter } from 'vue-router'
import settingsMenu from '@/components/home/settings/SettingsMenu.vue'

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

</script>
<style></style>
