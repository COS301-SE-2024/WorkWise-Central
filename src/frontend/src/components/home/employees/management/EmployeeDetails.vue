<template>
  <v-dialog v-model="clientDialog" max-width="500" height="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="secondary"
        variant="text"
        v-bind="activatorProps"
      >
        View
      </v-btn>
    </template>

    <v-card elevation="14" rounded="md" :max-width="500" :max-height="800">
      <v-card-title>Employee Details</v-card-title>
      <v-card-text>
        <v-col>
          <v-row>
            <v-col cols="6">
              <label> First Name</label><v-spacer></v-spacer
              ><small
                class="text-caption"
                :style="
                  isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
                "
                >{{ EmployeeDetails.firstName }}</small
              > </v-col
            ><v-col cols="6"
              ><label> Surname</label><v-spacer></v-spacer
              ><small
                class="text-caption"
                :style="
                  isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
                "
                >{{ EmployeeDetails.surname }}</small
              ></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <v-row
            ><v-col cols="6"
              ><label>Gender</label><v-spacer></v-spacer>
              <small
                class="text-caption"
                :style="
                  isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
                "
                >{{ EmployeeDetails.gender ? EmployeeDetails.gender : 'None' }}</small
              ></v-col
            ><v-col cols="6"
              ><label>Phone Number</label><v-spacer></v-spacer
              ><small
                class="text-caption"
                :style="
                  isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
                "
                >{{ EmployeeDetails.contactInfo.phoneNumber }}</small
              ></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <v-row
            ><v-col cols="6"
              ><label> Email</label><v-spacer></v-spacer
              ><small class="text-caption" :style="isdarkmode === true ? 'dark' : 'light'">{{
                EmployeeDetails.contactInfo.email
              }}</small></v-col
            ><v-col cols="6"
              ><label> Role </label><v-spacer></v-spacer
              ><small
                class="text-caption"
                :style="
                  isdarkmode === true ? colors.dark_theme_text_color : colors.light_theme_text_color
                "
                >{{ EmployeeDetails.roleName }}</small
              >
            </v-col></v-row
          >
          <v-divider></v-divider>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col>
          <v-btn color="error" width="100%" height="35" @click="close"> Close </v-btn>
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
    EmployeeDetails: Array
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
