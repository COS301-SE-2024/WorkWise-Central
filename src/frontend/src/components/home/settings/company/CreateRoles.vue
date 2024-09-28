<template>
  <v-dialog v-model="dialog" max-height="800" max-width="600" :opacity="0.1" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        color="secondary"
        v-bind="activatorProps"
        block
      >
        <v-icon icon="fa: fa-solid fa-person" color="primary"></v-icon>
        Create Role
      </v-btn>
    </template>
    <v-card class="bg-cardColor">
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
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn color="error" rounded="md" variant="text" @click="close" block
                ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon> Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                @click="createRole"
                :disabled="!formIsValid"
                color="success"
                rounded="md"
                variant="text"
                :loading="isDeleting"
                block
                ><v-icon icon="fa: fa-solid fa-plus" color="success"></v-icon>Create Role</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main'

interface Role {
  roleName: string
  permissionSuite: string[]
  companyId: string
}
export default defineComponent({
  data() {
    return {
      dialog: false,
      isDeleting: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
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
      this.isDeleting = true // Indicate the start of the deletion process
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const data = {
        createRoleDto: {
          roleName: this.Role.roleName,
          permissionSuite: this.Role.permissionSuite,
          companyId: this.Role.companyId
        },
        currentEmployeeId: localStorage.getItem('employeeId')
      }
      console.log(this.Role)
      await axios
        .post(`${API_URL}role/create`, data, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Role Created',
            life: 3000
          })
          this.isDeleting = this.dialog = false
          setTimeout(() => {
            this.$emit('CreatedRoles', response.data.data)
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Role not created',
            life: 3000
          })
          this.isDeleting = false
        })
    },
    async getPermissions() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`${API_URL}role/all/${localStorage.getItem('currentCompany')}`, config)
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
