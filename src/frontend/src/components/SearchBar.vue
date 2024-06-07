<template>
  
    <v-text-field
      append-icon="mdi-magnify"
      rounded="xl"
      :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
      :label="text"
    ></v-text-field>

</template>

<script lang="ts">
export default {
  name: 'SearchBar',
  props: {
    isDarkMode: Boolean,
    text: String
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
