<template>
  <v-dialog v-model="clientDialog" max-width="500" height="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="xl"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        variant="elevated"
        color="#5A82AF"
        v-bind="activatorProps"
      >
      </v-btn>
    </template>
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
              <v-text-field v-model="Name" label="Name" variant="solo" rounded="xl"></v-text-field>
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
                v-model="Surname"
                :label="Surname ? Surname : 'Surname'"
                variant="solo"
                rounded="xl"
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
                v-model="phone_number"
                :label="phone_number ? phone_number : 'Phone Number'"
                variant="solo"
                rounded="xl"
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
                v-model="email"
                :label="email ? email : 'Email'"
                variant="solo"
                rounded="xl"
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
                v-model="address"
                :label="address ? address : 'Address'"
                variant="solo"
                rounded="xl"
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
                rounded="xl"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-col align-self="center"
              ><v-col cols="12" md="12" xs="3" sm="6" offset="1">
                <v-btn
                  color="#5A82AF"
                  rounded="xl"
                  border="md"
                  width="85%"
                  height="35"
                  variant="elevated"
                >
                  SAVE
                </v-btn>
              </v-col>
              <v-col cols="12" md="12" xs="3" sm="6" offset="1">
                <v-btn
                  color="#5A82AF"
                  rounded="xl"
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
    opened: Boolean,
    editedItem: Array
  },
  data() {
    return {
      clientDialog: this.opened,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      Name: '',
      Surname: '',
      phone_number: '',
      email: '',
      address: '',
      job_required: ''
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
      this.$emit('save', updatedItem)
    },
    async update() {
      axios
        .post('http://localhost:8000/api/clients/', this.editedItem)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
