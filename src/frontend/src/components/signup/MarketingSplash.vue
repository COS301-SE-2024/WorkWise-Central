<template>
  <v-app>
    <h2 :class="['splash-title', 'header-title', 'text-center']">
      Manage your business <span class="text-primary">effectively</span> and
      <span class="text-secondary">efficiently</span> using <span class="text-primary">Work</span
      ><span class="text-secondary">Wise</span> Central
    </h2>
    <v-spacer></v-spacer>
    
    <!-- Loop through tabs -->
    <div v-for="(item, index) in tabs" :key="index">
      
      <!-- Heading Row -->
      <v-row class="bg-background">
        <v-col cols="12">
          <v-card-title class="text-h4 text-center">{{ item.title }}</v-card-title>
        </v-col>
      </v-row>
      
      <!-- Image and Description Row -->
      <v-row class="bg-background align-center">
        <!-- Image Column (alternating sides) -->
        <v-col cols="12" md="6" :order="index % 2 === 0 ? 1 : 2">
          <v-img :src="isDarkMode ? item.imageUrlDark : item.imageUrl" height="500px"></v-img>
        </v-col>
        
        <!-- Description Column (alternating sides) -->
        <v-col cols="12" md="6" :order="index % 2 === 0 ? 2 : 1">
          <v-card flat elevation="0" class="bg-background">
            <v-card-text>{{ item.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
    </div>
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
        },{
          title: 'Fleet',
          icon: 'mdi-truck',
          imageUrl: '../img/FleetLightMode.png',
          imageUrlDark: '../img/FleetDarkMode.png',
          description: 'Manage your fleet of vehicles, track maintenance, and monitor fuel consumption.'
        }
      ]
    }
  }
})
</script>
