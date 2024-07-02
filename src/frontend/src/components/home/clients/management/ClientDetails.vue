<template>
  <v-dialog v-model="clientDialog" max-width="500" height="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        variant="elevated"
        v-bind="activatorProps"
      >
        View Client Details
      </v-btn>
    </template>

    <v-sheet
      elevation="14"
      rounded="xl"
      width="500"
      height="800"
      :color="isdarkmode === true ? colors.modal_dark_theme_color : colors.modal_light_theme_color"
    >
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Client Details</h4>
        </v-col>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><label> First Name</label><v-spacer></v-spacer
            ><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.firstName }}</small
            ></v-col
          >
        </v-col>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><label> Surname</label><v-spacer></v-spacer
            ><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.surname }}</small
            ></v-col
          >
        </v-col>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><label>Phone Number</label><v-spacer></v-spacer
            ><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.phoneNumber }}</small
            ></v-col
          >
        </v-col>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><label> Email</label><v-spacer></v-spacer
            ><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.email }}</small
            ></v-col
          >
        </v-col>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><label> Address</label><v-spacer></v-spacer
            ><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.address.street }}</small
            >
            <br />
            <small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.address.suburb }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.address.city }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.address.postalCode }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.address.complex }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ ClientDetails.clientInfo.address.houseNumber }}</small
            ></v-col
          >
        </v-col>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><label> Preferred Languages</label><v-spacer></v-spacer>
            <v-chip color="red"
              ><small
                class="text-caption"
                :style="
                  isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
                "
                >{{
                  ClientDetails.preferred_Language ? ClientDetails.preferred_Language : 'None'
                }}</small
              ></v-chip
            ></v-col
          >
        </v-col>
      </v-col>
    </v-sheet>
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
  }
})
</script>
