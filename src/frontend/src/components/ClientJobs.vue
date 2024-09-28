<template>
  <v-dialog v-model="clientDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        variant="elevated"
        v-bind="activatorProps"
      >
        View Jobs
      </v-btn>
    </template>

    <v-sheet
      elevation="14"
      rounded="xl"
      width="500"
      height="auto"
      :color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-col>
        <v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">List of Jobs</h4>
        </v-col>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-col>
          <v-col
            ><label>Most Recent Job</label><v-spacer></v-spacer
            ><v-chip color="green"
              ><small
                class="text-caption"
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                >Plumbing</small
              ></v-chip
            >
            <v-chip color="green"
              ><small
                class="text-caption"
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                >Water Storage Installation
              </small></v-chip
            >
            <v-chip color="green"
              ><small
                class="text-caption"
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                >Drainage Repairs
              </small></v-chip
            >
          </v-col>
        </v-col>
        <v-col>
          <v-col
            ><label>Current Job in Progress</label><v-spacer></v-spacer>
            <v-chip color="red"
              ><small
                class="text-caption"
                :style="isDarkMode === true ? dark_theme_text_color : light_theme_text_color"
                >None</small
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
    isDarkMode: Boolean,
    colors: Array
  },
  data() {
    return {
      clientDialog: false
    }
  }
})
</script>
