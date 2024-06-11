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
        <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="red darken-2" text :loading="isDeleting" @click="deleteClient">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteClient',
  props: {
    opened: Boolean
  },
  data() {
    return {
      clientDialog: this.opened,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false
    }
  },
  methods: {
    close() {
      this.clientDialog = false
      this.$emit('updated_opened', false)
    }
    // async deleteClient() {
    //   this.isDeleting = true
    //   try {
    //     // Your delete logic here, e.g., an API call
    //     await this.deleteClientApi(this.clientName)
    //     this.$emit('clientDeleted')
    //     this.close()
    //   } catch (error) {
    //     console.error('Failed to delete client:', error)
    //     // Handle error, e.g., show a notification
    //   } finally {
    //     this.isDeleting = false
    //   }
    // }
  }
}
</script>
