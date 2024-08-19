<template>
  <v-dialog max-height="800" max-width="600" style="font-family: Nunito, sans-serif">
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          rounded="md"
          class="text-none font-weight-regular hello"
          style="font-size: 20px; font-family: Nunito, sans-serif"
          prepend-icon="mdi-account-multiple-plus"
          text="Add Employee"
          variant="elevated"
          color="secondary"
          block
          v-bind="activatorProps"
        ></v-btn>
      </v-defaults-provider>
    </template>
    <v-card>
      <v-card-title class="text-center" style="font-family: Nunito, sans-serif"
        >Add Employee</v-card-title
      >
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
          <v-col>
            <v-row>
              <v-col :cols="12">
                <small
                  class="text-caption font-weight-regular"
                  style="font-family: Nunito, sans-serif"
                  >Add employee using employee email</small
                >

                <v-text-field
                  v-model="req_obj.emailToInvite"
                  placeholder="Employee email"
                  rounded="md"
                  required
                  :rules="rules.username"
                  data-testid="username-textfield"
                ></v-text-field>
              </v-col>

              <v-col :cols="12">
                <v-select
                  clearable
                  label="Company Role"
                  hint="Select the role you'd like to change this employee to"
                  persistent-hint
                  @update:modelValue="change_roles"
                  :items="roleItems"
                  item-value="roleId"
                  item-title="roleName"
                  v-model="req_obj.roleId"
                  :rules="rules.role"
                  bg-color="background"
                  variant="solo"
                  data-testid="role-select"
                ></v-select>
              </v-col>
              <v-col :cols="12">
                <v-select
                  clearable
                  label="Superior"
                  hint="Select the employee you'd like to be superior of this employee"
                  persistent-hint
                  @update:modelValue="selected_supirior"
                  :items="subordinateItemNames"
                  v-model="req_obj.superiorId"
                  :rules="rules.superior"
                  item-value="employeeId"
                  item-title="name"
                  bg-color="background"
                  variant="solo"
                  data-testid="superior-select"
                ></v-select>
              </v-col>
            </v-row>

            <v-col cols="12" md="12" xs="3" sm="6" align="center">
              <Toast position="top-center" />
              <v-btn
                color="success"
                rounded="md"
                boarder="md"
                type="submit"
                width="100%"
                height="35"
                variant="text"
                :disabled="click_create_client"
                :loading="isDeleting"
                style="font-family: Nunito, sans-serif"
                ><v-icon icon="fa:fa-solid fa-plus" color="success" size="small" start></v-icon>Add
              </v-btn>
            </v-col>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import type { EmployeeInformation2, RoleItem, Role } from '@/components/home/employees/types'
// import router from '@/router'
export default defineComponent({
  name: 'RegisterCompanyModal',
  components: {
    Toast
  },
  data: () => ({
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    rules: {
      username: [(v: string) => !!v || 'Username is required'],
      role: [(v: any) => !!v || 'Role is required'],
      superior: [(v: any) => !!v || 'Superior is required']
    },
    valid: false,
    dialog: false,
    isDeleting: false,
    roleItems: [] as RoleItem[],
    subordinateItemNames: [] as EmployeeInformation2[],
    isDarkMode: localStorage['theme'] !== 'false',
    click_create_client: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    req_obj: {
      employeeId: localStorage['employeeId'],
      currentCompany: localStorage['currentCompany'],
      emailToInvite: '',
      superiorId: '',
      roleId: ''
    }
  }),
  methods: {
    selected_supirior() {
      console.log(this.req_obj.superiorId)
    },
    change_roles() {
      console.log(this.req_obj.roleId)
      console.log(this.roleItems)
    },
    async loadSubordinates() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      try {
        const sub_res = await axios.get(
          apiURL + `employee/detailed/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(sub_res)
        for (let i = 0; i < sub_res.data.data.length; i++) {
          let company_employee: EmployeeInformation2 = {
            name:
              sub_res.data.data[i].userId.personalInfo.firstName +
              ' ' +
              sub_res.data.data[i].userId.personalInfo.surname +
              ' (' +
              sub_res.data.data[i].role.roleName +
              ')',
            employeeId: sub_res.data.data[i]._id
          }

          console.log(company_employee)
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
        console.log(roles_response)
        let roles_data: Role[] = roles_response.data.data
        for (let i = 0; i < roles_data.length; i++) {
          if (roles_data[i].roleName === 'Owner') continue
          this.roleItems.push({
            roleName: roles_data[i].roleName,
            roleId: roles_data[i]._id
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async validateSubmit() {
      const form = this.$refs.form as InstanceType<typeof HTMLFormElement>
      const validate = await (form as any).validate()

      //this will be the request to check
      //if the username that was entered exists
      // in the company, waiting on jess to create endpoint
      // const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      // const apiURL = await this.getRequestUrl()
      // try {
      //   const res = await axios.post(
      //     apiURL + 'employee/exists/username',
      //     { username: this.req_obj.newUserUsername },
      //     config
      //   )
      //   if (res.status > 199 && res.status > 300 && res.data.data == true)
      //     validate || (await this.handleSubmit())
      // } catch (error) {
      //   console.log(error)
      // }
    },
    async handleSubmit() {
      this.req_obj.employeeId = localStorage['employeeId']
      this.req_obj.currentCompany = localStorage['currentCompany']

      console.log(this.req_obj)
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .post(apiURL + 'admin/invite/create', this.req_obj, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Employee Added Successfully',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.dialog = false
            window.location.reload()
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add employee',
            life: 3000
          })
        })
    },
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
    this.req_obj.currentCompany = localStorage['currentCompany']
    this.loadRoles()
    this.loadSubordinates()
  }
})
</script>

<style></style>
