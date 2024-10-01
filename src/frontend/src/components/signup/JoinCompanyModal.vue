<template>
  <v-dialog v-model="dialog" max-width="500" opacity="0.6" height="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        :color="buttonColor ? buttonColor : 'primary'"
        block
        v-bind="activatorProps"
        >Join Company</v-btn
      >
    </template>
    <v-sheet elevation="14" rounded="md" width="500">
      <v-form ref="form" v-model="valid" @submit.prevent="handlesubmission" class="bg-background">
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
              Join Company
            </h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small class="text-caption">Search for the company by name</small>
              <v-autocomplete
                density="compact"
                label="Company Name"
                variant="solo"
                color="primary"
                rounded="md"
                v-model="req_obj.company_name"
                @update:modelValue="print"
                item-value="_id"
                item-title="name"
                :items="companyNameArr"
              ></v-autocomplete
            ></v-col>
            <!--            <v-container fill-height fluid>
              <v-row align="center" justify="center">
                <h2 style="font-weight: lighter">OR</h2>
              </v-row>
            </v-container>
            <v-col>
              <small class="text-caption">Enter the Company ID</small>
              <v-text-field
                density="compact"
                label="Enter the company ID"
                rounded="md"
                variant="solo"
                v-model="req_obj.companyID"
                required
              ></v-text-field
            ></v-col>-->
          </v-col>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn
                  color="secondary"
                  @click="close"
                  rounded="md"
                  boarder="xl"
                  size="large"
                  height="35"
                  block
                  variant="elevated"
                  >Back</v-btn
                >
              </v-col>
              <v-col cols="12" lg="6" order="first" order-lg="last">
                <Toast position="top-center" />
                <v-btn
                  color="primary"
                  rounded="md"
                  boarder="xl"
                  size="large"
                  block
                  @click="handlesubmission"
                  height="35"
                  variant="elevated"
                  :disabled="req_obj.company_name === '' /* && req_obj.companyID === ''*/"
                  >Join Company</v-btn
                >
              </v-col></v-row
            >
          </v-container>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import axios from 'axios'
import type { CompanyListItem } from '@/components/signup/types'
import { API_URL } from '@/main'

export default defineComponent({
  name: 'RegisterCompanyModal',
  components: {
    Toast
  },
  props: {
    buttonColor: String
  },
  data: () => ({
    dialog: false,
    valid: false,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    click_create_client: false,
    attribute_is_filled: false,
    isDarkMode: sessionStorage.getItem('theme') === 'true' ? true : false,
    req_obj: {
      company_name: '',
      companyID: ''
    },
    companyNameArr: [] as CompanyListItem[]
  }),

  methods: {
    async handlesubmission() {
      let success: boolean = false
      try {
        success = await this.createJoinCompanyRequest()
      } catch (e) {
        console.log(e)
        return
      }
      this.dialog = false
      if (success) {
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have successfully requested to join the company',
          life: 3000
        })
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Failure',
          detail: 'Request to join was unsuccessful. Please try again later',
          life: 3000
        })
      }
    },
    close() {
      this.dialog = false
    },
    async createJoinCompanyRequest() {
      console.log('Creating request')
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        console.log('TEST: ', this.req_obj.company_name)
        const body = {
          companyId: this.req_obj.company_name
        }
        console.log(body)
        const response = await axios.post(`${API_URL}admin/request/create`, body, config)
        console.log(response.data.data)
        if (response.data.data !== true) {
          console.log('Request unsuccessful')
        }
        return response.data.data
      } catch (error) {
        console.error('Error in Request creation:', error)
        return null
      }
    },
    async getCompanyNameList() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      try {
        const response = await axios.get(`${API_URL}company/all/names`, config)
        console.log(response.data.data)
        response.data.data.forEach((e: CompanyListItem) => {
          this.companyNameArr.push(e)
        })
        return response.data.data
      } catch (error) {
        console.error('Error in Request creation:', error)
        return null
      }
    },
    print() {
      console.log(this.req_obj.company_name)
      this.req_obj.companyID = this.req_obj.company_name
    }
  },
  mounted() {
    this.getCompanyNameList()
  }
})
</script>

<style></style>
