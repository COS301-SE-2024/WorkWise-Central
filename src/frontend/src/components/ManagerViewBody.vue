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
            <v-row>
              <v-col :cols="12">
                <v-card color="#879898" :height="50" rounded="xl"> </v-card>
              </v-col>
              <v-col :cols="12">
                <v-card color="#6A99CE" :height="50" rounded="xl" class="justify-center">
                  <v-row class="center">
                    <v-col :cols="2"><v-card class="pa-2 ma-1"> Tinashe Fadza</v-card></v-col>
                    <v-col :cols="1"> <v-card class="pa-2 ma-1">TAFF</v-card></v-col>
                    <v-col :cols="6" align="center">
                      <v-card class="pa-2 ma-1">dummy@gmail.com</v-card></v-col
                    >
                    <v-col :cols="3" align="end">
                      <v-card class="pa-2 ma-1 justify-lg-end">Button</v-card></v-col
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
