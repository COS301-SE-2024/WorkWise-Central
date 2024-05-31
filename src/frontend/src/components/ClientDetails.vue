<!-- <template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="450">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular red--text"
          prepend-icon="mdi-account"
          color="black"
          text="Add Client"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="Client Details" :rounded="10">
        <v-card-text>
          <v-row dense>
            <small class="text-caption text-medium-emphasis">Name of client</small>
            <v-col cols="30" md="12" sm="20">
              <v-text-field
                label="Enter the name of the client"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Client email address</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients email address"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-medium-emphasis small_dark_text">Client phone number</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients phone number"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Clients address</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients address"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company (if applicable)</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company address (if applicable)</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company address"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Preferred language</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the preferred language of the client"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
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

      <v-card prepend-icon="mdi-account" title="Client Details" color="#1E1E1E">
        <v-card-text>
          <v-row dense>
            <small class="text-caption text-medium-emphasis white--text">Name of client</small>
            <v-col cols="30" md="12" sm="20">
              <v-text-field
                label="Enter the name of the client"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Client email address</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients email address"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Client phone number</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients phone number"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Clients address</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the clients address"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company (if applicable)</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Company address (if applicable)</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the company address"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
              ></v-text-field>
            </v-col>

            <small class="text-caption text-medium-emphasis">Preferred language</small>
            <v-col cols="12" md="12" sm="20">
              <v-text-field
                label="Enter the preferred language of the client"
                model-value=""
                variant="solo"
                density="compact"
                :rounded="true"
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
</template> -->

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
            Client Details
          </h4></v-col
        >
        <v-spacer></v-spacer>
        <v-col>
          <v-form ref="form" v-model="valid">
            <v-col>
              <small class="text-caption text-medium-emphasis white--text">Name of client*</small>

              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the name of the client"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Client email address*</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the client's email address"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Client phone number*</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the client's phone number"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Client address*</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the client's address"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Company (if applicable)</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company name"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis"
                >Company address (if applicable)</small
              >
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the company address"
                rounded="xl"
                variant="solo"
                required
              ></v-text-field
            ></v-col>
            <v-col>
              <small class="text-caption text-medium-emphasis">Preferred language</small>
              <v-text-field
                density="compact"
                color="grey-lighten-4"
                label="Enter the language preferred by the client"
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
    modal_light_theme_color: '#FFFFFF'
  })
}
</script>

<style scoped>
.small_dark_text {
  color: white;
}
</style>
