<template>
  <v-dialog v-model="deleteDialog" max-width="500px" :opacity="0">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Delete Role</span>
      </v-card-title>
      <v-card-text
        ><v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ roleName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container></v-card-text
      >

      <Toast position="top-center" />
      <v-card-actions>
        <v-container
          ><v-row justify="end"
            ><v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn label="Cancel" color="secondary" @click="close" block
                ><v-icon icon="fa:fa-solid fa-cancel" color="secondary" size="small"></v-icon>Cancel
              </v-btn></v-col
            >
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn label="Delete" color="error" :loading="isDeleting" block @click="deleteRole"
                ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon
                >Delete
              </v-btn></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main'

export default defineComponent({
  name: 'DeleteStatus',
  props: {
    roleName: String,
    roleId: String
  },
  data() {
    return {
      deleteDialog: false,
      isDeleting: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false
    }
  },
  methods: {
    close() {
      this.deleteDialog = false
    },
    async deleteRole() {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          companyId: localStorage.getItem('currentCompany'),
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      try {
        const res = await axios.delete(`${API_URL}role/${this.roleId}`, config)
        if (res.status === 200) {
          console.log(res.data)
          this.isDeleting = true
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Role Deleted',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.deleteDialog = false
            this.$emit('DeletedRole', res.data.data)
          }, 1500)
          this.isDeleting = false
        }
      } catch (error) {
        console.error(error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred. Please try again',
          life: 3000
        })
        this.isDeleting = false
      }
    }
  }
})
</script>
