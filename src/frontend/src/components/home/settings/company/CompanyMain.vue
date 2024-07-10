<template>
  <v-menu v-model="companyDialog" location="right" min-width="300px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="secondary" v-bind="activatorProps">Company Name</v-btn>
    </template>
    <v-card :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'">
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
                ><v-card height="auto" class="ma-2" outlined color="primary"
                  ><v-card-title>{{ company.name }}</v-card-title>
                </v-card></v-col
              ></v-row
            >
          </v-col>
        </v-container>
      </v-card-text>
      <v-actions>
        <v-col cols="12" align-self="center"> <CompanySettings /></v-col>
        <v-col cols="12" align-self="center">
          <v-btn color="error" width="100%" height="35" variant="outlined">Close</v-btn></v-col
        >
      </v-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { defineComponent } from 'vue'
import Popover from 'primevue/popover'
import CompanySettings from './CompanySettings.vue'

export default defineComponent({
  props: {
    Company: Object,
    userDetails: Object
  },
  components: {
    Popover,
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
  }
})
</script>
