<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManagerViewBody'
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Managers Desk
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col col="12">
          <v-sheet
            :width="1400"
            :height="900"
            :max-width="1400"
            :max-height="900"
            color="red"
          ></v-sheet>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
