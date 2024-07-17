<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    height="500"
    :theme="isdarkmode === true ? 'dark' : 'light'"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        color="primary"
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
                rounded="md"
                v-model="req_obj.company_name"
                :items="['Plumber Tronics', 'Nedbank', 'FNB', 'Talker', 'Friends', 'Wyoming']"
              ></v-autocomplete
            ></v-col>
            <v-container fill-height fluid>
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
            ></v-col>
          </v-col>
          <v-col cols="8" offset="2" align="center">
            <Toast />
            <v-btn
              color="primary"
              rounded="md"
              boarder="xl"
              width="85%"
              height="35"
              variant="elevated"
              :disabled="req_obj.company_name === '' && req_obj.companyID === ''"
              >Join Company</v-btn
            >
          </v-col>
          <v-col cols="8" offset="2" align="center">
            <v-btn
              color="secondary"
              @click="close"
              rounded="md"
              boarder="xl"
              width="85%"
              height="35"
              variant="elevated"
              >Back</v-btn
            >
          </v-col>
        </v-col>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
export default defineComponent({
  name: 'RegisterCompanyModal',
  components: {
    Toast
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
    isdarkmode: sessionStorage.getItem('theme') === 'true' ? true : false,
    req_obj: {
      company_name: '',
      companyID: ''
    }
  }),

  methods: {
    handlesubmission() {
      this.dialog = false
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You have successfully joined the company',
        life: 3000
      })
    },
    close() {
      this.dialog = false
    }
  }
})
</script>

<style></style>
