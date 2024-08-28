<template>
  <v-container>
    <Toast position="top-center" />
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
              >Statuses</v-label
            ></v-col
          ><v-col cols="12" lg="6"><CreateStatus /></v-col
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
                  <DeleteStatus :statusId="selectedItem._id" />
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-height="800" max-width="600" persistent>
      <v-card>
        <v-card-title> Edit Statuses</v-card-title>
        <v-card-text>
          <v-form v-model="formIsValid" ref="form">
            <v-label>Tag Name</v-label>
            <v-text-field
              v-model="selectedItem.status"
              label="Tag Name"
              required
              outlined
              :rules="labelRules"
            />

            <v-label>Tag Color</v-label>
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
                  @click="selectedItem.colour = color"
                  :outlined="selectedItem.colour !== color"
                  style="width: 40px; height: 40px; border-radius: 4px"
                ></v-btn>
              </v-col>
            </v-row>
            <span
              >Hex Code:
              <v-chip :color="selectedItem.colour">{{ selectedItem.colour }}</v-chip></span
            >
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-container
            ><v-row
              ><v-col cols="12" lg="6" order="last" order-lg="first"
                ><v-btn
                  color="error"
                  rounded="md"
                  variant="text"
                  @click="close"
                  block
                  :loading="isDeleting"
                >
                  <v-icon start color="error" icon="fa: fa-solid fa-cancel"></v-icon> Cancel
                </v-btn></v-col
              ><v-col cols="12" lg="6" order="first" order-lg="last"
                ><v-btn
                  @click="updateStatus"
                  :disabled="!formIsValid"
                  color="success"
                  rounded="md"
                  variant="text"
                  block
                  :loading="isDeleting"
                >
                  <v-icon start color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon>Save
                  Status</v-btn
                ></v-col
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

import DeleteStatus from './DeleteStatus.vue'
import Toast from 'primevue/toast'
import CreateStatus from './CreateStatus.vue'
interface Status {
  status: string
  colour: string
}
export default defineComponent({
  data: () => ({
    isDeleting: false,
    headers: [
      {
        title: 'Status Name',
        key: 'status'
      },
      {
        title: 'Color',
        key: 'colour'
      },
      {
        title: 'Actions',
        key: 'actions'
      }
    ],
    items: [] as any[],
    dialog: false,
    selectedItem: {
      _id: '',
      status: '',
      colour: '',
      companyId: localStorage.getItem('currentCompany'),
      employeeId: localStorage.getItem('employeeId')
    },
    formIsValid: false,
    labelRules: [(v: string) => !!v || 'This field is required'],
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
    ] as string[],
    isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
  }),
  components: {
    DeleteStatus,

    Toast,
    CreateStatus
  },
  methods: {
    getRowProps(index: number) {
      return {
        class: (index % 2 ? 'bg-secondRowColor ' : '') + 'h6'
      }
    },
    async getStatuses() {
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
          `${apiURL}job/status/all/${localStorage.getItem('currentCompany')}`,
          config
        )
        this.items = res.data.data
        console.log(res)
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
    selectItem(item: any) {
      console.log(item)
      this.selectedItem = item
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async updateStatus() {
      this.isDeleting = true // Indicate the start of the deletion process
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          companyId: localStorage.getItem('currentCompany'),
          employeeId: localStorage.getItem('employeeId')
        }
      }
      console.log(this.selectedItem)
      const apiURL = await this.getRequestUrl()
      await axios
        .patch(`${apiURL}job/status`, this.selectedItem, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status updated',
            life: 3000
          })
          setTimeout(() => {
            this.getStatuses()
            this.isDeleting = false
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
      console.log('Updating Status')
    },
    close() {
      this.dialog = false
    }
  },
  mounted() {
    this.getStatuses()
  }
})
</script>
