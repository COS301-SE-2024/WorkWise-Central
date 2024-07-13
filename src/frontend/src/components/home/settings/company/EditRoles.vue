<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="text-center"> Edit Roles </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="items"
            item-value="role"
            class="bg-cardColor elevation-1"
            :row-props="getRowProps"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Roles and Permissions</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:[`item.roleName`]="{ item }">
              <v-chip variant="elevated" color="elementTextColor">{{ item }}</v-chip>
            </template>
            <template v-slot:[`item.permission`]="{ item }">
              <v-select
                v-model="item.permission"
                :items="permissions"
                label="Permissions"
                chips
                multiple
              ></v-select>
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="bg-cardColor">
          <Toast />
          <v-col align="center"> <v-btn color="success" @click="saveChanges"> Save </v-btn></v-col>
          <Toast />
          <v-col align="center"><v-btn color="error" @click="cancel"> Cancel </v-btn></v-col>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
export default defineComponent({
  props: {
    Company: Object,
    userDetails: Object
  },
  components: {
    Toast
  },
  data: () => ({
    dialog: false,
    items: [],
    roleIds: [],
    roleNames: [],
    rolePermissions: [],
    permissions: [],
    value: []
  }),

  methods: {
    close() {
      this.dialog = false
    },

    async getRoles() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      }
      await axios
        .get('http://localhost:3000/role/all', config)
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            const { _id, roleName, permissionSuite } = response.data.data[i]

            if (!this.roleIds.includes(_id)) {
              this.roleIds.push(_id)
            }

            if (!this.roleNames.includes(roleName)) {
              this.roleNames.push(roleName)
            }

            if (
              !this.rolePermissions.some(
                (permission) => JSON.stringify(permission) === JSON.stringify(permissionSuite)
              )
            ) {
              this.rolePermissions.push(permissionSuite)
            }
          }

          for (let i = 0; i < response.data.data.length; i++) {
            const { roleName } = response.data.data[i]

            this.items.push({
              role: response.data.data[i].roleName,
              permission: response.data.data[i].permissionSuite
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getPermissions() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      }
      await axios
        .get('http://localhost:3000/role/all', config)
        .then((response) => {
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
    viewRoles() {
      for (let i = 0; i < this.items.length; i++) {
        console.log(this.items[i].role)
        for (let j = 0; j < this.items[i].permission.length; j++) {
          console.log(this.items[i].permission[j])
        }
      }
    },
    getRowProps({ index }) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    cancel() {
      this.$emit('cancel')
      this.$toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Company update cancelled',
        life: 3000
      })
    },
    saveChanges() {
      this.$emit('save', this.company)
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Company updated',
        life: 3000
      })
    }
  },
  mounted() {
    this.getRoles()
    this.getPermissions()
    this.isdarkmode = sessionStorage.getItem('theme') === 'true' ? true : false
  }
})
</script>
