<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col>
        <v-col :cols="12">
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">FAQ</h4></v-col
        >
      </v-col>
      <v-col :cols="12">
        <v-sheet rounded class="h-lg-screen w-lg-screen" color="red">
          <div>
            <v-expansion-panels class="my-4" variant="inset" color="blue">
              <v-expansion-panel
                v-for="i in 10"
                :key="i"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                :title="'Question ' + i"
              ></v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SupportComponent'
})
</script>

<style scoped></style>
