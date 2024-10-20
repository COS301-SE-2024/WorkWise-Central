<template>
 <v-dialog persistent v-model="deleteDialog" max-width="500px" :opacity="0">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular hello"
        color="error"
        v-bind="activatorProps"
        :disabled="Disabled"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Delete Priority</span>
      </v-card-title>
      <v-card-text
        ><v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ pritorityName }}</strong
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
              <v-btn
                label="Delete"
                color="error"
                :loading="isDeleting"
                block
                @click="deletePriority"
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
  name: 'DeleteTags',
  props: {
    pritorityName: String,
    tagId: String,
    Disabled: Boolean
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
    async deletePriority() {
      this.isDeleting = true
      console.log(this.tagId)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          tagId: this.tagId,
          companyId: localStorage.getItem('currentCompany')
        }
      }
      axios
        .delete(`${API_URL}job/tags/p`, config)
        .then((response) => {
          this.isDeleting = true
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Priority Deleted',
            life: 3000
          })
          setTimeout(() => {
            this.deleteDialog = false
            this.isDeleting = false
            this.$emit('DeletedPriority', response.data.data)
          }, 3000)
        })
        .catch((err) => {
          console.error(err)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred',
            life: 3000
          })
          this.deleteDialog = false
        })
    }
  }
})
</script>
