<template>
  <v-app :style="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color">
    <v-row>
      <v-row justify="center">
        <NavigationBar :isDarkMode="isdarkmode" />
      </v-row>
    </v-row>

    <v-container
      ><v-row justify="center">
        <v-col cols="2" sm="1" md="1">
          <v-btn height="50" width="100" rounded="xl">
            <v-icon>mdi-plus</v-icon>
          </v-btn> </v-col
        ><v-col cols="2" sm="1" md="1">
          <v-btn height="50" width="100" rounded="xl">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8" sm="2" md="4" xl="6"
          ><SearchBar :isDarkMode="isdarkmode" :text="'Search Clients'"
        /></v-col>
      </v-row>
      <v-row justify="center">
        <v-col v-for="n in 4" :key="n" cols="12" sm="4" md="6" xl="8" offset="2"
          ><v-sheet
            ><v-col cols="12" sm="4" md="6" xl="8" offset="2">
              <v-card rounded="xl">
                <v-card>
                  <v-card-title>Client Details</v-card-title>
                  <v-card-text>
                    <div>Name: John Doe</div>
                    <div>Number: 1234567890</div>
                    <div>Email: example@example.com</div>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col></v-sheet
          >
        </v-col></v-row
      ></v-container
    >
  </v-app>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import SearchBar from './SearchBar.vue'

export default {
  name: 'ClientDesk',

  props: {
    isDarkMode: Boolean
  },
  data: () => ({
    isdarkmode: true,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF'
  }),
  components: {
    NavigationBar,
    SearchBar
  }
}
</script>
