<template>
  <v-container>
    <Toast />
    <v-card>
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
        ><v-row align="center" justify="space-between"
          ><v-col cols="12" lg="6">
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Tags</v-label
            ></v-col
          ><v-col cols="12" lg="6"><CreateTags /></v-col
        ></v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          item-value="role"
          class="bg-cardColor elevation-1"
          :row-props="getRowProps"
          :header-props="{ class: 'bg-secondary h5 ' }"
        >
          <template v-slot:[`item.colour`]="{ item }">
            <v-chip :color="item.colour">{{ item.colour }}</v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn rounded="xl" variant="plain" v-bind="props" @click="selectItem(item)">
                  <v-icon color="primary">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="selectItem(item)">
                  <v-btn color="success" block @click="dialog = true"
                    ><v-icon icon="fa:fa-solid fa-pencil" color="success"></v-icon>Edit</v-btn
                  >
                </v-list-item>
                <v-list-item @click="selectItem(item)">
                  <DeleteTags :tagId="selectedItem._id" />
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-height="800"
      max-width="600"
      :theme="isdarkmode ? 'dark' : 'light'"
      persistent
    >
      <v-card>
        <v-card-title> Edit Tags</v-card-title>
        <v-card-text>
          <v-form v-model="formIsValid" ref="form">
            <v-label>Tag Name</v-label>
            <v-text-field
              v-model="selectedItem.label"
              label="Tag Name"
              required
              outlined
              :rules="labelRules"
            />

            <v-label>Tag Color</v-label>
            <div><ColorPicker inputId="cp-hex" v-model="selectedItem.color" inline /></div>
            <span>Hex Code: {{ selectedItem.color }}</span>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-container
            ><v-row
              ><v-col cols="12" lg="6">
                <v-btn
                  @click="updateTag"
                  :disabled="!formIsValid"
                  color="success"
                  rounded="md"
                  block
                  :loading="isDeleting"
                  variant="text"
                >
                  <v-icon start color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon>Save
                  Tag</v-btn
                ></v-col
              ><v-col cols="12" lg="6">
                <v-btn color="error" rounded="md" variant="text" @click="close" block>
                  <v-icon start color="error" icon="fa: fa-solid fa-cancel"></v-icon> Cancel
                </v-btn></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import DeleteTags from './DeleteTags.vue'
import ColorPicker from 'primevue/colorpicker'
import CreateTags from './CreateTags.vue'
import Toast from 'primevue/toast'

export default defineComponent({
  data: () => ({
    headers: [
      {
        title: 'Tag Name',
        key: 'label'
      },
      {
        title: 'Colour',
        key: 'colour'
      },
      {
        title: 'Actions',
        key: 'actions'
      }
    ],
    items: [] as any[],
    isDeleting: false,
    dialog: false,
    isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
    selectedItem: {
      _id: '',
      label: '',
      color: '',
      companyId: localStorage.getItem('currentCompany')
    },
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
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
    ]
  }),
  components: {
    DeleteTags,
    ColorPicker,
    Toast,
    CreateTags
  },
  methods: {
    getRowProps(index: number) {
      return {
        class: (index % 2 ? 'bg-secondRowColor ' : '') + 'h6'
      }
    },
    convertHexToRgb(hex: string) {
      const hexCode = hex.replace('#', '')
      const r = parseInt(hexCode.substring(0, 2), 16)
      const g = parseInt(hexCode.substring(2, 4), 16)
      const b = parseInt(hexCode.substring(4, 6), 16)
      return `rgb(${r}, ${g}, ${b})`
    },
    async getTags() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      const user_id = localStorage.getItem('id')
      try {
        const res = await axios.get(
          `${apiURL}job/tags/${localStorage.getItem('currentCompany')}`,
          config
        )
        console.log(res)
        this.items = res.data.data
      } catch (error) {
        console.error(error)
      }
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
    selectItem(item: any) {
      console.log(item)
      this.selectedItem = item
    },
    async updateTag() {
      this.isDeleting = true // Indicate the start of the deletion process
      console.log(this.selectedItem)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .patch(`${apiURL}job/tags/`, this.selectedItem, config)
        .then((res) => {
          console.log(res)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Tag updated successfully',
            life: 3000
          })
          setTimeout(() => {
            this.dialog = false
            window.location.reload()
          }, 3000)
        })
        .catch((err) => {
          console.error(err)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating tag',
            life: 3000
          })
        })
    },
    close() {
      this.dialog = false
    }
  },
  mounted() {
    this.getTags()
  }
})
</script>
