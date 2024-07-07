<template>
  <v-app :style="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color">
    <v-container fluid fill-height>
      <v-row justify="center" xs="6" sm="6" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" xs="12" sm="12" md="12">
              <v-card
                flat
                height="auto"
                max-height="auto"
                class="pa-11 ma-0"
                rounded="md"
                elevation-2
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                border="md"
              >
                <v-card-title
                  class="d-flex align-center pe-2"
                  :color="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                  style="font-family: 'Lato', sans-serif; font-size: 25px; font-weight: lighter"
                >
                  <v-icon icon="mdi-account"></v-icon> &nbsp; Employee Details

                  <v-spacer></v-spacer>

                  <v-text-field
                    v-model="search"
                    density="compact"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    flat
                    style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
                    hide-details
                    :bg-color="
                      isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                    "
                    single-line
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <AddEmployee />
                </v-card-title>

                <v-divider></v-divider>

                <v-col cols="12" xs="12" sm="12" md="12">
                  <div style="height: auto; overflow-y: auto">
                    <v-col cols="12" xs="12" sm="12" md="12">
                      <v-data-table
                        :headers="headers"
                        :items="EmployeeDetails2"
                        :search="search"
                        v-model:expanded="expanded"
                        height="auto"
                        rounded="md"
                        :item-class="getRowClass"
                        @click:row="toggleExpand"
                        class="font-lato"
                      >
                        <template v-slot:[`item.details.firstName`]="{ value }">
                          <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-account</v-icon></v-chip>
                        </template>
                        <template v-slot:[`item.contactInfo.phoneNumber`]="{ value }">
                          <v-chip color="#5A82AF" @click="callPhone"
                            ><v-icon>mdi-phone</v-icon> {{ value }}</v-chip
                          >
                        </template>
                        <template v-slot:[`item.contactInfo.email`]="{ value }">
                          <v-chip color="#5A82AF" @click="callPhone">
                            <v-icon>mdi-email</v-icon> {{ value }}</v-chip
                          >
                        </template>
                        <template v-slot:[`item.mostRecentJob`]="{ value }">
                          <v-chip :color="getColor(value)">
                            {{ value }}<v-icon>mdi-briefcase</v-icon></v-chip
                          >
                        </template>
                        <!-- Expanded content slot -->
                        <template v-slot:expanded-row="{ columns, item }">
                          <tr>
                            <td :colspan="columns.length">More info about {{ item.name }}</td>
                          </tr>
                        </template>
                        <!-- Actions slot -->

                        <template v-slot:[`item.actions`]="{ item }">
                          <v-btn
                            rounded="xl"
                            variant="plain"
                            :style="'transform: rotate(90deg) dots'"
                            @click="(actionsDialog = true), selectItem(item)"
                          >
                            <v-icon>mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>
                      </v-data-table>
                    </v-col>
                  </div>
                </v-col>
              </v-card>
            </v-col>
          </v-row>
        </v-col></v-row
      >

      <v-dialog v-model="actionsDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
            {{ selectedItemName + ' ' + selectedItemSurname }}
          </v-card-title>
          <v-card-text> What would you like to do with this account? </v-card-text>
          <v-card-actions>
            <EmployeeDetails
              v-model="clientDialog"
              colors="colors"
              :EmployeeDetails="selectedItem"
            />
            <EditEmployee
              @update:item="selectedItem = $event"
              :editedItem="selectedItem"
            /><DeleteClient :details="selectedItem" />
            <v-spacer></v-spacer>
            <v-btn @click="actionsDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script lang="ts">
// import DeleteClient from '../../clients/management/DeleteClient.vue'
import AddEmployee from './AddEmployee.vue'

import axios from 'axios'
import router from '@/router/index'
import EditEmployee from '@/components/home/employees/management/EditEmployee.vue'
import DeleteClient from '@/components/home/clients/management/DeleteClient.vue'
import EmployeeDetails from '@/components/home/employees/management/EmployeeDetails.vue'

type Address = {
  street: string
  suburb: string
  city: string
  postalCode: string
  complex: string
  houseNumber: string
}

type ContactInfo = {
  phoneNumber: string
  email: string
}

