<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="450">
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
                label="Enter the company's name"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Type of business*</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field label="Plumbing" model-value="" variant="solo"></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company registration number</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company's registration number"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company VAT number</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company's VAT number"
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
</template>

<script lang="ts">
export default {
  name: 'RegisterCompanyModal',
  data: () => ({
    dialog: false
  })
}
</script>

<style scope>
.text-none {
  color: red;
  background-color: blue;
}
</style>
