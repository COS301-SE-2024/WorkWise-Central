<template>
  <v-dialog
    v-model="clientDialog"
    max-width="500px"
    :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="error" v-bind="activatorProps"
        >Delete <v-icon icon="fa:fa-solid fa-trash" end color="error" size="small"></v-icon
      ></v-btn>
    </template>
    <v-card :theme="isdarkmode === true ? 'dark' : 'light'">
      <v-card-title> Delete {{ client.name + ' ' + client.surname }} </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ clientName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container
          ><v-row justify="end">
            <v-col cols="12" lg="6">
              <Toast position="bottom-center" />
              <v-btn label="Cancel" color="secondary" text @click="clientDialog = false" block
                >Cancel
                <v-icon
                  icon="fa:fa-solid fa-cancel"
                  end
                  color="secondary"
                  size="small"
                ></v-icon></v-btn></v-col
            ><v-col cols="12" lg="6">
              <v-btn
                label="Delete"
                color="error"
                text
                :loading="isDeleting"
                @click="deleteClient"
                block
                >Delete
                <v-icon
                  icon="fa:fa-solid fa-trash"
                  end
                  color="error"
                  size="small"
                ></v-icon></v-btn></v-col></v-row
        ></v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import Toast from 'primevue/toast'
export default {
  name: 'DeleteClient',
  props: {
    opened: Boolean,
    client_id: Number,
    companyID: String,
    client: Object
  },
  components: { Toast },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      clientDialog: false,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF'
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    },
    Delete() {
      alert('Client deleted')
      window.location.reload() // Consider removing this for SPA behavior
    },
    async deleteClient() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const apiURL = await this.getRequestUrl()
        console.log(this.client_id)
        this.isDeleting = true // Indicate the start of the deletion process

        const response = await axios.delete(`${apiURL}client/delete/${this.client_id}`, config)
        console.log(response)

        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Client deleted successfully',
          life: 3000
        })

        this.clientDialog = false
        this.$emit('clientDeleted')
        // Consider using a more SPA-friendly way of updating the view instead of reloading
      } catch (error) {
        console.error('Error deleting client:', error)

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while deleting the client',
          life: 3000
        })
      } finally {
        this.isDeleting = false // Reset the deletion indicator
        // window.location.reload(); // Consider removing this for SPA behavior
      }
    },
    async isLocalAvailable(localUrl) {
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
