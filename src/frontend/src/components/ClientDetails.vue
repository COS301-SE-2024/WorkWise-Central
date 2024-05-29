<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="450">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          color="black"
          text="Add Client"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="Client Details">
        <v-card-text>
          <v-row dense>
            <small class="text-caption text-medium-emphasis">Name of client</small>
            <v-col cols="30" md="12" sm="20">
              <v-text-field
                label="Enter the name of the client"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Client email address</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients email address"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Client phone number</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients phone number"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Clients address</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients address"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company (if applicable)</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field label="Enter the company" model-value="" variant="solo"></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company address (if applicable)</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company address"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Preferred language</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the preferred language of the client"
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
            text="CREATE CLIENT"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
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
