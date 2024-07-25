<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1>Company Management</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" md="8" order-md="0" order="1" class="d-flex flex-column">
        <v-form ref="companyForm" @submit.prevent="saveCompanySettings" class="text-center">
          <v-col cols="12" class="w-100">
            <v-divider class="w-100">
              <h5 class="mb-2">Current Companies</h5>
            </v-divider>
          </v-col>

          <v-card v-for="company in companies" :key="company.id" class="mb-4 elevation-0 w-100">
            <v-card-title class="text-h6">{{ company.name }}</v-card-title>
            <v-card-text>
              <p>{{ company.description }}</p>
              <v-btn @click="switchCompany(company)">Switch to this company</v-btn>
              <v-btn color="red" @click="leaveCompany(company)">Leave this company</v-btn>
            </v-card-text>
          </v-card>

          <v-col cols="12">
            <v-divider>
              <h5 class="mb-2">Join a New Company</h5>
            </v-divider>
          </v-col>

          <v-card class="mb-4 elevation-0">
            <v-card-title class="text-h6">Join a New Company</v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="newCompanyCode"
                  label="Company Code"
                  :rules="companyCodeRules"
                  required
              ></v-text-field>
              <v-btn @click="joinCompany">Join Company</v-btn>
            </v-card-text>
          </v-card>

          <v-btn type="submit">Save Company Settings</v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" order-md="1" order="0" md="4" class="pt-11">
        <settingsMenu style="width: 100%" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import settingsMenu from '@/components/home/settings/SettingsMenu.vue';

export default defineComponent({
  name: 'CompanyManagementPage',
  components: { settingsMenu },
  data() {
    return {
      companies: [
        // Example company data, replace with actual data fetching
        { id: '1', name: 'Company A', description: 'Description of Company A' },
        { id: '2', name: 'Company B', description: 'Description of Company B' }
      ],
      newCompanyCode: '',
      companyCodeRules: [(v: string) => !!v || 'Company code is required'],
      leftCompanies: [],
      undoTimeout: null
    };
  },
  methods: {
    saveCompanySettings() {
      // Placeholder method to save company settings
      console.log('Saving company settings:', this.companies);
      // Add logic to save the company settings here
    },
    switchCompany(company: any) {
      // Logic to switch the current company
      console.log('Switching to company:', company.name);
      // Add logic to switch to the selected company
    },
    joinCompany() {
      // Logic to join a new company using the provided company code
      console.log('Joining new company with code:', this.newCompanyCode);
      // Add logic to join the new company using the provided company code
    },
    leaveCompany(company: any) {
      // Logic to leave the selected company
      console.log('Leaving company:', company.name);
      this.leftCompanies.push(company);
      this.companies = this.companies.filter(c => c.id !== company.id);

      // Notify the company
      console.log('Notifying company about the departure:', company.name);

      // Allow undo action for 30 seconds
      this.undoTimeout = setTimeout(() => {
        this.leftCompanies = this.leftCompanies.filter(c => c.id !== company.id);
      }, 30000);
    },
    undoLeaveCompany(company: any) {
      // Logic to undo leaving the company
      this.companies.push(company);
      this.leftCompanies = this.leftCompanies.filter(c => c.id !== company.id);
      clearTimeout(this.undoTimeout);
    }
  }
});
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.settingsMenu {
  width: 100%;
}
</style>
