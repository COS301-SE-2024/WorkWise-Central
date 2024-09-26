<template>
  <v-dialog
    v-model="clientDialog"
    max-width="500"
    height="400"
    @click="console.log(EmployeeDetails)"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="success"
        variant="text"
        v-bind="activatorProps"
      >
        <v-icon icon="fa:fa-solid fa-eye" start color="success" size="small"></v-icon> View
      </v-btn>
    </template>

    <v-card elevation="14" rounded="md" :max-width="500">
      <v-card-title>Employee Details</v-card-title>
      <v-card-text>
        <v-col>
          <v-row>
            <v-col cols="6">
              <b><label> First Name</label></b>
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                EmployeeDetails.firstName.charAt(0).toUpperCase() +
                EmployeeDetails.firstName.slice(1)
              }}</small> </v-col
            ><v-col cols="6"
              ><b><label> Surname</label></b
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                EmployeeDetails.surname.charAt(0).toUpperCase() + EmployeeDetails.surname.slice(1)
              }}</small></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <v-row
            ><v-col cols="6"
              ><b><label>Gender</label></b
              ><v-spacer></v-spacer>
              <small class="text-caption">{{
                EmployeeDetails.gender ? EmployeeDetails.gender : 'None'
              }}</small></v-col
            ><v-col cols="6"
              ><b><label>Phone Number</label></b
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                EmployeeDetails.contactInfo.phoneNumber
              }}</small></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <v-row
            ><v-col cols="6"
              ><b><label> Email</label></b
              ><v-spacer></v-spacer
              ><small class="text-caption">{{ EmployeeDetails.contactInfo.email }}</small></v-col
            ><v-col cols="6"
              ><b><label> Role </label></b><v-spacer></v-spacer
              ><small class="text-caption">{{ EmployeeDetails.roleName }}</small>
            </v-col></v-row
          >
          <v-divider></v-divider>

          <v-row
            ><v-col cols="6"
              ><b><label>Superior</label></b
              ><v-spacer></v-spacer><small class="text-caption">{{ supname }}</small></v-col
            ><v-col cols="6"
              ><b><label> Subordinates </label></b><v-spacer></v-spacer>
              <div v-for="(name, i) in subnames" :key="i">
                <small class="text-caption">{{ name }}</small>
              </div>
            </v-col></v-row
          >
          <v-divider></v-divider>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row
            ><v-col cols="12">
              <v-btn
                color="error"
                width="100%"
                height="35"
                @click="close"
                block
                :loading="isDeleting"
              >
                <v-icon icon="fa:fa-solid fa-cancel" color="error" start size="small"></v-icon>Close
              </v-btn>
            </v-col></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main'

export default defineComponent({
  props: {
    EmployeeDetails: { type: Object, required: true }
  },
  data() {
    return {
      clientDialog: false,
      isDeleting: false,
      subnames: [],
      supname: '',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    async loadEmployeeData() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      console.log(localStorage['employeeId'])

      if (this.EmployeeDetails === undefined) return

      try {
        const employee_response = await axios.get(
          API_URL + `employee/id/${this.EmployeeDetails.employeeId}`,
          config
        )
        console.log(employee_response)
        for (let i = 0; i < employee_response.data.data.subordinates.length; i++) {
          const res_res = await axios.get(
            API_URL + `employee/id/${employee_response.data.data.subordinates[i]}`,
            config
          )
          this.subnames.push(
            res_res.data.data.userInfo.firstName + ' ' + res_res.data.data.userInfo.surname
          )
        }

        const res_res = await axios.get(
          API_URL + `employee/id/${employee_response.data.data.superiorId}`,
          config
        )

        this.supname =
          res_res.data.data.userInfo.firstName + ' ' + res_res.data.data.userInfo.surname
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    },
    close() {
      console.log('closing dialog:' + this.clientDialog)
      this.clientDialog = false
    },
    async isLocalAvailable(string) {
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
    }
  },
  mounted() {
    this.loadEmployeeData()
  }
})
</script>
