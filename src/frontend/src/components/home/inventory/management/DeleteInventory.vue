<template>
  <v-dialog
    v-model="deleteDialog"
    max-width="500px"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="error" v-bind="activatorProps"
        >Delete<v-icon icon="fa:fa-solid fa-trash" end color="error" size="small"></v-icon
      ></v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Delete Inventory</span>
      </v-card-title>
      <v-card-text
        ><v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete <strong>{{ inventoryName }}</strong
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
                >Cancel
                <v-icon
                  icon="fa:fa-solid fa-cancel"
                  end
                  color="secondary"
                  size="small"
                ></v-icon></v-btn
            ></v-col>
            <v-col cols="12" lg="6">
              <v-btn
                label="Delete"
                color="error"
                text
                :loading="isDeleting"
                block
                @click="deleteInventory"
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
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import axios from 'axios'
export default defineComponent({
  name: 'DeleteInventory',
  props: {
    inventory_id: String,
    inventoryName: String
  },
  components: {
    Toast
  },
  data: () => ({
    deleteDialog: false,
    clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
    isDeleting: false,
    isdarkmode: localStorage.getItem('isdarkmode') === 'true' ? true : false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF'
  }),
  methods: {
    async deleteInventory() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      await axios
        .delete(`${apiURL}inventory/${this.inventory_id}`, config)
        .then(() => {
          alert('Inventory deleted')
          this.deleteDialog = false
        })
        .catch(() => {
          alert('An error occurred')
        })
        .finally(() => {
          window.location.reload() // Consider removing this for SPA behavior
        })
    },
    close() {
      this.deleteDialog = false
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status >= 200 && res.status < 300
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  }
})
</script>