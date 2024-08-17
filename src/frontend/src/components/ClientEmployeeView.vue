<template>
  <v-app>
    <v-container fluid fill-height class="pa-16 ma-auto pt-5">
      <v-row justify="center" xs="4" sm="4" md="12">
        <v-col cols="12">
          <v-row justify="center">
            <v-col>
              <v-sheet
                flat
                class="pa-11 ma-10 h-lg-screen w-lg-screen"
                rounded="xl"
                elevation-2
                :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                border="sm"
                ><v-col cols="12" offset="1">
                  <v-card-title class="d-flex align-center pe-2">
                    <v-icon icon="mdi-account"></v-icon> &nbsp;
                    <span class="large-text">Client Details</span>
                    <v-spacer></v-spacer>
                  </v-card-title>
                </v-col>

                <!-- Cards repeating inside v-sheet -->
                <v-col cols="12" xs="12" sm="12" md="12" offset="1">
                  <v-row>
                    <v-col :cols="4">
                      <v-select
                        v-model="sortKey"
                        :items="['name', 'email', 'phone']"
                        label="Sort by"
                        single-line
                        hide-details
                        class="mb-5"
                        width="50%"
                        height="35%"
                      ></v-select>
                    </v-col>
                    <v-col :cols="4">
                      <v-select
                        v-model="sortKey"
                        :items="['name', 'email', 'phone']"
                        label="Filter by"
                        single-line
                        hide-details
                        class="mb-5"
                        width="50%"
                        height="35%"
                      ></v-select>
                    </v-col>
                    <v-col :cols="4">
                      <v-text-field
                        v-model="search"
                        density="compact"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        variant="solo-filled"
                        flat
                        hide-details
                        width="50%"
                        single-line
                        :bg-color="isDarkMode ? modal_dark_theme_color : modal_light_theme_color"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card
                    v-for="client in filteredClients"
                    :key="client.firstName"
                    border="md"
                    width="85%"
                    class="mb-5"
                    rounded="xl"
                    :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
                  >
                    <v-row>
                      <v-col
                        ><v-card-title
                          ><v-chip color="#5A82AF">
                            <v-icon icon="mdi-account"></v-icon>{{ client.firstName }}</v-chip
                          ></v-card-title
                        >
                        <v-card-text>
                          <div><v-icon icon="mdi-email"></v-icon>{{ client.clientInfo.email }}</div>
                          <div>
                            <v-icon icon="mdi-phone"></v-icon>{{ client.clientInfo.phoneNumber }}
                          </div>
                        </v-card-text></v-col
                      >
                      <v-col align-self="end">
                        <v-card-actions>
                          <v-col :cols="6" align="end"
                            ><ClientDetails
                              :isDarkMode="isDarkMode"
                              :colors="colors"
                              :ClientDetails="client"
                          /></v-col>
                          <v-col :cols="6" align="end">
                            <ClientJobs :isDarkMode="isDarkMode" :colors="colors"></ClientJobs
                          ></v-col> </v-card-actions></v-col
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
import axios from 'axios'
import ClientDetails from './home/clients/management/ClientDetails.vue'
import ClientJobs from './ClientJobs.vue'
export default {
  name: 'ClientEmployeeView',
  props: {
    isDarkMode: Boolean
  },
  components: {
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
    isDarkMode: false,
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

<style>
.large-text {
  font-size: 20px; /* Adjust the font size as needed */
}
</style>
