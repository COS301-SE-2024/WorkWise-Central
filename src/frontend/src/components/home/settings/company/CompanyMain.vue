<template>
  <v-menu
    v-model="companyDialog"
    location="right"
    min-width="300"
    :theme="isdarkmode === true ? 'dark' : 'light'"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="primary" class="h6" v-bind="activatorProps">{{ companyName }}</v-btn>
    </template>
    <v-card class="bg-background" :theme="isdarkmode === true ? 'dark' : 'light'" rounded="md">
      <v-card-title class="bg-background">User's Companies</v-card-title>
      <v-card-text class="bg-background">
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
                v-model="companyName"
              ></v-combobox
              ><v-col></v-col
            ></v-row>
          </v-col>
        </v-container>
      </v-card-text>
      <v-actions @click="closeCompanyDialog" class="bg-background">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" align-self="center">
              <Toast position="top-center" />
              <v-btn
                color="success"
                width="100%"
                height="35"
                variant="elevated"
                @click="switchCompany(companyName)"
                block
                :loading="isDeleting"
                >Save</v-btn
              ></v-col
            >
            <v-col cols="12" lg="6" align-self="center">
              <v-btn
                color="error"
                width="100%"
                height="35"
                variant="elevated"
                @click="closeCompanyDialog"
                block
                >Close</v-btn
              ></v-col
            ></v-row
          ></v-container
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
      isDeleting: false,
      search: '',
      company: '',
      companyName: '',
      currentCompanyID: '',
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
      ],
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    closeCompanyDialog() {
      this.companyDialog = false
    },
    switchCompany(companyName) {
      this.isDeleting = true // Indicate the start of the deletion process
      console.log(companyName)
      const companyId = this.findCompany(companyName)
      const employeeId = this.findEmployeeId(companyName)
      console.log('CompanyId', companyId)
      console.log('EmployeeId', employeeId)
      this.$emit('switchCompany', companyId)
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: `Switched to ${companyName}`,
        life: 3000
      })
      this.companyName = companyName
      this.company = companyName
      localStorage.setItem('currentCompany', companyId)
      localStorage.setItem('employeeId', employeeId)
      this.companyDialog = false
      setTimeout(() => {
        this.isDeleting = false
        window.location.reload()
      }, 3000)
    },
    findCompany(companyName) {
      for (let i = 0; i < this.joinedCompanies.length; i++) {
        if (this.joinedCompaniesNames[i] === companyName) {
          return this.joinedCompaniesIds[i]
        }
      }
    },
    findEmployeeId(companyName) {
      for (let i = 0; i < this.joinedCompanies.length; i++) {
        if (this.joinedCompaniesNames[i] === companyName) {
          return this.joinedCompaniesEmployeeIds[i]
        }
      }
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
        .get(`${apiURL}users/id/${user_id}`, config)
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
          console.log(currentCompanyID)
          for (let i = 0; i < this.joinedCompanies.length; i++) {
            if (this.joinedCompaniesIds[i] === currentCompanyID) {
              console.log(this.joinedCompaniesIds[i])
              this.companyName = this.joinedCompaniesNames[i]
              break
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
      this.currentCompanyID = localStorage.getItem('currentCompany')
      console.log(this.currentCompanyID)
    }
  },
  mounted() {
    // this.getCurrentCompanyName()
    this.getCompanies()
  }
})
</script>
