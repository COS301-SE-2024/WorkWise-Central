c
<template class="emply-mng-container">
  <v-app :style="isDarkMode === true ? 'dark' : 'light'">
    <v-container fluid fill-height>
      <v-row justify="center" xs="6" sm="6" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" xs="12" sm="12" md="12">
              <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
                <v-card-title
                  class="d-flex align-center pe-2"
                  style="font-family: Nunito, sans-serif; font-size: 25px; font-weight: lighter"
                >
                  <v-row align="center" justify="space-between">
                    <v-col cols="12" lg="4" class="d-flex align-center">
                      <v-icon icon="fa: fa-solid fa-users"></v-icon>
                      <v-label
                        class="ms-2 h2 font-family-Nunito text-headingTextColor"
                        height="auto"
                        width="auto"
                        >Employee Details</v-label
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
                        width="80%"
                        style="
                          font-family: 'Lato', sans-serif;
                          font-size: 15px;
                          font-weight: lighter;
                        "
                        hide-details
                        single-line
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4" class="d-flex justify-end">
                      <AddEmployee v-if="permissions.includes('add new employees')" />
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-divider></v-divider>

                <v-col cols="12" xs="12" sm="12" md="12">
                  <div style="height: auto; overflow-y: auto">
                    <v-col cols="12" xs="12" sm="12" md="12">
                      <v-data-table
                        v-if="
                          permissions.includes('view all employees') ||
                          permissions.includes('view employees under me')
                        "
                        :headers="headers"
                        :items="EmployeeDetails2"
                        :search="search"
                        :loading="loading_data"
                        label="Clients"
                        height="auto"
                        rounded="xl"
                        class="bg-cardColor"
                        :row-props="getRowProps"
                      >
                        <template v-slot:[`item.firstName`]="{ value }">
                          <v-chip variant="text">
                            <v-icon icon="fa:fa-solid fa-user "></v-icon
                            >{{ value.charAt(0).toUpperCase() + value.slice(1) }}</v-chip
                          >
                        </template>
                        <template v-slot:[`item.surname`]="{ value }"
                          ><v-chip variant="text">{{
                            value.charAt(0).toUpperCase() + value.slice(1)
                          }}</v-chip></template
                        >
                        <template v-slot:[`item.contactInfo.phoneNumber`]="{ value }">
                          <v-chip @click="callPhone" color="" border="md"
                            ><v-icon icon="fa:fa-solid fa-phone"></v-icon> {{ value }}</v-chip
                          >
                        </template>
                        <template v-slot:[`item.contactInfo.email`]="{ value }">
                          <v-chip @click="sendEmail" color="" border="md">
                            <v-icon icon="fa:fa-solid fa-envelope"></v-icon>{{ value }}</v-chip
                          >
                        </template>
                        <template v-slot:[`item.mostRecentJob`]="{ value }">
                          <v-chip :color="getColor(value)">
                            {{ value }}<v-icon>mdi-briefcase</v-icon></v-chip
                          >
                        </template>

                        <!-- Actions slot -->
                        <template v-slot:[`item.roleName`]="{ value }">
                          <v-chip variant="text">
                            {{ value }}
                          </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-menu max-width="500px" v-if="item.roleName != 'Owner'">
                            <template v-slot:activator="{ props }"
                              ><v-btn
                                rounded="xl"
                                variant="plain"
                                :style="'transform: rotate(90deg) dots'"
                                v-bind="props"
                                @click="(actionsDialog = true), selectItem(item)"
                                v-show="
                                  permissions.includes('view all employees') ||
                                  permissions.includes('view employees under me') ||
                                  permissions.includes('edit employees') ||
                                  permissions.includes('delete employees')
                                "
                              >
                                <v-icon color="primary">mdi-dots-horizontal</v-icon>
                              </v-btn></template
                            >
                            <v-list class="bg-background">
                              <v-list-item
                                v-show="
                                  permissions.includes('view all employees') ||
                                  permissions.includes('view employees under me')
                                "
                                ><EmployeeDetails colors="colors" :EmployeeDetails="selectedItem"
                              /></v-list-item>

                              <v-list-item>
                                <EditEmployee
                                  v-if="permissions.includes('edit employees')"
                                  @update="getEmployees"
                                  :editedItem="selectedItem"
                                  :Disabled="false"
                              /></v-list-item>

                              <v-list-item v-if="permissions.includes('delete employees')"
                                ><DeleteEmployee
                                  :details="selectedItem"
                                  @employeeDeleted="getEmployees"
                              /></v-list-item>
                            </v-list>
                          </v-menu>
                        </template>
                      </v-data-table>
                    </v-col>
                  </div>
                </v-col>
              </v-card>
            </v-col>
          </v-row> </v-col
      ></v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import AddEmployee from './AddEmployee.vue'

