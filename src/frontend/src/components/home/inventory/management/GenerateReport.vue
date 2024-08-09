<template>
  <v-dialog>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-file" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
  </v-dialog>
</template>
