<template>
  <v-app :style="isDarkMode === true ? 'dark' : 'light'">
    <v-container fluid fill-height>
      <v-row class="justify-center align-center">
        <v-col cols="12" class="text-center">
          <h1 class="text-xl font-semibold">Company Settings</h1>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8" order="last" order-lg="first">
          <EditCompany v-if="currentSettings === 'Company Details'" />
          <EditStructure v-if="currentSettings === 'Structure'" />
          <EditRoles v-if="currentSettings === 'Roles'" />
          <EditPriority v-if="currentSettings === 'Priority'" />
          <EditTags v-if="currentSettings === 'Tags'" />
          <EditStatus v-if="currentSettings === 'Status'" />
          <HourlyRate v-if="currentSettings === 'Hourly Rate'" />
          <SetupPaymentGateway v-if="currentSettings === 'Setup Payment Gateway'" />
        </v-col>
        <v-col cols="12" lg="4" order="first" order-lg="last">
          <v-card class="elevation-0"
            ><v-list class="bg-cardColor">
              <v-list-item-group>
                <template v-for="(item, i) in items" :key="i">
                  <v-list-item
                    @click="selectSettings(item.label)"
                    :class="{ 'bg-secondary': currentSettings === item.label }"
                  >
                    <template v-slot:prepend>
                      <v-list-item-icon>
                        <v-icon :icon="item.icon" color="primary"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.label }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group></v-list
            ></v-card
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import EditCompany from './EditCompany.vue'
import EditRoles from './EditRoles.vue'
import EditStructure from './EditStructure.vue'
import EditPriority from './EditPriority.vue'
import EditTags from './EditTags.vue'
import EditStatus from './EditStatus.vue'
import HourlyRate from './HourlyRate.vue'
import SetupPaymentGateway from '../company/SetupPaymentGateway.vue'

export default defineComponent({
  name: 'CompanySettings',

  data() {
    return {
      companyDialog: false,
      currentSettings: sessionStorage.getItem('currentSettings') || 'Company Details',
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      items: [
        {
          icon: 'fa: fa-solid fa-building',
          label: 'Company Details',
          route: '/companySettingsView/editCompany'
        },
        {
          icon: 'fa: fa-solid fa-folder-tree',
          label: 'Structure',
          route: '/editStructure'
        },
        {
          icon: 'fa: fa-solid fa-person',
          label: 'Roles',
          route: '/companySettingsView/editRoles'
        },

        {
          icon: 'fa: fa-solid fa-exclamation-circle',
          label: 'Priority',
          route: '/edit-priority'
        },
        {
          icon: 'fa: fa-solid fa-tags',
          label: 'Tags',
          route: '/edit-tags'
        },
        {
          icon: 'fa: fa-solid fa-check-circle',
          label: 'Status',
          route: '/edit-status'
        },
        {
          icon: 'fa: fa-solid fa-dollar-sign',
          label: 'Hourly Rate',
          route: '/hourly-rate'
        },
        {
          icon: 'fa: fa-solid fa-cash-register',
          label: 'Setup Payment Gateway',
          route: '/companySettingsView/setup-payment-gateway'
        }
      ]
    }
  },
  components: {
    EditCompany,
    EditRoles,
    EditPriority,
    EditTags,
    EditStructure,
    EditStatus,
    HourlyRate,
    SetupPaymentGateway
  },
  methods: {
    close() {
      this.companyDialog = false
    },
    selectSettings(name: string) {
      if (name === 'Company Details') {
        this.currentSettings = 'Company Details'
        sessionStorage.setItem('currentSettings', 'Company Details')
      } else if (name === 'Roles') {
        this.currentSettings = 'Roles'
        sessionStorage.setItem('currentSettings', 'Roles')
      } else if (name === 'Structure') {
        this.currentSettings = 'Structure'
        sessionStorage.setItem('currentSettings', 'Structure')
      } else if (name === 'Priority') {
        this.currentSettings = 'Priority'
        sessionStorage.setItem('currentSettings', 'Priority')
      } else if (name === 'Tags') {
        this.currentSettings = 'Tags'
        sessionStorage.setItem('currentSettings', 'Tags')
      } else if (name === 'Status') {
        this.currentSettings = 'Status'
        sessionStorage.setItem('currentSettings', 'Status')
      } else if (name === 'Hourly Rate') {
        this.currentSettings = 'Hourly Rate'
        sessionStorage.setItem('currentSettings', 'Hourly Rate')
      } else if (name === 'Setup Payment Gateway') {
        this.currentSettings = 'Setup Payment Gateway'
        sessionStorage.setItem('currentSettings', 'Setup Payment Gateway')
      }
    }
  }
})
</script>

<style scoped>
.active {
  background-color: #f0f0f0;
  color: #000;
}
</style>
