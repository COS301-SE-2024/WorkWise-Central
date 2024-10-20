<template>
  <v-app>
    <h2 :class="['splash-title', 'header-title', 'text-center']">
      Manage your business using <span class="text-primary">Work</span
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
          <v-img :src="isDarkMode ? item.imageUrlDark : item.imageUrl" height="50vh"></v-img>
        </v-col>

        <!-- Description Column (alternating sides) -->
        <v-col cols="12" md="6" :order="index % 2 === 0 ? 2 : 1">
          <v-card flat elevation="0" class="bg-background">
            <v-card-text class="large-text">{{ item.description }}</v-card-text>
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
          imageUrl: '../img/clientManagement.png',
          imageUrlDark: '../img/clientManagementDark.png',
          description: 'Effortlessly keep track of your clients.'
        },
        {
          imageUrl: '../img/clientPortalProgress.png',
          imageUrlDark: '../img/clientPortalProgress.png',
          description:
            'Give your clients access to a client portal, where they can keep track of the jobs they have with you.'
        },
        {
          imageUrl: '../img/customerFeedback.png',
          imageUrlDark: '../img/customerFeedback.png',
          description: 'Receive feedback from your clients to improve your services.'
        },
        {
          title: 'Employee Management',
          imageUrl: '../img/employeeManagement.png',
          imageUrlDark: '../img/employeeManagementDark.png',
          description: 'Manage your employees with ease.'
        },
        {
          imageUrl: '../img/teamManagement.png',
          imageUrlDark: '../img/teamManagementDark.png',
          description: 'Organize your teams, assign leaders, and manage collaborative efforts.'
        },
        {
          imageUrl: '../img/structure.png',
          imageUrlDark: '../img/structureDark.png',
          description: 'Effectively model your company structure.'
        },
        {
          title: 'Job Management',
          imageUrl: '../img/jobManagement.png',
          imageUrlDark: '../img/jobManagementDark.png',
          description: 'Keep your jobs on track with robust job management.'
        },
        {
          imageUrl: '../img/kanbanView.png',
          imageUrlDark: '../img/kanbanViewDark.png',
          description: 'Convenient ways to view your jobs.'
        },
        {
          imageUrl: '../img/jobCard.png',
          imageUrlDark: '../img/jobCardDark.png',
          description: 'Job card that allow your employees to record job details effectively.'
        },
        {
          title: 'Inventory Management',
          imageUrl: '../img/inventoryManagement.png',
          imageUrlDark: '../img/inventoryManagementDark.png',
          description: 'Inventory management has never been easier'
        },
        {
          imageUrl: '../img/stockTakes.png',
          imageUrlDark: '../img/stockTakesDark.png',
          description: 'Stock takes keep your inventory up to date.'
        },
        {
          imageUrl: '../img/stockMovements.png',
          imageUrlDark: '../img/stockMovementsDark.png',
          description: 'Keep track of were your stock was used and by who'
        },
        {
          title: 'Invoice Management',
          imageUrl: '../img/invoiceManagemnt.png',
          imageUrlDark: '../img/invoiceManagemntDark.png',
          description: 'Automatically generate invoices'
        },
        {
          imageUrl: '../img/clientPortal.png',
          imageUrlDark: '../img/clientPortalDark.png',
          description: 'Allow your clients to pay you directly from their client portal.'
        },
        {
          title: 'Company Management',
          imageUrl: '../img/rolesSettings.png',
          imageUrlDark: '../img/rolesSettingsDark.png',
          description:
            'With a flexible role based access, you have get to decide who can do what on the system.'
        },
        {
          imageUrl: '../img/structureEdit.png',
          imageUrlDark: '../img/structureEditDark.png',
          description: 'Edit the structure and any other details of your company'
        },
        {
          title: 'Communication tools',
          imageUrl: '../img/chats.png',
          imageUrlDark: '../img/chatsDark.png',
          description: 'Keep in touch with your employees and clients with our chat feature.'
        },
        {
          imageUrl: '../img/meetings.png',
          imageUrlDark: '../img/meetingsDark.png',
          description: 'Have quick easy video calls with your employees.'
        }
      ]
    }
  }
})
</script>
<style scoped>
.large-text {
  font-size: 30px; /* Adjust the size as needed */
}
</style>