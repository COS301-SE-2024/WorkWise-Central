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
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
      elevation="14"
      rounded="xl"
      width="400"
      height="700"
    >
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            Client Details
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-form ref="form" v-model="valid">
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption white--text"
                >Name of client*</small
              >

              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the name of the client"
                v-model="req_obj.client_name"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client email address*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the client's email address"
                v-model="req_obj.client_email"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client phone number*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the client's phone number"
                v-model="req_obj.client_number"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Client address*</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the client's address"
                v-model="req_obj.client_address"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company (if applicable)</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the company name"
                v-model="req_obj.company_name"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Company address (if applicable)</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the company address"
                v-model="req_obj.company_address"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                class="text-caption"
                >Preferred language</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                color="grey-lighten-4"
                label="Enter the language preferred by the client"
                rounded="xl"
                v-model="req_obj.client_preferred_language"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
          </v-form>
        </v-col>
        <v-col cols="8" offset="2" align="center">
          <v-btn
            text
            rounded="xl"
            boarder="xl"
            width="80%"
            height="35"
            variant="elevated"
            color="blue-accent-2"
            :disabled="click_create_client"
            >CREATE CLIENT</v-btn
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
      client_name: '',
      client_email: '',
      client_number: '',
      client_address: '',
      company_name: '',
      company_address: '',
      client_preferred_language: ''
    }
  })
}
</script>

<style scoped>
.small_dark_text {
  color: white;
}
</style>
