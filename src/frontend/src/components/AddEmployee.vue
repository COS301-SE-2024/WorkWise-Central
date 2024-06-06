<template>
  <v-dialog max-height="800" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          base-color="red"
          rounded="xl"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        color="white"
        text="ADD EMPLOYEE"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
      elevation="14"
      rounded="xl"
      max-height="800" max-width="600"
    >
      <v-form ref="form" v-model="valid" @submit = "handleSubmit">
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
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                v-model="req_obj.newEmployeeUsername"
                label="######################"
                rounded="xl"
                variant="solo"
              ></v-text-field
            ></v-col>
            <v-container>
              <v-row align="center" justify="center"
                ><h2 style="font-weight: lighter">OR</h2></v-row
              >
            </v-container>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Send the employee the company ID to join the company
              </small>
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                v-model="req_obj.compid_for_emp"
                label="################"
                rounded="xl"
                variant="solo"
              ></v-text-field
            ></v-col>
            <v-container>
              <v-row align="center" justify="center"
                ><h2 style="font-weight: lighter">OR</h2></v-row
              >
            </v-container>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Send the employee this link</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                v-model="req_obj.link_for_emp"
                color="grey-lighten-4"
                label="################"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
        </v-col>
        <v-col cols="8" offset="2" align="center">
          <v-btn
              color="#5A82AF"
            rounded="xl"
            boarder="xl"
            type="submit"
            width="80%"
            height="35"
            variant="elevated"
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
import axios from 'axios';
export default defineComponent({
  name: 'RegisterCompanyModal',
  props: ['isdarkmode'],
  data: () => ({
    valid: false,
    dialog: false,
    click_create_client: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',

    req_obj: {
      adminId: sessionStorage['id'],
      currentCompany:sessionStorage['currentCompany'],
      newEmployeeUsername: '',
      compid_for_emp: '',
      link_for_emp: ''
    }
  }),
  methods:{
    handleSubmit(){
      alert("Employee added successfully")

      axios
          .post('http://localhost:3000/company/add', this.req_obj)
          .then((res) => {
            console.log(res)
          })
          .catch((res) => {
            console.log(res)
          })
    }
  }
})
</script>

<style scope>
.hello
{
  color:white;
  background-color: #5A82AF;
}
</style>

