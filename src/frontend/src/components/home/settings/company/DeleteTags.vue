<template>
  <v-dialog
    v-model="deleteDialog"
    max-width="500px"
    :theme="isDarkMode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Delete Tag</span>
      </v-card-title>
      <v-card-text
        ><v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ tagName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container></v-card-text
      >

      <Toast position="top-center" />
      <v-card-actions>
        <v-container
          ><v-row justify="end"
            ><v-col cols="12" lg="6"
              ><Toast position="bottom-center" />
              <v-btn label="Cancel" color="secondary" @click="close" block
                ><v-icon icon="fa:fa-solid fa-cancel" start color="secondary" size="small"></v-icon
                >Cancel
              </v-btn></v-col
            >
            <v-col cols="12" lg="6">
              <v-btn label="Delete" color="error" :loading="isDeleting" block @click="deleteTag"
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
export default defineComponent({
  name: 'DeleteTags',
  props: {
    tagName: String,
    tagId: String
  },
  data() {
    return {
      deleteDialog: false,
      isDeleting: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    close() {
      this.deleteDialog = false
    },
    async deleteTag() {
      this.isDeleting = true // Indicate the start of the deletion process
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
      const apiURL = await this.getRequestUrl()
      await axios
        .delete(`${apiURL}job/tags`, config)
        .then(() => {
          this.isDeleting = true

          this.isDeleting = false
          this.deleteDialog = false
          this.$toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tag Deleted',
            life: 3000
          })

          setTimeout(() => {
            this.isDeleting = false
            this.deleteDialog = false
            window.location.reload()
          }, 1500)
        })
        .catch((err) => {
          console.error(err)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while deleting the tag',
            life: 3000
          })
        })
      this.isDeleting = true
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    }
  }
})
</script>
