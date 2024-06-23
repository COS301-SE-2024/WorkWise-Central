<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManagerEditEmployee',
  data() {
    return {
      role_change: false
    }
  },
  methods: {
    async change_roles() {
      this.role_change = true
    }
  }
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
          label="Company Role"
          :items="['Administrator', 'Manager', 'Technician']"
        ></v-select>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          size="x-large"
          :max-width="50"
          color="#5A82AF"
          block
          @change="change_roles"
          :disabled="role_change!"
          >Button</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
