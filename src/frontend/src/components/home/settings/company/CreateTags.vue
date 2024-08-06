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
        <v-icon icon="fa: fa-solid fa-tags" color="primary"></v-icon>
        Create Tag
      </v-btn>
    </template>
    <v-card>
      <v-card-title> Create new Tag</v-card-title>
      <v-card-text>
        <v-form v-model="formIsValid" ref="form">
          <v-label>Tag Name</v-label>
          <v-text-field
            v-model="tag.label"
            label="Tag Name"
            required
            outlined
            :rules="labelRules"
          />

          <v-label>Tag Color</v-label>
          <div><ColorPicker inputId="cp-hex" v-model="tag.color" inline /></div>
          <span>Hex Code: {{ tag.color }}</span>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="createTag"
          :disabled="!formIsValid"
          color="success"
          rounded="md"
          variant="text"
          >Create Tag</v-btn
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

interface Tag {
  label: string
  color: string
}
export default defineComponent({
  data() {
    return {
      dialog: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      tag: {
        label: '',
        color: '',
        companyId: localStorage.getItem('currentCompany')
      } as Tag,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      formIsValid: false,
      nameRules: [(v: string) => !!v || 'Name is required'],
      labelRules: [(v: string) => !!v || 'Label is required'],
      colorRules: [(v: string) => !!v || 'Color is required']
    }
  },
  components: {
    ColorPicker
  },
  methods: {
    async createTag() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      await axios
        .post(`${apiURL}job/tags/add`, this.tag, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Tag Created',
            life: 3000
          })

          window.location.reload()
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Tag not created',
            life: 3000
          })
          console.error(error)
        })
      console.log('Creating Tag')
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
