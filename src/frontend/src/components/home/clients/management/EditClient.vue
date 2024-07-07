<template>
  <v-dialog v-model="clientDialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        color="secondary"
        variant="text"
        v-bind="activatorProps"
        >Edit</v-btn
      >
    </template>
    <v-card
      elevation="14"
      rounded="md"
      height="auto"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-card-title class="text-h5 font-weight-regular bg-primary justify-center">
        <span class="headline">Edit Client</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container
          ><v-col>
            <v-row>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Name
                </small>
                <v-text-field
                  v-model="localEditedItem.name"
                  :rules="nameRules"
                  variant="underlined"
                  rounded="md"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Surname
                </small>
                <v-text-field
                  v-model="localEditedItem.surname"
                  :rules="surnameRules"
                  variant="underlined"
                  rounded="md"
                ></v-text-field> </v-col
            ></v-row>

            <v-row>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Phone Number
                </small>
                <v-text-field
                  v-model="localEditedItem.contactInfo.phoneNumber"
                  :rules="phoneRules"
                  variant="underlined"
                  rounded="md"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Email
                </small>
                <v-text-field
                  v-model="localEditedItem.contactInfo.email"
                  variant="underlined"
                  :rules="emailRules"
                  rounded="md"
                ></v-text-field> </v-col
            ></v-row>

            <v-row>
              <v-col cols="6"
                ><small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Street
                </small>
                <v-text-field
                  v-model="localEditedItem.address.street"
                  variant="underlined"
                  rounded="md"
                ></v-text-field
              ></v-col>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Suburb
                </small>
                <v-text-field
                  v-model="localEditedItem.address.suburb"
                  variant="underlined"
                  rounded="md"
                ></v-text-field> </v-col
            ></v-row>

            <v-row>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  City
                </small>
                <v-text-field
                  v-model="localEditedItem.address.city"
                  variant="underlined"
                  rounded="md"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Postal Code
                </small>
                <v-text-field
                  v-model="localEditedItem.address.postalCode"
                  variant="underlined"
                  rounded="md"
                ></v-text-field></v-col
            ></v-row>

            <v-row
              ><v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  Complex
                </small>
                <v-text-field
                  v-model="localEditedItem.address.complex"
                  variant="underlined"
                  rounded="md"
                ></v-text-field
              ></v-col>
              <v-col cols="6">
                <small
                  class="text-caption font-weight-bold"
                  :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
                >
                  House Number
                </small>
                <v-text-field
                  v-model="localEditedItem.address.houseNumber"
                  variant="underlined"
                  rounded="md"
                ></v-text-field></v-col
            ></v-row> </v-col
        ></v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions
        ><v-col align-self="center"
          ><v-col cols="12" md="12" xs="3" sm="6" offset="1">
            <v-btn color="success" width="85%" height="35" variant="text" @click="update">
              SAVE
            </v-btn>
          </v-col>
          <v-col cols="12" md="12" xs="3" sm="6" offset="1">
            <v-btn color="error" width="85%" height="35" variant="text" @click="close">
              CANCEL
            </v-btn>
          </v-col></v-col
        ></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditClient',
  props: {
    isDarkMode: Boolean,
    colors: Object,
    editedItem: Object,
    item: Object,
    _clientID: String
  },
  data() {
    return {
      localEditedItem: this.editedItem,
      clientDialog: false,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,

      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 2) || 'Name must be at least 2 characters'
      ],
      surnameRules: [
        (v) => !!v || 'Surname is required',
        (v) => (v && v.length >= 2) || 'Surname must be at least 2 characters'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => (v && v.length >= 10) || 'Phone number must be at least 10 digits'
        // Add more specific validation for phone number format if needed
      ]
    }
  },
  watch: {
    // Step 2: Watch the prop for changes
    editedItem(newVal) {
      this.localEditedItem = newVal
    }
  },
  methods: {
    close() {
      this.clientDialog = false
    },
    updateItem() {
      // Logic to update the item, then emit an event with the updated value
      // Step 3: Emit an event for updates
      this.$emit('update:item', this.localEditedItem)
      alert('Item updated')
    },
    savechnages() {
      alert('Client updated')
      this.clientDialog = false
    },
    async update() {
      console.log(this.localEditedItem.name)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      }
      await axios
        .patch(`http://localhost:3000/client/${this._clientID}`, {
          config,

          details: {
            name: this.localEditedItem.name,
            preferred_Language: this.localEditedItem.preferred_Language,
            contactInfo: {
              phoneNumber: this.localEditedItem.contactInfo.phoneNumber,
              email: this.editedItem.contactInfo.email
            },
            address: {
              street: this.localEditedItem.address.street,
              suburb: this.localEditedItem.address.suburb,
              city: this.localEditedItem.address.city,
              postalCode: this.localEditedItem.address.postalCode,
              complex: this.localEditedItem.address.complex,
              houseNumber: this.localEditedItem.address.houseNumber
            }
          }
        })
        .then((response) => {
          console.log(response)
          alert('Client updated')
          return true
        })
        .catch((error) => {
          console.log(error)
          alert('Error updating client')
          return false
        })
        .finally(() => {
          this.clientDialog = false
        })
    }
  }
}
</script>
<style scoped>
.text-font {
  font-size: 30px;
}
</style>
