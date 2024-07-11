<template>
  <v-menu
    v-model="companyDialog"
    location="right"
    min-width="300px"
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="secondary" v-bind="activatorProps">Company Name</v-btn>
    </template>
    <v-card class="bg-background">
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

          <v-col v-for="company in companyList" :key="company.id">
            <v-row
              ><v-col
                ><v-card height="auto" class="ma-2" variant="outlined" elevation="2"
                  ><v-card-title class="text-primary">{{ company.name }}</v-card-title>
                </v-card></v-col
              ></v-row
            >
          </v-col>
        </v-container>
      </v-card-text>
      <v-actions>
        <v-col cols="12" align-self="center"> <CompanySettings /></v-col>
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
        {
          id: 1,
          name: 'Company 1'
        },
        {
          id: 2,
          name: 'Company 2'
        },
        {
          id: 3,
          name: 'Company 3'
        }
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
