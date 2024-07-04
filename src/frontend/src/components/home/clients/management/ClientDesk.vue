<template>
  <v-container fluid fill-height>
    <v-col>
      <v-card
        flat
        :height="auto"
        class="pa-11 ma-0"
        rounded="md"
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
          <AddClient
            v-model="addClientDialog"
            @close="addClientDialog = false"
            :isDarkMode="isDarkMode"
          />
        </v-card-title>

        <v-divider></v-divider>
        <v-col cols="12" xs="12" sm="12" md="12">
          <div style="height: 700px; overflow-y: auto">
            <v-col cols="12" xs="12" sm="12" md="12">
              <v-data-table
                :headers="headers"
                :items="clientDetails2"
                :search="search"
                :single-expand="true"
                v-model:expanded="expanded"
                show-expand
                height="auto"
                rounded="xl"
                :item-class="getRowClass"
                class="font-lato"
              >
                <template v-slot:[`item.name`]="{ value }">
                  <v-chip variant="text" color="black">
                    <v-icon>mdi-account</v-icon>{{ value }}</v-chip
                  >
                </template>
                <template v-slot:[`item.phoneNumber`]="{ value }">
                  <v-chip variant="text" @click="callPhone" color="#5A82AF"
                    ><v-icon>mdi-phone</v-icon> {{ value }}</v-chip
                  >
                </template>
                <template v-slot:[`item.mostRecentJob`]="{ value }">
                  <v-chip :color="getColor(value)">
                    {{ value }}<v-icon>mdi-briefcase</v-icon></v-chip
                  >
                </template>
                <template v-slot:[`item.surname`]="{ value }">
                  <v-chip variant="text" color="black"> {{ value }}</v-chip>
                </template>
                <template v-slot:[`item.email`]="{ value }">
                  <v-chip variant="text" @click="sendEmail" color="#5A82AF">
                    <v-icon>mdi-email</v-icon>{{ value }}</v-chip
                  >
                </template>
                <template v-slot:[`item.address.street`]="{ value }">
                  <v-chip variant="text" color="black">
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
                    <td :colspan="columns.length">
                      Languages Spoken: {{ item.preferred_Language }}
                    </td>
                  </tr>
                </template>
                <!-- Actions slot -->
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    rounded="xl"
                    variant="plain"
                    style="transform: rotate(90deg) dots"
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

    <v-dialog v-model="actionsDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
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
    isdarkmode: false,
    clientDialog: false,
    deleteDialog: false,
    editDialog: false,
    addClientDialog: false,
    actionsDialog: false,
    colors: {
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF'
    },
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
      { title: 'Phone', value: 'phoneNumber', key: 'phoneNumber' },
      { title: 'Email', value: 'email', key: 'email' },
      { title: 'Address', value: 'address.street', key: 'address.street' },
      { title: '', value: 'actions', key: 'actions', sortable: false }
    ],
    search: '',
    clientDetails2: [
      {
        id: 1,
        name: 'Kumbirai',
        surname: 'Doe',
        phoneNumber: '123-456-7890',
        email: 'john.doe@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 2,
        name: 'Jane',
        surname: 'Doe',
        phoneNumber: '098-765-4321',
        email: 'jane.doe@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 3,
        name: 'Michael',
        surname: 'Smith',
        phoneNumber: '555-123-4567',
        email: 'michael.smith@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 4,
        name: 'Emily',
        surname: 'Johnson',
        phoneNumber: '555-987-6543',
        email: 'emily.johnson@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 5,
        name: 'David',
        surname: 'Williams',
        phoneNumber: '555-678-1234',
        email: 'david.williams@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 6,
        name: 'Jessica',
        surname: 'Brown',
        phoneNumber: '555-345-6789',
        email: 'jessica.brown@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 7,
        name: 'Daniel',
        surname: 'Jones',
        phoneNumber: '555-456-7890',
        email: 'daniel.jones@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 8,
        name: 'Sarah',
        surname: 'Miller',
        phoneNumber: '555-567-8901',
        email: 'sarah.miller@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        actions: '',
        preferredLanguage: 'English'
      },
      {
        id: 9,
        name: 'Matthew',
        surname: 'Wilson',
        phoneNumber: '555-678-9012',
        email: 'matthew.wilson@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 10,
        name: 'Ashley',
        surname: 'Moore',
        phoneNumber: '555-789-0123',
        email: 'ashley.moore@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 11,
        name: 'Christopher',
        surname: 'Taylor',
        phoneNumber: '555-890-1234',
        email: 'christopher.taylor@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 12,
        name: 'Amanda',
        surname: 'Anderson',
        phoneNumber: '555-901-2345',
        email: 'amanda.anderson@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 13,
        name: 'Joshua',
        surname: 'Thomas',
        phoneNumber: '555-012-3456',
        email: 'joshua.thomas@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 14,
        name: 'Nicole',
        surname: 'Harris',
        phoneNumber: '555-123-4560',
        email: 'nicole.harris@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 15,
        name: 'Ryan',
        surname: 'Martin',
        phoneNumber: '555-234-5671',
        email: 'ryan.martin@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 16,
        name: 'Heather',
        surname: 'Garcia',
        phoneNumber: '555-345-6782',
        email: 'heather.garcia@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 17,
        name: 'Brandon',
        surname: 'Robinson',
        phoneNumber: '555-456-7893',
        email: 'brandon.robinson@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 18,
        name: 'Elizabeth',
        surname: 'Clark',
        phoneNumber: '555-567-8904',
        email: 'elizabeth.clark@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 19,
        name: 'Adam',
        surname: 'Lewis',
        phoneNumber: '555-678-9015',
        email: 'adam.lewis@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      },
      {
        id: 20,
        name: 'Megan',
        surname: 'Walker',
        phoneNumber: '555-789-0126',
        email: 'megan.walker@example.com',
        address: {
          street: '654 Oak Street',
          city: 'Springfield',
          suburb: 'IL',
          postalCode: '62701',
          complex: 'Apt 123',
          houseNumber: '123'
        },
        preferredLanguage: 'English',
        actions: ''
      }
    ],
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
</style>
