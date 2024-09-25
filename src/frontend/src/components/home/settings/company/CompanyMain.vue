<template>
  <Toast position="top-center" group="headless" />

  <v-menu v-model="companyDialog" location="right" min-width="300" :close-on-content-click="false">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="primary" class="h6" v-bind="activatorProps">{{ companyName }}</v-btn>
    </template>
    <v-card class="bg-background" rounded="md">
      <h2 class="h5 font-weight-regular d-flex justify-center bg-background text-secondary">
        User's Companies
      </h2>
      <v-card-text class="bg-background">
        <v-container>
          <v-row>
            <v-col cols="2"
              ><v-menu v-model="modalMenu" activator="parent">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn variant="text" v-bind="attrs" v-on="on" size="small">
                    <v-icon icon="fa: fa-solid fa-plus"></v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <RegisterCompanyModal />
                  </v-list-item>
                  <v-list-item>
                    <JoinCompanyModal />
                  </v-list-item>
                </v-list> </v-menu
            ></v-col>
            <v-col cols="10">
              <v-combobox
                width="100%"
                bg-color="background"
                density="compact"
                :items="joinedCompaniesNames"
                persistent
                combobox
                v-model="companyName"
              ></v-combobox
            ></v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-actions @click="closeCompanyDialog" class="bg-background">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" align-self="center" order="last" order-lg="first">
              <v-btn
                color="error"
                width="100%"
                height="35"
                variant="elevated"
                @click="closeCompanyDialog"
                block
                >Close</v-btn
              >
            </v-col>
            <v-col cols="12" lg="6" align-self="center" order="first" order-lg="last">
              <v-btn
                color="success"
                width="100%"
                height="35"
                variant="elevated"
                @click="switchCompany(companyName)"
                block
                :loading="isDeleting"
                >Save</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import RegisterCompanyModal from '@/components/signup/RegisterCompanyModal.vue'
import JoinCompanyModal from '@/components/signup/JoinCompanyModal.vue'
import { API_URL } from '@/main'

export default defineComponent({
  props: {
    Company: Object,
    userDetails: Object
  },
  components: {
    Toast,
    RegisterCompanyModal,
    JoinCompanyModal
  },
  data() {
    return {
      companyDialog: false,
      modalMenu: false, // Added for the new v-menu
      isDeleting: false,
      progress: 0,
      visible: false,
      search: '',
      company: '',
      companyName: '',
      currentCompanyID: '',
      joinedCompanies: [],
      joinedCompaniesNames: [],
      joinedCompaniesIds: [],
      joinedCompaniesEmployeeIds: [],
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
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
    }
  },
  methods: {
    closeCompanyDialog() {
      this.companyName = localStorage.getItem('currentCompanyName')
      this.companyDialog = false
    },
    switchCompany(companyName) {
      this.isDeleting = true
      const companyId = this.findCompany(companyName)
      const employeeId = this.findEmployeeId(companyName)
      this.$emit('switchCompany', companyId)
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        group: 'headless',
        detail: `Switched to ${companyName}`
      })
      this.companyName = companyName
      this.company = companyName
      localStorage.setItem('currentCompany', companyId)
      localStorage.setItem('currentCompanyName', companyName)
      localStorage.setItem('employeeId', employeeId)
      this.companyDialog = false
      setTimeout(() => {
        window.location.reload()
        this.isDeleting = false
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
      const user_id = localStorage.getItem('id')
      await axios
        .get(`${API_URL}users/id/${user_id}`, config)
        .then((response) => {
          this.joinedCompanies = response.data.data.joinedCompanies
          this.joinedCompanies.forEach((company) => {
            this.joinedCompaniesNames.push(company.companyName)
            this.joinedCompaniesIds.push(company.companyId)
            this.joinedCompaniesEmployeeIds.push(company.employeeId)
          })
          const currentCompanyID = localStorage.getItem('currentCompany')
          for (let i = 0; i < this.joinedCompanies.length; i++) {
            if (this.joinedCompaniesIds[i] === currentCompanyID) {
              this.companyName = this.joinedCompaniesNames[i]
              localStorage.setItem('currentCompanyName', this.joinedCompaniesNames[i])
              break
            } else {
              this.companyName = 'No company selected'
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getCompanies()
  }
})
</script>
