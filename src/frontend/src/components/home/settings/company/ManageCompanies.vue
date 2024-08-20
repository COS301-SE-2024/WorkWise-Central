<template>
  <v-app :style="isDarkMode === true ? 'dark' : 'light'">
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
              <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
                <v-card-title>
                  <v-row align="center" justify="space-between">
                    <v-col cols="12" lg="4">
                      <v-icon icon="fa: fa-solid fa-building"></v-icon>
                      <v-label
                        class="ms-2 h4 font-family-Nunito text-headingTextColor"
                        height="auto"
                        width="auto"
                        >Current Companies</v-label
                      >
                    </v-col>

                    <v-col cols="12" lg="4">
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
                      <JoinCompany :buttonColor="'secondary'"
                    /></v-col> </v-row
                ></v-card-title>
                <v-card-text>
                  <v-divider></v-divider>
                  <v-data-table
                    :items="joinedCompanies"
                    :headers="companyHeaders"
                    label="Current Companies"
                    height="auto"
                    rounded="xl"
                    class="bg-cardColor"
                    :row-props="getRowProps"
                  >
                    <template #[`item.actions`]="{ item }">
                      <v-menu max-width="500px">
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
              <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
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
                  >
                    <template #[`item.actions`]="{ item }">
                      <v-menu max-width="500px">
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
import JoinCompany from '../signup/JoinCompanyModal.vue'
import InvitePage from '../user/InvitePage.vue'
import RegisterCompanyModal from '../signup/RegisterCompanyModal.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'

// Interfaces
interface Company {
  id: string
  name: string
}

// Declared variables and v-models
const toast = useToast()
const search = ref('')
const isDarkMode = localStorage.getItem('theme') === 'true' ? true : false
const tabs = ['Current Companies', 'Recently Left Companies', 'Company Invites']
const currentTab = ref('Current Companies')
//Company Variables
const newCompanyCode = ref('')
const companyCodeRules = [(v: string) => !!v || 'Company code is required']
const joinedCompanies = reactive<Company[]>([])
const leftCompanies = ref<Company[]>([
  { id: '3', name: 'Company C' },
  { id: '4', name: 'Company D' }
])
const undoTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const joinCompanyModal = ref(false)

// Table Headers
const companyHeaders = [
  { title: 'Company Name', value: 'name' },
  { title: 'Actions', value: 'actions', sortable: false }
]
const leftCompanyHeaders = [
  { title: 'Company Name', value: 'name' },
  { title: 'Actions', value: 'actions', sortable: false }
]
// Table Data
const companies = reactive<Company[]>([
  { id: '1', name: 'Company A' },
  { id: '2', name: 'Company B' }
])

// API URLs and configs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

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

const getRowProps = ({ index }: any) => {
  return {
    class: index % 2 ? 'bg-secondRowColor' : ''
  }
}

const changeTab = (tab: string) => {
  currentTab.value = tab
}

onMounted(() => {
  setUserCompanies()
})

// Company management actions

const rejoinCompany = (company: Company) => {
  console.log('Rejoining company:', company.name)
  companies.push(company)
  leftCompanies.value = leftCompanies.value.filter((c) => c.id !== company.id)
}

const permanentlyLeaveCompany = (company: Company) => {
  console.log('Permanently leaving company:', company.name)
  leftCompanies.value = leftCompanies.value.filter((c) => c.id !== company.id)
}

const setUserCompanies = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}users/id/${localStorage.getItem('id')}`, config)
    if (response.status < 300 && response.status > 199) {
      const companiesData = response.data.data.joinedCompanies
      joinedCompanies.splice(
        0,
        joinedCompanies.length,
        ...companiesData.map((company: any) => ({
          id: company.companyId,
          name: company.companyName
        }))
      )
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching companies' })
    }
  } catch (error) {
    console.error('Error getting user companies', error)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching companies' })
  }
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

const saveCompanySettings = () => {
  console.log('Saving company settings:', companies)
}

const switchCompany = (company: Company) => {
  console.log('Switching to company:', company.name)
}

const joinCompany = () => {
  console.log('Joining new company with code:', newCompanyCode.value)
}

const showJoinCompanyModal = () => {
  joinCompanyModal.value = true
}
</script>
