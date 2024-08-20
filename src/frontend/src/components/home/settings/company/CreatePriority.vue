<template>
  <v-dialog v-model="dialog" max-height="800" max-width="600" persistent :opacity="0">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        color="secondary"
        v-bind="activatorProps"
        block
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
            :rules="priorityLevelRules"
            outlined
            type="number"
          ></v-text-field>
          <v-label>Priority Color</v-label>
          <v-row>
            <v-col
              v-for="color in colorOptions"
              :key="color"
              cols="2"
              class="d-flex justify-center"
            >
              <v-btn
                :style="{ backgroundColor: color }"
                class="ma-1"
                @click="priority.colour = color"
                :outlined="priority.colour !== color"
                style="width: 40px; height: 40px; border-radius: 4px"
              ></v-btn>
            </v-col>
          </v-row>
          <span>Hex Code: {{ priority.colour }}</span>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-btn color="error" rounded="md" variant="text" @click="close" block
                ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon> Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn
                @click="createPriority"
                :disabled="!formIsValid"
                color="success"
                rounded="md"
                variant="text"
                :loading="isDeleting"
                block
                ><v-icon icon="fa: fa-solid fa-plus" color="success"></v-icon>Create Priority</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
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
  colour: string
}
export default defineComponent({
  data() {
    return {
      dialog: false,
      isDeleting: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      priority: {
        label: '',
        colour: '',
        priorityLevel: 0,
        companyId: localStorage.getItem('currentCompany')
      },
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      formIsValid: false,
      labelRules: [(v: string) => !!v || 'Label is required'],
      priorityLevelRules: [(v: number) => !!v || 'Priority Level is required'],
      colorRules: [
        (v: string) => !!v || 'Color is required',
        (v: string) => !/^#(?:[fF]{3}|[fF]{6})$/.test(v) || 'Pure white is not allowed',
        (v: string) => {
          let hex = v.replace('#', '')
          if (hex.length === 3) {
            hex = hex
              .split('')
              .map((char) => char + char)
              .join('')
          }
          const r = parseInt(hex.substring(0, 2), 16)
          const g = parseInt(hex.substring(2, 4), 16)
          const b = parseInt(hex.substring(4, 6), 16)
          return r < 240 || g < 240 || b < 240 || 'Colors close to white are not allowed'
        }
      ],
      colorOptions: [
        '#FFB74D',
        '#FFD54F',
        '#FFF176',
        '#AED581',
        '#81C784',
        '#4DB6AC',
        '#4DD0E1',
        '#4FC3F7',
        '#64B5F6',
        '#7986CB',
        '#BA68C8',
        '#DCE775',
        '#FFF59D',
        '#FFEB3B',
        '#FFCA28',
        '#FF7043',
        '#FF8A65',
        '#A1887F',
        '#90A4AE',
        '#78909C',
        '#EF5350',
        '#EC407A',
        '#AB47BC',
        '#8E24AA',
        '#7B1FA2',
        '#42A5F5',
        '#26A69A',
        '#66BB6A',
        '#9CCC65',
        '#FFEE58'
      ] as string[]
    }
  },
  components: {
    ColorPicker
  },
  methods: {
    async createPriority() {
      this.isDeleting = true // Indicate the start of the deletion process
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
          setTimeout(() => {
            this.isDeleting = false
            window.location.reload()
          }, 3000)
        })
        .catch((err) => {
          console.error(err)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while creating priority',
            life: 3000
          })
          this.isDeleting = false
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
