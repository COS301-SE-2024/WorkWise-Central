<template>
  <v-menu
    v-model="companyDialog"
    location="right"
    min-width="300"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="secondary" v-bind="activatorProps">Company Name</v-btn>
    </template>
    <v-card class="bg-background" :theme="isdarkmode === true ? 'dark' : 'light'">
      <v-card-title>User's Companies</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="search"
                density="compact"
                label="Search for companies"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                width="100%"
              ></v-text-field
            ></v-col>
          </v-row>

          <v-col>
            <v-row
              ><v-select
                width="100%"
                bg-color="background"
                density="compact"
                :items="companyList"
                persistent
              ></v-select
              ><v-col></v-col
            ></v-row>
          </v-col>
        </v-container>
      </v-card-text>
      <v-actions @click="closeCompanyDialog">
        <v-col cols="12" align-self="center">
          <v-btn
            color="error"
            width="100%"
            height="35"
            variant="outlined"
            @click="closeCompanyDialog"
            >Close</v-btn
          ></v-col
        >
      </v-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { defineComponent } from 'vue'

import CompanySettings from './CompanySettings.vue'

export default defineComponent({
  props: {
    Company: Object,
    userDetails: Object
  },
  components: {
    CompanySettings
  },
  data() {
    return {
      companyDialog: false,
      search: '',
      isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false,
      companyList: [
        'Company 1',
        'Company 2',
        'Company 3',
        'Company 4',
        'Company 5',
        'Company 6',
        'Company 7',
        'Company 8',
        'Company 9',
        'Company 10'
      ]
    }
  },
  methods: {
    closeCompanyDialog() {
      this.companyDialog = false
    },
    switchCompany() {}
  }
})
</script>
