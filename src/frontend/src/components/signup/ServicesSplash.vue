<template>
  <v-app>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h1
            :class="[
              'splash-title',
              'header-title',
              { 'dark-theme-text': isDarkMode, 'light-theme-text': !isDarkMode }
            ]"
          >
            What <span class="text-primary">services</span> would you like to
            <span class="text-secondary">manage</span>
          </h1>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-10" height="500px">
        <v-col cols="12" md="8">
          <v-sheet class="bg-cardColor mx-auto" elevation="2" rounded="lg" bo>
            <v-slide-group
              v-model="model"
              show-arrows
              center-active
              class="pa-4"
              style="overflow: hidden"
            >
              <v-slide-group-item
                v-for="(service, index) in services"
                :key="index"
                class="service-item"
                v-ripple
              >
                <v-card max-width="500px" class="mx-auto bg-cardColor ma-2" elevation="3">
                  <v-img :src="service.image" height="200px" class="rounded-t-lg"></v-img>
                  <v-card-title class="headline">{{ service.title }}</v-card-title>
                  <v-card-subtitle class="bg-cardColor">{{ service.subtitle }}</v-card-subtitle>
                  <v-card-text>{{ service.description }}</v-card-text>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ServicesSplash',
  data() {
    return {
      model: 0,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      services: [
        {
          title: 'Client Management',
          subtitle: 'Streamline your client interactions',
          description: 'Manage clients efficiently, track interactions, and ensure satisfaction.',
          image: 'https://example.com/client-management.jpg'
        },
        {
          title: 'Project Management',
          subtitle: 'Keep your projects on track',
          description:
            'Utilize robust tools to manage your projects effectively and meet deadlines.',
          image: 'https://example.com/project-management.jpg'
        },
        {
          title: 'Employee Management',
          subtitle: 'Enhance employee productivity',
          description: 'Monitor performance, track progress, and ensure employee well-being.',
          image: 'https://example.com/employee-management.jpg'
        },
        {
          title: 'Employee Management',
          subtitle: 'Enhance employee productivity',
          description: 'Monitor performance, track progress, and ensure employee well-being.',
          image: 'https://example.com/employee-management.jpg'
        },
        {
          title: 'Team Management',
          subtitle: 'Build and manage strong teams',
          description: 'Organize your teams, assign roles, and track team performance.',
          image: 'https://example.com/team-management.jpg'
        },
        {
          title: 'Operations Management',
          subtitle: 'Optimize your operations',
          description: 'Streamline your business processes and improve efficiency.',
          image: 'https://example.com/operations-management.jpg'
        },
        {
          title: 'Client Projects',
          subtitle: 'Deliver exceptional client projects',
          description:
            'Manage client projects from start to finish, ensuring timely and quality delivery.',
          image: 'https://example.com/client-projects.jpg'
        }
      ]
    }
  }
})
</script>

<style scoped>
.light-theme-text {
  color: rgb(0, 0, 0);
  opacity: 65%;
}

.dark-theme-text {
  color: #dcdbdb;
}

.modal-dark-theme {
  background-color: #2b2b2b;
}

.modal-light-theme {
  background-color: #ffffff;
}
.header-title {
  font-size: 40px;
  font: 'Lato';
}
.fill-height {
  height: 100%;
}

.button-width {
  width: 400px;
}

.button-height {
  height: 80px;
}

.colorAccent {
  color: #6a99ce;
}
.colorAccent2 {
  color: #879898;
}
.text-start {
  text-align: start;
}
.splash-image {
  width: 140%;
  height: 100%;
  align-content: end;
}

.grad-class {
  background: #3a7bd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3a6073, #3a7bd5); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3a6073,
    #3a7bd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
