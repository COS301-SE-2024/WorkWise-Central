<template>
  <v-card height="300px" flat>
    <v-text-field
      prepend-icon="mdi-magnify"
      rounded="xl"
      :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
    ></v-text-field>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'SearchBar',
  props: {
    isDarkMode: Boolean
  },
  data() {
    return {
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF'
    }
  },
  components: {}
}
</script>
