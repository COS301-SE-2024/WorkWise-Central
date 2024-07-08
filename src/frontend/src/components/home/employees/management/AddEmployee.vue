<template>
  <v-dialog max-height="800" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        text="ADD EMPLOYEE"
        variant="elevated"
        color="#5A82AF"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      :color="isdarkmode === true ? 'dark' : 'light'"
      elevation="14"
      rounded="md"
      max-height="800"
      max-width="600"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              Add Employee
            </h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >Add employee using employee username</small
              >

              <v-text-field
                :bg-color="isdarkmode === true ? 'dark' : 'light'"
                density="compact"
                color="grey-lighten-4"
                v-model="req_obj2.userName"
                placeholder="Employee Username"
                rounded="md"
                variant="underlined"
                required
              ></v-text-field
            ></v-col>
            <!--            <v-container>-->
            <!--              <v-row align="center" justify="center">-->
            <!--                <h2 style="font-weight: lighter">OR</h2></v-row-->
            <!--              >-->
            <!--            </v-container>-->
            <!--            <v-col>-->
            <!--              <small-->
            <!--                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"-->
            <!--                class="text-caption"-->
            <!--                >Send the employee the company ID to join the company-->
            <!--              </small>-->
            <!--              <v-text-field-->
            <!--                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"-->
            <!--                density="compact"-->
            <!--                color="grey-lighten-4"-->
            <!--                v-model="req_obj.compid_for_emp"-->
            <!--                label="################"-->
            <!--                rounded="md"-->
            <!--                variant="solo"-->
            <!--              ></v-text-field-->
            <!--            ></v-col>-->
            <!--            <v-container>-->
            <!--              <v-row align="center" justify="center"-->
            <!--                ><h2 style="font-weight: lighter">OR</h2></v-row-->
            <!--              >-->
            <!--            </v-container>-->
            <!--            <v-col>-->
            <!--              <small-->
            <!--                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"-->
            <!--                class="text-caption"-->
            <!--                >Send the employee this link</small-->
            <!--              >-->
            <!--              <v-text-field-->
            <!--                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"-->
            <!--                density="compact"-->
            <!--                v-model="req_obj.link_for_emp"-->
            <!--                color="grey-lighten-4"-->
            <!--                label="################"-->
            <!--                rounded="md"-->
            <!--                variant="solo"-->
            <!--                required-->
            <!--              ></v-text-field-->
            <!--            ></v-col>-->
          </v-col>
          <v-col cols="12" md="12" xs="3" sm="6" align="center">
            <v-btn
              color="success"
              rounded="md"
              boarder="md"
              type="submit"
              width="80%"
              height="35"
              variant="text"
              :disabled="click_create_client"
              >ADD EMPLOYEE</v-btn
            >
          </v-col>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
// import router from '@/router'
export default defineComponent({
  name: 'RegisterCompanyModal',
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
