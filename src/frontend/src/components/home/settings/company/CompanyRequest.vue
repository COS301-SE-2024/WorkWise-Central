<template>
  <Toast position="top-right"></Toast>
  <v-container fluid fill-height>
    <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row align="center" justify="space-between">
          <v-col cols="12" lg="4" md="4" sm="4" class="d-flex justify-start align-center">
            <v-icon icon="mdi-account-group"></v-icon>
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Company Requests</v-label
            >
          </v-col>

          <v-col cols="12" lg="4" md="4" sm="4" class="d-flex justify-center">
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              color="primary"
              width="80%"
              style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
              hide-details
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-divider></v-divider>
        <v-col cols="12">
          <div style="height: auto; overflow-y: auto">
            <v-data-table
              :headers="headers"
              :items="requests"
              :search="search"
              label="Requests"
              height="auto"
              rounded="xl"
              class="bg-cardColor"
              :header-props="{ class: 'bg-cardColor h6' }"
            >
              <template v-slot:[`item.companyName`]="{ value }">
                <v-chip variant="text">{{ value }}</v-chip>
              </template>
              <template v-slot:[`item.userToJoin`]="{ value }">
                <v-chip variant="text">{{ value.systemDetails.username }}</v-chip>
              </template>
              <template v-slot:[`item.createdAt`]="{ value }">
                <v-chip variant="text">{{ convertDate(value) }}</v-chip>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-menu max-width="200px">
                  <template v-slot:activator="{ props }">
                    <v-btn rounded="xl" variant="plain" v-bind="props">
                      <v-icon color="primary">mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="bg-background">
                    <v-list-item @click="acceptRequest(item)">
                      <v-btn color="success"
                        ><v-icon color="success" icon="fa: fa-solid fa-check"></v-icon>Accept</v-btn
                      >
                    </v-list-item>
                    <v-list-item @click="declineRequest(item)">
                      <v-btn color="error"
                        ><v-icon color="error" icon="fa: fa-solid fa-times"></v-icon>Decline</v-btn
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </div>
        </v-col>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import Toast from 'primevue/toast'
import { defineComponent } from 'vue'

interface Request {
  companyId: number
  companyName: string
  userToJoin: any
  createdAt: string
}

export default defineComponent({
  name: 'CompanyRequest',
  components: {
    Toast
  },
  data() {
    return {
      search: '' as string,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      headers: [
        { title: 'Company Name', value: 'companyName' },
        { title: 'User to Join', value: 'userToJoin' },
        { title: 'Created At', value: 'createdAt' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      requests: [] as Request[]
    }
  },
  methods: {
    async acceptRequest(request: Request) {
      console.log('Accepted:', request)
      // Add logic to handle request acceptance
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = await this.getRequestUrl()
      await axios
        .patch(
          `${url}admin/request/decide`,
          {
            companyId: request.companyId,
            userToJoinId: request.userToJoin._id,
            superiorId: localStorage.getItem('employeeId'),
            accept: true
          },
          config
        )
        .then((res) => {
          console.log(res)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Request accepted successfully',
            life: 3000
          })
          setTimeout(() => {
            this.getRequests()
          }, 3000)
        })
        .catch((error) => {
          console.error(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
          })
        })
    },
    async declineRequest(request: Request) {
      console.log('Declined:', request)
      // Add logic to handle request decline
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = this.getRequestUrl()
      await axios
        .patch(
          `${url}admin/request/decide`,
          {
            companyId: request.companyId,
            userToJoin: request.userToJoin,
            superiorId: localStorage.getItem('employeeId'),
            accept: false
          },
          config
        )
        .then((res) => {
          console.log(res)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Request declined successfully',
            life: 3000
          })
          setTimeout(() => {
            this.getRequests()
          }, 3000)
        })
        .catch((error) => {
          console.error(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
          })
        })
    },
    convertDate(date: string) {
      return new Date(date).toLocaleString()
    },
    async getRequests() {
      // Add logic to fetch requests from the server
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const url = await this.getRequestUrl()
      await axios
        .get(
          `${url}admin/request/all/company/${localStorage.getItem('currentCompany')}/detailed`,
          config
        )
        .then((response) => {
          console.log(response)
          this.requests = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async isLocalAvailable(localUrl: string) {
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
    this.getRequests()
  }
})
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
