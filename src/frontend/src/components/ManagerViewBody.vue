<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManagerViewBody'
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
        <v-col class="search_bar_space"> </v-col>
        <v-spacer></v-spacer>

        <v-col>
          <v-sheet rounded class="h-lg-screen w-lg-screen" color="red">
            <v-row v-for="i in 10" :key="i">
              <v-col :cols="12">
                <v-card color="#879898" :height="50" rounded="xl">
                  <v-row class="center">
                    <v-col :cols="2"><v-card class="pa-2 ma-1"> Tinashe Fadza</v-card></v-col>
                    <v-col :cols="1">
                      <v-card class="pa-2 ma-1">
                        <v-row justify="center">
                          <v-menu min-width="200px" rounded>
                            <template v-slot:activator="{ props }">
                              <v-btn icon v-bind="props">
                                <v-avatar color="brown" size="large">
                                  <span class="text-h5">{{ 'TF' }}</span>
                                </v-avatar>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-text>
                                <div class="mx-auto text-center">
                                  <v-avatar color="brown">
                                    <span class="text-h5">{{ 'TF' }}</span>
                                  </v-avatar>
                                  <h3>{{ 'Tinas' }}</h3>
                                  <p class="text-caption mt-1">
                                    {{ 'example@gamil.com' }}
                                  </p>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Edit Account </v-btn>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Disconnect </v-btn>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-menu>
                        </v-row>
                      </v-card></v-col
                    >
                    <v-col :cols="6" align="center">
                      <v-card class="pa-2 ma-1">dummy@gmail.com</v-card></v-col
                    >
                    <v-col :cols="3" align="end">
                      <v-card class="pa-2 ma-1 justify-lg-end"
                        ><v-btn color="yellow"> ASSIGN </v-btn></v-card
                      ></v-col
                    >
                  </v-row>
                </v-card>
              </v-col>
              <v-col :cols="12">
                <v-card color="#6A99CE" :height="50" rounded="xl" class="justify-center">
                  <v-row class="center">
                    <v-col :cols="2"><v-card class="pa-2 ma-1"> Tinashe Fadza</v-card></v-col>
                    <v-col :cols="1">
                      <v-card class="pa-2 ma-1">
                        <!--THIS IS WHERE THE ICON IS PLACED-->
                        <v-row justify="center">
                          <v-menu min-width="200px" rounded>
                            <template v-slot:activator="{ props }">
                              <v-btn icon v-bind="props">
                                <v-avatar color="brown" size="large">
                                  <span class="text-h5">{{ 'GR' }}</span>
                                </v-avatar>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-card-text>
                                <div class="mx-auto text-center">
                                  <v-avatar color="brown">
                                    <span class="text-h5">{{ 'GR' }}</span>
                                  </v-avatar>
                                  <h3>{{ 'Tinas' }}</h3>
                                  <p class="text-caption mt-1">
                                    {{ 'example@gamil.com' }}
                                  </p>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Edit Account </v-btn>
                                  <v-divider class="my-3"></v-divider>
                                  <v-btn variant="text" rounded> Disconnect </v-btn>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-menu>
                        </v-row>
                        <!--THIS IS WHERE THE ICON CODE ENDS-->
                      </v-card></v-col
                    >
                    <v-col :cols="6" align="center">
                      <v-card class="pa-2 ma-1">dummy@gmail.com</v-card></v-col
                    >
                    <v-col :cols="3" align="end">
                      <v-card class="pa-2 ma-1 justify-lg-end"
                        ><v-btn color="yellow"> ASSIGN </v-btn></v-card
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
