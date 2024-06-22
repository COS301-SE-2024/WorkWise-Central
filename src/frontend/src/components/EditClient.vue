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
                v-model="editedItem.firstName"
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
                v-model="editedItem.surname"
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
                v-model="editedItem.clientInfo.phoneNumber"
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
                v-model="editedItem.clientInfo.email"
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
                v-model="editedItem.clientInfo.address"
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
                Job Required
              </small>
              <v-text-field
                v-model="job_required"
                :label="job_required ? job_required : 'Job Required'"
                variant="solo"
                rounded="md"
                value=""
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
                  @click="saveChanges"
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
    editedItem: Object
  },
  data() {
    return {
      clientDialog: false,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      Name: '',
      Surname: '',
      phone_number: '',
      email: '',
      address: '',
      job_required: '',
      details: {},
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
  methods: {
    close() {
      this.clientDialog = false
    },
    saveChanges() {
      const updatedItem = {
        name: this.editedItem.name,
        email: this.editedItem.email,
        phone: this.editedItem.phone,
        address: this.editedItem.address,
        jobRequired: this.editedItem.jobRequired
      }
      if (true) {
        alert('Changes saved')
      }
    },
    async update() {
      await axios
        .post('http://localhost:8000/api/clients/', this.editedItem)
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
