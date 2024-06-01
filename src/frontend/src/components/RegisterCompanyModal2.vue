<template>
  <v-dialog max-width="400" height="600">
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
      width="400"
      height="700"
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
                >Company email address</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's email adress"
                type="email"
                v-model="req_obj.company_email"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company phone number</small
              >
              <v-text-field
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's phone number"
                rounded="xl"
                variant="solo"
                v-model="req_obj.company_num"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company logo</small
              >
            </v-col>
          </v-form>
        </v-col>
        <v-col cols="8" offset="2">
          <v-btn
            rounded="xl"
            boarder="xl"
            width="100%"
            size="large"
            variant="elevated"
            color="blue-accent-2"
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
    valid: false,
    dialog: false,
    click_create_client: false,
    isdarkmode: true,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',

    req_obj: {
      company_email: '',
      company_num: ''
    }
  })
}
</script>

<style scope></style>
