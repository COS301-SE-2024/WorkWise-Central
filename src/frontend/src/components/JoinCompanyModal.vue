<template>
  <v-dialog max-width="500" height="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          base-color="red"
          rounded="xl"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        color="white"
        text="JOIN COMPANY"
        variant="tonal"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    <v-sheet
      elevation="14"
      rounded="xl"
      width="500"
      height="800"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-form ref="form" v-model="valid" @submit.prevent="handlesubmission">
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              Join Company
            </h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >Search for the company by name</small
              >
              <v-autocomplete
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                label="Company Name"
                variant="solo"
                rounded="xl"
                v-model="req_obj.company_name"
                :items="['Plumber Tronics', 'Nedbank', 'FNB', 'Talker', 'Friends', 'Wyoming']"
              ></v-autocomplete
            ></v-col>
            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                <h2 style="font-weight: lighter">OR</h2>
              </v-row>
            </v-container>
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >Enter the Company ID</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                label="Enter the company ID"
                rounded="xl"
                variant="solo"
                v-model="req_obj.companyID"
                required
              ></v-text-field
            ></v-col>
          </v-col>
          <v-col cols="8" offset="2" align="center">
            <v-btn
                color="#5A82AF"
              rounded="xl"
              boarder="xl"
              width="85%"
              height="35"
              variant="elevated"
              :disabled="req_obj.company_name === '' && req_obj.companyID === ''"
              >JOIN COMPANY</v-btn
            >
          </v-col>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'RegisterCompanyModal',

  props: ['isdarkmode'],
  data: () => ({
    dialog: false,
    valid: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    click_create_client: false,
    attribute_is_filled: false,

    req_obj: {
      company_name: '',
      companyID: ''
    }
  }),

  methods: {
    handlesubmission(){
      alert("Added employee successfully")
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
