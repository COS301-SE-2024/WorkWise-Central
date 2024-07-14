<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1>Your Profile</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" class="pl-15">
        <settingsMenu/>
      </v-col>
      <!-- Personal Information -->
      <v-col cols="12" md="5" class="pl-15">
        <v-form ref="form" @submit.prevent>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.firstName" label="First Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.surname" label="Surname"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.dateOfBirth" label="Date of Birth" type="date"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="user.gender" :items="genderOptions" label="Gender" variant="solo"></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="user.preferredLanguage" :items="languageOptions" label="Preferred Language" variant="solo"></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.contactInfo.phone" :rules="phoneRules" label="Phone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.contactInfo.email" :rules="emailRules" label="Email"></v-text-field>
            </v-col>
            <!-- Address fields -->
            <!-- ... (address fields omitted for brevity) -->
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address.street" label="Street"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address.suburb" label="Suburb"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address.city" label="City"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address.postalCode" label="Postal Code"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address.complex" label="Complex"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="user.address.houseNumber" label="House Number"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" md="3" class="pl-15">
        <userAvatar/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import settingsMenu from '@/components/home/settings/SettingsMenu.vue';
import userAvatar from '@/components/home/settings/user/UserProfileAvatar.vue';

export default defineComponent({
  name: 'UserPage',
  components: {
    settingsMenu,
    userAvatar
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
        'Afrikaans', 'English', 'isiNdebele', 'isiXhosa', 'isiZulu',
        'Sepedi', 'Sesotho', 'Setswana', 'siSwati', 'Tshivenda', 'Xitsonga'
      ],
      phoneRules: [
        v => !!v && /^[0-9]{10}$/.test(v) || 'Phone number must be 10 digits long and numeric'
      ],
      emailRules: [
        v => !!v && /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  }
});
</script>

<style scoped>
.pl-15 {
  padding-left: 15px;
}
</style>


