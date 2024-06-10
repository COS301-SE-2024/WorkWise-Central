<template>
  <v-dialog v-model="clientDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Client</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.jobRequired" label="Job Required"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditClient',
  props: {
    opened: Boolean,
    editedItem: Array
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
