<template>
  <v-dialog v-model="clientDialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="primary"
        variant="text"
        v-bind="activatorProps"
      >
        View
      </v-btn>
    </template>

    <v-card
      elevation="14"
      rounded="md"
      height="auto"
      :color="isdarkmode === true ? colors.modal_dark_theme_color : colors.modal_light_theme_color"
    >
      <v-card-title class="justify-center">
        <span class="headline">Client Details</span>
      </v-card-title>
      <v-card-text>
        <v-container
          ><v-col>
            <v-row
              ><v-col cols="6">
                <label> First Name</label><v-spacer></v-spacer
                ><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.name }}</small
                ></v-col
              >
              <v-col cols="6">
                <label> Surname</label><v-spacer></v-spacer
                ><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.surname }}</small
                ></v-col
              >
            </v-row>

            <v-divider></v-divider>
            <v-row>
              <v-col cols="6">
                <label>Phone Number</label><v-spacer></v-spacer
                ><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.phoneNumber }}</small
                ></v-col
              >
              <v-col cols="6">
                <label> Email</label><v-spacer></v-spacer
                ><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.email }}</small
                ></v-col
              >
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="6">
                <label> Address</label><v-spacer></v-spacer
                ><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.address.street }}</small
                >
                <br />
                <small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.address.suburb }}</small
                >
                <br /><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.address.city }}</small
                >
                <br /><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.address.postalCode }}</small
                >
                <br /><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.address.complex }}</small
                >
                <br /><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{ ClientDetails.address.houseNumber }}</small
                ></v-col
              >
            </v-row>
            <v-divider></v-divider>
            <v-col
              ><label> Preferred Languages</label><v-spacer></v-spacer>
              <v-chip color="red"
                ><small
                  class="text-caption"
                  :style="
                    isdarkmode === true
                      ? colors.dark_theme_text_color
                      : colors.light_theme_text_color
                  "
                  >{{
                    ClientDetails.preferred_Language ? ClientDetails.preferred_Language : 'None'
                  }}</small
                ></v-chip
              ></v-col
            >
            <v-divider></v-divider> </v-col
        ></v-container>
      </v-card-text>
      <v-card-actions>
        <v-col>
          <v-btn color="error" rounded="md" width="100%" height="35" variant="text" @click="close">
            Close
          </v-btn>
        </v-col></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isdarkmode: Boolean,
    colors: Array,
    ClientDetails: Array
  },
  data() {
    return {
      clientDialog: false
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    }
  }
})
</script>
