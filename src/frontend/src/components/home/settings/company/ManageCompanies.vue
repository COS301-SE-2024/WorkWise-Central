<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1>Company Management</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" class="d-flex flex-column">
        <v-form ref="companyForm" @submit.prevent="saveCompanySettings" class="text-center">
          <v-col cols="12" class="w-100">
            <v-divider class="w-100">
              <h5 class="mb-2">Current Companies</h5>
            </v-divider>
            <p>
              Below are the companies you are currently part of. You can switch to any company or
              leave a company if needed.
            </p>
          </v-col>

          <v-card v-for="company in companies" :key="company.id" class="mb-4 elevation-0 w-100">
            <v-card-title class="text-h6">{{ company.name }}</v-card-title>
            <v-card-text>
              <p>{{ company.description }}</p>
              <div>
                <v-btn @click="switchCompany(company)" color="success">
                  <v-icon left>{{ 'fa: fa-solid fa-briefcase' }}</v-icon> Switch to this company
                </v-btn>
                <v-btn @click="leaveCompany(company)" color="warning">
                  <v-icon left>{{ 'fa: fa-solid fa-door-open' }}</v-icon> Leave this company
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <v-col cols="12">
            <v-divider>
              <h5 class="mb-2">Join a New Company</h5>
            </v-divider>
            <p>
              Here you can join a new company by searching for its name or entering the company ID
              or searching for a company by name. Make sure you have the correct details to ensure
              successful joining.
            </p>
          </v-col>

          <v-card class="mb-4 elevation-0">
            <v-card-title class="text-h6">Join a New Company</v-card-title>
            <v-card-text>
              <JoinCompany />
            </v-card-text>
          </v-card>

          <v-col cols="12" class="w-100">
            <v-divider class="w-100">
              <h5 class="mb-2">Recently Left Companies</h5>
            </v-divider>
            <p>
              Below are the companies you have recently left. You can choose to rejoin them or
              permanently leave them if desired.
            </p>
          </v-col>

          <v-card v-for="company in companies" :key="company.id" class="mb-4 elevation-0 w-100">
            <v-card-title class="text-h6">{{ company.name }}</v-card-title>
            <v-card-text>
              <p>{{ company.description }}</p>
              <div>
                <v-btn @click="switchCompany(company)">
                  <v-icon left>{{ 'fa: fa-solid fa-exchange-alt' }}</v-icon> Rejoin the company
                </v-btn>
                <v-btn color="red" @click="leaveCompany(company)">
                  <v-icon left>{{ 'fa: fa-solid fa-sign-out-alt' }}</v-icon> Permanently leave the
                  company
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <v-btn type="submit">Save Company Settings</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import JoinCompany from '@/components/signup/JoinCompanyModal.vue'

interface Company {
  id: string
  name: string
  description: string
}

const companies = reactive<Company[]>([
  // Example company data, replace with actual data fetching
  { id: '1', name: 'Company A', description: 'Description of Company A' },
  { id: '2', name: 'Company B', description: 'Description of Company B' }
])

const newCompanyCode = ref('')
const companyCodeRules = [(v: string) => !!v || 'Company code is required']
const leftCompanies = ref<Company[]>([])
const undoTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const saveCompanySettings = () => {
  console.log('Saving company settings:', companies)
}

const switchCompany = (company: Company) => {
  console.log('Switching to company:', company.name)
}

const joinCompany = () => {
  console.log('Joining new company with code:', newCompanyCode.value)
}

const leaveCompany = (company: Company) => {
  console.log('Leaving company:', company.name)
  leftCompanies.value.push(company)
  companies.splice(companies.indexOf(company), 1)

  console.log('Notifying company about the departure:', company.name)

  undoTimeout.value = setTimeout(() => {
    leftCompanies.value = leftCompanies.value.filter((c) => c.id !== company.id)
  }, 30000)
}

const undoLeaveCompany = (company: Company) => {
  companies.push(company)
  leftCompanies.value = leftCompanies.value.filter((c) => c.id !== company.id)
  if (undoTimeout.value) {
    clearTimeout(undoTimeout.value)
  }
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.settingsMenu {
  width: 100%;
}
</style>
