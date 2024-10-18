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
        :loading="loadDataBoolean"
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
                :disabled="isDeleting || localEditedItem.roleName === 'Owner'"
              ></v-select>
            </v-col>
            <v-col :cols="12">
              <v-select
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
                :disabled="isDeleting"
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
                :disabled="isDeleting || localEditedItem.roleName === 'Owner'"
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
                    :disabled="isDeleting"
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
import { API_URL } from '@/main'

type EmployeeUpdate = {
  currentEmployeeId: string
  updateEmployeeDto: {
    roleId?: string
    subordinates?: string[]
    superiorId?: null
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
      loadDataBoolean: false,
      currentRoleId: null,
      currentSuperior: null,
      selectedRole: '',
      localEditedItem: this.editedItem,
      isDarkMode: localStorage['theme'] !== 'false',
      role_change: false,
      employeeDialog: false,
      currentSubordinates: [] as string[],
      roleItems: [] as RoleItem[],
      subordinateItemNames: [] as EmployeeInformation2[],
      superiorItemNames: [] as EmployeeInformation2[],
      selected_subordinate_names: [] as EmployeeInformation2[],
      selected_supiror_names: [] as EmployeeInformation2[],
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      employeesCurrentlySubordinates: [] as string[],
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      backendselectedSubs: [] as string[],
      loading: true,
      req_obj: {
        currentEmployeeId: localStorage['employeeId'],
        updateEmployeeDto: {
          roleId: null as null | string,
          subordinates: [] as string[],
          superiorId: null as null | string
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
    strHasNumberInIt(str: string) {
      return /\d/.test(str)
    },
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
        this.req_obj.updateEmployeeDto.superiorId === null
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

      if (validate || this.currentSubordinates.length != 0)
        await this.savechanges().then(() => this.close())
    },
    async loadSubordinates() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      try {
        const sub_res = await axios.get(
          API_URL + `employee/listPotentialSubordinates/${this.editedItem.employeeId}`,
          config
        )
        console.log(sub_res)
        for (let i = 0; i < sub_res.data.data.length; i++) {
          console.log(sub_res.data)
          let company_employee: EmployeeInformation2 = {
            name:
              sub_res.data.data[i].userInfo.firstName +
              ' ' +
              sub_res.data.data[i].userInfo.surname +
              ' (' +
              sub_res.data.data[i].role.roleName +
              ')',
            employeeId: sub_res.data.data[i]._id
          }
          this.subordinateItemNames.push(company_employee)
        }
        console.log('Hello man')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async setCurrentSubsAndSuperiors() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: { currentEmployeeId: localStorage['employeeId'] }
      }

      try {
        let current_subs = await axios.get(
          API_URL + `employee/detailed/id/${this.editedItem.employeeId}`,
          config
        )

        let sup_employee = await axios.get(
          API_URL + `employee/detailed/id/${current_subs.data.data.superiorId}`,
          config
        )
        //this.roleItems
        this.req_obj.updateEmployeeDto.roleId = current_subs.data.data.role.roleName
        this.currentRoleId = current_subs.data.data.role.roleId
        this.req_obj.updateEmployeeDto.superiorId = sup_employee.data.data.userInfo.firstName
        this.currentSuperior = current_subs.data.data.superiorId
        this.req_obj.updateEmployeeDto.subordinates = current_subs.data.data.subordinates
        this.currentSubordinates = current_subs.data.data.subordinates
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async loadSuperiors() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: { currentEmployeeId: localStorage['employeeId'] }
      }
      try {
        const sup_res = await axios.get(
          API_URL + `employee/listPotentialSuperiors/${this.editedItem.employeeId}`,
          config
        )
        for (let i = 0; i < sup_res.data.data.length; i++) {
          let company_employee: EmployeeInformation2 = {
            name:
              sup_res.data.data[i].userInfo.firstName +
              ' ' +
              sup_res.data.data[i].userInfo.surname +
              ' (' +
              sup_res.data.data[i].role.roleName +
              ')',
            employeeId: sup_res.data.data[i]._id
          }

          this.superiorItemNames.push(company_employee)
        }
        this.loading = false
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async loadRoles() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      console.log(API_URL)
      try {
        let roles_response = await axios.get(
          API_URL + `role/all/${localStorage['currentCompany']}`,
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
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee Edited Successfully',
        life: 3000
      })
      setTimeout(() => {
        this.employeeDialog = false
        this.$emit('update')
      }, 1500)
    },
    async savechanges() {
      this.isDeleting = true // Indicate the start of the deletion process
      let change_occured = false
      console.log(this.req_obj)
      let config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      console.log(this.localEditedItem.employeeId)

      console.log('current subordinates: ' + this.currentSubordinates)
      console.log('selected subordinates: ' + this.req_obj.updateEmployeeDto.subordinates)

      const remove_sub_array = this.currentSubordinates?.filter(
        (item: string) => !this.req_obj.updateEmployeeDto.subordinates?.includes(item)
      )

      const add_sub_array = this.req_obj.updateEmployeeDto.subordinates?.filter(
        (item: string) => !this.currentSubordinates.includes(item)
      )

      console.log('Remove: ' + remove_sub_array)
      console.log('Add: ' + add_sub_array)

      let add_object = {
        currentEmployeeId: localStorage['employeeId'],
        subordinatesToBeAdded: add_sub_array
      }

      let remove_object = {
        currentEmployeeId: localStorage['employeeId'],
        subordinatesToBeRemoved: remove_sub_array
      }

      if (remove_sub_array?.length !== 0)
        axios
          .patch(
            API_URL + `employee/removeSubordinate/${this.localEditedItem.employeeId}`,
            remove_object,
            config
          )
          .then((res) => {
            change_occured = true
            console.log(res)
            this.employeeDialog = false
            setTimeout(() => {
              this.employeeDialog = false
            }, 1500)

            console.log(res)
            this.employeeDialog = false
            setTimeout(() => {
              this.employeeDialog = false
            }, 1500)
          })
          .catch((error) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while updating Remove subordinate employee',
              life: 3000
            })
            console.log(error)
            return
          })

      console.log(add_sub_array)

      if (add_sub_array?.length !== 0)
        axios
          .patch(
            API_URL + `employee/addSubordinate/${this.localEditedItem.employeeId}`,
            add_object,
            config
          )
          .then((res) => {
            change_occured = true
          })
          .catch((error) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while updating Add subordinate employee',
              life: 3000
            })
            console.log(error)
            return
          })

      if (
        this.req_obj.updateEmployeeDto.roleId != this.currentRoleId &&
        this.req_obj.updateEmployeeDto.roleId != '' &&
        this.req_obj.updateEmployeeDto.roleId != null &&
        this.strHasNumberInIt(this.req_obj.updateEmployeeDto.roleId)
      )
        axios
          .patch(
            API_URL + `employee/${this.localEditedItem.employeeId}`,
            {
              currentEmployeeId: localStorage['employeeId'],
              roleId: this.req_obj.updateEmployeeDto.roleId
            },
            config
          )
          .then(() => {
            change_occured = true
          })
          .catch((error) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while updating Superior employee',
              life: 3000
            })
            console.log(error)
            return
          })

      if (
        this.req_obj.updateEmployeeDto.superiorId != this.currentSuperior &&
        this.req_obj.updateEmployeeDto.superiorId != '' &&
        this.req_obj.updateEmployeeDto.superiorId != null &&
        this.strHasNumberInIt(this.req_obj.updateEmployeeDto.superiorId)
      )
        axios
          .patch(
            API_URL + `employee/${this.localEditedItem.employeeId}`,
            {
              currentEmployeeId: localStorage['employeeId'],
              superiorId: this.req_obj.updateEmployeeDto.superiorId
            },
            config
          )
          .then(() => {
            change_occured = true
          })
          .catch((error) => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while updating Superior employee',
              life: 3000
            })
            console.log(error)
            return
          })

      this.isDeleting = false
      if (change_occured) {
        console.log('were in')
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Edited Successfully',
          life: 3000
        })
        setTimeout(() => {
          this.employeeDialog = false
          this.$emit('update')
        }, 1500)
      }
    }
  },
  mounted() {
    this.loadDataBoolean = true
    this.showlocalvalues()
    this.loadRoles().then(() =>
      this.loadSubordinates().then(() =>
        this.loadSuperiors()
          .then(() => this.setCurrentSubsAndSuperiors())
          .then(() => (this.loadDataBoolean = false))
      )
    )
  }
}
</script>
