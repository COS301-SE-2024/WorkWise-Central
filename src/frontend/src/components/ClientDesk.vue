<template>
  <v-app :style="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color">
    <v-row>
      <v-row justify="center">
        <NavigationBar :isDarkMode="isdarkmode" />
      </v-row>
    </v-row>

    <v-container fluid fill-height class="pa-16 ma-auto pt-5 fixed-container">
      <v-row justify="center" xs="4" sm="4" md="12">
        <v-col cols="12">
          >
          <v-row justify="center">
            <v-col cols="12" xs="4" sm="4" md="12" offset="3">
              <v-card
                flat
                :height="auto"
                :width="1500"
                class="pa-11 ma-10"
                rounded="xl"
                elevation-2
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
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
                    single-line
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn size="large" @click="clientDialog = true">New Client</v-btn>
                </v-card-title>

                <v-divider></v-divider>
                <div style="height: 700px; overflow-y: auto">
                  <v-data-table
                    :headers="headers"
                    :items="clients"
                    :search="search"
                    rounded="xl"
                    show-expand
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-col cols="6">
                        <v-btn icon size="small" @click="editDialog = true">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="6"
                        ><v-btn icon size="small" @click="deleteDialog = true">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn></v-col
                      >
                      <v-col cols="6"
                        ><v-btn icon size="small"> <v-icon icon="md:info"></v-icon> </v-btn
                      ></v-col>
                    </template>
                  </v-data-table>
                  <pre>[{sortBy}]</pre>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col></v-row
      >
      <v-col> <ClientDetails v-model="clientDialog" @close="clientDialog = false" /></v-col>
      <v-col>
        <DeleteClient v-model="deleteDialog" @close="deleteDialog = false" :opened="deleteDialog"
      /></v-col>
      <v-col>
        <EditClient v-model="editDialog" @close="editDialog = false" :opened="editDialog"
      /></v-col>
    </v-container>
  </v-app>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import DeleteClient from './DeleteClient.vue'
import EditClient from './EditClient.vue'
import ClientDetails from './AddClient.vue'
export default {
  name: 'ClientDesk',

  props: {
    isDarkMode: Boolean
  },
  data: () => ({
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
        title: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
        key: 'name'
      },
      { title: 'Email', value: 'email', key: 'email' },
      { title: 'Phone', value: 'phone', key: 'phone' },
      { title: 'Address', value: 'address', key: 'address' },
      { title: 'Job Required', value: 'jobRequired', key: 'jobRequired' },
      { title: 'Actions', value: 'actions', key: 'actions' }
    ],
    search: '',
    clients: [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',
        province: 'Ontario',
        country: 'Canada',
        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'No Jobs Required',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'Needs to be done',
        actions: 'Edit | Delete'
      },
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'Currently in progress',
        actions: 'Edit | Delete'
      }
    ]
  }),
  components: {
    NavigationBar,
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
  method: {
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
</style>
