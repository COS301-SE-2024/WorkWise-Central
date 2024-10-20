<template>
  <v-app :style="isDarkMode === true ? 'dark' : 'light'">
    <v-main>
      <v-container fluid fill-height>
        <v-tabs bg-color="secondary" dark>
          <v-tab v-for="tab in tabs" :key="tab" @click="changeSection(tab)">
            {{ tab }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-if="section === 'Current Jobs'">
            <ClientJobs />
          </v-tab-item>
          <v-tab-item v-if="section === 'Review Jobs'">
            <ReviewJobs />
          </v-tab-item>
          <v-tab-item v-if="section === 'Invoices'">
            <Invoices />
          </v-tab-item>
        </v-tabs-items> </v-container
    ></v-main>
  </v-app>
</template>


<script lang="ts">
import ClientJobs from './ViewJobs.vue'
import ReviewJobs from './ReviewJob.vue'
import Invoices from './PaymentPortal.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    cid: {
      type: String,
      required: true // cid might not always be provided
    }
  },
  components: {
    ClientJobs,
    ReviewJobs,
    Invoices
  },
  data() {
    return {
      section: 'Current Jobs',
      tabs: ['Current Jobs', 'Review Jobs', 'Invoices'],
      clientID: '',
      isDarkMode: false,
      activeTab: 0
    }
  },
  methods: {
    changeSection(section: string) {
      this.section = section
    },
    getCidValue() {
      const url = this.$route.fullPath
      const match = url.match(/cId=([a-zA-Z0-9]+)/)
      if (match[1]) {
        sessionStorage.setItem('clientId', match[1])
        const clientId = sessionStorage.getItem('clientId')
        this.clientID = clientId ? clientId.toString() : ''
      }
    }
  },
  mounted() {
    this.getCidValue()
  }
})
</script>