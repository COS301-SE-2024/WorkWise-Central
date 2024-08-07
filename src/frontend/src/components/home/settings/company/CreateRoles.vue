<template>
  <v-dialog
    v-model="dialog"
    max-height="800"
    max-width="600"
    :theme="isdarkmode ? 'dark' : 'light'"
    :opacity="0.1"
    persistent
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
        <v-form v-model="formIsValid" ref="form">
          <v-label>Role Name</v-label>
          <v-text-field v-model="Role.roleName" :rules="nameRules"></v-text-field>
          <v-label>Permission Suite</v-label>
          <v-select
            v-model="Role.permissionSuite"
            :items="permissions"
            multiple
            :rules="permissionRules"
            outlined
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="createRole"
          :disabled="!formIsValid"
          color="success"
          variant="text"
          rounded="md"
          >Create Role</v-btn
        >
        <v-btn color="error" rounded="md" variant="text" @click="close"> Cancel </v-btn>
      </v-card-actions>
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
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      formIsValid: false,
      Role: {
        roleName: '',
        permissionSuite: [],
        companyId: localStorage.getItem('currentCompany') as string
      },
      permissions: [] as string[],
      nameRules: [(v: string) => !!v || 'Role Name is required'],
      permissionRules: [(v: string) => !!v || 'Permission Suite is required']
    }
  },

  methods: {
    async createRole() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(this.Role)
      await axios
        .post(`${apiURL}role/create`, this.Role, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Role Created',
            life: 3000
          })
          this.dialog = false
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Role not created',
            life: 3000
          })
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
    },
    async getPermissions() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`http://localhost:3000/role/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response)
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].roleName === 'Owner') {
              for (let j = 0; j < response.data.data[i].permissionSuite.length; j++) {
                this.permissions.push(response.data.data[i].permissionSuite[j])
                console.log(response.data.data[i].permissionSuite[j])
              }
              break
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    close() {
      this.dialog = false
    }
  },
  mounted() {
    this.getPermissions()
  }
})
</script>