import axios from 'axios'
import router from '@/router/index'
import EditEmployee from '@/components/home/employees/management/EditEmployee.vue'
import DeleteEmployee from '@/components/home/employees/management/DeleteEmployee.vue'
import EmployeeDetails from '@/components/home/employees/management/EmployeeDetails.vue'
import type {
  EmployeeJoinResponse2,
  Employee,
  Person,
  EmployeePersonalInfo
} from '@/components/home/employees/types'
import { API_URL } from '@/main'

export default {
  name: 'ClientDesk',

  data: () => ({
    data: {
      details: {}
    },
    selectedItemName: '',
    selectedItemSurname: '',
    loading_data: true,
    permissions: [] as string[],
    selectedItem: {} as any,
    isDarkMode: true,
    clientDialog: false,
    deleteDialog: false,
    editDialog: false,
    actionsDialog: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    addEmployeeVisibility: false,
    sortBy: [
      { key: 'name', order: 'asc' },
      { key: 'email', order: 'asc' },
      { key: 'phone', order: 'asc' },
      { key: 'address', order: 'asc' },
      { key: 'jobRequired', order: 'asc' }
    ],
    headers: [
      {
        title: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName',
        key: 'firstName'
      },
      {
        title: 'Surname',
        align: 'start',
        sortable: true,
        value: 'surname',
        key: 'surname'
      },
      { title: 'Phone', value: 'contactInfo.phoneNumber', key: 'contactInfo.phoneNumber' },
      { title: 'Email', value: 'contactInfo.email', key: 'contactInfo.email' },
      { title: 'Role', value: 'roleName', key: 'roleName' },
      { title: '', value: 'actions', key: 'actions', sortable: false }
    ] as any[],
    search: '',
    expanded: [], // This will hold the currently expanded item
    clients: [] as Employee[],
    EmployeeDetails2: [] as EmployeePersonalInfo[]
  }),
  components: {
    EmployeeDetails,
    DeleteEmployee,
    EditEmployee,
    AddEmployee
  },
  computed: {
    filteredClients() {
      if (!this.search) return this.clients
      return this.clients.filter((client: any) => {
        return Object.values(client).some((value: any) =>
          value.toString().toLowerCase().includes(this.search.toLowerCase())
        )
      })
    }
  },
  mounted() {
    this.loadPermissions()
    this.getEmployees()
    this.loading_data = false
    this.isDarkMode = localStorage.getItem('theme') === 'true' ? true : false
  },
  methods: {
    openDialog() {
      this.addEmployeeVisibility = true
    },
    selectItem(item: Person) {
      this.selectedItem = item
      this.selectedItemName = item.firstName
      console.log(this.selectedItemName)
      this.selectedItemSurname = item.surname
      console.log('Selected item:', this.selectedItem) // Corrected console.log
    },
    EditAccountClick(e: MouseEvent) {
      const t = e.currentTarget as HTMLButtonElement
      localStorage['edit_roles_id'] = t.id
      router.push('/manager-edit-employee')
    },
    onProfileClick() {
      console.log('Profile icon clicked')
    },
    onEllipsisClick() {
      console.log('Ellipsis icon clicked')
    },
    searchClient() {
      console.log('Searching client')
    },
    editEmployee(item: Person) {
      this.selectedItem = item
      console.log('Editing client')
    },
    deleteClient(item: Person) {
      this.selectedItem = item
      console.log('Deleting client')
    },
    openAddClient() {
      this.clientDialog = true
    },
    updatedEditedItem(newItem: Person) {
      this.selectedItem = newItem
    },
    sendEmail(item: any) {
      window.location.href = 'mailto:' + item.email
    },
    callPhone(item: any) {
      window.location.href = 'tel:' + item.phoneNumber
    },
    async loadPermissions() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      console.log(localStorage['employeeId'])

      try {
        const employee_response = await axios.get(
          `${API_URL}employee/id/${localStorage['employeeId']}`,
          config
        )
        console.log(employee_response.data.data)
        this.permissions = employee_response.data.data.role.permissionSuite
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    async getEmployees() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      console.log(localStorage['employeeId'])

      try {
        const employee_response = await axios.get(
          `${API_URL}employee/detailed/table/all/${localStorage['employeeId']}`,
          config
        )

        let employee_all_data: EmployeeJoinResponse2[] = employee_response.data.data

        console.log(employee_all_data)

        let company_employee_arr: EmployeePersonalInfo[] = []

        for (let i = 0; i < employee_all_data.length; i++) {
          if (employee_all_data[i].userId.personalInfo.address === undefined) continue

          console.log('hello')
          if (employee_all_data[i].role !== undefined) {
            let company_employee: EmployeePersonalInfo = {
              address: {
                province: employee_all_data[i].userId.personalInfo.address.province,
                street: employee_all_data[i].userId.personalInfo.address.street,
                suburb: employee_all_data[i].userId.personalInfo.address.suburb,
                city: employee_all_data[i].userId.personalInfo.address.city,
                postalCode: employee_all_data[i].userId.personalInfo.address.postalCode,
                complex: employee_all_data[i].userId.personalInfo.address.complex,
                houseNumber: employee_all_data[i].userId.personalInfo.address.houseNumber
              },
              contactInfo: {
                phoneNumber: employee_all_data[i].userId.personalInfo.contactInfo.phoneNumber,
                email: employee_all_data[i].userId.personalInfo.contactInfo.email
              },
              firstName: employee_all_data[i].userId.personalInfo.firstName,
              surname: employee_all_data[i].userId.personalInfo.surname,
              preferredLanguage: employee_all_data[i].userId.personalInfo.preferredLanguage,
              dateOfBirth: employee_all_data[i].userId.personalInfo.dateOfBirth,
              gender: employee_all_data[i].userId.personalInfo.gender,
              roleId: employee_all_data[i].role._id,
              roleName: employee_all_data[i].role.roleName,
              employeeId: employee_all_data[i]._id,
              userId: employee_all_data[i].userId._id
            }

            company_employee_arr.push(company_employee)
          } else {
            let company_employee: EmployeePersonalInfo = {
              address: {
                province: employee_all_data[i].userId.personalInfo.address.province,
                street: employee_all_data[i].userId.personalInfo.address.street,
                suburb: employee_all_data[i].userId.personalInfo.address.suburb,
                city: employee_all_data[i].userId.personalInfo.address.city,
                postalCode: employee_all_data[i].userId.personalInfo.address.postalCode,
                complex: employee_all_data[i].userId.personalInfo.address.complex,
                houseNumber: employee_all_data[i].userId.personalInfo.address.houseNumber
              },
              contactInfo: {
                phoneNumber: employee_all_data[i].userId.personalInfo.contactInfo.phoneNumber,
                email: employee_all_data[i].userId.personalInfo.contactInfo.email
              },
              firstName: employee_all_data[i].userId.personalInfo.firstName,
              surname: employee_all_data[i].userId.personalInfo.surname,
              preferredLanguage: employee_all_data[i].userId.personalInfo.preferredLanguage,
              dateOfBirth: employee_all_data[i].userId.personalInfo.dateOfBirth,
              gender: employee_all_data[i].userId.personalInfo.gender,
              roleId: '',
              roleName: '',
              employeeId: employee_all_data[i]._id,
              userId: employee_all_data[i].userId._id
            }
            company_employee_arr.push(company_employee)
          }
        }
        console.log(company_employee_arr)
        this.EmployeeDetails2 = company_employee_arr
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    toggleExpand(item: never) {
      // Check if the item is already expanded
      const isExpanded = this.expanded.includes(item)
      if (isExpanded) {
        this.expanded = []
      } else {
        this.expanded = [item]
        console.log(this.expanded)
      }
    },
    toggleDarkMode() {
      console.log(this.isDarkMode)
      if (this.isDarkMode === true) {
        this.isDarkMode = false
        console.log(this.isDarkMode)
      } else {
        this.isDarkMode = true
        console.log(this.isDarkMode)
      }
    },
    getColor(value: string) {
      if (value == '') return 'red'
      else return 'green'
    },
    getRowProps({ index }: any) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    getRowClass(item: any) {
      const index = this.clients.indexOf(item)
      return index % 2 === 0 ? 'row-color' : 'second-row-color'
    }
  }
}
</script>

<style>
.emply-mng-container {
  font-family: 'Nunito', sans-serif;
}
.fixed-container {
  position: fixed; /* or 'absolute' depending on your layout */
  top: 30px; /* Adjust this value based on the height of your navigation bar */
  left: 0;
  width: 100%; /* Adjust width as necessary */
  z-index: 1; /* Ensure this is below your navbar if it's fixed as well */
}
.row-color {
  background-color: #e0f7fa; /* Light blue background */
}

.second-row-color {
  background-color: #e8f5e9; /* Light green background */
}
</style>
