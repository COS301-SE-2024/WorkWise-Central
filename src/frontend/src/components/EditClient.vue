<template>
  <v-dialog v-model="clientDialog" max-width="500" height="800">
    <v-sheet
      elevation="14"
      rounded="md"
      width="500"
      height="800"
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
    >
      <v-form>
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Edit Client</h4>
          </v-col>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
          <v-col>
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >
                Name
              </small>
              <v-text-field
                v-model="localEditedItem.firstName"
                :rules="nameRules"
                variant="solo"
                rounded="md"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >
                Surname
              </small>
              <v-text-field
                v-model="localEditedItem.surname"
                :rules="surnameRules"
                variant="solo"
                rounded="md"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >
                Phone Number
              </small>
              <v-text-field
                v-model="localEditedItem.clientInfo.phoneNumber"
                :rules="phoneRules"
                variant="solo"
                rounded="md"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >
                Email
              </small>
              <v-text-field
                v-model="localEditedItem.clientInfo.email"
                variant="solo"
                :rules="emailRules"
                rounded="md"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >
                Address
              </small>
              <v-text-field
                v-model="localEditedItem.clientInfo.address.street"
                variant="solo"
                rounded="md"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>

            <v-col align-self="center"
              ><v-col cols="12" md="12" xs="3" sm="6" offset="1">
                <v-btn
                  color="#5A82AF"
                  rounded="md"
                  border="md"
                  width="85%"
                  height="35"
                  variant="elevated"
                  @click="update"
                >
                  SAVE
                </v-btn>
              </v-col>
              <v-col cols="12" md="12" xs="3" sm="6" offset="1">
                <v-btn
                  color="#5A82AF"
                  rounded="md"
                  border="md"
                  width="85%"
                  height="35"
                  variant="elevated"
                >
                  CANCEL
                </v-btn>
              </v-col></v-col
            >
          </v-col>
        </v-col>
      </v-form>
    </v-sheet>
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
      this.update()
    },
    async update() {
      await axios
        .patch(`http://localhost:3000/client/${this._clientID}`)
        .then((response) => {
          console.log(response)
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    }
  }
}
</script>
