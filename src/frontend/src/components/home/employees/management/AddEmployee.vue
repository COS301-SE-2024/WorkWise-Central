<template>
  <v-dialog
    max-height="800"
    max-width="600"
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          rounded="md"
          class="text-none font-weight-regular hello"
          style="font-size: 20px"
          prepend-icon="mdi-account-multiple-plus"
          text="Add Employee"
          variant="elevated"
          color="secondary"
          v-bind="activatorProps"
        ></v-btn>
      </v-defaults-provider>
    </template>
    <v-card>
      <v-card-title class="text-center">Add Employee</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
          <v-col>
            <v-col>
              <v-col>
                <small class="text-caption font-weight-regular"
                  >Add employee using employee username</small
                >

                <v-text-field
                  bg-color="background"
                  v-model="req_obj2.userName"
                  placeholder="Employee Username"
                  rounded="md"
                  required
                ></v-text-field>
              </v-col>
            </v-col>

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
    isdarkmode: localStorage['theme'] !== 'false',
    click_create_client: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',

    req_obj: {
      companyId: sessionStorage['currentCompany'],
      userId: ''
    },
    req_obj2: {
      userName: '',
      companyId: sessionStorage['currentCompany']
    }
  }),
  methods: {
    async handleSubmit() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const employee_response = await axios.get(apiURL + `users/all`, config)
        const emp_lst = employee_response.data.data
        console.log(emp_lst)
        for (let i = 0; i < emp_lst.length; i++) {
          if (emp_lst[i].systemDetails.username === this.req_obj2.userName) {
            this.req_obj.userId = emp_lst[i]._id
            let response = await axios.post(apiURL + 'employee/create', this.req_obj, config)
            console.log(response)
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Employee added successfully',
              life: 3000
            })
            this.$router.push('/manager-employees-t')
            break
          }
        }
      } catch (error) {
        console.log('Error fetching data:', error)
      }
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
  }
})
</script>

<style></style>
