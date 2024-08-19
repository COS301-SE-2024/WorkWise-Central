<template>
  <v-app>
    <v-container>
      <v-row class="justify-center align-center">
        <v-col cols="12" class="text-center">
          <h1>Company Management</h1>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12">
          <v-tabs bg-color="secondary">
            <v-tab v-for="tab in tabs" :key="tab" @click="changeTab(tab)">
              {{ tab }}
            </v-tab>
            <v-spacer></v-spacer>
          </v-tabs>
          <v-tabs-items
            ><v-tab-item v-if="currentTab === 'Current Companies'">
              <v-card
                height="auto"
                class="pa-11 ma-0 bg-cardColor"
                rounded="md"
                :theme="isDarkMode ? 'themes.dark' : 'themes.light'"
                border="md"
              >
                <v-card-title>
                  <v-row align="center" justify="space-between">
                    <v-col cols="12" lg="4" class="d-flex justify-start align-center">
                      <v-icon icon="fa: fa-solid fa-building"></v-icon>
                      <v-label
                        class="ms-2 h4 font-family-Nunito text-headingTextColor"
                        height="auto"
                        width="auto"
                        >Current Companies</v-label
                      >
                    </v-col>

                    <v-col cols="12" lg="4" class="d-flex justify-center">
                      <v-text-field
                        v-model="search"
                        density="compact"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        flat
                        color="primary"
                        style="
                          font-family: 'Lato', sans-serif;
                          font-size: 15px;
                          font-weight: lighter;
                        "
                        hide-details
                        single-line
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" md="4" sm="4">
                      <JoinCompany :buttonColor="'secondary'"
                    /></v-col> </v-row
                ></v-card-title>
                <v-card-text>
                  <v-divider></v-divider>
                  <v-data-table
                    :items="companies"
                    :headers="companyHeaders"
                    label="Current Companies"
                    height="auto"
                    rounded="xl"
                    class="bg-cardColor"
                    :row-props="getRowProps"
                    :header-props="{ class: 'bg-secondRowColor h6' }"
                  >
                    <template #[`item.actions`]="{ item }">
                      <v-menu max-width="500px" :theme="isDarkMode === true ? 'dark' : 'light'">
                        <template v-slot:activator="{ props }">
                          <v-btn rounded="xl" variant="plain" v-bind="props">
                            <v-icon color="primary">mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-btn @click="switchCompany(item)" color="success">
                              <v-icon left color="success">{{
                                'fa: fa-solid fa-briefcase'
                              }}</v-icon>
                              Switch to this company
                            </v-btn></v-list-item
                          >
                          <v-list-item>
                            <v-btn @click="leaveCompany(item)" color="warning">
                              <v-icon left color="warning">{{
                                'fa: fa-solid fa-door-open'
                              }}</v-icon>
                              Leave this company
                            </v-btn></v-list-item
                          >
                        </v-list>
                      </v-menu>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="currentTab === 'Recently Left Companies'">
              <v-card
                height="auto"
                class="pa-11 ma-0 bg-cardColor"
                rounded="md"
                :theme="isDarkMode ? 'themes.dark' : 'themes.light'"
                border="md"
              >
                <v-card-title>
                  <v-row align="center" justify="space-between">
                    <v-col cols="12" lg="4" class="d-flex justify-start align-center">
                      <v-icon icon="fa: fa-solid fa-building"></v-icon>
                      <v-label
                        class="ms-2 h4 font-family-Nunito text-headingTextColor"
                        height="auto"
                        width="auto"
                        >Recently Left Companies</v-label
                      >
                    </v-col>

                    <v-col cols="12" lg="4" class="d-flex justify-center">
                      <v-text-field
                        v-model="search"
                        density="compact"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        flat
                        color="primary"
                        style="
                          font-family: 'Lato', sans-serif;
                          font-size: 15px;
                          font-weight: lighter;
                        "
                        hide-details
                        single-line
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <RegisterCompanyModal :buttonColor="'secondary'"
                    /></v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-divider></v-divider>
                  <v-data-table
                    :items="leftCompanies"
                    :headers="leftCompanyHeaders"
                    height="auto"
                    rounded="xl"
                    class="bg-cardColor"
                    :row-props="getRowProps"
                    :header-props="{ class: 'bg-secondRowColor h6' }"
                  >
                    <template #[`item.actions`]="{ item }">
                      <v-menu max-width="500px" :theme="isDarkMode === true ? 'dark' : 'light'">
                        <template v-slot:activator="{ props }">
                          <v-btn rounded="xl" variant="plain" v-bind="props">
                            <v-icon color="primary">mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-btn @click="rejoinCompany(item)" color="success">
                              <v-icon left color="success">{{
                                'fa: fa-solid fa-exchange-alt'
                              }}</v-icon>
                              Rejoin the company
                            </v-btn></v-list-item
                          >
                          <v-list-item>
                            <v-btn color="red" @click="permanentlyLeaveCompany(item)">
                              <v-icon left color="red">{{ 'fa: fa-solid fa-sign-out-alt' }}</v-icon>
                              Permanently leave the company
                            </v-btn></v-list-item
                          >
                        </v-list>
                      </v-menu>
                    </template>
                  </v-data-table></v-card-text
                >
              </v-card>
            </v-tab-item>
            <v-tab-item v-if="currentTab === 'Company Invites'">
              <InvitePage />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>

       <Toast position="top-center" />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import JoinCompany from '@/components/signup/JoinCompanyModal.vue'
import InvitePage from '../user/InvitePage.vue'
import RegisterCompanyModal from '@/components/signup/RegisterCompanyModal.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'

const toast = useToast()
const showWarningModal = ref(false)

const joinedCompanies = reactive<Company[]>([])
const companies = reactive<Company[]>([
  // Example company data, replace with actual data fetching
  { id: '1', name: 'Company A' },
  { id: '2', name: 'Company B'}
])

interface Company {
  id: string
  name: string
}
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}
// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const setUserCompanies = async() => {
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}users/id/${localStorage.getItem('id')}`, config)
    if (response.status < 300 && response.status > 199) {
      const companiesData = response.data.data.joinedCompanies
      joinedCompanies.splice(0, joinedCompanies.length, ...companiesData.map((company: any) => ({
        id: company.companyId,
        name: company.companyName
      })))
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching companies' })
    }
  } catch (error) {
    console.error('Error getting user companies', error)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching companies' })
  }
}

const newCompanyCode = ref('')
const companyCodeRules = [(v: string) => !!v || 'Company code is required']
const leftCompanies = ref<Company[]>([
  { id: '3', name: 'Company C', description: 'Description of Company C' },
  { id: '4', name: 'Company D', description: 'Description of Company D' }
])
const undoTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const joinCompanyModal = ref(false)

const saveCompanySettings = () => {
  console.log('Saving company settings:', companies)
}
const changeTab = (tab: string) => {
  currentTab.value = tab
}

const joinCompany = () => {
  console.log('Joining new company with code:', newCompanyCode.value)
}

const leaveCompany = (company: Company) => {
  showWarningModal.value = true
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

onMounted(() => {
  setUserCompanies()
})

const rejoinCompany = (company: Company) => {
  console.log('Rejoining company:', company.name)
  companies.push(company)
  leftCompanies.value = leftCompanies.value.filter((c) => c.id !== company.id)
}

const permanentlyLeaveCompany = (company: Company) => {
  console.log('Permanently leaving company:', company.name)
  leftCompanies.value = leftCompanies.value.filter((c) => c.id !== company.id)
}

const showJoinCompanyModal = () => {
  joinCompanyModal.value = true
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
