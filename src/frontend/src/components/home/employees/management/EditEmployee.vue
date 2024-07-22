<template>
  <v-dialog
    v-model="employeeDialog"
    max-width="500"
    height="500"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="warning"
        variant="text"
        v-bind="activatorProps"
        >Edit</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-center">Edit Employee</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row
          ><v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              {{
                localEditedItem.firstName.charAt(0).toUpperCase() +
                localEditedItem.firstName.slice(1)
              }}
              {{
                localEditedItem.surname.charAt(0).toUpperCase() + localEditedItem.surname.slice(1)
              }}
            </h4>
            <h3 class="text-center">Role: {{ localEditedItem.roleName }}</h3>
          </v-col></v-row
        >
        <v-row
          ><v-col :cols="12">
            <v-select
              clearable
              label="Company Role"
              hint="Select the role you'd like to change this employee to"
              persistent-hint
              @update:modelValue="change_roles"
              :items="roleItemNames"
              v-model="selectedRole"
              bg-color="background"
              variant="solo"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              clearable
              label="Subordinates"
              hint="Select the employees you'd like to be subordinates of this employee"
              persistent-hint
              @update:modelValue="change_roles"
              :items="subordinateItemNames"
              v-model="subordinateItems"
              bg-color="background"
              variant="solo"
              multiple
            ></v-select> </v-col
        ></v-row>
      </v-card-text>
      <v-card-action>
        <v-col align-self="center"
          ><v-col cols="12" md="12" xs="3" sm="6" offset="1">
            <Toast />
            <v-btn
              color="success"
              rounded="md"
              width="85%"
              height="35"
              variant="text"
              @click="savechanges"
            >
              Save
            </v-btn>
          </v-col>
          <v-col cols="12" md="12" xs="3" sm="6" offset="1">
            <v-btn color="error" rounded="md" width="85%" height="35" variant="text" @click="close">
              <Toast />
              Cancel
            </v-btn>
          </v-col></v-col
        >
      </v-card-action>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import { select } from '@syncfusion/ej2-base'
import Toast from 'primevue/toast'

type Role = {
  _id: string
  roleName: string
  permissionSuite: string[]
  companyId: string
  createdAt: string // ISO 8601 date string
  __v: number
  updatedAt: string // ISO 8601 date string
}

export default {
  name: 'EditClient',
  components: {
    Toast
  },
  props: {
    editedItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedRole: '',
      localEditedItem: this.editedItem,
      isdarkmode: localStorage['theme'] !== 'false',
      role_change: false,
      employeeDialog: false,
      roleItemNames: [] as string[],
      roleItems: [] as Role[],
      subordinateItemNames: [] as string[],
      subordinateItems: [],
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      nameRules: [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length >= 2) || 'Name must be at least 2 characters'
      ],
      surnameRules: [
        (v: string) => !!v || 'Surname is required',
        (v: string) => (v && v.length >= 2) || 'Surname must be at least 2 characters'
      ],
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        (v: string) => !!v || 'Phone number is required',
        (v: string) => (v && v.length >= 10) || 'Phone number must be at least 10 digits'
        // Add more specific validation for phone number format if needed
      ]
    }
  },
  methods: {
    select,
    change_roles() {
      this.role_change = true
      console.log(this.selectedRole)
    },
    showlcalvalues() {
      console.log(this.localEditedItem)
    },
    async loadRoles() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      let rolesNames_arr: string[] = []
      try {
        let roles_response = await axios.get(
          apiURL + `role/all/${localStorage['currentCompany']}`,
          config
        )
        let roles_data: Role[] = roles_response.data.data
        for (let i = 0; i < roles_data.length; i++) {
          if (roles_data[i].roleName === this.localEditedItem.roleName) continue
          rolesNames_arr.push(roles_data[i].roleName)
        }
        this.roleItemNames = rolesNames_arr
        this.roleItems = roles_data
        console.log(roles_data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    close() {
      this.employeeDialog = false
    },
    async savechanges() {
      // alert('Employee updated')
      let employee_req_obj = {
        roleId: ''
      }
      console.log(this.selectedRole)
      for (let i = 0; i < this.roleItems.length; i++) {
        console.log(this.roleItems[i].roleName)
        if (this.roleItems[i].roleName === this.selectedRole) {
          employee_req_obj.roleId = this.roleItems[i]._id
          break
        }
      }
      console.log(employee_req_obj.roleId)
      let config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      let apiURL = await this.getRequestUrl()
      console.log(this.localEditedItem)
      axios
        .patch(apiURL + `employee/${this.localEditedItem.employeeId}`, employee_req_obj, config)
        .then((res) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Employee updated successfully',
            life: 3000
          })
          console.log(res)
          this.employeeDialog = false
          window.location.reload()
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating the employee',
            life: 3000
          })
          console.log(error)
        })
    },
    // async update() {
    //   await axios
    //     .patch(`http://localhost:3000/employee/${this.id}`)
    //     .then((response) => {
    //       console.log(response)
    //       alert('Client updated')
    //       return true
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       alert('Error updating client')
    //       return false
    //     })
    //     .finally(() => {
    //       this.employeeDialog = false
    //     })
    // },
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
    this.showlcalvalues()
    this.loadRoles()
  }
}
</script>
