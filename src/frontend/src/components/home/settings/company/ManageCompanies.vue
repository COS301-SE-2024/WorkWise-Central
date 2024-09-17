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
                      <JoinCompanyModal :buttonColor="'secondary'"
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
                            <v-btn @click="showConfirmLeaveDialog(item)" color="warning">
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
      <v-dialog v-model="confirmLeaveDialog" max-width="500px">
        <v-card class="bg-cardColor">
          <v-card-title class="headline">Confirm Leave</v-card-title>
          <v-card-text> Are you sure you want to leave the company? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="confirmLeaveDialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" @click="confirmLeaveCompany">Leave</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import JoinCompanyModal from '@/components/signup/JoinCompanyModal.vue'
import InvitePage from '../user/InvitePage.vue'
import RegisterCompanyModal from '@/components/signup/RegisterCompanyModal.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

// Interfaces
interface Company {
  companyId: string
  name: string
  employeeId: string
}

// Declared variables and v-models
const toast = useToast()
const search = ref('')
const isDarkMode = localStorage.getItem('theme') === 'true'
const tabs = ['Current Companies', 'Recently Left Companies', 'Company Invites']
const currentTab = ref('Current Companies')
const newCompanyCode = ref('')
const companyCodeRules = [(v: string) => !!v || 'Company code is required']
const joinedCompanies = ref<Company[]>([])
const leftCompanies = ref<Company[]>([])
const undoTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const joinCompanyModal = ref(false)
const confirmLeaveDialog = ref(false)
const selectedCompany = ref<Company | null>(null)

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
const companies = ref<Company[]>([])

// API URLs and configs
const localUrl = 'http://localhost:3000/'
const remoteUrl = 'https://tuksapi.sharpsoftwaresolutions.net/'
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
    return res.status >= 200 && res.status < 300
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const getRowProps = ({ index }: any) => ({
  class: index % 2 ? 'bg-secondRowColor' : ''
})

const changeTab = (tab: string) => {
  currentTab.value = tab
}

// Company management actions
const setUserCompanies = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}users/id/${localStorage.getItem('id')}`, config)
    if (response.status >= 200 && response.status < 300) {
      const companiesData = response.data.data.joinedCompanies
      console.log('Company data:', companiesData)
      joinedCompanies.value.splice(
        0,
        joinedCompanies.value.length,
        ...companiesData.map((company: any) => ({
          companyId: company.companyId,
          employeeId: company.employeeId,
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

const leaveCompany = async (company: Company) => {
  console.log('Leaving company:', company.name)

  // Ensure the company exists in the joinedCompanies array
  const companyIndex = joinedCompanies.value.findIndex((c) => c.companyId === company.companyId)
  if (companyIndex === -1) {
    console.error('Company not found in joined companies')
    return
  }

  leftCompanies.value.push(company)
  joinedCompanies.value.splice(companyIndex, 1)
  console.log('Notifying company about the departure:', company.name)

  undoTimeout.value = setTimeout(() => {
    leftCompanies.value = leftCompanies.value.filter((c) => c.companyId !== company.companyId)
  }, 30000)

  const apiUrl = await getRequestUrl()
  try {
    const body = {
      currentEmployee: company.employeeId,
      companyToLeaveId: company.companyId,
      reason: ''
    }
    const response = await axios.patch(`${apiUrl}company/leave/`, body, config)
    if (response.status >= 200 && response.status < 300) {
      leaveCompanyToast(company.name)
      if (joinedCompanies.value.length > 0) {
        await switchCompany(joinedCompanies.value[0])
      } else {
        localStorage.removeItem('currentCompany')
        localStorage.removeItem('employeeId')
        localStorage.removeItem('roleId')
        localStorage.removeItem('currentCompanyName')
        window.location.reload()
      }
      console.log('Company leave response:', response)
    } else {
      leaveCompanyFailureToast(company.name)
    }
  } catch (error) {
    console.log(error)
    leaveCompanyFailureToast(company.name)
  }
}
const rejoinCompany = (company: Company) => {
  console.log('Rejoining company:', company.name)
  companies.value.push(company)
  leftCompanies.value = leftCompanies.value.filter((c) => c.companyId !== company.companyId)
}

const permanentlyLeaveCompany = (company: Company) => {
  console.log('Permanently leaving company:', company.name)
  leftCompanies.value = leftCompanies.value.filter((c) => c.companyId !== company.companyId)
}

// Dialog actions
const showConfirmLeaveDialog = (company: Company) => {
  selectedCompany.value = company
  confirmLeaveDialog.value = true
}

const confirmLeaveCompany = () => {
  if (selectedCompany.value) {
    leaveCompany(selectedCompany.value)
    confirmLeaveDialog.value = false
  }
}

const undoLeaveCompany = (company: Company) => {
  companies.value.push(company)
  leftCompanies.value = leftCompanies.value.filter((c) => c.companyId !== company.companyId)
  if (undoTimeout.value) {
    clearTimeout(undoTimeout.value)
  }
}

// Save settings
const saveCompanySettings = () => {
  console.log('Saving company settings:', companies)
}

// Switch company
const switchCompany = async (company: Company) => {
  localStorage.setItem('currentCompany', company.companyId)
  localStorage.setItem('employeeId', company.employeeId)
  localStorage.setItem('currentCompanyName', company.name)
  const apiUrl = getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}employee/id/${company.employeeId}`, config)
    console.log('Returned employee', response)
    // const roleId = response.data.data.role.roleId
    // localStorage.setItem('roleId', roleId)
    window.location.reload()
  } catch (error) {
    console.log('Failed to set role:', error)
  }
}

// Join company
const joinCompany = () => {
  console.log('Joining new company with code:', newCompanyCode.value)
}

const showJoinCompanyModal = () => {
  joinCompanyModal.value = true
}

// Toast notifications
const leaveCompanyToast = (companyName: string) => {
  toast.add({ severity: 'info', summary: 'Company Left', detail: `You have left ${companyName}` })
}

const leaveCompanyFailureToast = (companyName: string) => {
  toast.add({
    severity: 'error',
    summary: 'Failed to Leave Company',
    detail: `Failed to leave ${companyName}`
  })
}

const permanentlyLeaveCompanyToast = (companyName: string) => {
  toast.add({
    severity: 'warn',
    summary: 'Company Permanently Left',
    detail: `You have permanently left ${companyName}`
  })
}

const permanentlyLeaveCompanyFailureToast = (companyName: string) => {
  toast.add({
    severity: 'error',
    summary: 'Failed to Permanently Leave Company',
    detail: `Failed to permanently leave ${companyName}`
  })
}

const rejoinCompanyToast = (companyName: string) => {
  toast.add({
    severity: 'success',
    summary: 'Company Rejoined',
    detail: `You have rejoined ${companyName}`
  })
}

const rejoinCompanyFailureToast = (companyName: string) => {
  toast.add({
    severity: 'error',
    summary: 'Failed to Rejoin Company',
    detail: `Failed to rejoin ${companyName}`
  })
}

const switchCompanyToast = (companyName: string) => {
  toast.add({
    severity: 'success',
    summary: 'Company Switched',
    detail: `Switched to ${companyName}`
  })
}

const switchCompanyFailureToast = (companyName: string) => {
  toast.add({
    severity: 'error',
    summary: 'Failed to Switch Company',
    detail: `Failed to switch to ${companyName}`
  })
}

// Lifecycle hooks
onMounted(() => {
  setUserCompanies()
})
</script>
