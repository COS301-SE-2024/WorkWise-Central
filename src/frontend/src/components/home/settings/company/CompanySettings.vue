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
        <EditRoles v-if="currentSettings === 'Roles'" />
        <EditStructure v-if="currentSettings === 'Structure'" />
      </v-col>

      <v-col cols="12" lg="4" order="first" order-lg="last">
        <AppMenu
          :model="items"
          class="bg-cardColor text-primary"
          :theme="isdarkmode === true ? 'dark' : 'light'"
        >
          <template #item="{ item, props }">
            <router-link v-if="item.route" :to="item.route" custom>
              <a
                v-ripple
                :href="props.href"
                v-bind="props.action"
                @click="selectSettings(item.label)"
              >
                <span :class="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <v-icon :icon="item.icon"></v-icon>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </a>
          </template>
        </AppMenu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppMenu from 'primevue/menu'
import EditCompany from './EditCompany.vue'
import EditRoles from './EditRoles.vue'
import EditStructure from './EditStructure.vue'

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
          icon: 'fa: fa-solid fa-person',
          label: 'Roles',
          route: '/companySettingsView/editRoles'
        },
        {
          icon: 'fa: fa-solid fa-folder-tree',
          label: 'Structure',
          route: '/editStructure'
        }
      ]
    }
  },
  components: {
    AppMenu,
    EditCompany,
    EditRoles,
    EditStructure
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
