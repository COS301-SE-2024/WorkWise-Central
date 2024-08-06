<template>
  <v-dialog
    v-model="dialog"
    max-height="800"
    max-width="600"
    :theme="isdarkmode ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="outlined"
        color="primary"
        v-bind="activatorProps"
      >
        <v-icon icon="fa: fa-solid fa-person" color="primary"></v-icon>
        Create Role
      </v-btn>
    </template>
    <v-card>
      <v-card-title> Create new Role</v-card-title>
      <v-card-text>
        <v-form></v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
interface Role {
  roleName: string
  permissionSuite: string[]
  companyId: string
}
export default defineComponent({
  data() {
    return {
      dialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    async createRole() {
      const role: Role = {
        roleName: 'Admin',
        permissionSuite: ['create', 'read', 'update', 'delete'],
        companyId: '1234'
      }
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      await axios
        .post(`${apiURL}role/create`, role)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status >= 200 && res.status < 300
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  }
})
</script>
