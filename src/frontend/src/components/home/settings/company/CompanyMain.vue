<template>
  <v-menu
    v-model="companyDialog"
    location="right"
    min-width="300"
    :theme="isdarkmode === true ? 'dark' : 'light'"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="secondary" class="h6" v-bind="activatorProps">{{ companyName }}</v-btn>
    </template>
    <v-card class="bg-background" :theme="isdarkmode === true ? 'dark' : 'light'">
      <v-card-title>User's Companies</v-card-title>
      <v-card-text>
        <v-container>
          <v-col>
            <v-row
              ><v-combobox
                width="100%"
                bg-color="background"
                density="compact"
                :items="joinedCompaniesNames"
                persistent
                combobox
                v-model="company"
              ></v-combobox
              ><v-col></v-col
            ></v-row>
          </v-col>
        </v-container>
      </v-card-text>
      <v-actions @click="closeCompanyDialog">
        <v-col cols="12" align-self="center">
          <Toast position="top-center" />
          <v-btn
            color="success"
            width="100%"
            height="35"
            variant="outlined"
            @click="switchCompany(company)"
            >Save</v-btn
          ></v-col
        >
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
import axios from 'axios'
import Toast from 'primevue/toast'

export default defineComponent({
  props: {
    Company: Object,
    userDetails: Object
  },
  components: {
    Toast
  },
  data() {
    return {
      companyDialog: false,
      search: '',
      company: '',
      companyName: '',
      joinedCompanies: [],
      joinedCompaniesNames: [],
      joinedCompaniesIds: [],
      joinedCompaniesEmployeeIds: [],
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
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
    switchCompany(companyName) {
      const index = this.joinedCompaniesNames.indexOf(companyName)
      const companyId = this.joinedCompaniesIds[index]
      const employeeId = this.joinedCompaniesEmployeeIds[index]
      this.$emit('switchCompany', companyId)
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: `Switched to ${companyName}`
      })
      this.companyName = companyName
      localStorage.setItem('currentCompany', companyId)
      localStorage.setItem('currentEmployee', employeeId)
      this.companyDialog = false
    },
    async getCompanies() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      const user_id = localStorage.getItem('id')
      await axios
        .get(`http://localhost:3000/users/id/${user_id}`, config)
        .then((response) => {
          console.log(response.data.data.joinedCompanies)
          console.log(response.data.data)
          this.joinedCompanies = response.data.data.joinedCompanies
          this.joinedCompanies.forEach((company) => {
            this.joinedCompaniesNames.push(company.companyName)
            this.joinedCompaniesIds.push(company.companyId)
            this.joinedCompaniesEmployeeIds.push(company.employeeId)
          })
          const currentCompanyID = localStorage.getItem('currentCompany')
          console.log(this.joinedCompanies.length)
          console.log(this.joinedCompanies[0].companyId)
          console.log(currentCompanyID)
          for (let i = 0; i < this.joinedCompanies.length; i++) {
            if (this.joinedCompaniesIds[i] == currentCompanyID) {
              this.companyName = this.joinedCompaniesNames[i]
              console.log(this.companyName)
            } else {
              this.companyName = 'No company selected'
              console.log(this.companyName)
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async getCurrentCompanyName() {
      const currentCompanyID = localStorage.getItem('currentCompany')
      console.log(this.joinedCompanies.length)
    }
  },
  mounted() {
    this.getCompanies()
    this.getCurrentCompanyName()
  }
})
</script>