type Person = {
  address: Address
  contactInfo: ContactInfo
  firstName: string
  surname: string
  preferredLanguage: string
  dateOfBirth: string // ISO 8601 date string
  gender: string
  id: string // Assuming this is a MongoDB ObjectId in string format
  roleId: string // Assuming this is a MongoDB ObjectId in string format
  roleName: string
}

type SystemDetails = {
  email: string
  password: string
  username: string
  _id: string
}

type Profile = {
  displayName: string
  displayImage: string
  _id: string
}

type Roles = {
  role: string
  permissions: string[]
  _id: string
}

type JoinedCompany = {
  // Define properties for joined companies if there are any; currently it's an empty object
  // e.g., companyName?: string
}

type User = {
  data: {
    _id: string
    systemDetails: SystemDetails
    personalInfo: EmployeePersonalInfo
    profile: Profile
    roles: Roles
    joinedCompanies: JoinedCompany[]
    skills: string[]
    created_at: string // ISO 8601 date string
    __v: number
  }
}

type JobAssignment = {
  // Define properties for job assignments if there are any
}

type Subordinate = {
  // Define properties for subordinates if there are any
}

type SubordinateTeam = {
  // Define properties for subordinate teams if there are any
}

type Employee = {
  _id: string
  currentJobAssignments: JobAssignment[]
  subordinates: Subordinate[]
  subordinateTeams: SubordinateTeam[]
  userId: string
  companyId: string
  createdAt: string
  __v: number
  roleId: string
  updatedAt: string
  superiorId: string
}

type EmployeePersonalInfo = {
  address: {
    street: string
    suburb: string
    city: string
    postalCode: string
    complex: string
    houseNumber: string
  }
  contactInfo: {
    phoneNumber: string
    email: string
  }
  firstName: string
  surname: string
  preferredLanguage: string
  dateOfBirth: string
  gender: string
  roleId: string
  roleName: string
}

