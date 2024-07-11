<template>
  <v-dialog v-model="clientDialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="secondary" v-bind="activatorProps"> View </v-btn>
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
                ClientDetails.firstName
              }}</small></v-col
            >
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> Surname</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{ ClientDetails.lastName }}</small></v-col
            >
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px">Phone Number</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                ClientDetails.contactInfo.phoneNumber
              }}</small></v-col
            >
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> Email</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{ ClientDetails.contactInfo.email }}</small></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> Address</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{ ClientDetails.address.street }}</small>
              <br />
              <small class="text-caption">{{ ClientDetails.address.suburb }}</small>
              <br /><small class="text-caption">{{ ClientDetails.address.city }}</small>
              <br /><small class="text-caption">{{ ClientDetails.address.postalCode }}</small>
              <br /><small class="text-caption">{{ ClientDetails.address.complex }}</small>
              <br /><small class="text-caption"
                >Unit: {{ ClientDetails.address.houseNumber }}</small
              ></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-col
            ><label class="font-weight-light" style="font-size: 20px"> Preferred Languages</label
            ><v-spacer></v-spacer>
            <v-chip :color="ClientDetails.preferred_Language ? 'success' : 'error'"
              ><small class="text-caption" :theme="isdarkmode === true ? 'dark' : 'light'">{{
                ClientDetails.preferred_Language ? ClientDetails.preferred_Language : 'None'
              }}</small></v-chip
            ></v-col
          >
          <v-divider></v-divider>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col>
          <v-btn color="error" width="100%" height="35" @click="close"> Close </v-btn>
        </v-col></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    ClientDetails: Array
  },
  data() {
    return {
      clientDialog: false,
      isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    }
  }
})
</script>
