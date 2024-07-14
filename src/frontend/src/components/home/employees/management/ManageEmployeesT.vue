<template class="emply-mng-container">
  <v-app :style="isdarkmode === true ? 'dark' : 'light'">
    <v-container fluid fill-height>
      <v-row justify="center" xs="6" sm="6" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" xs="12" sm="12" md="12">
              <v-card
                height="auto"
                class="pa-11 ma-0 bg-cardColor"
                rounded="md"
                :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
                border="md"
              >
                <v-card-title
                  class="d-flex align-center pe-2"
                  style="font-family: Nunito, sans-serif; font-size: 25px; font-weight: lighter"
                >
                  <v-row align="center" justify="space-between">
                    <v-col cols="12" md="4" sm="6" xs="12" class="d-flex align-center">
                      <v-icon icon="mdi-account-hard-hat"></v-icon>
                      <v-label
                        class="ms-2 text-h4 text-headingTextColor"
                        style="
                          font-size: 15px;
                          font-family: Nunito, sans-serif;
                          font-weight: lighter;
                        "
                        height="auto"
                        width="auto"
                        >Employee Details</v-label
                      >&nbsp;
                    </v-col>
                    <v-col cols="12" md="4" sm="6" xs="12">
                      <v-text-field
                        v-model="search"
                        density="compact"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        variant="solo-inverted"
                        flat
                        width="100%"
                        style="
                          font-family: Nunito, sans-serif;
                          font-size: 15px;
                          font-weight: lighter;
                        "
                        hide-details
                        single-line
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="12" xs="12" class="d-flex justify-end">
                      <AddEmployee />
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-divider></v-divider>

                <v-col cols="12" xs="12" sm="12" md="12">
                  <div style="height: auto; overflow-y: auto">
                    <v-col cols="12" xs="12" sm="12" md="12">
                      <v-data-table
                        :headers="headers"
                        :items="EmployeeDetails"
                        :search="search"
                        label="Clients"
                        height="auto"
                        rounded="xl"
                        class="bg-cardColor"
                        :row-props="getRowProps"
                      >
                        <template v-slot:[`item.firstName`]="{ value }">
                          <v-chip variant="text" color="elementTextColor">
                            <v-icon icon="fa:fa-solid fa-user "></v-icon>{{ value }}</v-chip
                          >
                        </template>
                        <template v-slot:[`item.surname`]="{ value }"
                          ><v-chip variant="text" color="elementTextColor">{{
                            value
                          }}</v-chip></template
                        >
                        <template v-slot:[`item.contactInfo.phoneNumber`]="{ value }">
                          <v-chip
                            @click="callPhone"
                            color="primary"
                            text-color="elementTextColor"
                            border="md"
                            ><v-icon icon="fa:fa-solid fa-phone"></v-icon> {{ value }}</v-chip
                          >
                        </template>
                        <template v-slot:[`item.contactInfo.email`]="{ value }">
                          <v-chip
                            @click="sendEmail"
                            color="primary"
                            text-color="elementTextColor"
                            border="md"
                          >
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
                          <v-chip color="elementTextColor" variant="text">
                            {{ value }}
                          </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-btn
                            rounded="xl"
                            variant="plain"
                            :style="'transform: rotate(90deg) dots'"
                            @click="(actionsDialog = true), selectItem(item)"
                          >
                            <v-icon color="primary">mdi-dots-horizontal</v-icon>
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
            /><DeleteEmployee :details="selectedItem" />
            <v-spacer></v-spacer>
            <v-btn @click="actionsDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  EmployeeJoined,
  Person,
  Employee,
  EmployeePersonalInfo
} from '@/components/home/employees/types'

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
        address: {
          street: '123 Elm St',
          suburb: 'Downtown',
          city: 'Metropolis',
          postalCode: '12345',
          complex: 'Central Park',
          houseNumber: '1A'
        },
        contactInfo: {
          phoneNumber: '+1234567890',
          email: 'john.doe@example.com'
        },
        firstName: 'John',
        surname: 'Doe',
        preferredLanguage: 'English',
        dateOfBirth: '1985-06-15',
        gender: 'Male',
        roleId: 'role123',
        roleName: 'Manager',
        employeeId: 'emp123',
        userId: 'user123'
      },
      {
        address: {
          street: '456 Oak St',
          suburb: 'Uptown',
          city: 'Gotham',
          postalCode: '54321',
          complex: 'Sunset Villas',
          houseNumber: '2B'
        },
        contactInfo: {
          phoneNumber: '+1234567891',
          email: 'jane.smith@example.com'
        },
        firstName: 'Jane',
        surname: 'Smith',
        preferredLanguage: 'Spanish',
        dateOfBirth: '1990-07-20',
        gender: 'Female',
        roleId: 'role124',
        roleName: 'Developer',
        employeeId: 'emp124',
        userId: 'user124'
      },
      {
        address: {
          street: '789 Pine St',
          suburb: 'Midtown',
          city: 'Star City',
          postalCode: '67890',
          complex: 'Lakeside Apartments',
          houseNumber: '3C'
        },
        contactInfo: {
          phoneNumber: '+1234567892',
          email: 'bob.jones@example.com'
        },
        firstName: 'Bob',
        surname: 'Jones',
        preferredLanguage: 'French',
        dateOfBirth: '1982-11-30',
        gender: 'Male',
        roleId: 'role125',
        roleName: 'Designer',
        employeeId: 'emp125',
        userId: 'user125'
      },
      {
        address: {
          street: '101 Maple St',
          suburb: 'Old Town',
          city: 'Springfield',
          postalCode: '11111',
          complex: 'River View',
          houseNumber: '4D'
        },
        contactInfo: {
          phoneNumber: '+1234567893',
          email: 'alice.williams@example.com'
        },
        firstName: 'Alice',
        surname: 'Williams',
        preferredLanguage: 'German',
        dateOfBirth: '1975-02-25',
        gender: 'Female',
        roleId: 'role126',
        roleName: 'Tester',
        employeeId: 'emp126',
        userId: 'user126'
      },
      {
        address: {
          street: '202 Cedar St',
          suburb: 'Downtown',
          city: 'Metropolis',
          postalCode: '22222',
          complex: 'Central Park',
          houseNumber: '5E'
        },
        contactInfo: {
          phoneNumber: '+1234567894',
          email: 'charlie.brown@example.com'
        },
        firstName: 'Charlie',
        surname: 'Brown',
        preferredLanguage: 'Italian',
        dateOfBirth: '1988-09-10',
        gender: 'Male',
        roleId: 'role127',
        roleName: 'Analyst',
        employeeId: 'emp127',
        userId: 'user127'
      },
      {
        address: {
          street: '303 Birch St',
          suburb: 'Uptown',
          city: 'Gotham',
          postalCode: '33333',
          complex: 'Sunset Villas',
          houseNumber: '6F'
        },
        contactInfo: {
          phoneNumber: '+1234567895',
          email: 'emily.johnson@example.com'
        },
        firstName: 'Emily',
        surname: 'Johnson',
        preferredLanguage: 'Portuguese',
        dateOfBirth: '1995-03-05',
        gender: 'Female',
        roleId: 'role128',
        roleName: 'Consultant',
        employeeId: 'emp128',
        userId: 'user128'
      },
      {
        address: {
          street: '404 Spruce St',
          suburb: 'Midtown',
          city: 'Star City',
          postalCode: '44444',
          complex: 'Lakeside Apartments',
          houseNumber: '7G'
        },
        contactInfo: {
          phoneNumber: '+1234567896',
          email: 'david.miller@example.com'
        },
        firstName: 'David',
        surname: 'Miller',
        preferredLanguage: 'Russian',
        dateOfBirth: '1978-12-22',
        gender: 'Male',
        roleId: 'role129',
        roleName: 'Architect',
        employeeId: 'emp129',
        userId: 'user129'
      },
      {
        address: {
          street: '505 Fir St',
          suburb: 'Old Town',
          city: 'Springfield',
          postalCode: '55555',
          complex: 'River View',
          houseNumber: '8H'
        },
        contactInfo: {
          phoneNumber: '+1234567897',
          email: 'sophia.davis@example.com'
        },
        firstName: 'Sophia',
        surname: 'Davis',
        preferredLanguage: 'Chinese',
        dateOfBirth: '1992-05-15',
        gender: 'Female',
        roleId: 'role130',
        roleName: 'Coordinator',
        employeeId: 'emp130',
        userId: 'user130'
      },
      {
        address: {
          street: '606 Cherry St',
          suburb: 'Downtown',
          city: 'Metropolis',
          postalCode: '66666',
          complex: 'Central Park',
          houseNumber: '9I'
        },
        contactInfo: {
          phoneNumber: '+1234567898',
          email: 'james.wilson@example.com'
        },
        firstName: 'James',
        surname: 'Wilson',
        preferredLanguage: 'Japanese',
        dateOfBirth: '1981-08-30',
        gender: 'Male',
        roleId: 'role131',
        roleName: 'Specialist',
        employeeId: 'emp131',
        userId: 'user131'
      },
      {
        address: {
          street: '707 Redwood St',
          suburb: 'Uptown',
          city: 'Gotham',
          postalCode: '77777',
          complex: 'Sunset Villas',
          houseNumber: '10J'
        },
        contactInfo: {
          phoneNumber: '+1234567899',
          email: 'olivia.anderson@example.com'
        },
        firstName: 'Olivia',
        surname: 'Anderson',
        preferredLanguage: 'Korean',
        dateOfBirth: '1984-07-12',
        gender: 'Female',
        roleId: 'role132',
        roleName: 'Strategist',
        employeeId: 'emp132',
        userId: 'user132'
      },
      {
        address: {
          street: '808 Aspen St',
          suburb: 'Midtown',
          city: 'Star City',
          postalCode: '88888',
          complex: 'Lakeside Apartments',
          houseNumber: '11K'
        },
        contactInfo: {
          phoneNumber: '+1234567890',
          email: 'logan.thomas@example.com'
        },
        firstName: 'Logan',
        surname: 'Thomas',
        preferredLanguage: 'Arabic',
        dateOfBirth: '1976-04-02',
        gender: 'Male',
        roleId: 'role133',
        roleName: 'Analyst',
        employeeId: 'emp133',
        userId: 'user133'
      },
      {
        address: {
          street: '909 Willow St',
          suburb: 'Old Town',
          city: 'Springfield',
          postalCode: '99999',
          complex: 'River View',
          houseNumber: '12L'
        },
        contactInfo: {
          phoneNumber: '+1234567891',
          email: 'mia.jackson@example.com'
        },
        firstName: 'Mia',
        surname: 'Jackson',
        preferredLanguage: 'Hindi',
        dateOfBirth: '1993-01-10',
        gender: 'Female',
        roleId: 'role134',
        roleName: 'Advisor',
        employeeId: 'emp134',
        userId: 'user134'
      },
      {
        address: {
          street: '1010 Cypress St',
          suburb: 'Downtown',
          city: 'Metropolis',
          postalCode: '10101',
          complex: 'Central Park',
          houseNumber: '13M'
        },
        contactInfo: {
          phoneNumber: '+1234567892',
          email: 'lucas.moore@example.com'
        },
        firstName: 'Lucas',
        surname: 'Moore',
        preferredLanguage: 'Spanish',
        dateOfBirth: '1987-11-20',
        gender: 'Male',
        roleId: 'role135',
        roleName: 'Technician',
        employeeId: 'emp135',
        userId: 'user135'
      },
      {
        address: {
          street: '1111 Walnut St',
          suburb: 'Uptown',
          city: 'Gotham',
          postalCode: '11112',
          complex: 'Sunset Villas',
          houseNumber: '14N'
        },
        contactInfo: {
          phoneNumber: '+1234567893',
          email: 'ella.martinez@example.com'
        },
        firstName: 'Ella',
        surname: 'Martinez',
        preferredLanguage: 'French',
        dateOfBirth: '1991-02-14',
        gender: 'Female',
        roleId: 'role136',
        roleName: 'Consultant',
        employeeId: 'emp136',
        userId: 'user136'
      },
      {
        address: {
          street: '1212 Hickory St',
          suburb: 'Midtown',
          city: 'Star City',
          postalCode: '12121',
          complex: 'Lakeside Apartments',
          houseNumber: '15O'
        },
        contactInfo: {
          phoneNumber: '+1234567894',
          email: 'alexander.garcia@example.com'
        },
        firstName: 'Alexander',
        surname: 'Garcia',
        preferredLanguage: 'Italian',
        dateOfBirth: '1983-06-25',
        gender: 'Male',
        roleId: 'role137',
        roleName: 'Manager',
        employeeId: 'emp137',
        userId: 'user137'
      },
      {
        address: {
          street: '1313 Cedar St',
          suburb: 'Old Town',
          city: 'Springfield',
          postalCode: '13131',
          complex: 'River View',
          houseNumber: '16P'
        },
        contactInfo: {
          phoneNumber: '+1234567895',
          email: 'sofia.rodriguez@example.com'
        },
        firstName: 'Sofia',
        surname: 'Rodriguez',
        preferredLanguage: 'German',
        dateOfBirth: '1989-09-18',
        gender: 'Female',
        roleId: 'role138',
        roleName: 'Specialist',
        employeeId: 'emp138',
        userId: 'user138'
      },
      {
        address: {
          street: '1414 Sycamore St',
          suburb: 'Downtown',
          city: 'Metropolis',
          postalCode: '14141',
          complex: 'Central Park',
          houseNumber: '17Q'
        },
        contactInfo: {
          phoneNumber: '+1234567896',
          email: 'benjamin.lopez@example.com'
        },
        firstName: 'Benjamin',
        surname: 'Lopez',
        preferredLanguage: 'Portuguese',
        dateOfBirth: '1986-12-03',
        gender: 'Male',
        roleId: 'role139',
        roleName: 'Developer',
        employeeId: 'emp139',
        userId: 'user139'
      },
      {
        address: {
          street: '1515 Magnolia St',
          suburb: 'Uptown',
          city: 'Gotham',
          postalCode: '15151',
          complex: 'Sunset Villas',
          houseNumber: '18R'
        },
        contactInfo: {
          phoneNumber: '+1234567897',
          email: 'amelia.clark@example.com'
        },
        firstName: 'Amelia',
        surname: 'Clark',
        preferredLanguage: 'Chinese',
        dateOfBirth: '1994-04-17',
        gender: 'Female',
        roleId: 'role140',
        roleName: 'Coordinator',
        employeeId: 'emp140',
        userId: 'user140'
      },
      {
        address: {
          street: '1616 Oak St',
          suburb: 'Midtown',
          city: 'Star City',
          postalCode: '16161',
          complex: 'Lakeside Apartments',
          houseNumber: '19S'
        },
        contactInfo: {
          phoneNumber: '+1234567898',
          email: 'ethan.jones@example.com'
        },
        firstName: 'Ethan',
        surname: 'Jones',
        preferredLanguage: 'Russian',
        dateOfBirth: '1990-10-12',
        gender: 'Male',
        roleId: 'role141',
        roleName: 'Analyst',
        employeeId: 'emp141',
        userId: 'user141'
      },
      {
        address: {
          street: '1717 Birch St',
          suburb: 'Old Town',
          city: 'Springfield',
          postalCode: '17171',
          complex: 'River View',
          houseNumber: '20T'
        },
        contactInfo: {
          phoneNumber: '+1234567899',
          email: 'ava.davis@example.com'
        },
        firstName: 'Ava',
        surname: 'Davis',
        preferredLanguage: 'Japanese',
        dateOfBirth: '1996-01-05',
        gender: 'Female',
        roleId: 'role142',
        roleName: 'Tester',
        employeeId: 'emp142',
        userId: 'user142'
      }
    ] as EmployeePersonalInfo[]
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
        const employee_response = await axios.get(
          apiURL + `employee/joined/all/${sessionStorage['currentCompany']}`,
          config
        )

        let employee_all_data: EmployeeJoined[] = employee_response.data.data

        console.log(employee_all_data)

        let company_employee_arr: EmployeePersonalInfo[] = []

        for (let i = 0; i < employee_all_data.length; i++) {
          if (employee_all_data[i].userId[0].personalInfo.address !== undefined) continue

          if (employee_all_data[i].roleId !== undefined) {
            let company_employee: EmployeePersonalInfo = {
              address: {
                street: employee_all_data[i].userId[0].personalInfo.address.street,
                suburb: employee_all_data[i].userId[0].personalInfo.address.suburb,
                city: employee_all_data[i].userId[0].personalInfo.address.city,
                postalCode: employee_all_data[i].userId[0].personalInfo.address.postalCode,
                complex: employee_all_data[i].userId[0].personalInfo.address.complex,
                houseNumber: employee_all_data[i].userId[0].personalInfo.address.houseNumber
              },
              contactInfo: {
                phoneNumber: employee_all_data[i].userId[0].personalInfo.contactInfo.phoneNumber,
                email: employee_all_data[i].userId[0].personalInfo.contactInfo.email
              },
              firstName: employee_all_data[i].userId[0].personalInfo.firstName,
              surname: employee_all_data[i].userId[0].personalInfo.surname,
              preferredLanguage: employee_all_data[i].userId[0].personalInfo.preferredLanguage,
              dateOfBirth: employee_all_data[i].userId[0].personalInfo.dateOfBirth,
              gender: employee_all_data[i].userId[0].personalInfo.gender,
              roleId: employee_all_data[i].roleId[0]._id,
              roleName: employee_all_data[i].roleId[0].roleName,
              employeeId: employee_all_data[i]._id,
              userId: employee_all_data[i].userId[0]._id
            }

            company_employee_arr.push(company_employee)
          } else {
            let company_employee: EmployeePersonalInfo = {
              address: {
                street: employee_all_data[i].userId[0].personalInfo.address.street,
                suburb: employee_all_data[i].userId[0].personalInfo.address.suburb,
                city: employee_all_data[i].userId[0].personalInfo.address.city,
                postalCode: employee_all_data[i].userId[0].personalInfo.address.postalCode,
                complex: employee_all_data[i].userId[0].personalInfo.address.complex,
                houseNumber: employee_all_data[i].userId[0].personalInfo.address.houseNumber
              },
              contactInfo: {
                phoneNumber: employee_all_data[i].userId[0].personalInfo.contactInfo.phoneNumber,
                email: employee_all_data[i].userId[0].personalInfo.contactInfo.email
              },
              firstName: employee_all_data[i].userId[0].personalInfo.firstName,
              surname: employee_all_data[i].userId[0].personalInfo.surname,
              preferredLanguage: employee_all_data[i].userId[0].personalInfo.preferredLanguage,
              dateOfBirth: employee_all_data[i].userId[0].personalInfo.dateOfBirth,
              gender: employee_all_data[i].userId[0].personalInfo.gender,
              roleId: '',
              roleName: '',
              employeeId: employee_all_data[i]._id,
              userId: employee_all_data[i].userId[0]._id
            }
            company_employee_arr.push(company_employee)
          }
        }
        console.log(company_employee_arr)
        this.EmployeeDetails2 = company_employee_arr
      } catch (error) {
        console.log('Error fetching data:', error)
      }

      // try {
      //   const employee_response = await axios.get(
      //     apiURL + `employee/all/${sessionStorage['currentCompany']}`,
      //     config
      //   )
      //   let employee_all_data: Employee[] = employee_response.data.data
      //
      //   let company_employee_arr: EmployeePersonalInfo[] = []
      //   for (let i = 0; i < employee_all_data.length; i++) {
      //     let users_response = await axios.get(
      //       apiURL + `users/id/${employee_all_data[i].userId}`,
      //       config
      //     )
      //
      //     const user_data: User = users_response.data
      //
      //     if (user_data.data.personalInfo.address === undefined) continue
      //
      //     if (employee_all_data[i].roleId !== undefined) {
      //       let role = await axios.get(apiURL + `role/id/${employee_all_data[i].roleId}`, config)
      //
      //       if (role.status < 300 && role.status > 199) {
      //         let company_employee: EmployeePersonalInfo = {
      //           address: {
      //             street: user_data.data.personalInfo.address.street,
      //             suburb: user_data.data.personalInfo.address.suburb,
      //             city: user_data.data.personalInfo.address.city,
      //             postalCode: user_data.data.personalInfo.address.postalCode,
      //             complex: user_data.data.personalInfo.address.complex,
      //             houseNumber: user_data.data.personalInfo.address.houseNumber
      //           },
      //           contactInfo: {
      //             phoneNumber: user_data.data.personalInfo.contactInfo.phoneNumber,
      //             email: user_data.data.personalInfo.contactInfo.email
      //           },
      //           firstName: user_data.data.personalInfo.firstName,
      //           surname: user_data.data.personalInfo.surname,
      //           preferredLanguage: user_data.data.personalInfo.preferredLanguage,
      //           dateOfBirth: user_data.data.personalInfo.dateOfBirth,
      //           gender: user_data.data.personalInfo.gender,
      //           roleId: employee_all_data[i].roleId,
      //           roleName: role.data.data.roleName,
      //           employeeId: employee_all_data[i]._id,
      //           userId: employee_all_data[i].userId
      //         }
      //
      //         company_employee_arr.push(company_employee)
      //       } else {
      //         console.log('And unsuccessfull requets was made')
      //       }
      //     } else {
      //       let company_employee: EmployeePersonalInfo = {
      //         address: {
      //           street: user_data.data.personalInfo.address.street,
      //           suburb: user_data.data.personalInfo.address.suburb,
      //           city: user_data.data.personalInfo.address.city,
      //           postalCode: user_data.data.personalInfo.address.postalCode,
      //           complex: user_data.data.personalInfo.address.complex,
      //           houseNumber: user_data.data.personalInfo.address.houseNumber
      //         },
      //         contactInfo: {
      //           phoneNumber: user_data.data.personalInfo.contactInfo.phoneNumber,
      //           email: user_data.data.personalInfo.contactInfo.email
      //         },
      //         firstName: user_data.data.personalInfo.firstName,
      //         surname: user_data.data.personalInfo.surname,
      //         preferredLanguage: user_data.data.personalInfo.preferredLanguage,
      //         dateOfBirth: user_data.data.personalInfo.dateOfBirth,
      //         gender: user_data.data.personalInfo.gender,
      //         roleId: '',
      //         roleName: '',
      //         employeeId: employee_all_data[i]._id,
      //         userId: employee_all_data[i].userId
      //       }

      //       company_employee_arr.push(company_employee)
      //     }
      //   }
      //   console.log(company_employee_arr)
      //   this.EmployeeDetails2 = company_employee_arr
      // } catch (error) {
      //   console.log('Error fetching data:', error)
      // }
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
    getRowProps({ index }: any) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
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
