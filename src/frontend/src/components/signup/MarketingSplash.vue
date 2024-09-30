<template>
  <v-app>
    <h2 :class="['splash-title', 'header-title', 'text-center']">
      Manage your business <span class="text-primary">effectively</span> and
      <span class="text-secondary">efficiently</span> using <span class="text-primary">Work</span
      ><span class="text-secondary">Wise</span> Central
    </h2>
    <v-spacer></v-spacer>
    <v-row style="height: 500px" class="bg-background">
      <v-col cols="12" order="first" order-lg="last" order-md="last" order-sm="first">
        <v-tabs v-model="tab" align-tabs="center" bg-color="secondary" stacked>
          <v-tab v-for="(item, index) in tabs" :key="index">
            {{ item.title }}
            <v-icon :icon="item.icon" color="primary"></v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="(item, index) in tabs" :key="index" :value="index">
            <v-card flat class="bg-background">
              <v-img :src="isDarkMode ? item.imageUrlDark : item.imageUrl" height="500px"></v-img>
              <v-card-text>{{ item.description }}</v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MarketingSplash',
  data() {
    return {
      tab: 0,
      isDarkMode: localStorage.getItem('theme') === 'true',
      tabs: [
        {
          title: 'Client Management',
          icon: 'mdi-account-group',
          imageUrl: '../img/clientManagement.png',
          imageUrlDark: '../img/clientManagementDark.png',
          description:
            'Manage your clients efficiently, track interactions, and ensure client satisfaction.'
        },
        {
          title: 'Project Management',
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          title: 'Employee Management',
          icon: 'mdi-account',
          imageUrl: '../img/employeeManagement.png',
          imageUrlDark: '../img/employeeManagementDark.png',
          description: 'Oversee employee performance, assignments, and roles within the company.'
        },
        {
          title: 'Team Management',
          icon: 'mdi-account-multiple',
          imageUrl: '../img/teamManagement.png',
          imageUrlDark: '../img/teamManagementDark.png',
          description: 'Organize your teams, assign leaders, and manage collaborative efforts.'
        },
        {
          title: 'Company Management',
          icon: 'mdi-domain',
          imageUrl: '../img/companyManagement.png',
          imageUrlDark: '../img/companyManagementDark.png',
          description: 'Manage your company structure, roles, and priorities with ease.'
        },
        {
          title: 'Operations',
          icon: 'mdi-cogs',
          imageUrl: '../img/meetings.png',
          imageUrlDark: '../img/meetingsDark.png',
          description: 'Streamline your day-to-day operations with efficient tools and workflows.'
        },
        {
          title: 'Client Projects',
          icon: 'mdi-folder',
          imageUrl: '../img/clientProjects.png',
          imageUrlDark: '../img/clientProjectsDark.png',
          description: 'Manage client-specific projects, from inception to completion, with ease.'
        }
      ]
    }
  }
})
</script>
