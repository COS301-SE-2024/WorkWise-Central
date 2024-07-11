<template>
  <v-menu
      min-width="200px"
      rounded
  >
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
      >
        <v-avatar
            color="secondary"
            size="medium"
        >
          <span class="text-h5">{{ user.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar
              color="brown"
          >
            <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>

          <v-btn variant="text">
            <i class="fas fa-cog"></i> Settings
          </v-btn>

          <v-divider class="my-3"></v-divider>

          <v-btn variant="text">
            <i class="fas fa-info-circle"></i> Tutorial
          </v-btn>

          <v-divider class="my-3"></v-divider>

          <v-btn variant="text">
            <i class="fas fa-question-circle"></i> FAQ
          </v-btn>

          <v-divider class="my-3"></v-divider>

          <v-btn variant="text">
            <i class="fas fa-sign-out-alt"></i> Logout
          </v-btn>

        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com'
};
</script>