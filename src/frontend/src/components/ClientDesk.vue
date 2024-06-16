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
                :width="1500"
                class="pa-11 ma-10"
                rounded="xl"
                elevation-2
                :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                border="md"
              >
                <v-card-title class="d-flex align-center pe-2">
                  <v-icon icon="mdi-account"></v-icon> &nbsp; Client Details

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
                  <ClientDetails v-model="clientDialog" @close="clientDialog = false" />
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
                    class="elevation-1"
                    rounded="xl"
                    :item-class="getRowClass"
                  >
                    <template v-slot:[`item.name`]="{ value }">
                      <v-chip> {{ value }}<v-icon>mdi-account</v-icon></v-chip>
                    </template>
                    <template v-slot:[`item.phone`]="{ value }">
                      <v-chip> {{ value }}<v-icon>mdi-phone</v-icon></v-chip>
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
                      <v-col cols="12">
                        <v-btn icon size="small" @click="editClient(item)" color="#5A82AF">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-btn icon size="small" @click="deleteClient(item)" color="#5A82AF">
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

      <v-col>
        <DeleteClient
          v-model="deleteDialog"
          @close="deleteDialog = false"
          :opened="deleteDialog"
          @updated_opened="deleteDialog = $event"
      /></v-col>
      <v-col>
        <EditClient
          v-model="editDialog"
          @close="editDialog = false"
          :opened="editDialog"
          :editedItem="selectedItem"
          @save="updatedEditedItem"
      /></v-col>
    </v-container>
  </v-app>
</template>

<script>
import DeleteClient from './DeleteClient.vue'
import EditClient from './EditClient.vue'
import ClientDetails from './AddClient.vue'
import axios from 'axios'

export default {
  name: 'ClientDesk',

  props: {
    isDarkMode: Boolean
  },
  data: () => ({
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
        sortable: false,
        value: 'firstName',
        key: 'firstName'
      },
      {
        title: 'Surname',
        align: 'start',
        sortable: false,
        value: 'surname',
        key: 'surname'
      },
      { title: 'Email', value: 'clientInfo.email', key: 'clientInfo.email' },
      { title: 'Phone', value: 'clientInfo.phoneNumber', key: 'clientInfo.phoneNumber' },
      { title: 'Address', value: 'clientInfo.address.street', key: 'clientInfo.address.street' },
      { title: 'Actions', value: 'actions', key: 'actions' }
    ],
    search: '',
    expanded: [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',
        province: 'Ontario',
        country: 'Canada',
        mostRecentJob: 'M1A 1A1'
      }
    ], // This will hold the currently expanded item
    clients: [],
    clientDetails: []
  }),
  components: {
    ClientDetails,
    DeleteClient,
    EditClient
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
    onProfileClick() {
      console.log('Profile icon clicked')
    },
    onEllipsisClick() {
      console.log('Ellipsis icon clicked')
    },
    searchClient() {
      console.log('Searching client')
    },
    editClient() {
      console.log('Editing client')
    },
    deleteClient() {
      console.log('Deleting client')
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
        .get('http://localhost:3000/client/all', config)
        .then((response) => {
          console.log(response.data)
          this.clients = response.data.data
          for (let i = 0; i < this.clients.length; i++) {
            this.clientDetails[i] = this.clients[i].details
          }
        })
        .catch((error) => {
          console.error('Failed to fetch clients:', error)
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
