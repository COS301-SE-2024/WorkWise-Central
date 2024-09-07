<template>
  <v-dialog v-model="employeeDialog" max-width="500" height="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="warning"
        variant="text"
        v-bind="activatorProps"
        :disabled="Disabled"
        ><v-icon icon="fa:fa-solid fa-pencil" start color="warning " size="small"></v-icon
        >Edit</v-btn
      >
    </template>
    <v-card class="bg-cardColor">
      <v-form ref="form" @submit.prevent="validateEdits">
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
                :loading="loading"
              ></v-select>
            </v-col>
            <v-col :cols="12">
              <v-select
                clearable
                label="Subordinates"
                hint="Select the employees you'd like to be subordinates of this employee"
                persistent-hint
                @update:model-value="selected_subordiates"
                :items="filteredSubordinateNames"
                v-model="req_obj.updateEmployeeDto.subordinates"
                item-value="employeeId"
                item-title="name"
                bg-color="background"
                variant="solo"
                multiple
                :loading="loading"
              ></v-select> </v-col
            ><v-col :cols="12">
              <v-select
                clearable
                label="Superior"
                hint="Select the employee you'd like to be superior of this employee"
                persistent-hint
                @update:modelValue="selected_supirior"
                :items="filteredSupriorNames"
                v-model="req_obj.updateEmployeeDto.superiorId"
                item-value="employeeId"
                item-title="name"
                bg-color="background"
                variant="solo"
              ></v-select> </v-col
          ></v-row>
        </v-card-item>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" order="first" order-lg="last">
                <v-btn
                  color="success"
                  rounded="md"
                  width="100%"
                  height="35"
                  variant="text"
                  type="submit"
                  block
                  :loading="isDeleting"
                >
                  <v-icon
                    icon="fa:fa-solid fa-floppy-disk"
                    start
                    color="success"
                    size="small"
                  ></v-icon>
                  Save
                </v-btn>
              </v-col>
              <v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn
                  color="error"
                  rounded="md"
                  width="100%"
                  height="35"
                  variant="text"
                  block
                  @click="close"
                  :loading="isDeleting"
                >
                  <Toast position="top-center" />
                  <v-icon icon="fa:fa-solid fa-cancel" color="error" size="small" start></v-icon
                  >Cancel
                </v-btn>
              </v-col></v-row
            >
          </v-container>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import Toast from 'primevue/toast'
import type { EmployeeInformation2, RoleItem, Role } from '@/components/home/employees/types'

type EmployeeUpdate = {
  currentEmployeeId: string
  updateEmployeeDto: {
    roleId?: string
    subordinates?: string[]
    superiorId?: string
  }
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
    },
    Disabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      selectedRole: '',
      localEditedItem: this.editedItem,
      isDarkMode: localStorage['theme'] !== 'false',
      role_change: false,
      employeeDialog: false,
      roleItems: [] as RoleItem[],
      subordinateItemNames: [] as EmployeeInformation2[],
      selected_subordinate_names: [] as EmployeeInformation2[],
      selected_supiror_names: [] as EmployeeInformation2[],
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      loading: true,
      req_obj: {
        currentEmployeeId: localStorage['employeeId'],
        updateEmployeeDto: {
          roleId: '',
          subordinates: [] as string[],
          superiorId: ''
        }
      } as EmployeeUpdate,
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
  computed: {
    filteredSubordinateNames() {
      return this.subordinateItemNames.filter(
        (sub: EmployeeInformation2) =>
          !(
            this.req_obj.updateEmployeeDto.superiorId &&
            this.req_obj.updateEmployeeDto.superiorId === sub.employeeId
          )
      )
    },
    filteredSupriorNames() {
      return this.subordinateItemNames.filter(
        (sub: EmployeeInformation2) =>
          !this.req_obj.updateEmployeeDto.subordinates?.some(
            (selected: string) => selected === sub.employeeId
          )
      )
    }
  },
  methods: {
    selected_subordiates(a: any) {
      console.log(a)
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
      if (
        this.req_obj.updateEmployeeDto.roleId === '' &&
        this.req_obj.updateEmployeeDto.subordinates?.length === 0 &&
        this.req_obj.updateEmployeeDto.superiorId === ''
      ) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select at least one field to update',
          life: 3000
        })
        return
      }

      const form = this.$refs.form as InstanceType<typeof HTMLFormElement>
      const validate = await (form as any).validate()
      this.req_obj.updateEmployeeDto.subordinates ||
        delete this.req_obj.updateEmployeeDto.subordinates
      this.req_obj.updateEmployeeDto.superiorId || delete this.req_obj.updateEmployeeDto.superiorId
      this.req_obj.updateEmployeeDto.roleId || delete this.req_obj.updateEmployeeDto.roleId

      if (validate) await this.savechanges()
    },
    async loadSubordinates() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: { currentEmployeeId: localStorage['employeeId'] }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const sub_res = await axios.get(
          apiURL + `employee/listPotentialSubordinates/${this.editedItem.employeeId}`,
          config
        )
        console.log(sub_res)
        // for (let i = 0; i < sub_res.data.data.length; i++) {
        //   const employee_details = await axios.get(
        //     apiURL + `employee/detailed/id/${sub_res.data.data[i]._id}`,
        //     config
        //   )
        //
        //   console.log(employee_details.data)
        //
        //   let company_employee: EmployeeInformation2 = {
        //     name:
        //       employee_details.data.data.userId.personalInfo.firstName +
        //       ' ' +
        //       employee_details.data.data.userId.personalInfo.surname +
        //       ' (' +
        //       employee_details.data.data.role.roleName +
        //       ')',
        //     employeeId: employee_details.data.data._id
        //   }
        //
        //   this.subordinateItemNames.push(company_employee)
        // }
        this.loading = false
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async loadSuperiors() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: { currentEmployeeId: localStorage['employeeId'] }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const sup_res = await axios.get(
          apiURL + `employee/listPotentialSuperiors/${this.editedItem.employeeId}`,
          config
        )
        console.log(sup_res)
        // for (let i = 0; i < sub_res.data.data.length; i++) {
        //   const employee_details = await axios.get(
        //     apiURL + `employee/detailed/id/${sub_res.data.data[i]._id}`,
        //     config
        //   )
        //
        //   console.log(employee_details.data)
        //
        //   let company_employee: EmployeeInformation2 = {
        //     name:
        //       employee_details.data.data.userId.personalInfo.firstName +
        //       ' ' +
        //       employee_details.data.data.userId.personalInfo.surname +
        //       ' (' +
        //       employee_details.data.data.role.roleName +
        //       ')',
        //     employeeId: employee_details.data.data._id
        //   }
        //
        //   this.subordinateItemNames.push(company_employee)
        // }
        this.loading = false
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
          if (
            roles_data[i].roleName === this.localEditedItem.roleName ||
            roles_data[i].roleName === 'Owner'
          )
            continue
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
      this.isDeleting = true // Indicate the start of the deletion process
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
          setTimeout(() => {
            this.isDeleting = false
            this.employeeDialog = false
          }, 1500)
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
  created() {
    this.showlocalvalues()
    this.loadRoles()
    this.loadSubordinates()
    this.loadSuperiors()
  }
}
</script>
