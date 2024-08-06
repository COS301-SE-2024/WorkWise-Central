<template>
  <v-dialog
    v-model="deleteDialog"
    max-width="500px"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete</v-btn
      >
    </template>
    <v-card>
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
            ><v-col cols="12" lg="6"
              ><Toast position="bottom-center" />
              <v-btn label="Cancel" color="secondary" text @click="close" block
                ><v-icon icon="fa:fa-solid fa-cancel" start color="secondary" size="small"></v-icon
                >Cancel
              </v-btn></v-col
            >
            <v-col cols="12" lg="6">
              <v-btn
                label="Delete"
                color="error"
                text
                :loading="isDeleting"
                block
                @click="deleteRole"
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
export default defineComponent({
  name: 'DeleteStatus',
  props: {
    roleName: String
  },
  data() {
    return {
      deleteDialog: false,
      isDeleting: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false
    }
  },
  methods: {
    close() {
      this.deleteDialog = false
    },
    deleteRole() {
      this.isDeleting = true
      setTimeout(() => {
        this.isDeleting = false
        this.deleteDialog = false
        this.$toast.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tag Deleted',
          life: 3000
        })
      }, 1500)
    }
  }
})
</script>
