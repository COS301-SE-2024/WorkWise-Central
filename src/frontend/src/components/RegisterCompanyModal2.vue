<!-- <template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="450">
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

      <v-card prepend-icon="mdi-account" title="Register your company">
        <v-card-text>
          <v-row dense>
            <small class="text-caption text-medium-emphasis">Company email</small>
            <v-col cols="30" md="12" sm="20">
              <v-text-field
                label="Enter the company's email adress"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company phone number</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company's phone number"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

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
              <small class="text-caption text-medium-emphasis">Company email address</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's email adress"
                type="email"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Company phone number</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company's phone number"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Company logo</small>
            </v-col>
          </v-form>
        </v-col>
        <v-col cols="8" offset="2">
          <v-btn
            text
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
.text-medium-emphasis {
  color: black;
}
</style>
