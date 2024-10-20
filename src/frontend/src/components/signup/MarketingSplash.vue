<template>
  <v-app>
    <h2 :class="['splash-title', 'header-title', 'text-center']">
      Manage your using <span class="text-primary">Work</span
      ><span class="text-secondary">Wise</span> Central
    </h2>

    <!-- New description underneath the main heading -->
    <v-row>
      <v-col cols="12">
        <p class="text-center" style="margin-bottom: 24px">
          WorkWise Central provides the essential tools and resources to streamline your business
          operations. Tailored for service delivery businesses, it offers everything from task
          management to invoicing, making running your business easier than ever.
        </p>
        <p class="text-center" style="margin-bottom: 0">
          Sign up today and discover how WorkWise can help you work smarter, not harder.
        </p>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>

    <!-- Loop through tabs -->
    <div v-for="(item, index) in tabs" :key="index">
      <!-- Heading Row with extra margin -->
      <v-row class="bg-background" style="margin-top: 32px" v-if="item.title">
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
          icon: 'mdi-briefcase',
          imageUrl: '../img/clientPortal.png',
          imageUrlDark: '../img/clientPortal.png',
          description: 'Give your clients access to a client portal, where they can keep track of the jobs they have with'
        },
        {
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
          icon: 'mdi-account-multiple',
          imageUrl: '../img/teamManagement.png',
          imageUrlDark: '../img/teamManagementDark.png',
          description: 'Organize your teams, assign leaders, and manage collaborative efforts.'
        },
        {
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          title: 'Job Management',
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          title: 'Inventory Management',
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          title: 'Invoice Management',
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          title: 'Company Management',
          icon: 'mdi-domain',
          imageUrl: '../img/companyManagement.png',
          imageUrlDark: '../img/companyManagementDark.png',
          description: 'Manage your company structure, roles, and priorities with ease.'
        },
        {
          title: 'Communication tools',
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        },
        {
          icon: 'mdi-briefcase',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your projects on track with our robust project management tools.'
        }
      ]
    }
  }
})
</script>
