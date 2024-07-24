<template>
  <v-container fluid fill-height>
    <v-card
      height="auto"
      class="pa-11 ma-0 bg-cardColor"
      rounded="md"
      :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
      border="md"
    >
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row align="center" justify="space-between">
          <v-col cols="12" lg="4" md="4" sm="4" class="d-flex justify-start align-center">
            <v-icon icon="mdi-account"></v-icon>
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Client Details</v-label
            >
          </v-col>

          <v-col cols="12" lg="4" md="4" sm="4" class="d-flex justify-center">
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              color="primary"
              width="80%"
              style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
              hide-details
              single-line
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="4" md="4" sm="4" :class="{ 'd-flex justify-end': !isSmallScreen }">
            <AddClient />
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-divider></v-divider>
        <v-col cols="12">
          <div style="height: auto; overflow-y: auto">
            <v-data-table
              :headers="headers"
              :items="clientDetails"
              :search="search"
              label="Clients"
              height="auto"
              rounded="xl"
              class="bg-cardColor"
              :row-props="getRowProps"
              :header-props="{ class: 'bg-cardColor h6' }"
            >
              <template #[`item.firstName`]="{ value }">
                <v-chip variant="text">
                  <v-icon icon="fa:fa-solid fa-user "></v-icon>{{ value }}</v-chip
                >
              </template>
              <template v-slot:[`item.contactInfo.phoneNumber`]="{ value }">
                <v-chip @click="callPhone" text- border="md"
                  ><v-icon icon="fa:fa-solid fa-phone"></v-icon> {{ value }}</v-chip
                >
              </template>
              <template v-slot:[`item.mostRecentJob`]="{ value }">
                <v-chip :color="getColor(value)"> {{ value }}<v-icon>mdi-briefcase</v-icon></v-chip>
              </template>
              <template v-slot:[`item.lastName`]="{ value }">
                <v-chip variant="text"> {{ value }}</v-chip>
              </template>
              <template v-slot:[`item.contactInfo.email`]="{ value }">
                <v-chip @click="sendEmail" text- border="md">
                  <v-icon icon="fa:fa-solid fa-envelope"></v-icon>{{ value }}</v-chip
                >
              </template>
              <template v-slot:[`item.address.street`]="{ value }">
                <v-chip variant="text">
                  <v-icon icon="fa:fa-solid fa-location-dot"></v-icon>{{ value }}</v-chip
                >
              </template>
              <!-- Expanded content slot -->

              <!-- Actions slot -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  rounded="xl"
                  variant="plain"
                  @click="(actionsDialog = true), selectItem(item)"
                >
                  <v-icon color="primary">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </v-col>
      </v-card-text>
    </v-card>

    <v-menu v-model="actionsDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-primary text-center">
          {{ selectedItemName + ' ' + selectedItemSurname }}
        </v-card-title>
        <v-card-text> What would you like to do with this client? </v-card-text>
        <v-list class="bg-cardColor">
          <v-list-item>
            <v-btn @click="actionsDialog = false" color="primary"
              >Close<v-icon
                icon="fa:fa-solid fa-cancel"
                end
                color="primary"
                size="small"
              ></v-icon></v-btn
          ></v-list-item>
          <v-spacer></v-spacer>
          <v-list-item
            ><ClientDetails :colors="colors" :clientDetails="selectedItem"
          /></v-list-item>

          <v-list-item
            ><EditClient
              @update:item="selectedItem = $event"
              :editedItem="selectedItem"
              :_clientID="selectedItemId"
          /></v-list-item>

          <v-list-item>
            <DeleteClient
              :details="selectedItem"
              :client_id="selectedItemId"
              :client="selectedItem"
              :company_id="clientCompanyID"
          /></v-list-item>
        </v-list>
      </v-card>
    </v-menu>
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
    windowWidth: window.innerWidth,
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
        value: 'firstName',
        key: 'firstName',
        class: 'text-h3'
      },
      {
        title: 'Surname',
        align: 'start',
        sortable: true,
        value: 'lastName',
        key: 'lastName',
        class: 'h3'
      },
      {
        title: 'Phone',
        value: 'contactInfo.phoneNumber',
        key: 'contactInfo.phoneNumber',
        class: 'h3'
      },
      {
        title: 'Email',
        value: 'contactInfo.email',
        key: 'contactInfo.email',
        class: 'h3'
      },
      {
        title: 'Address',
        value: 'address.street',
        key: 'address.street',
        class: 'h3'
      },
      { title: '', value: 'actions', key: 'actions', sortable: false, class: 'h3' }
    ],
    search: '',
    clients: [],
    clientDetails: [],
    clientIds: [],
    clientCompanyID: '',
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
    },
    tableClass() {
      return {
        'dark-mode': this.isdarkmode,
        'light-mode': !this.isdarkmode
      }
    },
    currentTheme() {
      return this.$theme // Example of accessing a global property, adjust based on actual implementation
    },
    globalTheme() {
      return this.$theme.global // Adjust based on actual implementation
    },
    isSmallScreen() {
      return this.windowWidth < 960 // adjust this value based on your breakpoint
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    this.getClients()
    this.isdarkmode = localStorage.getItem('theme') === 'true' ? true : false
  },
  methods: {
    getRowClass(index) {
      return index % 2 === 0 ? 'primary-row' : 'secondary-row'
    },
    selectItem(item) {
      this.selectedItem = item
      this.selectedItemName = item.firstName
      console.log(this.selectedItemName)
      this.selectedItemSurname = item.lastName
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i] === item) {
          this.selectedItemId = this.clientIds[i]
          this.clientCompanyID = this.clientDetails[i].companyId
        }
      }
      console.log('Deleting client' + this.selectedItemId)
      console.log('Selected item:', this.selectedItem) // Corrected console.log
    },
    editClient(item) {
      console.log(item)
      this.selectedItem = item
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i] === item) {
          this.selectedItemId = this.clientDetails[i].id
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
      console.log('Deleting client' + this.selectedItemId)
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
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
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
    getRowProps({ index }) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    async isLocalAvailable(localUrl) {
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
})
</script>

<style>
@import '@/assets/styles.css';
.fixed-container {
  position: fixed; /* or 'absolute' depending on your layout */
  top: 30px; /* Adjust this value based on the height of your navigation bar */
  left: 0;
  width: 100%; /* Adjust width as necessary */
  z-index: 1; /* Ensure this is below your navbar if it's fixed as well */
}
.primary-row {
  background-color: #e0f7fa; /* Example primary color */
}
.secondary-row {
  background-color: #fce4ec; /* Example secondary color */
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

.fin {
  background-color: #38414a;
}
/* Dark mode */

/* Light mode */

.h3 {
  background: red;
}
.font-family-lato {
  font-family: 'Lato', sans-serif;
}

.dark-mode tbody tr:nth-of-type(odd) {
  background-color: #454f59; /* Dark mode odd row color */
}

.light-mode tbody tr:nth-of-type(odd) {
  background-color: #dcdfe4; /* Light mode odd row color */
}
</style>
