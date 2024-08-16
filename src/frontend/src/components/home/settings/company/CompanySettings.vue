<template>
  <v-container :theme="isdarkmode === true ? 'dark' : 'light'">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import EditCompany from './EditCompany.vue'
import EditRoles from './EditRoles.vue'
import EditStructure from './EditStructure.vue'
import EditPriority from './EditPriority.vue'
import EditTags from './EditTags.vue'
import EditStatus from './EditStatus.vue'

export default defineComponent({
  name: 'CompanySettings',

  data() {
    return {
      companyDialog: false,
      currentSettings: 'Company Details',
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
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
  },
  methods: {
    close() {
      this.companyDialog = false
    },
    selectSettings(name: string) {
      if (name === 'Company Details') {
        this.currentSettings = 'Company Details'
      } else if (name === 'Roles') {
        this.currentSettings = 'Roles'
      } else if (name === 'Structure') {
        this.currentSettings = 'Structure'
      } else if (name === 'Priority') {
        this.currentSettings = 'Priority'
      } else if (name === 'Tags') {
        this.currentSettings = 'Tags'
      } else if (name === 'Status') {
        this.currentSettings = 'Status'
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
