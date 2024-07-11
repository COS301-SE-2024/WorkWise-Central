<template>
  <v-dialog
    v-model="companyDialog"
    :theme="isdarkmode === true ? 'dark' : 'light'"
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
      <v-card-text>
        <v-row>
          <v-col cols="2" class="justify-center">
            <EditCompany />
            <EditRoles />
            <EditStructure />
          </v-col>
          <v-col cols="10"></v-col
        ></v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import EditCompany from './EditCompany.vue'
import EditRoles from './EditRoles.vue'
import EditStructure from './EditStructure.vue'

export default defineComponent({
  name: 'CompanySettings',

  data() {
    return {
      companyDialog: false,
      isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false
    }
  },
  components: {
    EditCompany,
    EditRoles,
    EditStructure
  },
  methods: {
    close() {
      this.companyDialog = false
    }
  }
})
</script>

<style></style>
