<template>
  <v-menu v-model="actionsDialog" max-width="500px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="secondary"
        variant="text"
        v-bind="activatorProps"
      >
        View <v-icon icon="fa:fa-solid fa-eye" end color="secondary" size="small"></v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 font-weight-regular bg-primary text-center">
        {{ selectedItemName + ' ' + selectedItemSurname }}
      </v-card-title>
      <v-card-text> What would you like to do with this client? </v-card-text>
      <v-list class="bg-cardColor">
        <v-list-item>
          <v-btn @click="actionsDialog = false" color="primary"
            >Close<v-icon
              icon="fa:fa-solid fa-cancel"
              end
              color="primary"
              size="small"
            ></v-icon></v-btn
        ></v-list-item>
        <v-spacer></v-spacer>
        <v-list-item><ClientDetails :colors="colors" :clientDetails="selectedItem" /></v-list-item>

        <v-list-item
          ><EditClient
            @update:item="selectedItem = $event"
            :editedItem="selectedItem"
            :_clientID="selectedItemId"
        /></v-list-item>

        <v-list-item>
          <DeleteClient
            :details="selectedItem"
            :client_id="selectedItemId"
            :client="selectedItem"
            :company_id="clientCompanyID"
        /></v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ClientDetails from './ClientDetails.vue'
import EditClient from './EditClient.vue'
import DeleteClient from './DeleteClient.vue'

export default defineComponent({
  name: 'ActionsMenu',
  components: {
    ClientDetails,
    EditClient,
    DeleteClient
  },
  props: {
    selectedItem: Object,
    selectedItemName: String,
    selectedItemSurname: String,
    selectedItemId: Number,
    clientCompanyID: String,
    colors: Object
  },
  data() {
    return {
      actionsDialog: false
    }
  }
})
</script>