export default {
  name: 'ClientDesk',

  data: () => ({
    data: {
      details: {}
    },
    selectedItemName: '',
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    selectedItemSurname: '',
    selectedItem: {},
    isdarkmode: localStorage['theme'] !== 'false',
    clientDialog: false,
    deleteDialog: false,
    editDialog: false,
    actionsDialog: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
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
    ],
    search: '',
    expanded: [], // This will hold the currently expanded item
    clients: [] as Employee[],
    EmployeeDetails2: [] as EmployeePersonalInfo[],
    EmployeeDetails: [
      {
        id: 59,
        firstName: 'Michael',
        surname: 'Brown',
        clientInfo: {
          phoneNumber: '+1230984567',
          email: 'michael.brown@example.com',
          address: {
            street: '101 Pine St',
            suburb: 'Old Town',
            city: 'Central City',
            postalCode: '45678',
            complex: 'Forest Complex',
            houseNumber: '10D'
          }
        }
      },
      {
        id: 87,
        firstName: 'Emily',
        surname: 'Clark',
        clientInfo: {
          phoneNumber: '+3216549870',
          email: 'emily.clark@example.com',
          address: {
            street: '202 Cedar St',
            suburb: 'Riverdale',
            city: 'Metropolis',
            postalCode: '98765',
            complex: 'Lakeview Complex',
            houseNumber: '20E'
          }
        },
        preferred_Language: 'Italian'
      },
      {
        id: 63,
        firstName: 'David',
        surname: 'White',
        clientInfo: {
          phoneNumber: '+4567891230',
          email: 'david.white@example.com',
          address: {
            street: '303 Birch St',
            suburb: 'Southside',
            city: 'Gotham',
            postalCode: '87654',
            complex: 'Mountain Complex',
            houseNumber: '30F'
          }
        },
        preferred_Language: 'Japanese',
        role: 'Data Analyst'
      },
      {
        id: 34,
        firstName: 'Laura',
        surname: 'Davis',
        clientInfo: {
          phoneNumber: '+5678901234',
          email: 'laura.davis@example.com',
          address: {
            street: '404 Spruce St',
            suburb: 'Westside',
            city: 'Star City',
            postalCode: '76543',
            complex: 'Hilltop Complex',
            houseNumber: '40G'
          }
        },
        preferred_Language: 'Chinese',
        role: 'HR Manager'
      },
      {
        id: 41,
        firstName: 'Sarah',
        surname: 'Miller',
        clientInfo: {
          phoneNumber: '+6789012345',
          email: 'sarah.miller@example.com',
          address: {
            street: '505 Maple St',
            suburb: 'Eastside',
            city: 'Central City',
            postalCode: '65432',
            complex: 'Riverside Complex',
            houseNumber: '50H'
          }
        },
        preferred_Language: 'Portuguese',
        role: 'Marketing Specialist'
      },
      {
        id: 12,
        firstName: 'James',
        surname: 'Jones',
        clientInfo: {
          phoneNumber: '+7890123456',
          email: 'james.jones@example.com',
          address: {
            street: '606 Willow St',
            suburb: 'Northside',
            city: 'Metropolis',
            postalCode: '54321',
            complex: 'Seaside Complex',
            houseNumber: '60I'
          }
        },
        preferred_Language: 'Korean',
        role: 'Finance Manager'
      },
      {
        id: 441,
        firstName: 'Amelia',
        surname: 'Taylor',
        clientInfo: {
          phoneNumber: '+8901234567',
          email: 'amelia.taylor@example.com',
          address: {
            street: '707 Cherry St',
            suburb: 'Central Park',
            city: 'Gotham',
            postalCode: '43210',
            complex: 'Parkview Complex',
            houseNumber: '70J'
          }
        },
        preferred_Language: 'Russian',
        role: 'Operations Manager'
      }
    ]
  }),
  components: {
    EmployeeDetails,
    DeleteClient,
    EditEmployee,
    // DeleteClient,
    AddEmployee
  },
  computed: {
    filteredClients() {
      if (!this.search) return this.clients
      return this.clients.filter((client) => {
        return Object.values(client).some((value: any) =>
          value.toString().toLowerCase().includes(this.search.toLowerCase())
        )
      })
    }
  },
  mounted() {
    this.getEmployees()
  },
  methods: {
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
    removeClient(e: MouseEvent) {
      let event = e.currentTarget as HTMLButtonElement
      let id = event.id
      console.log(id)
      for (let i = 0; i < this.EmployeeDetails.length; i++) {
        if (this.EmployeeDetails[i].id === Number(id)) {
          this.EmployeeDetails.splice(i, 1)
        }
      }
      router.push('/manager-employees-t')
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
    async getEmployees() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const employee_response = await axios.get(apiURL + `employee/allcls`, config)
        let employee_all_data: Employee[] = employee_response.data

        let company_employee_arr: EmployeePersonalInfo[] = []
        for (let i = 0; i < employee_all_data.length; i++) {
          let users_response = await axios.get(
            apiURL + `users/id/${employee_all_data[i].userId}`,
            config
          )

          const user_data: User = users_response.data

          if (employee_all_data[i].roleId !== undefined) {
            let role = await axios.get(apiURL + `role/id/${employee_all_data[i].roleId}`, config)

            // console.log('hello')
            if (role.status < 300 && role.status > 199) {
              let company_employee: EmployeePersonalInfo = {
                address: {
                  street: user_data.data.personalInfo.address.street,
                  suburb: user_data.data.personalInfo.address.suburb,
                  city: user_data.data.personalInfo.address.city,
                  postalCode: user_data.data.personalInfo.address.postalCode,
                  complex: user_data.data.personalInfo.address.complex,
                  houseNumber: user_data.data.personalInfo.address.houseNumber
                },
                contactInfo: {
                  phoneNumber: user_data.data.personalInfo.contactInfo.phoneNumber,
                  email: user_data.data.personalInfo.contactInfo.email
                },
                firstName: user_data.data.personalInfo.firstName,
                surname: user_data.data.personalInfo.surname,
                preferredLanguage: user_data.data.personalInfo.preferredLanguage,
                dateOfBirth: user_data.data.personalInfo.dateOfBirth,
                gender: user_data.data.personalInfo.gender,
                roleId: employee_all_data[i].roleId,
                roleName: role.data.roleName
              }

              //     user_data.data.personalInfo
              // company_employee.roleId = employee_all_data[i].roleId
              // company_employee.roleName = role.data.roleName
              // let company_employee: EmployeePersonalInfo = {
              //   firstName: user_data.data.personalInfo.firstName,
              //   surname: user_data.data.personalInfo.surname,
              //   dateOfBirth: user_data.data.personalInfo.dateOfBirth,
              //   gender: user_data.data.personalInfo.gender,
              //   preferred_Language: user_data.data.personalInfo.preferred_Language,
              //   _id: user_data.data._id,
              //   id: user_data.data._id,
              //   roleId: employee_all_data[i].roleId,
              //   roleName: role.data.roleName
              // }
              company_employee_arr.push(company_employee)
            } else {
              console.log('And unsuccessfull requets was made')
            }
          } else {
            let company_employee: EmployeePersonalInfo = {
              address: {
                street: user_data.data.personalInfo.address.street,
                suburb: user_data.data.personalInfo.address.suburb,
                city: user_data.data.personalInfo.address.city,
                postalCode: user_data.data.personalInfo.address.postalCode,
                complex: user_data.data.personalInfo.address.complex,
                houseNumber: user_data.data.personalInfo.address.houseNumber
              },
              contactInfo: {
                phoneNumber: user_data.data.personalInfo.contactInfo.phoneNumber,
                email: user_data.data.personalInfo.contactInfo.email
              },
              firstName: user_data.data.personalInfo.firstName,
              surname: user_data.data.personalInfo.surname,
              preferredLanguage: user_data.data.personalInfo.preferredLanguage,
              dateOfBirth: user_data.data.personalInfo.dateOfBirth,
              gender: user_data.data.personalInfo.gender,
              roleId: '',
              roleName: ''
            }
            // let company_employee: EmployeePersonalInfo = user_data.data.personalInfo
            // company_employee.roleId = ''
            // company_employee.roleName = ''
            // let company_employee: EmployeeOfCurrentCompany = {
            //   firstName: user_data.data.personalInfo.firstName,
            //   surname: user_data.data.personalInfo.surname,
            //   dateOfBirth: user_data.data.personalInfo.dateOfBirth,
            //   gender: user_data.data.personalInfo.gender,
            //   preferred_Language: user_data.data.personalInfo.preferred_Language,
            //   _id: user_data.data._id,
            //   id: user_data.data._id,
            //   roleId: '',
            //   roleName: ''
            // }
            company_employee_arr.push(company_employee)
          }
        }
        console.log(company_employee_arr)
        this.EmployeeDetails2 = company_employee_arr
      } catch (error) {
        console.log('Error fetching data:', error)
      }

      // axios
      //   .get(apiURL + 'employee/all', config)
      //   .then((response) => {
      //     this.clients = response.data
      //     for (let i = 0; i < response.data.length; i++) {
      //       axios
      //         .get(apiURL + `users/id/${this.clients[i].userId}`, config)
      //         .then((res) => {
      //           let eish: EmployeeOfCurrentCompany = res.data.data.personalInfo
      //           eish.id = res.data.data._id
      //           eish.roleId = this.clients[i].roleId
      //
      //           axios
      //             .get(apiURL + `role/id/${eish.roleId}`, config)
      //             .then((res) => {
      //               // console.log(res.data.roleName)
      //               eish.roleName = res.data.roleName
      //               this.EmployeeDetails2.push(eish)
      //               // console.log(eish)
      //             })
      //             .catch((error) => {
      //               console.log('Failed to fetch Role:', error)
      //             })
      //           // console.log(eish)
      //         })
      //         .catch((error) => {
      //           console.log('Failed to fetch users:', error)
      //         })
      //     }
      //     // console.log('hello')
      //     console.log(this.EmployeeDetails2)
      //   })
      //   .catch((error) => {
      //     console.log('Failed to fetch clients:', error)
      //   })
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
      console.log(this.isdarkmode)
      if (this.isdarkmode === true) {
        this.isdarkmode = false
        console.log(this.isdarkmode)
      } else {
        this.isdarkmode = true
        console.log(this.isdarkmode)
      }
    },
    getColor(value: string) {
      if (value == '') return 'red'
      else return 'green'
    },
    getRowClass(item: any) {
      const index = this.clients.indexOf(item)
      return index % 2 === 0 ? 'row-color' : 'second-row-color'
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  }
}
</script>

<style>
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
