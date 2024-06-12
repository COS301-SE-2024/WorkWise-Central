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
          <v-card  rounded ="xl" class="h-xs-screen w-xs-screen h-lg-screen w-lg-screen" color="red">

          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
