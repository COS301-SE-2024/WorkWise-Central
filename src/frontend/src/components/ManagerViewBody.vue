<script lang="ts">
import { defineComponent } from 'vue'
import AddEmployee from './AddEmployee.vue'

export default defineComponent({
  name: 'ManagerViewBody',
  components: {
    AddEmployee
  },
  data() {
    return {
      search: ''
    }
  }
})
</script>

<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Employees
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-card-title class="d-flex align-center pe-2">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
              single-line
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-col cols="2" class="justify-lg-end"><AddEmployee></AddEmployee></v-col>
          </v-card-title>
        </v-col>
        <v-col class="search_bar_space"> </v-col>
        <v-spacer></v-spacer>

        <v-col>
          <v-sheet rounded class="h-lg-screen w-lg-screen">
            <v-row v-for="i in 10" :key="i">
              <v-col :cols="12">
                <v-card color="rgb(135,152,152,0.40)" :height="50" rounded>
                  <v-row class="center">
                    <v-col cols="auto"
                      ><v-card class="pa-2 ma-1" color="rgb(135,152,152,0)" variant="flat">
                        Tinashe Fadza</v-card
                      ></v-col
                    >
                    <v-col :cols="1">
                      <v-card class="pa-3" color="rgb(135,152,152,0)" variant="flat">
                        <v-row justify="center">
                          <v-menu min-width="200px" rounded>
                            <template v-slot:activator="{ props }">
                              <v-btn icon v-bind="props" variant="flat">
                                <v-avatar color="red" size="large">
                                  <span class="text-h5">{{ 'TF' }}</span>
                                </v-avatar>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-text>
                                <div class="mx-auto text-center">
                                  <v-avatar color="blue">
                                    <span class="text-h5">{{ 'TF' }}</span>
                                  </v-avatar>
                                  <h3>{{ 'Tinas' }}</h3>
                                  <p class="text-caption mt-1">
                                    {{ 'example@gamil.com' }}
                                  </p>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Edit Account </v-btn>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Remove Account </v-btn>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-menu>
                        </v-row>
                      </v-card></v-col
                    >
                    <v-col :cols="6" align="center">
                      <v-card class="pa-2 ma-1" color="rgb(135,152,152,0)" variant="flat"
                        >dummy@gmail.com</v-card
                      ></v-col
                    >
                    <v-col :cols="3" align="end">
                      <v-card
                        class="pa-1 ma-1 justify-lg-end"
                        color="rgb(135,152,152,0)"
                        variant="flat"
                        ><v-btn color="#879898" variant="flat"> ASSIGN </v-btn></v-card
                      ></v-col
                    >
                  </v-row>
                </v-card>
              </v-col>
              <v-col :cols="12">
                <v-card color="#6A99CE" :height="50" rounded class="justify-center">
                  <v-row class="center">
                    <v-col cols="auto"
                      ><v-card class="pa-2 ma-1" color="#6A99CE" variant="flat">
                        Tinashe Fadza</v-card
                      ></v-col
                    >
                    <v-col :cols="1">
                      <v-card class="pa-3" color="#6A99CE" variant="flat">
                        <!--THIS IS WHERE THE ICON IS PLACED-->
                        <v-row justify="center">
                          <v-menu min-width="200px" rounded>
                            <template v-slot:activator="{ props }">
                              <v-btn variant="flat" icon v-bind="props">
                                <v-avatar color="#879898" size="large">
                                  <span class="text-h5">{{ 'GR' }}</span>
                                </v-avatar>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-text>
                                <div class="mx-auto text-center">
                                  <v-avatar color="#879898">
                                    <span class="text-h5">{{ 'GR' }}</span>
                                  </v-avatar>
                                  <h3>{{ 'Tinas' }}</h3>
                                  <p class="text-caption mt-1">
                                    {{ 'example@gamil.com' }}
                                  </p>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Edit Account </v-btn>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Remove Account </v-btn>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-menu>
                        </v-row>
                        <!--THIS IS WHERE THE ICON CODE ENDS-->
                      </v-card></v-col
                    >
                    <v-col :cols="6" align="center">
                      <v-card class="pa-2 ma-1" color="#6A99CE" variant="flat"
                        >dummy@gmail.com</v-card
                      ></v-col
                    >
                    <v-col :cols="3" align="end">
                      <v-card class="pa-1 ma-1 justify-lg-end" color="#6A99CE" variant="flat"
                        ><v-btn color="#879898" variant="flat"> ASSIGN </v-btn></v-card
                      ></v-col
                    >
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
