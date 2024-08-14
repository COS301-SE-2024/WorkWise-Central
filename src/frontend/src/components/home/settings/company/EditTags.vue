<template>
  <v-container>
    <v-card>
      <v-card-title class="text-primary font-bold text-center">Tags</v-card-title>
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
            <v-chip :color="item.colour" >{{ item.colour }}</v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn rounded="xl" variant="plain" v-bind="props" @click="selectItem(item)">
                  <v-icon color="primary">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <!-- <v-list-item @click="selectItem(item)">
                  <v-btn color="success" block @click="dialog = true"
                    ><v-icon icon="fa:fa-solid fa-pencil" color="success"></v-icon>Edit</v-btn
                  >
                </v-list-item> -->
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
        <v-card-title> Edit</v-card-title>
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
          <v-btn
            @click="updateTag"
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import DeleteTags from './DeleteTags.vue'

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
    colorRules: [(v: string) => !!v || 'Color is required']
  }),
  components: {
    DeleteTags
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
    },
    async updateTag() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .post(
          `${apiURL}job/tags/${localStorage.getItem('currentCompany')}`,
          this.selectItem,
          config
        )
        .then((res) => {
          console.log(res)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Tag updated successfully',
            life: 3000
          })
          this.dialog = false
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
