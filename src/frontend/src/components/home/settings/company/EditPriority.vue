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
              >Priorities</v-label
            ></v-col
          ><v-col cols="12" lg="6"><CreatePriority /></v-col
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
                  <DeletePriority :tag-id="selectedItem._id" />
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
        <v-card-title> Edit Priorities</v-card-title>
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
          <v-container>
            <v-row>
              <v-col cols="12" lg="6">
                <v-btn
                  @click="updatePrority"
                  :disabled="!formIsValid"
                  color="success"
                  rounded="md"
                  variant="text"
                  block
                >
                  <v-icon start color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon>Save
                  Priority</v-btn
                ></v-col
              >
              <v-col cols="12" lg="6"
                ><v-btn color="error" rounded="md" variant="text" @click="close" block>
                  <v-icon start color="error" icon="fa: fa-solid fa-cancel"></v-icon> Cancel
                </v-btn></v-col
              >
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DeletePriority from './DeletePriority.vue'
import ColorPicker from 'primevue/colorpicker'
import CreatePriority from './CreatePriority.vue'
import axios from 'axios'
import Toast from 'primevue/toast'
export default defineComponent({
  data: () => ({
    headers: [
      {
        title: 'Priority Name',
        key: 'label'
      },
      {
        title: 'Level',
        key: 'priorityLevel'
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
      priorityLevel: 0,
      companyId: localStorage.getItem('currentCompany')
    },
    formIsValid: false,
    labelRules: [(v: string) => !!v || 'This field is required'],

    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
  }),
  components: {
    DeletePriority,
    ColorPicker,
    Toast,
    CreatePriority
  },
  methods: {
    getRowProps(index: number) {
      return {
        class: (index % 2 ? 'bg-secondRowColor ' : '') + 'h6'
      }
    },
    async getPriorities() {
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
          `${apiURL}job/tags/p/${localStorage.getItem('currentCompany')}`,
          config
        )
        console.log(res)
        this.items = res.data.data
        console.log(this.items)
      } catch (error) {
        console.error(error)
      }
    },
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
    },
    selectItem(item: any) {
      console.log(item)
      this.selectedItem = item
    },
    async updatePrority() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .patch(`${apiURL}job/tags/p/`, this.selectedItem, config)
        .then((res) => {
          console.log(res)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status updated',
            life: 3000
          })
          setTimeout(() => {
            window.location.reload()
          }, 3000)
          this.dialog = false
        })
        .catch((err) => {
          console.error(err)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating priority',
            life: 3000
          })
        })
    },
    close() {
      this.dialog = false
    }
  },
  mounted() {
    this.getPriorities()
  }
})
</script>
