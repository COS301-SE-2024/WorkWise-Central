<!-- <template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="450" :height="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          color="black"
          text="Register a company"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>
      <v-card prepend-icon="mdi-account" title="Register your company">
        <v-card-text>
          <v-row dense>
            <small  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" class="text-caption ">Company name*</small>
            <v-col  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" cols="30" md="12" sm="20">
              <v-text-field
                density="compact"
                :rounded="true"
                label="Enter the company's name"
                model-value=""
                variant="solo"
                bg-color="#F1F1F1"
              ></v-text-field>
            </v-col>

            <small  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" class="text-caption ">Type of business*</small>
            <v-col  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" cols="12" md="12" sm="20">
              <v-text-field
                density="compact"
                :rounded="true"
                label="Plumbing"
                model-value=""
                variant="solo"
                bg-color="#F1F1F1"
              ></v-text-field>
            </v-col>

            <small  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" class="text-caption ">Company registration number</small>
            <v-col  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" cols="12" md="12" sm="20">
              <v-text-field
                density="compact"
                :rounded="true"
                label="Enter the company's registration number"
                model-value=""
                variant="solo"
                bg-color="#F1F1F1"
              ></v-text-field>
            </v-col>

            <small  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" class="text-caption ">Company VAT number</small>
            <v-col  :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color" cols="12" md="12" sm="20">
              <v-text-field
                density="compact"
                :rounded="true"
                label="Enter the company's VAT number"
                model-value=""
                variant="solo"
                bg-color="#F1F1F1"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text="CONTINUE" variant="tonal" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template> -->

<template>
  <v-dialog max-width="500" height="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-account"
        color="black"
        text="CONTINUE"
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
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Register your company
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-form ref="form" v-model="valid">
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company name*</small
              >
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's name"
                v-model="req_obj.company_name"
                rounded="xl"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Type of business*</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                label="Plumbing"
                v-model="req_obj.business_type"
                rounded="xl"
                variant="solo"
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company registration number</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's registration number"
                type="number"
                v-model="req_obj.reg_number"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>

            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company VAT number</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's VAT number"
                type="number"
                rounded="xl"
                v-model="req_obj.vat_num"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
          </v-form>
        </v-col>
        <v-col
          :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
          cols="8"
          offset="2"
          align="center"
        >
          <v-btn
            text
            rounded="xl"
            boarder="xl"
            width="60%"
            height="35"
            variant="elevated"
            color="blue-accent-2"
            :disabled="click_create_client"
            >Continue</v-btn
          >
        </v-col>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'RegisterCompanyModal',
  data: () => ({
    dialog: false,
    click_create_client: false,
    isdarkmode: true,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',

    req_obj: {
      company_name: '',
      business_type: '',
      reg_number: '',
      vat_num: ''
    }
  })
}
</script>

<style scope>
.text-none {
  color: red;
  background-color: blue;
}
</style>
