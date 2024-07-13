<template>
  <v-container :theme="isdarkmode === true ? 'dark' : 'light'">
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1>Company Settings</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="pl-15">
        <Menu :model="items" class="bg-secondary" :theme="isdarkmode === true ? 'dark' : 'light'">
          <template #item="{ item, props }">
            <router-link v-if="item.route" :to="item.route" custom>
              <a
                v-ripple
                :href="props.href"
                v-bind="props.action"
                @click="props.navigate"
                :class="{ active: $route.path === item.route }"
              >
                <span :class="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span :class="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </v-col>
      <v-col cols="8">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import Menu from 'primevue/menu'

export default defineComponent({
  name: 'CompanySettings',

  data() {
    return {
      companyDialog: false,
      isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false,
      items: [
        {
          icon: 'fa: fa-solid fa-building',
          label: 'Company Details',
          route: '/editCompany'
        },
        {
          icon: 'fa: fa-solid fa-person',
          label: 'Roles',
          route: '/editRoles'
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
    Menu
  },
  methods: {
    close() {
      this.companyDialog = false
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
