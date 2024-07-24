<template>
  <v-dialog v-model="clientDialog" max-width="500" :theme="isdarkmode === true ? 'dark' : 'light'">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="success" v-bind="activatorProps">
        View <v-icon icon="fa:fa-solid fa-eye" end color="success" size="small"></v-icon>
      </v-btn>
    </template>

    <v-card :theme="isdarkmode === true ? 'themes.dark' : 'themes.light'">
      <v-card-title> Client Details </v-card-title>
      <v-card-text>
        <v-col>
          <v-row
            ><v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> First Name</label
              ><v-spacer></v-spacer
              ><small class="text-caption" style="font-size: 12px">{{
                clientDetails.firstName
              }}</small></v-col
            >
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> Surname</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{ clientDetails.lastName }}</small></v-col
            >
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px">Phone Number</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                clientDetails.contactInfo.phoneNumber
              }}</small></v-col
            >
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> Email</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{ clientDetails.contactInfo.email }}</small></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <label class="font-weight-light justify-center" style="font-size: 20px">
                Address</label
              ><v-spacer></v-spacer
              ><small class="text-caption">Street: {{ clientDetails.address.street }}</small>
              <br />
              <small class="text-caption">Suburb: {{ clientDetails.address.suburb }}</small>
            </v-col>
            <v-col cols="6">
              <br /><small class="text-caption">City: {{ clientDetails.address.city }}</small>
              <br /><small class="text-caption"
                >Postal Code: {{ clientDetails.address.postalCode }}</small
              >
              <br /><small class="text-caption"
                >Complex/Building: {{ clientDetails.address.complex }}</small
              >
              <br /><small class="text-caption">
                House Number: {{ clientDetails.address.houseNumber }}</small
              ></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-col
            ><label class="font-weight-light" style="font-size: 20px"> Preferred Languages</label
            ><v-spacer></v-spacer>
            <v-chip :color="clientDetails.preferred_Language ? 'success' : 'error'"
              ><small class="text-caption">{{
                clientDetails.preferred_Language ? clientDetails.preferred_Language : 'None'
              }}</small></v-chip
            ></v-col
          >
          <v-divider></v-divider>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col>
          <v-btn color="error" width="100%" height="35" @click="close">
            Close <v-icon icon="fa:fa-solid fa-cancel" end color="error" size="small"></v-icon>
          </v-btn> </v-col
      ></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    clientDetails: Array
  },
  data() {
    return {
      clientDialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    }
  }
})
</script>
