<template>
  <v-dialog max-width="400" height="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        color="black"
        text="Add Employee"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
      elevation="14"
      rounded="xl"
      width="400"
      height="700"
    >
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Add Employee
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-form ref="form" v-model="valid">
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
                v-model="req_obj.emp_username"
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
          </v-form>
        </v-col>
        <v-col cols="8" offset="2" align="center">
          <v-btn
            rounded="xl"
            boarder="xl"
            width="80%"
            height="35"
            variant="elevated"
            color="blue-accent-2"
            :disabled="click_create_client"
            >ADD EMPLOYEE</v-btn
          >
        </v-col>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RegisterCompanyModal',
  data: () => ({
    valid: false,
    dialog: false,
    click_create_client: false,
    isdarkmode: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',

    req_obj: {
      emp_username: '',
      compid_for_emp: '',
      link_for_emp: ''
    }
  })
})
</script>

<style scope>
.text-none {
  color: red;
  background-color: blue;
}
</style>
