<template>
  <v-dialog v-model="employeeDialog" max-width="500" height="800">
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
            <v-col>
              <small
                class="text-caption"
                :style="isdarkmode === true ? dark_theme_text_color : light_theme_text_color"
              >
                Role
              </small>
              <v-text-field
                :v-model="localEditedItem === undefined ? null : localEditedItem.roleName"
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
                  @click="savechnages"
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
                  @click="close"
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

<script lang="ts">
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
      isdarkmode: localStorage['theme'] !== 'false',
      localEditedItem: this.editedItem,
      employeeDialog: false,
      clientName: '', // Assuming you have a way to set this, e.g., when opening the dialog
      isDeleting: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      nameRules: [
        (v: string) => !!v || 'Name is required',
        (v: string) => (v && v.length >= 2) || 'Name must be at least 2 characters'
      ],
      surnameRules: [
        (v: string) => !!v || 'Surname is required',
        (v: string) => (v && v.length >= 2) || 'Surname must be at least 2 characters'
      ],
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        (v: string) => !!v || 'Phone number is required',
        (v: string) => (v && v.length >= 10) || 'Phone number must be at least 10 digits'
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
    showlcalvalues() {
      console.log(this.localEditedItem)
    },
    async loadRoles() {
      const config = { headers: { Authorization: `Bearer ${sessionStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      try {
        let role = await axios.get(apiURL + `roles/all/${sessionStorage['currentCompany']}`, config)
        console.log(role)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    close() {
      this.employeeDialog = false
    },
    updateItem() {
      // Logic to update the item, then emit an event with the updated value
      // Step 3: Emit an event for updates
      this.$emit('update:item', this.localEditedItem)
      alert('Item updated')
    },
    savechnages() {
      alert('Client updated')
      this.employeeDialog = false
    },
    // async update() {
    //   await axios
    //     .patch(`http://localhost:3000/employee/${this.id}`)
    //     .then((response) => {
    //       console.log(response)
    //       alert('Client updated')
    //       return true
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       alert('Error updating client')
    //       return false
    //     })
    //     .finally(() => {
    //       this.employeeDialog = false
    //     })
    // },
    async isLocalAvailable(localUrl: string) {
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
    }
  },
  mounted() {
    this.showlcalvalues()
  }
}
</script>
