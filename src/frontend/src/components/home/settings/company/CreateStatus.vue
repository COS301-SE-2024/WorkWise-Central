<template>
  <Toast position="top-center" />
 <v-dialog persistent v-model="dialog" max-height="800" max-width="600" >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        color="secondary"
        v-bind="activatorProps"
        block
      >
        <v-icon icon="fa: fa-solid fa-check-circle" color="primary"></v-icon>
        Create Status
      </v-btn>
    </template>
    <v-card class="bg-cardColor">
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
          <v-color-picker
            v-model="status.colour"
            :hide-sliders="true"
            :hide-canvas="true"
            hide-inputs
            show-swatches
          ></v-color-picker>
          <span
            >Hex Code:<v-chip :color="status.colour">{{ status.colour }}</v-chip>
          </span>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn color="error" rounded="md" variant="text" @click="close" block
                ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon> Cancel
              </v-btn> </v-col
            ><v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                @click="createStatus"
                :disabled="!formIsValid"
                color="success"
                rounded="md"
                :loading="isDeleting"
                variant="text"
                block
                ><v-icon icon="fa: fa-solid fa-plus" color="success"></v-icon>Create Status</v-btn
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
import Toast from 'primevue/toast'
import { API_URL } from '@/main'

interface Status {
  status: string
  colour: string
}
export default defineComponent({
  data() {
    return {
      isDeleting: false,
      dialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      status: {
        status: '',
        colour: '',
        companyId: localStorage.getItem('currentCompany'),
        employeeId: localStorage.getItem('employeeId')
      } as Status,
      formIsValid: false,
      labelRules: [(v: string) => !!v || 'Label is required'],
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
      selectedColor: '#FFB74D',
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
    Toast
  },
  methods: {
    async createStatus() {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      await axios
        .post(`${API_URL}job/status`, this.status, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status Created',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.dialog = false
            this.$emit('CreatedStatus', response.data.data)
          }, 3000)
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
      this.isDeleting = false
      console.log('Creating Status')
    },
    close() {
      this.dialog = false
    }
  }
})
</script>
