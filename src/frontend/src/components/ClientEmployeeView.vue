<template>
  <v-app>
    <v-row>
      <NavigationBar :isDarkMode="isdarkmode" />
    </v-row>
    <v-container fluid fill-height class="pa-16 ma-auto pt-5">
      <v-row justify="center" xs="4" sm="4" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col cols="12" xs="4" sm="4" md="12" offset="3">
              <v-sheet
                flat
                :height="auto"
                :width="1500"
                class="pa-11 ma-10"
                rounded="xl"
                elevation-2
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                border="sm"
                ><v-col cols="12" offset="1"
                  ><v-card-title class="d-flex align-center pe-2">
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
                      :bg-color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                    ></v-text-field>
                    <v-spacer></v-spacer> </v-card-title
                ></v-col>

                <!-- Cards repeating inside v-sheet -->
                <v-col cols="12" offset="1"
                  ><v-select
                    v-model="sortKey"
                    :items="['name', 'email', 'phone']"
                    label="Sort by"
                    single-line
                    hide-details
                    width="25%"
                    class="mb-5"
                  ></v-select>
                  <v-spacer></v-spacer>
                  <v-card
                    v-for="client in filteredClients"
                    :key="client.firstName"
                    border="md"
                    width="85%"
                    class="mb-5"
                    rounded="xl"
                    :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  >
                    <v-row>
                      <v-col
                        ><v-card-title>{{ client.firstName }}</v-card-title>
                        <v-card-text>
                          <div>Email: {{ client.clientInfo.email }}</div>
                          <div>Phone: {{ client.clientInfo.phoneNumber }}</div>
                        </v-card-text></v-col
                      >
                      <v-col align-self="end">
                        <v-card-actions>
                          <ClientDetails :isDarkMode="isdarkmode" :colors="colors" :ClientDetails="client" />
                          <ClientJobs
                            :isdarkmode="isdarkmode"
                            :colors="colors"
                          ></ClientJobs> </v-card-actions></v-col
                    ></v-row> </v-card
                ></v-col>
                <v-spacer></v-spacer>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import axios from 'axios'
import ClientDetails from './ClientDetails.vue'
import ClientJobs from './ClientJobs.vue'
export default {
  name: 'ClientEmployeeView',
  props: {
    isDarkMode: Boolean
  },
  components: {
    NavigationBar,
    ClientDetails,
    ClientJobs
  },
  computed: {
    filteredClients() {
      let result = this.clientDetails
      if (this.searchQuery) {
        result = result.filter((client) => {
          return Object.values(client).some((value) =>
            value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        })
      }
      if (this.sortKey) {
        result.sort((a, b) => {
          if (a[this.sortKey] < b[this.sortKey]) return -1
          if (a[this.sortKey] > b[this.sortKey]) return 1
          return 0
        })
      }
      return result
    }
  },
  data: () => ({
    isdarkmode: false,
    numCards: 5,

    colors: {
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF'
    },
    searchQuery: '',
    clients: [],
    clientDetails: []
  }),
  mounted() {
    this.getClients()
  },
  methods: {
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
    }
  }
}
</script>
