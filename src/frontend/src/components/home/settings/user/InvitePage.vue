<template>
  <Toast position="top-center" />
  <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
    <v-card-title
      class="d-flex align-center pe-2 text-h5 font-weight-regular"
      height="auto"
      width="100%"
    >
      <v-row align="center" justify="space-between">
        <v-col cols="12" lg="4">
          <v-icon icon="mdi-account-group"></v-icon>
          <v-label
            class="ms-2 h4 font-family-Nunito text-headingTextColor"
            height="auto"
            width="auto"
            >Company Invites</v-label
          >
        </v-col>

        <v-col cols="12" lg="4">
          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            flat
            color="primary"
            width="100%"
            style="font-family: 'Lato', sans-serif; font-size: 15px; font-weight: lighter"
            hide-details
            single-line
            block
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <CreateInvite />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-divider></v-divider>
      <v-col cols="12">
        <div style="height: auto; overflow-y: auto">
          <v-data-table
            :headers="headers"
            :items="invites"
            :search="search"
            label="Invites"
            height="auto"
            rounded="xl"
            :row-props="getRowProps"
            class="bg-cardColor"
            :header-props="{ class: 'bg-cardColor h6' }"
          >
            <template v-slot:[`item.companyName`]="{ value }">
              <v-chip variant="text">{{ value }}</v-chip>
            </template>
            <template v-slot:[`item.emailBeingInvited`]="{ value }">
              <v-chip variant="text">{{ value }}</v-chip>
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
                  <v-list-item @click="acceptInvite(item)">
                    <v-btn color="success"
                      ><v-icon color="success" icon="fa: fa-solid fa-check"></v-icon>Accept</v-btn
                    >
                  </v-list-item>
                  <v-list-item @click="declineInvite(item)">
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
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import CreateInvite from './CreateInvite.vue'
import { API_URL } from '@/main'

interface Invite {
  companyId: number
  superiorId: number
  companyName: string
  roleIdForInvite: number
  roleName: string
  emailBeingInvited: string
  createdAt: string
}

export default defineComponent({
  name: 'CompanyInvite',
  components: {
    CreateInvite
  },
  data() {
    return {
      search: '' as string,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      headers: [
        { title: 'Company Name', value: 'companyName' },
        { title: 'Email Being Invited', value: 'emailBeingInvited' },
        { title: 'Created At', value: 'createdAt' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      invites: [] as Invite[]
    }
  },
  methods: {
    getRowProps({ index }: any) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    async acceptInvite(invite: Invite) {
      console.log('Accepted:', invite)
      // Add logic to handle invite acceptance
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      await axios
        .patch(
          `${API_URL}admin/invite/decide`,
          {
            companyId: invite.companyId,
            emailBeingInvited: invite.emailBeingInvited,
            roleIdForInvite: invite.roleIdForInvite,
            superiorId: localStorage.getItem('employeeId'),
            accept: true
          },
          config
        )
        .then((res) => {
          this.getInvites()
          console.log(res)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Invite accepted successfully',
            life: 3000
          })
        })
        .catch((error) => {
          console.error(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to accept invite',
            life: 3000
          })
        })
    },
    async declineInvite(invite: Invite) {
      console.log('Declined:', invite)
      // Add logic to handle invite decline
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      await axios
        .patch(
          `${API_URL}admin/invite/decide`,
          {
            companyId: invite.companyId,
            emailBeingInvited: invite.emailBeingInvited,
            roleIdForInvite: invite.roleIdForInvite,
            superiorId: localStorage.getItem('employeeId'),
            accept: false
          },
          config
        )
        .then((res) => {
          console.log(res)
          this.getInvites()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    convertDate(date: string) {
      return new Date(date).toLocaleString()
    },
    async getInvites() {
      // Add logic to fetch invites from the server
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`${API_URL}admin/invite/all/e/${localStorage.getItem('employeeId')}`, config)
        .then((response) => {
          console.log(response)
          this.invites = response.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.getInvites()
  }
})
</script>
