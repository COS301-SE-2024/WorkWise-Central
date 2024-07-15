<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center"> Edit Roles </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          item-value="role"
          class="bg-cardColor elevation-1"
          :row-props="getRowProps"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Roles and Permissions</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:[`item.roleName`]="{ item }">
            <v-chip variant="elevated" color="elementTextColor">{{ item }}</v-chip>
          </template>
          <template v-slot:[`item.permission`]="{ item }">
            <v-select
              v-model="item.permission"
              :items="permissions"
              label="Permissions"
              chips
              multiple
            ></v-select>
          </template>
        </v-data-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <Toast />
        <v-col align="center"> <v-btn color="success" @click="saveChanges"> Save </v-btn></v-col>
        <Toast />
        <v-col align="center"><v-btn color="error" @click="cancel"> Cancel </v-btn></v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'

export default defineComponent({
  props: {
    Company: Object,
    userDetails: Object
  },
  components: {
    Toast
  },
  data: () => ({
    dialog: false,
    items: [],
    roleIds: [],
    roleNames: [],
    permissions: ['Read', 'Write', 'Delete', 'Update'],
    headers: [
      { text: 'Role Name', value: 'roleName' },
      { text: 'Permissions', value: 'permission' }
    ]
  }),
  methods: {
    getRowProps(row) {
      return {
        'data-test': 'role-row'
      }
    },
    saveChanges() {
      this.items.forEach((item) => {
        const role = {
          roleName: item.roleName,
          permission: item.permission
        }
        axios
          .put(`http://localhost:3000/roles/${item.roleId}`, role)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  },
  created() {
    axios
      .get('http://localhost:3000/roles')
      .then((response) => {
        this.items = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
})
</script>
