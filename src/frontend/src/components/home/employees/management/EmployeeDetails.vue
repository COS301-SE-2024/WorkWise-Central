<template>
  <v-dialog v-model="clientDialog" max-width="500" height="800">
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
              >{{ EmployeeDetails.firstName }}</small
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
              >{{ EmployeeDetails.surname }}</small
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
              >{{ EmployeeDetails.phoneNumber }}</small
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
              >{{ EmployeeDetails.email }}</small
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
              >{{ EmployeeDetails.address.street }}</small
            >
            <br />
            <small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ EmployeeDetails.address.suburb }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ EmployeeDetails.address.city }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ EmployeeDetails.address.postalCode }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ EmployeeDetails.address.complex }}</small
            >
            <br /><small
              class="text-caption"
              :style="
                isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
              "
              >{{ EmployeeDetails.address.houseNumber }}</small
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
                  EmployeeDetails.preferred_Language ? EmployeeDetails.preferred_Language : 'None'
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
    EmployeeDetails: Array
  },
  data() {
    return {
      clientDialog: false
    }
  }
})
</script>
