<template>
  <v-container fluid fill-height>
    <v-sheet
      height="auto"
      class="pa-11 ma-0"
      rounded="md"
      :theme="isdarkmode ? 'dark' : 'light'"
      border="md"
    >
      <v-card-title
        class="d-flex align-center pe-2"
        :style="
          (isdarkmode === true ? dark_theme_text_color : light_theme_text_color,
          'font-family: Lato, sans-serif; font-size: 25px; font-weight: lighter')
        "
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
          :theme="isdarkmode ? 'dark' : 'light'"
          single-line
        ></v-text-field>
        <v-spacer></v-spacer>
        <AddClient
          v-model="addClientDialog"
          @close="addClientDialog = false"
          :isDarkMode="isDarkMode"
        />
      </v-card-title>

      <v-divider></v-divider>
      <v-col cols="12" xs="12" sm="12" md="12">
        <div style="height: auto; overflow-y: auto">
          <v-col cols="12" xs="12" sm="12" md="12">
            <v-data-table
              :headers="headers"
              :items="clientDetails"
              :search="search"
              label="Clients"
              height="auto"
              rounded="xl"
              :item-class="getRowClass"
              class="font-lato"
              :theme="isdarkmode ? 'dark' : 'light'"
            >
              <template v-slot:[`item.name`]="{ value }">
                <v-chip variant="text" :color="isdarkmode ? 'white' : 'black'">
                  <v-icon>mdi-account</v-icon>{{ value }}</v-chip
                >
              </template>
              <template v-slot:[`item.contactInfo.phoneNumber`]="{ value }">
                <v-chip variant="text" @click="callPhone" color="#5A82AF"
                  ><v-icon>mdi-phone</v-icon> {{ value }}</v-chip
                >
              </template>
              <template v-slot:[`item.mostRecentJob`]="{ value }">
                <v-chip :color="getColor(value)"> {{ value }}<v-icon>mdi-briefcase</v-icon></v-chip>
              </template>
              <template v-slot:[`item.surname`]="{ value }">
                <v-chip variant="text" :color="isdarkmode ? 'white' : 'black'"> {{ value }}</v-chip>
              </template>
              <template v-slot:[`item.contactInfo.email`]="{ value }">
                <v-chip variant="text" @click="sendEmail" color="#5A82AF">
                  <v-icon>mdi-email</v-icon>{{ value }}</v-chip
                >
              </template>
              <template v-slot:[`item.address.street`]="{ value }">
                <v-chip variant="text" :color="isdarkmode ? 'white' : 'black'">
                  <v-icon>mdi-map-marker</v-icon>{{ value }}</v-chip
                >
              </template>
              <!-- Expanded content slot -->
              <template v-slot:expanded-row="{ columns, item }">
                <tr>
                  <td :colspan="columns.length">
                    Full Address: {{ item.name }}, {{ item.surname }}
                  </td>
                </tr>
                <tr>
                  <td :colspan="columns.length">VAT Number:{{ item.vatNumber }}</td>
                </tr>
                <tr>
                  <td :colspan="columns.length">Languages Spoken: {{ item.preferred_Language }}</td>
                </tr>
              </template>
              <!-- Actions slot -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip location="end" v-modal="show">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      rounded="xl"
                      variant="plain"
                      v-bind="attrs"
                      v-on="on"
                      @click="(actionsDialog = true), selectItem(item)"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <span>More Actions</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-col>
        </div>
      </v-col>
    </v-sheet>


    <v-dialog v-model="actionsDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-primary">
          {{ selectedItemName + ' ' + selectedItemSurname }}
        </v-card-title>
        <v-card-text> What would you like to do with this job? </v-card-text>
        <v-card-actions>
          <ClientDetails :colors="colors" :ClientDetails="selectedItem" />
          <EditClient
            @update:item="selectedItem = $event"
            :editedItem="selectedItem"
            :_clientID="selectedItemId"
          /><DeleteClient :details="selectedItem" :client_id="selectedItemId" />
          <v-spacer></v-spacer>
          <v-btn @click="actionsDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import DeleteClient from './DeleteClient.vue'
import EditClient from './EditClient.vue'
import AddClient from './AddClient.vue'
import ClientDetails from './ClientDetails.vue'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClientDesk',

  props: {
    isDarkMode: Boolean
  },
  data: () => ({
    dummy: '',
    selectedItem: {},
    selectedItemName: '',
    selectedItemSurname: '',
    isdarkmode: true,
    clientDialog: false,
    deleteDialog: false,
    editDialog: false,
    addClientDialog: false,
    actionsDialog: false,
    show: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    sortBy: [
      { key: 'name', order: 'asc' },
      { key: 'email', order: 'asc' },
      { key: 'phone', order: 'asc' },
      { key: 'address.street', order: 'asc' },
      { key: 'jobRequired', order: 'asc' }
    ],
    headers: [
      {
        title: 'First Name',
        align: 'start',
        sortable: true,
        value: 'name',
        key: 'name'
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
      { title: 'Address', value: 'address.street', key: 'address.street' },
      { title: '', value: 'actions', key: 'actions', sortable: false }
    ],
    search: '',
    clients: [],
    clientDetails: [],
    clientIds: [],
    expanded: [],
    selectedItemId: ''
  }),
  components: {
    ClientDetails,
    DeleteClient,
    EditClient,
    AddClient
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
    this.isdarkmode = sessionStorage.getItem('theme') === 'true' ? true : false
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
      this.selectedItemName = item.name
      console.log(this.selectedItemName)
      this.selectedItemSurname = item.surname
      console.log('Selected item:', this.selectedItem) // Corrected console.log
    },
    editClient(item) {
      console.log(item)
      this.selectedItem = item
      for (let i = 0; i < this.clientDetails2.length; i++) {
        if (this.clientDetails2[i] === item) {
          this.selectedItemId = this.clientDetails2[i].id
        }
      }
      console.log('Editing client')
      console.log(this.selectedItem)
    },
    sendEmail(item) {
      window.location.href = 'mailto:' + item.email
    },
    callPhone(item) {
      window.location.href = 'tel:' + item.phoneNumber
    },
    deleteClient(item) {
      this.selectedItem = item
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i] === item) {
          this.selectedItemId = this.clientIds[i]
        }
      }
      console.log('Deleting client')
    },
    viewClientDetails() {
      console.log('Viewing client details')
      console.log(this.selectedItem)
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
          console.log(this.clients)
          for (let i = 0; i < this.clients.length; i++) {
            this.clientIds[i] = this.clients[i]._id
            console.log(this.clientIds[i])
            this.clientDetails[i] = this.clients[i].details
            console.log(this.clientDetails[i])
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
.vertical-menu {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the space between buttons */
}
.dots {
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; /* The Arial font appears to have "square" dots */
  font-size: 36px; /* The size of the dots */
  line-height: 0; /* helps vertically position the dots */
  margin-top: -10px; /* helps "raise" the dots higher */
  letter-spacing: -2px; /* "squeezes" the dots closer together */
}
.modal-dark-theme {
  background-color: #2b2b2b;
}

.modal-light-theme {
  background-color: #ffffff;
}
.light-theme-text {
  color: rgb(0, 0, 0);
  opacity: 65%;
}

.dark-theme-text {
  color: #dcdbdb;
}
</style>
