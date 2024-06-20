<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Profile
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Profile Details
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="First Name" readonly value="John"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Last Name" readonly value="Doe"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" readonly value="john.doe@example.com"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Phone Number" readonly value="+1234567890"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
      };
    },
  };
  </script>