<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManagerEditEmployee'
})
</script>

<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col>
        <v-col :cols="12">
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Tinashe Fadzac
          </h4></v-col
        >
        <v-spacer></v-spacer>
      </v-col>
      <v-col :cols="12">
        <v-select
          clearable
          label="Company permissions"
          :items="['Administrator', 'Manager', 'Technician']"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
