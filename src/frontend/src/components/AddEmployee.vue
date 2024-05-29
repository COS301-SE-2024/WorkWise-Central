<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="350">
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

      <v-card prepend-icon="mdi-account" title="Add Employee">
        <v-card-text>
          <v-row dense>
            <small class="text-caption text-medium-emphasis">Add employee using employee ID</small>
            <v-col cols="30" md="12" sm="20">
              <v-text-field
                label="#####################"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis"
              >Send teh employee the company ID to join the company</small
            >
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="#####################"
                model-value=""
                variant="solo"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Send the employee this link</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="#####################"
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
            text="ADD EMPLOYEE"
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
