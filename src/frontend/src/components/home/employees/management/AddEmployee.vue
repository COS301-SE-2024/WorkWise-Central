<template>
  <v-dialog
    max-height="800"
    max-width="600"
    style="font-family: Nunito, sans-serif"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
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
                  >Add employee using employee username</small
                >

                <v-text-field
                  bg-color="background"
                  v-model="req_obj2.newUserUsername"
                  placeholder="Employee Username"
                  rounded="md"
                  required
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
                  v-model="req_obj2.roleId"
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
                  v-model="req_obj2.superiorId"
                  item-value="employeeId"
                  item-title="name"
                  bg-color="background"
                  variant="solo"
                  data-testid="superior-select"
                ></v-select>
              </v-col>
            </v-row>

            <v-col cols="12" md="12" xs="3" sm="6" align="center">
              <Toast />
              <v-btn
                color="success"
                rounded="md"
                boarder="md"
                type="submit"
                width="100%"
                height="35"
                variant="text"
                :disabled="click_create_client"
                style="font-family: Nunito, sans-serif"
                >Add
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
    valid: false,
    dialog: false,
    roleItems: [] as RoleItem[],
    subordinateItemNames: [] as EmployeeInformation2[],
    isdarkmode: localStorage['theme'] !== 'false',
    click_create_client: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',

    req_obj: {
      companyId: localStorage['currentCompany'],
      userId: ''
    },
    req_obj2: {
      adminId: localStorage['employeeId'],
      currentCompany: localStorage['currentCompany'],
      newUserUsername: '',
      superiorId: '',
      roleId: ''
    }
  }),
  methods: {
    selected_supirior() {
      console.log(this.req_obj2.superiorId)
    },
    change_roles() {
      console.log(this.req_obj2.roleId)
    },
    async loadSubordinates() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      try {
        const sub_res = await axios(
          apiURL + `company/all/employees/${localStorage.getItem('currentCompany')}`,
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
              employee_details.data.data.roleId.roleName +
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
          this.roleItems.push({
            roleName: roles_data[i].roleName,
            roleId: roles_data[i]._id
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async handleSubmit() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .post(apiURL + 'company/add', this.req_obj2, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Employee Added Successfully',
            life: 3000
          })
          window.location.reload()
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
    this.req_obj2.adminId = localStorage['employeeId']
    this.req_obj2.currentCompany = localStorage['currentCompany']
    this.loadRoles()
    this.loadSubordinates()
  }
})
</script>

<style></style>
