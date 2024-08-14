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
        ><v-icon icon="fa:fa-solid fa-pencil" start color="warning " size="small"></v-icon
        >Edit</v-btn
      >
    </template>
    <v-card>
      <v-form @submit.prevent="validateEdits">
        <v-card-title class="text-center">Edit Employee</v-card-title>
        <v-divider></v-divider>
        <v-card-item>
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
                :items="roleItems"
                item-value="roleId"
                item-title="roleName"
                v-model="req_obj.updateEmployeeDto.roleId"
                bg-color="background"
                variant="solo"
              ></v-select>
            </v-col>
            <v-col :cols="12">
              <v-select
                clearable
                label="Subordinates"
                hint="Select the employees you'd like to be subordinates of this employee"
                persistent-hint
                @update:modelValue="selected_subordiates"
                :items="subordinateItemNames"
                v-model="req_obj.updateEmployeeDto.subordinates"
                item-value="employeeId"
                item-title="name"
                bg-color="background"
                variant="solo"
                multiple
              ></v-select> </v-col
            ><v-col :cols="12">
              <v-select
                clearable
                label="Superior"
                hint="Select the employee you'd like to be superior of this employee"
                persistent-hint
                @update:modelValue="selected_supirior"
                :items="subordinateItemNames"
                v-model="req_obj.updateEmployeeDto.superiorId"
                item-value="employeeId"
                item-title="name"
                bg-color="background"
                variant="solo"
              ></v-select> </v-col
          ></v-row>
        </v-card-item>
        <v-card-actions>
          <v-row>
            <v-col>
              <Toast />
              <v-btn
                color="success"
                rounded="md"
                width="100%"
                height="35"
                variant="text"
                type="submit"
              >
                Save
                <v-icon icon="fa:fa-solid fa-floppy-disk" end color="success" size="small"></v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="error"
                rounded="md"
                width="100%"
                height="35"
                variant="text"
                @click="close"
              >
                <Toast />
                Cancel <v-icon icon="fa:fa-solid fa-cancel" color="error" size="small" end></v-icon>
              </v-btn> </v-col
          ></v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import Toast from 'primevue/toast'
import type { EmployeeInformation2, RoleItem, Role } from '@/components/home/employees/types'

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
      roleItems: [] as RoleItem[],
      subordinateItemNames: [] as EmployeeInformation2[],
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      req_obj: {
        currentEmployeeId: localStorage['employeeId'],
        updateEmployeeDto: {
          roleId: '',
          subordinates: [] as string[],
          superiorId: ''
        }
      },
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
    selected_subordiates() {
      console.log(this.req_obj.updateEmployeeDto.subordinates)
      // console.log(this.editedItem)
    },
    selected_supirior() {
      console.log(this.req_obj.updateEmployeeDto.superiorId)
    },
    change_roles() {
      this.role_change = true
      console.log(this.req_obj.updateEmployeeDto.roleId)
    },
    showlocalvalues() {
      console.log(this.localEditedItem)
    },
    async validateEdits() {
      console.log('Validate called')
      await this.savechanges()
    },
    async loadSubordinates() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: { currentEmployeeId: localStorage['employeeId'] }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const sub_res = await axios.get(
          apiURL + `employee/listOther/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(sub_res)
        for (let i = 0; i < sub_res.data.data.length; i++) {
          const employee_details = await axios.get(
            apiURL + `employee/detailed/id/${sub_res.data.data[i]._id}`,
            config
          )

          console.log(employee_details.data)

          let company_employee: EmployeeInformation2 = {
            name:
              employee_details.data.data.userId.personalInfo.firstName +
              ' ' +
              employee_details.data.data.userId.personalInfo.surname +
              ' (' +
              employee_details.data.data.role.roleName +
              ')',
            employeeId: employee_details.data.data._id
          }

          this.subordinateItemNames.push(company_employee)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async loadRoles() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      try {
        let roles_response = await axios.get(
          apiURL + `role/all/${localStorage['currentCompany']}`,
          config
        )
        let roles_data: Role[] = roles_response.data.data
        for (let i = 0; i < roles_data.length; i++) {
          if (roles_data[i].roleName === this.localEditedItem.roleName) continue
          this.roleItems.push({
            roleName: roles_data[i].roleName,
            roleId: roles_data[i]._id
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    close() {
      this.employeeDialog = false
    },
    async savechanges() {
      console.log(this.req_obj)
      let config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      let apiURL = await this.getRequestUrl()
      console.log(this.localEditedItem.employeeId)
      axios
        .patch(apiURL + `employee/${this.localEditedItem.employeeId}`, this.req_obj, config)
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
    this.showlocalvalues()
    this.loadRoles()
    this.loadSubordinates()
  }
}
</script>
