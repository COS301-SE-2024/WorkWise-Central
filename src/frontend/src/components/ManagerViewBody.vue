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
                <v-card color="white" :height="50" rounded="xl"> Hello </v-card>
              </v-col>
              <v-col :cols="12">
                <v-card color="grey" :height="50">Now</v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
