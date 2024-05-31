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
            <small class="text-caption text-medium-emphasis">Company name*</small>
            <v-col cols="30" md="12" sm="20">
              <v-text-field
                density="compact"
                :rounded="true"
                label="Enter the company's name"
                model-value=""
                variant="solo"
                bg-color="#F1F1F1"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Type of business*</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                density="compact"
                :rounded="true"
                label="Plumbing"
                model-value=""
                variant="solo"
                bg-color="#F1F1F1"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company registration number</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                density="compact"
                :rounded="true"
                label="Enter the company's registration number"
                model-value=""
                variant="solo"
                bg-color="#F1F1F1"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company VAT number</small>
            <v-col cols="12" md="12" sm="20">
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
    <v-sheet elevation="14" rounded="xl" width="400" height="700">
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
              <small class="text-caption text-medium-emphasis">Company name*</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's name"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Type of business*</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's name"
                rounded="xl"
                variant="solo"
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Company registration number</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's registration number"
                type="number"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>

            <v-col>
              <small class="text-caption text-medium-emphasis">Company VAT number</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's VAT number"
                type="number"
                rounded="xl"
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
            width="60%"
            height="35"
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
    dialog: false,
    click_create_client: false,
    isdarkmode: true,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF'
  })
}
</script>

<style scope>
.text-none {
  color: red;
  background-color: blue;
}
</style>
