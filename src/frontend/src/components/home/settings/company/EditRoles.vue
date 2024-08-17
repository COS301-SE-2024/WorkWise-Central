<template>
  <v-container>
    <v-card>
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
        ><v-row align="center" justify="space-between"
          ><v-col cols="12" lg="6">
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Roles</v-label
            ></v-col
          ><v-col cols="12" lg="6"><CreateRoles /></v-col
        ></v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="roleUpdates"
          item-value="role"
          class="bg-cardColor elevation-1"
          :row-props="getRowProps"
          :header-props="{ class: 'bg-secondary h5 ' }"
        >
          <template v-slot:top> </template>
          <template v-slot:[`item.roleName`]="{ item }">
            <v-label v-model="item.roleName" label="Role Name" outlined>{{
              item.roleName
            }}</v-label>
          </template>
          <template v-slot:[`item.permissionSuite`]="{ item }">
            <v-select
              v-model="item.permissionSuite"
              :items="permissions"
              label="Permissions"
              chips
              :disabled="item.roleName === 'Owner' || item.roleName === 'Worker'"
              multiple
              variant="default"
            ></v-select>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  rounded="xl"
                  variant="plain"
                  v-bind="props"
                  @click="selectItem(item)"
                  :disabled="item.roleName === 'Owner' || item.roleName === 'Worker'"
                >
                  <v-icon color="primary">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="selectItem(item)">
                  <v-btn color="success" block @click="dialog = true"
                    ><v-icon icon="fa:fa-solid fa-pencil" color="success"></v-icon>Edit</v-btn
                  >
                </v-list-item>
                <v-list-item @click="selectItem(item)">
                  <DeleteRole :roleId="item._id" />
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <v-container
          ><v-row justify="end">
            <Toast position="top-center" />
            <v-col align="center" cols="12" lg="6">
              <v-btn color="success" @click="updateRole" block :loading="isDeleting">
                <v-icon start color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon>
                Save</v-btn
              >
            </v-col>

            <v-col align="center" cols="12" lg="6"
              ><v-btn color="error" @click="cancel" block :loading="isDeleting">
                <v-icon start color="error" icon="fa: fa-solid fa-cancel"></v-icon> Cancel
              </v-btn></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import DeleteRole from './DeleteRole.vue'
import CreateRoles from './CreateRoles.vue'
export default defineComponent({
  props: {
    Company: Object,
    userDetails: Object
  },
  components: {
    Toast,
    DeleteRole,

    CreateRoles
  },
  data: () => ({
    dialog: false,
    items: [],
    isDeleting: false,
    roleNames: [],
    rolePermissions: [],
    permissions: [],
    value: [],
    roleUpdates: [
      {
        permissionSuite: [],
        roleName: ''
      }
    ],
    roleIds: [{}],
    headers: [
      { title: 'Role', key: 'roleName' },
      { title: 'Permissions', key: 'permissionSuite' },
      { title: 'Actions', key: 'actions' }
    ],

    companyID: ''
  }),

  methods: {
    close() {
      this.dialog = false
    },

    async getRoles() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`http://localhost:3000/role/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response.data.data.length)

          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].roleName) {
              this.roleUpdates.push({
                _id: response.data.data[i]._id,
                roleName: response.data.data[i].roleName,
                permissionSuite: response.data.data[i].permissionSuite
              })
              this.roleIds.push(response.data.data[i]._id)
            }
          }

          console.log(this.roleUpdates)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async removeOwnerRoleFromArray() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].role === 'Owner') {
          this.items.splice(i, 1)
        }
      }
    },
    async getPermissions() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`http://localhost:3000/role/all/${this.companyID}`, config)
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
    async updateRole(roleID) {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      console.log(this.items[roleID].role)
      console.log(this.items[roleID].permission)
      const data = {
        roleName: this.items[roleID].role,
        permissionSuite: this.items[roleID].permission
      }
      await axios
        .patch(`http://localhost:3000/role/${roleID}`, config, data)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Role updated',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.dialog = false
            window.location.reload()
          }, 1500)
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
    async bulkRoleUpdate() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const data = {
        roleUpdates: this.roleUpdates,
        roleIds: this.roleIds
      }
      await axios.patch(`${this.getRequestUrl}role/bulkUpdate/${this.companyID}`, config, data)
    },
    getRowProps({ index }) {
      return {
        class: (index % 2 ? 'bg-secondRowColor ' : '') + 'h6'
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
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    selectItem(item) {
      console.log(item)
      this.selectedItem = item
    }
  },
  mounted() {
    this.getRoles()
    this.getPermissions()
    this.removeOwnerRoleFromArray()
    this.companyID = localStorage.getItem('currentCompany')
    this.isDarkMode = localStorage.getItem('theme') === 'true' ? true : false
  }
})
</script>
