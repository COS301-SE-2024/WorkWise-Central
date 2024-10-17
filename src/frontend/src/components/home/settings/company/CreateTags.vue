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
        <v-icon icon="fa: fa-solid fa-tags" color="primary"></v-icon>
        Create Tag
      </v-btn>
    </template>
    <v-card class="bg-cardColor">
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

          <v-color-picker
            v-model="tag.colour"
            :hide-sliders="true"
            :hide-canvas="true"
            hide-inputs
            show-swatches
          ></v-color-picker>
          <span
            >Hex Code: <v-chip :color="tag.colour">{{ tag.colour }}</v-chip></span
          >
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn color="error" rounded="md" variant="text" @click="close" block
                ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon> Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                @click="createTag"
                :disabled="!formIsValid"
                color="success"
                rounded="md"
                variant="text"
                block
                :loading="isDeleting"
                ><v-icon icon="fa: fa-solid fa-plus" color="success"></v-icon>Create Tag</v-btn
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
import { API_URL } from '@/main'

interface Tag {
  label: string
  colour: stringe
  companyId: string
}
export default defineComponent({
  data() {
    return {
      isDeleting: false,
      dialog: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      tag: {
        label: '',
        colour: '',
        companyId: localStorage.getItem('currentCompany')
      } as Tag,
      formIsValid: false,
      nameRules: [(v: string) => !!v || 'Name is required'],
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
  components: {},
  methods: {
    async createTag() {
      this.isDeleting = true // Indicate the start of the deletion process
      console.log(this.tag)
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      await axios
        .post(`${API_URL}job/tags/add`, this.tag, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Tag Created',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.dialog = false
            this.tag = {
              label: '',
              colour: '',
              companyId: localStorage.getItem('currentCompany')
            }
            this.$emit('CreatedTag', response.data.data)
          }, 3000)
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
          })
          this.isDeleting = false
          console.error(error)
        })
      console.log('Creating Tag')
    },
    close() {
      this.dialog = false
    }
  }
})
</script>
