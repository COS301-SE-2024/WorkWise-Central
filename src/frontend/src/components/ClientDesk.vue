<template>
  <v-container fluid fill-height class="pa-16 ma-auto pt-5">
    <v-row justify="center" xs="6" sm="6" md="12">
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="12">
            <v-card
              flat
              :height="auto"
              class="pa-11 ma-10"
              rounded="xl"
              elevation-2
              :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
              border="md"
            >
              <v-card-title
                class="d-flex align-center pe-2"
                :color="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                style="font-family: 'Lato', sans-serif; font-size: 25px; font-weight: lighter"
              >
                <v-icon icon="mdi-account"></v-icon> &nbsp; Client Details

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
                  :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  single-line
                ></v-text-field>
                <v-spacer></v-spacer>
                <ClientDetails v-model="clientDialog" @close="clientDialog = false" />
              </v-card-title>

              <v-divider></v-divider>
              <v-col cols="12" xs="12" sm="12" md="12">
                <div style="height: 700px; overflow-y: auto">
                  <v-col cols="12" xs="12" sm="12" md="12">
                    <v-data-table
                      :headers="headers"
                      :items="clientDetails"
                      :search="search"
                      :single-expand="true"
                      v-model:expanded="expanded"
                      show-expand
                      height="auto"
                      rounded="xl"
                      :item-class="getRowClass"
                      @click:row="toggleExpand"
                      class="font-lato"
                    >
                      <template v-slot:[`item.firstName`]="{ value }">
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
                          <td :colspan="columns.length">
                            Full Address: {{ item.clientInfo.address.street }},
                            {{ item.clientInfo.address.suburb }},
                            {{ item.clientInfo.address.city }},
                            {{ item.clientInfo.address.postalCode }},
                            {{ item.clientInfo.address.complex }},
                            {{ item.clientInfo.address.houseNumber }}
                          </td>
                        </tr>
                        <tr>
                          <td :colspan="columns.length">VAT Number:{{ item.vatNumber }}</td>
                        </tr>
                        <tr>
                          <td :colspan="columns.length">
                            Languages Spoken: {{ item.preferred_Language }}
                          </td>
                        </tr>
                      </template>
                      <!-- Actions slot -->
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-col cols="12" xs="12" sm="12" md="12">
                          <v-btn
                            icon
                            size="small"
                            @click="editClient(item), (editDialog = true)"
                            color="#5A82AF"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="12">
                          <v-btn
                            icon
                            size="small"
                            @click="deleteClient(item), (deleteDialog = true)"
                            color="#5A82AF"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
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

    <v-col> <DeleteClient v-model="deleteDialog" :details="selectedItem" /></v-col>
    <v-col>
      <EditClient v-model="editDialog" @update:selectedItem="handleSelectedItemUpdate"
    /></v-col>
  </v-container>
</template>

<script>
import DeleteClient from './DeleteClient.vue'
import EditClient from './EditClient.vue'
import ClientDetails from './AddClient.vue'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
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
    clients: [],
    clientDetails: [],
    expanded: []
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
    editClient(item) {
      this.selectedItem = item
      console.log('Editing client')
    },
    deleteClient(item) {
      this.selectedItem = item
      console.log('Deleting client')
    },
    openAddClient() {
      this.clientDialog = true
    },
    updatedEditedItem(newItem) {
      this.selectedItem = newItem
    },
    toggleExpand(item) {
      // Check if the item is already expanded
      const isExpanded = this.expanded.includes(item)
      if (isExpanded) {
        this.expanded = []
      } else {
        this.expanded = [item]
        console.log(this.expanded)
      }
    },
    handleSelectedItemUpdate(updatedItem) {
      // Handle the updated item here
      console.log('Updated item:', updatedItem)
      // Perform actions based on the updated item, such as updating data or UI elements
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
})
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
.font-lato {
  font-family: 'Lato', sans-serif;
  font-weight: bold;
}
</style>
