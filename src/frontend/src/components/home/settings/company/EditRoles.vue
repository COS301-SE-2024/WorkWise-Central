<template>
  <v-container>
    <v-card class="bg-cardColor">
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
          ><v-col cols="12" lg="6"><CreateRoles @CreatedRoles="getRoles" /></v-col
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
                  <DeleteRole :roleId="item._id" @DeletedRole="getRoles" />
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
              <v-btn color="success" @click="bulkRoleUpdate" block :loading="isDeleting">
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
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card class="bg-cardColor">
        <v-card-title class="text-h5"> Edit Role </v-card-title>

        <v-card-text>
          <v-text-field v-model="selectedItem.roleName" label="Role Name" outlined></v-text-field>

          <v-select
            v-model="selectedItem.permissionSuite"
            :items="permissions"
            label="Permissions"
            chips
            multiple
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-container
            ><v-row
              ><v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn color="error" @click="cancel" block>
                  <v-icon start icon="fa:fa-solid fa-times-circle" color="error"></v-icon> Cancel
                </v-btn></v-col
              ><v-col cols="12" lg="6" order="first" order-lg="last">
                <v-btn color="success" @click="updateRole" :loading="isDeleting" block>
                  <v-icon start icon="fa:fa-solid fa-floppy-disk" color="success"></v-icon> Save
                </v-btn></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import DeleteRole from './DeleteRole.vue'
import CreateRoles from './CreateRoles.vue'
import { API_URL } from '@/main'

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
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    dialog: false,
    items: [],
    isDeleting: false,
    roleNames: [],
    rolePermissions: [],
    permissions: [],
    value: [],
    roleUpdates: [],
    roleIds: [{}],
    headers: [
      { title: 'Role', key: 'roleName' },
      { title: 'Permissions', key: 'permissionSuite' },
      { title: 'Actions', key: 'actions' }
    ],

    companyID: '',
    selectedItem: {
      _id: '',
      permissionSuite: [],
      roleName: ''
    },
    bulkRoleUpdateDto: []
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

          for(const data of response.data.data) {
            if (data.roleName) {
              this.roleUpdates.push({
                _id: data._id,
                roleName: data.roleName,
                permissionSuite: data.permissionSuite
              })
              this.roleIds.push(data._id)
            }
          }

          console.log(this.roleUpdates)
          //removing the first element of the array
          // this.roleUpdates.shift();
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
        .get(`http://localhost:3000/role/allPermissions`, config)
        .then((response) => {
          console.log(response.data.data)
          for(const data of response.data.data) {
            this.permissions.push(data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async updateRole(roleID) {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      }

      const data = {
        currentEmployeeId: localStorage.getItem('employeeId'),
        updateRoleDto: {
          roleName: this.selectedItem.roleName,
          permissionSuite: this.selectedItem.permissionSuite
        }
      }
      console.log(JSON.stringify(data))
      await axios
        .patch(`http://localhost:3000/role/${this.selectedItem._id}`, config, data)
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
            this.getRoles()
          }, 1500)
        })
        .catch((error) => {
          console.log(error)
          this.isDeleting = false
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
          })
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
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      for (let i = 1; i < this.roleUpdates.length; i++) {
        this.bulkRoleUpdateDto.push({
          roleId: this.roleUpdates[i]._id,
          updateRoleDto: {
            roleName: this.roleUpdates[i].roleName,
            permissionSuite: this.roleUpdates[i].permissionSuite
          }
        })
      }
      const data = {
        currentEmployeeId: localStorage.getItem('employeeId'),
        bulkUpdateRoleDto: this.bulkRoleUpdateDto
      }
      console.log(JSON.stringify(data))
      await axios
        .patch(`${API_URL}role/bulkUpdate/${this.companyID}`, config, data)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Roles updated',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
          }, 1500)
        })
        .catch((error) => {
          this.isDeleting = false
          console.log(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating roles',
            life: 3000
          })
        })
    },
    getRowProps({ index }) {
      return {
        class: (index % 2 ? 'bg-secondRowColor ' : '') + 'h6'
      }
    },
    cancel() {
      this.dialog = false
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
    },
    addRoleToBulkUpdateDto(role) {
      this.bulkRoleUpdateDto.push(role)
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
