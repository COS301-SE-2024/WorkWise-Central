<template>
  <v-menu width="250px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-avatar color="secondary" style="width: 38px; height: 36px">
          <span class="text-h6">{{ user.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="secondary" style="width: 38px; height: 36px">
            <span class="text-h6">{{ user.initials }}</span>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>

          <router-link to="/userSettings" class="text-decoration-none">
            <v-btn variant="text"> <i class="fas fa-cog"></i> Settings </v-btn>
          </router-link>

          <v-divider class="my-3"></v-divider>

          <router-link to="/manageCompanies" class="text-decoration-none">
            <v-btn variant="text"> <i class="fas fa-building"></i> Manage Companies </v-btn>
          </router-link>

          <v-divider class="my-3"></v-divider>

          <router-link to="/tutorial" class="text-decoration-none">
            <v-btn variant="text"> <i class="fas fa-info-circle"></i> Tutorial </v-btn>
          </router-link>

          <v-divider class="my-3"></v-divider>

          <router-link to="/faq" class="text-decoration-none">
            <v-btn variant="text"> <i class="fas fa-question-circle"></i> FAQ </v-btn>
          </router-link>

          <v-divider class="my-3"></v-divider>

          <v-btn variant="text" @click="logout"> <i class="fas fa-sign-out-alt"></i> Logout </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'

const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com'
}

const router = useRouter()

const logout = () => {
  // Perform logout logic, then redirect to login page
  router.push('/')
}
</script>

<style></style>
