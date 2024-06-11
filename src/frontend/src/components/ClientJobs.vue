<template>
  <v-dialog v-model="clientDialog" max-width="500" height="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        variant="elevated"
        color="#5A82AF"
        v-bind="activatorProps"
      >
        View Jobs
      </v-btn>
    </template>

    <v-sheet
      elevation="14"
      rounded="xl"
      width="500"
      height="800"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">List of Jobs</h4>
        </v-col>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><small
              class="text-caption"
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >Type of Job</small
            ></v-col
          >
        </v-col>
        <v-col>
          <v-col
            ><small
              class="text-caption"
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >Surname</small
            ></v-col
          >
        </v-col>
        <v-col>
          <v-col
            ><small
              class="text-caption"
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >Phone Number</small
            ></v-col
          >
        </v-col>
        <v-col>
          <v-col
            ><small
              class="text-caption"
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >Email</small
            ></v-col
          >
        </v-col>
        <v-col>
          <v-col
            ><small
              class="text-caption"
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >Address</small
            ></v-col
          >
        </v-col>
        <v-col>
          <v-col
            ><small
              class="text-caption"
              :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >Preferred Languages</small
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
    colors: Array
  },
  data() {
    return {
      clientDialog: false
    }
  }
})
</script>
