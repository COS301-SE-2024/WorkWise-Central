<template>
  <v-dialog
    v-model="dialog"
    max-height="800"
    max-width="600"
    :theme="isdarkmode ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
          variant="outlined"
        color="primary"
        v-bind="activatorProps"
      >
        <v-icon icon="fa: fa-solid fa-check-circle" color="primary"></v-icon>
        Create Status
      </v-btn>
    </template>
    <v-card>
      <v-card-title> Create new Status</v-card-title>
      <v-card-text>
        <v-form></v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      dialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false
    }
  }
})
</script>
