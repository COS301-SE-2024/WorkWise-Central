<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="success" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-eye" start color="success" size="small"></v-icon>View</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <v-icon>mdi-plus</v-icon>
        <span>Inventory Details</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <label class="font-weight-light" style="font-size: 20px"> Product Name</label
            ><v-spacer></v-spacer
            ><small class="text-caption" style="font-size: 12px">{{ inventoryItem.name }}</small>
          </v-col>
          <v-col cols="4">
            <label class="font-weight-light" style="font-size: 20px"> Description</label
            ><v-spacer></v-spacer
            ><small class="text-caption" style="font-size: 12px">{{
              inventoryItem.description
            }}</small>
          </v-col>
          <v-col cols="4">
            <label class="font-weight-light" style="font-size: 20px"> Cost Price</label
            ><v-spacer></v-spacer
            ><small class="text-caption" style="font-size: 12px">{{
              inventoryItem.costPrice
            }}</small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Reorder Level</label
            ><v-spacer></v-spacer
            ><small class="text-caption" style="font-size: 12px">{{
              inventoryItem.reorderLevel
            }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Current Stock Level</label
            ><v-spacer></v-spacer
            ><small class="text-caption" style="font-size: 12px">{{
              inventoryItem.currentStockLevel
            }}</small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Date Added</label
            ><v-spacer></v-spacer
            ><small class="text-caption" style="font-size: 12px">{{
              inventoryItem.createdAt
            }}</small>
          </v-col>
          <v-col cols="6">
            <label class="font-weight-light" style="font-size: 20px"> Updated Date</label
            ><v-spacer></v-spacer
            ><small class="text-caption" style="font-size: 12px">{{
              inventoryItem.updatedAt
            }}</small>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-container
          ><v-row
            ><Toast position="top-center" />
            <v-col cols="12">
              <v-btn label="Close" color="error" text @click="close" block
                ><v-icon icon="fa:fa-solid fa-cancel" start color="error" size="small"></v-icon
                >Close</v-btn
              ></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'

export default defineComponent({
  name: 'InventoryDetails',
  props: {
    inventoryItem: Object
  },
  components: {
    Toast
  },
  data() {
    return {
      dialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false
    }
  },
  methods: {
    addInventory() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Inventory Added',
        life: 3000
      })
    },
    close() {
      this.dialog = false
    }
  }
})
</script>
