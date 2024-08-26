<template>
  <v-dialog v-model="clientDialog" max-width="500" height="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="success"
        variant="text"
        v-bind="activatorProps"
      >
        <v-icon icon="fa:fa-solid fa-eye" start color="success" size="small"></v-icon> View
      </v-btn>
    </template>

    <v-card elevation="14" rounded="md" :max-width="500">
      <v-card-title>Employee Details</v-card-title>
      <v-card-text>
        <v-col>
          <v-row>
            <v-col cols="6">
              <label> First Name</label><v-spacer></v-spacer
              ><small class="text-caption">{{
                EmployeeDetails.firstName.charAt(0).toUpperCase() +
                EmployeeDetails.firstName.slice(1)
              }}</small> </v-col
            ><v-col cols="6"
              ><label> Surname</label><v-spacer></v-spacer
              ><small class="text-caption">{{
                EmployeeDetails.surname.charAt(0).toUpperCase() + EmployeeDetails.surname.slice(1)
              }}</small></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <v-row
            ><v-col cols="6"
              ><label>Gender</label><v-spacer></v-spacer>
              <small class="text-caption">{{
                EmployeeDetails.gender ? EmployeeDetails.gender : 'None'
              }}</small></v-col
            ><v-col cols="6"
              ><label>Phone Number</label><v-spacer></v-spacer
              ><small class="text-caption">{{
                EmployeeDetails.contactInfo.phoneNumber
              }}</small></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <v-row
            ><v-col cols="6"
              ><label> Email</label><v-spacer></v-spacer
              ><small class="text-caption">{{ EmployeeDetails.contactInfo.email }}</small></v-col
            ><v-col cols="6"
              ><label> Role </label><v-spacer></v-spacer
              ><small class="text-caption">{{ EmployeeDetails.roleName }}</small>
            </v-col></v-row
          >
          <v-divider></v-divider>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row
            ><v-col cols="12">
              <v-btn
                color="error"
                width="100%"
                height="35"
                @click="close"
                block
                :loading="isDeleting"
              >
                <v-icon icon="fa:fa-solid fa-cancel" color="error" start size="small"></v-icon>Close
              </v-btn>
            </v-col></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    EmployeeDetails: Array
  },
  data() {
    return {
      clientDialog: false,
      isDeleting: false
    }
  },
  methods: {
    close() {
      console.log('closing dialog:' + this.clientDialog)
      this.clientDialog = false
    }
  }
})
</script>
