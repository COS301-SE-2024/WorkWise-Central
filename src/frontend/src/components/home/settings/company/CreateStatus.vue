<template>
  <Toast />
  <v-dialog
    v-model="dialog"
    max-height="800"
    max-width="600"
    :theme="isdarkmode ? 'dark' : 'light'"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="outlined"
        color="primary"
        v-bind="activatorProps"
      >
        <v-icon icon="fa: fa-solid fa-check-circle" color="primary"></v-icon>
        Create Status
      </v-btn>
    </template>
    <v-card>
      <v-card-title> Create new Status</v-card-title>
      <v-card-text>
        <v-form v-model="formIsValid" ref="form">
          <v-label>Status Label</v-label>
          <v-text-field
            v-model="status.status"
            label="Status Label"
            required
            outlined
            :rules="labelRules"
          />
          <v-label>Status Color</v-label>
          <div><ColorPicker inputId="cp-hex" v-model="status.colour" inline /></div>
          <span>Hex Code: {{ status.colour }}</span>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="createStatus" :disabled="!formIsValid" color="success" variant="text"
          >Create Status</v-btn
        >
        <v-btn color="error" rounded="md" variant="text" @click="close"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import ColorPicker from 'primevue/colorpicker'
import Toast from 'primevue/toast'
interface Status {
  status: string
  colour: string
}
export default defineComponent({
  data() {
    return {
      dialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      status: {
        status: '',
        colour: '',
        companyId: localStorage.getItem('currentCompany'),
        employeeId: localStorage.getItem('employeeId')
      } as Status,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      formIsValid: false,
      labelRules: [(v: string) => !!v || 'Label is required']
    }
  },
  components: {
    ColorPicker,
    Toast
  },
  methods: {
    async createStatus() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      await axios
        .post(`${apiURL}job/status`, this.status, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status Created',
            life: 3000
          })
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Status not created',
            life: 3000
          })
        })
      console.log('Creating Status')
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status >= 200 && res.status < 300
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    close() {
      this.dialog = false
    }
  }
})
</script>
