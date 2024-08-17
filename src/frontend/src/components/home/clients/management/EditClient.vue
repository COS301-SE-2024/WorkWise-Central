<template>
  <Toast position="top-center" />
  <v-dialog
    v-model="clientDialog"
    max-width="600"
    :theme="isDarkMode === true ? 'themes.dark' : 'themes.light'"
    :opacity="0"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular hello" color="warning" v-bind="activatorProps"
        ><v-icon icon="fa:fa-solid fa-pencil" start color="warning " size="small"></v-icon>Edit
      </v-btn>
    </template>
    <v-card :theme="isDarkMode === true ? 'dark' : 'light'">
      <v-card-title class="text-center"> Edit Client </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> Name </small>
              <v-text-field v-model="localEditedItem.firstName" :rules="nameRules"></v-text-field>
            </v-col>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> Surname </small>
              <v-text-field
                v-model="localEditedItem.lastName"
                :rules="surnameRules"
                hide-details="auto"
              ></v-text-field> </v-col
          ></v-row>

          <v-row>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> Phone Number </small>
              <v-text-field
                v-model="localEditedItem.contactInfo.phoneNumber"
                :rules="phoneRules"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> Email </small>
              <v-text-field
                v-model="localEditedItem.contactInfo.email"
                :rules="emailRules"
                hide-details="auto"
              ></v-text-field> </v-col
          ></v-row>

          <v-row>
            <v-col cols="6"
              ><small class="text-caption font-weight-bold"> Street </small>
              <v-text-field
                v-model="localEditedItem.address.street"
                :rules="streetRules"
                hide-details="auto"
              ></v-text-field
            ></v-col>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> Suburb </small>
              <v-text-field
                v-model="localEditedItem.address.suburb"
                :rules="suburbRules"
                hide-details="auto"
              ></v-text-field> </v-col
          ></v-row>

          <v-row>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> City </small>
              <v-text-field
                v-model="localEditedItem.address.city"
                :rules="cityRules"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> Postal Code </small>
              <v-text-field
                v-model="localEditedItem.address.postalCode"
                :rules="postalCodeRules"
                hide-details="auto"
              ></v-text-field></v-col
          ></v-row>

          <v-row
            ><v-col cols="6">
              <small class="text-caption font-weight-bold"> Complex </small>
              <v-text-field
                theme="cardColor"
                v-model="localEditedItem.address.complex"
                hide-details="auto"
              ></v-text-field
            ></v-col>
            <v-col cols="6">
              <small class="text-caption font-weight-bold"> House Number </small>
              <v-text-field
                v-model="localEditedItem.address.houseNumber"
                hide-details="auto"
              ></v-text-field></v-col
          ></v-row>
          <v-row>
            <v-col cols="12">
              <small class="text-caption font-weight-bold">Preferred Language</small>
              <v-select
                :items="languages"
                v-model="localEditedItem.preferred_Language"
                variant="solo"
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container>
          <v-row align-self="center" justify="end"
            ><v-col
              cols="12"
              lg="6"
              md="6"
              sm="6"
              order="last"
              order-lg="first"
              order-md="first"
              order-sm="first"
            >
              <v-btn color="error" width="85%" height="35" variant="text" @click="close" block>
                <v-icon icon="fa:fa-solid fa-cancel" start color="error" size="small"></v-icon>
                Cancel
              </v-btn> </v-col
            ><v-col
              cols="12"
              lg="6"
              md="6"
              sm="6"
              order="first"
              order-lg="last"
              order-md="last"
              order-sm="last"
            >
              <Toast position="top-center" />
              <v-btn
                color="success"
                width="85%"
                height="35"
                variant="text"
                @click="update"
                :disabled="!valid"
                :loading="isDeleting"
                block
                ><v-icon
                  icon="fa:fa-solid fa-floppy-disk"
                  start
                  color="success"
                  size="small"
                ></v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row></v-container
        ></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import Toast from 'primevue/toast'
export default {
  name: 'EditClient',
  props: {
    isDarkMode: Boolean,
    colors: Object,
    editedItem: Object,
    item: Object,
    _clientID: Number
  },
  components: {
    Toast
  },
  data() {
    return {
      localEditedItem: this.editedItem,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      clientDialog: false,
      valid: true,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      languages: [
        'Afrikaans',
        'English',
        'Ndebele',
        'Sotho',
        'Swati',
        'Tsonga',
        'Tswana',
        'Venda',
        'Xhosa',
        'Zulu'
      ],
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
      ],
      cityRules: [(v) => !!v || 'City is required'],
      postalCodeRules: [
        (v) => !!v || 'Postal code is required',
        (v) => (v && v.length >= 4) || 'Postal code must be at least 4 digits'
      ],
      streetRules: [(v) => !!v || 'Street is required'],
      provinceRules: [(v) => !!v || 'Province is required'],
      suburbRules: [(v) => !!v || 'Suburb is required']
    }
  },
  watch: {
    // Step 2: Watch the prop for changes
    editedItem(newVal) {
      this.localEditedItem = newVal
    }
  },
  created() {
    // Create a deep copy of editedItem
    this.localEditedItem = this.deepCopy(this.editedItem)
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
      this.isDeleting = true // Indicate the start of the deletion process
      console.log(this.localEditedItem.firstName)
      console.log(localStorage.getItem('access_token'))

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      // const apiURL = await this.getRequestUrl();

      const data = {
        // registrationNumber: this.localEditedItem.registrationNumber,
        currentEmployeeId: localStorage.getItem('employeeId'),
        updateClientDto: {
          details: {
            firstName: this.localEditedItem.firstName,
            lastName: this.localEditedItem.surname,
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
        }
      }

      try {
        const response = await axios.patch(
          `http://localhost:3000/client/${this._clientID}`,
          data,
          config
        )
        console.log(response)
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Client updated successfully',
          life: 3000
        })
        setTimeout(() => {
          this.isDeleting = false
          this.clientDialog = false
          // window.location.reload()
        }, 3000)

        return true
      } catch (error) {
        console.error('Error updating client:', error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while updating the client',
          life: 3000
        })
        return false
      }
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    allRulesPass() {
      if (
        this.nameRules.every((rule) => rule(this.localEditedItem.firstName)) &&
        this.surnameRules.every((rule) => rule(this.localEditedItem.surname)) &&
        this.emailRules.every((rule) => rule(this.localEditedItem.contactInfo.email)) &&
        this.phoneRules.every((rule) => rule(this.localEditedItem.contactInfo.phoneNumber))
      ) {
        this.valid = true
      } else {
        this.valid = false
      }
    },
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>
<style scoped>
.text-font {
  font-size: 30px;
}
</style>
