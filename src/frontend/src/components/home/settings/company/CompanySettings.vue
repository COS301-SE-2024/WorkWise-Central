<template>
  <v-dialog
    v-model="companyDialog"
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
    location="bottom"
    max-width="700"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="success" width="100%" height="35" variant="outlined">
        Settings
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Company Settings</v-card-title>
      <v-card-text></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CompanySettings',

  data() {
    return {
      companyDialog: false,
      isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false
    }
  },
  methods: {
    close() {
      this.companyDialog = false
    }
  },
 
})
</script>

<style></style>
