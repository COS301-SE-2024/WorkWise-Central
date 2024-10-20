<template>
 <v-dialog persistent v-model="clientDialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn color="success" v-bind="activatorProps">
        <v-icon icon="fa:fa-solid fa-eye" start color="success" size="small"></v-icon> View
      </v-btn>
    </template>

    <v-card class="bg-cardColor">
      <v-card-title> Client Details </v-card-title>
      <v-card-text>
        <v-col>
          <v-row
            ><v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> First Name</label
              ><v-spacer></v-spacer
              ><small class="text-caption" style="font-size: 12px">{{
                clientDetails.firstName ? clientDetails.firstName : ''
              }}</small></v-col
            >
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> Surname</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                clientDetails.lastName ? clientDetails.lastName : ''
              }}</small></v-col
            >
          </v-row>

          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px">Phone Number</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                clientDetails.contactInfo.phoneNumber ? clientDetails.contactInfo.phoneNumber : ''
              }}</small></v-col
            >
            <v-col cols="6">
              <label class="font-weight-light" style="font-size: 20px"> Email</label
              ><v-spacer></v-spacer
              ><small class="text-caption">{{
                clientDetails.contactInfo.email ? clientDetails.contactInfo.email : ''
              }}</small></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <label class="font-weight-light justify-center" style="font-size: 20px">
                Address</label
              ><v-spacer></v-spacer
              ><small class="text-caption"
                >Street:
                {{ clientDetails.address.street ? clientDetails.address.street : '' }}</small
              >
              <br />
              <small class="text-caption"
                >Suburb:
                {{ clientDetails.address.suburb ? clientDetails.address.suburb : '' }}</small
              >
            </v-col>
            <v-col cols="6">
              <br /><small class="text-caption"
                >City: {{ clientDetails.address.city ? clientDetails.address.city : '' }}</small
              >
              <br /><small class="text-caption"
                >Postal Code:
                {{
                  clientDetails.address.postalCode ? clientDetails.address.postalCode : ''
                }}</small
              >
              <br /><small class="text-caption"
                >Complex/Building:
                {{ clientDetails.address.complex ? clientDetails.address.complexOrBuilding : '' }}</small
              >
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-col
            ><label class="font-weight-light" style="font-size: 20px"> Preferred Languages</label
            ><v-spacer></v-spacer>
            <v-chip :color="clientDetails.preferredLanguage ? 'success' : 'error'"
              ><small class="text-caption">{{
                clientDetails.preferredLanguagea ? clientDetails.preferredLanguage : 'None'
              }}</small></v-chip
            ></v-col
          >
          <v-divider></v-divider>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-col>
          <v-btn color="error" width="100%" height="35" @click="close">
            <v-icon icon="fa:fa-solid fa-cancel" color="error" start size="small"></v-icon> Close
          </v-btn>
        </v-col></v-card-actions
      >
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
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      localClientDetails: this.deepCopy(this.clientDetails)
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    },
    checkIfNull(value) {
      if (value === null) {
        return 'None'
      } else {
        return value
      }
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  },
  mounted(){
    console.log(this.localClientDetails)
  }
})
</script>
