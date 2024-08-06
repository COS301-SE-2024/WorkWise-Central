<template>
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
        <v-icon icon="fa: fa-solid fa-exclamation-circle" color="primary"></v-icon>
        Create Priority
      </v-btn>
    </template>
    <v-card>
      <v-card-title> Create new Priority</v-card-title>
      <v-card-text>
        <v-form v-model="formIsValid" ref="form">
          <v-label>Priority Label</v-label>
          <v-text-field
            v-model="priority.label"
            label="Priority Label"
            required
            outlined
            :rules="labelRules"
          />
          <v-text-field
            v-model="priority.priorityLevel"
            label="Priority Level"
            required
            outlined
            type="number"
          ></v-text-field>
          <v-label>Priority Color</v-label>
          <div><ColorPicker inputId="cp-hex" v-model="priority.color" inline /></div>
          <span>Hex Code: {{ priority.color }}</span>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="createPriority"
          color="success"
          rounded="md"
          variant="text"
          :disabled="!formIsValid"
        >
          Create Priority</v-btn
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

interface Priority {
  label: string
  color: string
}
export default defineComponent({
  data() {
    return {
      dialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      priority: {
        label: '',
        color: '',
        priorityLevel: 0,
        companyId: localStorage.getItem('currentCompany')
      },
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      formIsValid: false,
      labelRules: [(v: string) => !!v || 'Label is required'],
      colorRules: [(v: string) => !!v || 'Color is required']
    }
  },
  components: {
    ColorPicker
  },
  methods: {
    async createPriority() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .post(`${apiURL}job/tags/p`, this.priority, config)
        .then((res) => {
          console.log(res)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Priority created successfully',
            life: 3000
          })
          this.dialog = false
        })
        .catch((err) => {
          console.error(err)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while creating priority',
            life: 3000
          })
        })
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    close() {
      this.dialog = false
    }
  }
})
</script>
