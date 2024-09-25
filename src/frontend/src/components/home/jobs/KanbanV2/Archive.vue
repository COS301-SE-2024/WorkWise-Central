<template>
  <v-row justify="start"
    ><v-col cols="auto">
      <v-btn size="x-large" align="left" @click="redirectToKanban">
        <v-icon>{{ 'fa: fa-solid fa-arrow-left' }}</v-icon>
      </v-btn>
    </v-col></v-row
  >
  <v-data-table
    v-model="selected"
    :items="starting_cards"
    item-value="name"
    :headers="headers"
    show-select
  >
    <template v-slot:[`item.status`]="{ value }">
      <v-chip variant="tonal" :color="value.colour"> {{ value.status }}</v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-menu max-width="500px">
        <template v-slot:activator="{ props }"
          ><v-btn
            rounded="xl"
            variant="plain"
            :style="'transform: rotate(90deg) dots'"
            v-bind="props"
            @click="(actionsDialog = true), selectItem(item)"
          >
            <v-icon color="primary">mdi-dots-horizontal</v-icon>
          </v-btn></template
        >
        <v-list :border="true" bg-color="background" rounded="lg">
          <v-list-item>
            <v-btn :elevation="0" @click="UnarchiveJob">
              <v-icon>{{ 'fa: fa-solid fa-box-archive' }}</v-icon>
              {{ 'Unarchive' }}
            </v-btn>
          </v-list-item>
          <v-list-item
            ><v-btn :elevation="0" @click="DeleteJob">
              <v-icon>{{ 'fa: fa-regular fa-trash-can' }}</v-icon>
              {{ 'Delete' }}
            </v-btn></v-list-item
          >
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { JobCardDataFormat } from '@/components/home/jobs/types'
import type { Person } from '@/components/home/employees/types'
import { API_URL } from '@/main'

export default defineComponent({
  name: 'ArchiveComponent',
  data() {
    return {
      selected: [],
      isDarkMode: localStorage['theme'] !== 'false',
      actionsDialog: false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      nostatusID: '',
      starting_cards: [] as JobCardDataFormat[],
      headers: [
        { title: 'Job Heading', key: 'heading', align: 'center', value: 'heading' },
        { title: 'Job Status', key: 'status', align: 'center', value: 'status' },
        { title: 'Start Date', key: 'startDate', align: 'center', value: 'startDate' },
        { title: 'End Date', key: 'endDate', align: 'center', value: 'endDate' },
        { title: 'Actions', key: 'actions', align: 'center' }
      ] as any[],
      archived_data: [],
      selectedItem: null as null | JobCardDataFormat
    }
  },
  methods: {
    redirectToKanban() {
      // this.$router.push('/backlog')
      window.history.go(-1)
      return false
    },
    async UnarchiveJob() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      axios
        .patch(
          API_URL + `job/update/${this.selectedItem?.jobId}`,
          { status: this.nostatusID },
          config
        )
        .then((res) => {
          console.log(res.data.data)
          window.location.reload()
        })
        .catch((error) => console.log(error))
    },
    async DeleteJob() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      axios
        .delete(API_URL + `job/full/${this.selectedItem?.jobId}`, config)
        .then((res) => {
          console.log(res.data.data)
          window.location.reload()
        })
        .catch((error) => console.log(error))
    },
    selectItem(item: JobCardDataFormat) {
      this.selectedItem = item
      console.log('Selected item:', this.selectedItem) // Corrected console.log
    },
    async loadNoStatusId() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const loaded_tags_response = await axios.get(
          API_URL + `job/status/all/${localStorage['currentCompany']}`,
          config
        )
        console.log(loaded_tags_response.data.data)
        for (let i = 0; i < loaded_tags_response.data.data.length; i++)
          if (loaded_tags_response.data.data[i].status === 'No Status') {
            this.nostatusID = loaded_tags_response.data.data[i]._id
            break
          }
      } catch (error) {
        console.log(error)
      }
    },
    async loadArchiveData() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const loaded_tags_response = await axios.get(
          API_URL + `job/all/company/detailed/${localStorage['currentCompany']}`,
          config
        )

        console.log(loaded_tags_response.data.data)

        const loaded_tags_res = loaded_tags_response.data.data

        for (let i = 0; i < loaded_tags_res.length; i++) {
          if (loaded_tags_res[i].status.status !== 'Archive') continue
          this.starting_cards.push({
            jobId: loaded_tags_res[i]._id,
            heading: loaded_tags_res[i].details.heading,
            jobDescription: loaded_tags_res[i].details.description,
            startDate: this.formatDate(loaded_tags_res[i].details.startDate),
            endDate: this.formatDate(loaded_tags_res[i].details.endDate),
            status: loaded_tags_res[i].status,
            clientName:
              loaded_tags_res[i].clientId.details.firstName +
              ' ' +
              loaded_tags_res[i].clientId.details.lastName,
            street: loaded_tags_res[i].details.address.street,
            suburb: loaded_tags_res[i].details.address.suburb,
            city: loaded_tags_res[i].details.address.city,
            postalCode: loaded_tags_res[i].details.address.street.postalCode,
            taskList: loaded_tags_res[i].taskList,
            comments: loaded_tags_res[i].comments,
            priorityTag: loaded_tags_res[i].priorityTag,
            tags: loaded_tags_res[i].tags,
            coverImage: loaded_tags_res[i].coverImage
          })
        }
        console.log(this.starting_cards)
      } catch (error) {
        console.log(error)
      }
    },
    formatDate(date: string) {
      const date_passed_in = new Date(date)
      const y = date_passed_in.getFullYear()
      const m = String(date_passed_in.getMonth() + 1).padStart(2, '0')
      const d = String(date_passed_in.getDate()).padStart(2, '0')
      const h = String(date_passed_in.getHours()).padStart(2, '0')
      const mn = String(date_passed_in.getMinutes()).padStart(2, '0')
      const f_date = `${y}-${m}-${d} ${h}:${mn}`
      return f_date
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
    }
  },
  mounted() {
    this.loadArchiveData()
    this.loadNoStatusId()
  }
})
</script>

<style scoped></style>
