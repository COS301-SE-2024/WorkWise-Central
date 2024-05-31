<!-- <template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="350">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          color="black"
          text="Seach for company"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="">
        <v-card-text>
          <v-row dense>
            <small class="text-caption text-medium-emphasis">Search for the company by name</small>
            <v-col cols="30" md="12" sm="20">
              <v-text-field
                label="Enter the company's name"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Enter the Company ID</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company ID"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            text="Join company"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
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
            Join Company
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-form ref="form" v-model="valid">
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
                >Search for the company by name</small
              >
              <v-autocomplete
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                label="Company Name"
                variant="solo"
                rounded="xl"
                v-model="join_req_obj.company_name"
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
                :style="isdarkmode === true ? dark_theme_text_color : modal_light_theme_color"
                >Enter the Company ID</small
              >
              <v-text-field
                density="compact"
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                label="Enter the company ID"
                rounded="xl"
                variant="solo"
                v-model="join_req_obj.companyID"
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
            width="85%"
            height="35"
            variant="elevated"
            color="blue-accent-2"
            >JOIN COMPANY</v-btn
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
    isdarkmode: true,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    click_create_client: false,

    join_req_obj: {
      company_name: '',
      companyID: ''
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
