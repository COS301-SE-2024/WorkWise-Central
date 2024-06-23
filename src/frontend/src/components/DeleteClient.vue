<template>
  <v-dialog v-model="clientDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Delete Client</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p>
              Are you sure you want to delete <strong>{{ clientName }}</strong
              >? This action cannot be reversed.
            </p>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="clientDialog = false">Cancel</v-btn>
        <v-btn color="red darken-2" text :loading="isDeleting" @click="deleteClient">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DeleteClient',
  props: {
    opened: Boolean,
    client_id: Number
  },
  data() {
    return {
      clientDialog: false,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    },
    async deleteClient() {
      this.isDeleting = true // Indicate the start of the deletion process
      axios
        .delete(`http://localhost:3000/client/`, { id: this.client_id })
        .then((response) => {
          console.log(response)
          alert('Client deleted')
          this.clientDialog = false
          this.$emit('clientDeleted')
          // Consider using a more SPA-friendly way of updating the view instead of reloading
        })
        .catch((error) => {
          console.log(error)
          alert('Error deleting client')
        })
        .finally(() => {
          this.isDeleting = false // Reset the deletion indicator
          window.location.reload() // Consider removing this for SPA behavior
        })
    }
  }
}
</script>
