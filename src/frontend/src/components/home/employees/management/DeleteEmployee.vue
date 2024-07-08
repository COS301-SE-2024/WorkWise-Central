<template>
  <v-dialog v-model="clientDialog" max-width="500px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="error"
        variant="text"
        v-bind="activatorProps"
        >Delete</v-btn
      >
    </template>
    <v-card :color="isdarkmode === true ? 'dark' : 'light'">
      <v-card-title>
        <span class="headline">Delete {{ details.firstName + ' ' + details.surname }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p>
              Are you sure you want to delete
              <strong>{{ details.firstName + ' ' + details.surname }}</strong> as an employee of
              this company?
            </p>
            <strong> This action cannot be reversed. </strong>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-2" variant="text" :loading="isDeleting" @click="deleteEmployee"
          >Delete</v-btn
        >
        <v-btn color="grey darken-1" variant="text" @click="clientDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  name: 'DeleteClient',
  props: {
    details: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      clientDialog: false,
      isDeleting: false,
      isdarkmode: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    },
    async deleteEmployee() {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      axios
        .delete(apiURL + 'employee/' + this.details.employeeId, config)
        .then((response) => {
          console.log(response)
          alert('Employee deleted')
          this.isDeleting = false
          this.clientDialog = false
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
          alert('Error deleting client')
        })
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  }
}
</script>
