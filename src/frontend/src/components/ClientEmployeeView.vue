<template>
  <v-app>
    <v-row>
      <NavigationBar :isDarkMode="isdarkmode" />
    </v-row>
    <v-container fluid fill-height class="pa-16 ma-auto pt-5 fixed-container">
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
                  ></v-select>
                  <v-spacer></v-spacer>
                  <v-card
                    v-for="client in filteredClients"
                    :key="client.id"
                    border="md"
                    width="85%"
                    :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                  >
                    <v-row>
                      <v-col
                        ><v-card-title>{{ client.name }}</v-card-title>
                        <v-card-text>
                          <div>Email: {{ client.email }}</div>
                          <div>Phone: {{ client.phone }}</div>
                        </v-card-text></v-col
                      >
                      <v-col align-self="end">
                        <v-card-actions>
                          <v-btn text>View Client Details</v-btn>
                          <v-btn text>View Job Details</v-btn>
                        </v-card-actions></v-col
                      ></v-row
                    >
                  </v-card></v-col
                >

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
export default {
  name: 'ClientEmployeeView',
  props: {
    isDarkMode: Boolean
  },
  components: {
    NavigationBar
  },
  computed: {
    filteredClients() {
      let result = this.clients
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
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    searchQuery: '',
    clients: [
      {
        id: 1,
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
        id: 2,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        id: 3,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        id: 4,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        id: 5,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      },
      {
        id: 6,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: 'Toronto',

        jobRequired: 'M1A 1A1',
        actions: 'Edit | Delete'
      }
    ]
  })
}
</script>
