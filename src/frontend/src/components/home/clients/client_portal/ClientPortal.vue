<template>
  <v-app :style="isDarkMode === true ? 'dark' : 'light'">
    <v-main>
      <v-container>
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

<script>
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
      clientID: ''
    }
  },
  methods: {
    changeSection(section) {
      this.section = section
    },
    getCidValue() {
      const url = this.$route.fullPath
      const match = url.match(/cid=([a-zA-Z0-9]+)/)
      if (match[1]) {
        sessionStorage.setItem('clientId', match[1])
        this.clientID = sessionStorage.getItem('clientId').toString()
      }
    }
  },
  mounted() {
    this.getCidValue()
  }
})
</script>
