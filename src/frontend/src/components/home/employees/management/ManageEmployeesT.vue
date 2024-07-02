<template>
  <v-app :style="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color">
    <v-container fluid fill-height class="pa-16 ma-auto pt-5 fixed-container">
      <v-row justify="center" xs="4" sm="4" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" xs="4" sm="4" md="12" offset="3">
              <v-card
                flat
                :height="auto"
                :max-width="1500"
                class="pa-11 ma-10"
                rounded="xl"
                elevation-2
                :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                border="md"
              >
                <v-card-title class="d-flex align-center pe-2">
                  <v-icon icon="mdi-account"></v-icon> &nbsp; Employee Details

                  <v-spacer></v-spacer>

                  <v-text-field
                    v-model="search"
                    density="compact"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo-filled"
                    flat
                    hide-details
                    :bg-color="
                      isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color
                    "
                    single-line
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <AddEmployee />
                </v-card-title>

                <v-divider></v-divider>

                <div style="height: 700px; overflow-y: auto">
                  <v-data-table
                    :headers="headers"
                    :items="clientDetails"
                    :search="search"
                    :single-expand="true"
                    v-model:expanded="expanded"
                    show-expand
                    rounded="xl"
                    :item-class="getRowClass"
                  >
                    <template v-slot:[`item.details.firstName`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-account</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.clientInfo.phoneNumber`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-phone</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.mostRecentJob`]="{ value }">
                      <v-chip :color="getColor(value)">
                        {{ value }}<v-icon>mdi-briefcase</v-icon></v-chip
                      >
                    </template>
                    <template v-slot:[`item.clientInfo.address.street`]="{ value }">
                      <v-chip color="#5A82AF"> {{ value }}<v-icon>mdi-map-marker</v-icon></v-chip>
                    </template>
                    <!-- Expanded content slot -->
                    <template v-slot:expanded-row="{ columns, item }">
                      <tr>
                        <td :colspan="columns.length">More info about {{ item.name }}</td>
                      </tr>
                    </template>
                    <!-- Actions slot -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-col cols="12">
                        <v-btn
                          icon
                          size="small"
                          @click="EditAccountClick"
                          color="#5A82AF"
                          :id="item.id"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-btn
                          icon
                          size="small"
                          @click="removeClient"
                          color="#5A82AF"
                          :id="item.id"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </template>
                  </v-data-table>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col></v-row
      >

      <v-col> <DeleteClient v-model="deleteDialog" :details="selectedItem" /></v-col>
    </v-container>
  </v-app>
</template>

<script lang="js">
import DeleteClient from '../../clients/management/DeleteClient.vue'
import AddEmployee from './AddEmployee.vue'

import axios from 'axios'
import router from '@/router/index.ts'

export default {
  name: 'ClientDesk',

  props: {
    isDarkMode: Boolean
  },
  data: () => ({
    data: {
      details: {}
    },
    selectedItem: {},
    isdarkmode: false,
    clientDialog: false,
    deleteDialog: false,
    editDialog: false,
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
      { title: 'Phone', value: 'clientInfo.phoneNumber', key: 'clientInfo.phoneNumber' },
      { title: 'Email', value: 'clientInfo.email', key: 'clientInfo.email' },
      { title: 'Address', value: 'clientInfo.address.street', key: 'clientInfo.address.street' },
      { title: 'Actions', value: 'actions', key: 'actions', sortable: false }
    ],
    search: '',
    expanded: [], // This will hold the currently expanded item
    clients: [],
    clientDetails2: [],
    clientDetails: [
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
    DeleteClient,
    AddEmployee
  },
  computed: {
    filteredClients() {
      if (!this.search) return this.clients
      return this.clients.filter((client) => {
        return Object.values(client).some((value) =>
          value.toString().toLowerCase().includes(this.search.toLowerCase())
        )
      })
    }
  },
  mounted() {
    this.getClients()
  },
  methods: {
    EditAccountClick(e) {
      console.log(e.currentTarget.id)
      localStorage['edit_roles_id'] = e.currentTarget.id
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
    editClient(item) {
      this.selectedItem = item
      console.log('Editing client')
    },
    deleteClient(item) {
      this.selectedItem = item
      console.log('Deleting client')
    },
    removeClient(e) {
      let id = e.currentTarget.id

      console.log(id)
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i].id === Number(id)) {
          this.clientDetails.splice(i, 1)
        }
      }
      router.push('/manager-employees-t')
    },
    openAddClient() {
      this.clientDialog = true
    },
    updatedEditedItem(newItem) {
      this.selectedItem = newItem
    },
    async getClients() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      }
      axios
        .get('http://localhost:3000/employee/all', config)
        .then((response) => {
          console.log(response.data)
          this.clients = response.data
          for (let i = 0; i < response.data.length; i++) {
            // console.log(this.clients[i].userId)
            axios
              .get(`http://localhost:3000/users/id/${this.clients[i].userId}`, config)
              .then((res) => {
                // console.log(res.data.personalInfo)
                let eish = res.data.personalInfo
                eish.id = res.data._id
                this.clientDetails2.push(eish)
              })
              .catch((error) => {
                console.log('Failed to fetch users:', error)
              })
          }
          console.log('hello')
          console.log(this.clientDetails2)
        })
        .catch((error) => {
          console.log('Failed to fetch clients:', error)
        })
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
    getColor(value) {
      if (value == '') return 'red'
      else return 'green'
    },
    getRowClass(item) {
      const index = this.clients.indexOf(item)
      return index % 2 === 0 ? 'row-color' : 'second-row-color'
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
