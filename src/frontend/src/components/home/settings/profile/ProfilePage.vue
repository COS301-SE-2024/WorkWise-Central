<template>
  <v-container style="height: 300px" fluid>
    <v-row justify="center">
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn icon v-bind="activatorProps">
            <v-avatar color="brown" size="large">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
              <h3>John Doe</h3>
              <p class="text-caption mt-1">johndoe@icloud.com</p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> My Profile </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> Log Out </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false
  }),
  props: {
    user: Object
  }
}
</script>
