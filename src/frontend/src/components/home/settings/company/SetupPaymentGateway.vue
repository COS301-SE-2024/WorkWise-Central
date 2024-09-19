<template>
  <v-container>
    <v-card>
      <Toast position="top-center" />
      <v-divider></v-divider>
      <!-- Payment Gateway Setup Section -->
      <v-card-title class="text-primary font-bold text-center">
        Setup Payment Gateway
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <!-- Stepper -->
        <v-stepper v-model="activeSteps.stepper3" :items="items.items" show-actions>
          <template #[`item.1`]>
            <h3 class="text-h6">Create an account with PayFast</h3>
            <br />
            <v-img :src="images.signup" />
            <br />
            <div>
              <ul class="custom-list">
                <li>
                  Click
                  <a
                    href="https://payfast.io/gateway-aggregator-selector/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >here</a
                  >
                  to go to PayFast's signup page
                </li>
              </ul>
            </div>
          </template>
          <template #[`item.2`]>
            <h3 class="text-h6">Fill in the details on the signup sheet</h3>
            <br />
            <v-img :src="images.signupFilledIn" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Select your industry</li>
                <li>Select your yearly revenue</li>
                <li>Click on the "I'm not a robot"</li>
                <li>Click on 'Get Started' button</li>
              </ul>
            </div>
          </template>
          <template #[`item.3`]>
            <h3 class="text-h6">Fill in your account details</h3>
            <br />
            <v-img :src="images.accountDetails" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Fill in the email field</li>
                <li>Fill in the password field</li>
                <li>Select the Account Type</li>
                <li>Click on the 'Continue' button</li>
              </ul>
            </div>
          </template>
          <template #[`item.4`]>
            <h3 class="text-h6">Fill in your Business Information</h3>
            <br />
            <v-img :src="images.businessInfo" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Fill in all the fields on the form</li>
                <li>Click on the 'Continue' button</li>
              </ul>
            </div>
          </template>
          <template #[`item.5`]>
            <h3 class="text-h6">Fill in your Business Address</h3>
            <br />
            <v-img :src="images.businessAddress" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Fill in all the fields on the form</li>
                <li>Click on the 'Continue' button</li>
              </ul>
            </div>
          </template>
          <template #[`item.6`]>
            <h3 class="text-h6">Fill in your Banking Details</h3>
            <br />
            <v-img :src="images.bankDetails" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Fill in all the fields on the form</li>
                <li>Click on the 'Continue' button</li>
              </ul>
            </div>
          </template>
          <template #[`item.7`]>
            <h3 class="text-h6">Fill in your Account Holder Information</h3>
            <br />
            <v-img :src="images.accountInfo" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Fill in all the fields on the form</li>
                <li>Click on the 'Finish' button</li>
              </ul>
            </div>
          </template>
          <template #[`item.8`]>
            <h3 class="text-h6">Verify your account</h3>
            <br />
            <v-img :src="images.verifyAccount" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Verify the bank account</li>
                <li>Submit proof of physical address</li>
                <li>Submit identity document</li>
                <li>Click on the 'Submit Documents' button</li>
              </ul>
            </div>
          </template>
          <template #[`item.9`]>
            <h3 class="text-h6">Go to your dashboard</h3>
            <br />
            <v-img :src="images.dashboard" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Go to your dashboard</li>
                <li>Get your merchant id</li>
                <li>Get your merchant key</li>
              </ul>
            </div>
          </template>
          <template #[`item.10`]>
            <h3 class="text-h6">Fill in the details below</h3>
            <br />
            <v-img :src="images.enterDetails" />
            <br />
            <div>
              <ul class="custom-list">
                <li>Fill in the merchant id below</li>
                <li>Fill in the merchant key below</li>
                <li>Click on the save button</li>
              </ul>
            </div>
          </template>
        </v-stepper>

        <!-- Spacing -->
        <v-spacer class="my-6"></v-spacer>

        <!-- Merchant Input Form -->
        <v-form ref="form" v-model="valid">
          <v-label> Merchant ID</v-label>
          <v-text-field
            v-model="company.accountDetails.merchantId"
            label="Merchant ID"
            :rules="merchantIdRules"
            :type="showMerchantId ? 'text' : 'password'"
            :append-icon="showMerchantId ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleShowMerchantId"
            required
          ></v-text-field>
          <v-label> Merchant Key</v-label>
          <v-text-field
            v-model="company.accountDetails.merchantKey"
            label="Merchant Key"
            :rules="merchantKeyRules"
            :type="showMerchantKey ? 'text' : 'password'"
            :append-icon="showMerchantKey ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleShowMerchantKey"
            required
          ></v-text-field>
          <v-label> Passphrase</v-label>
          <v-text-field
            v-model="company.accountDetails.passPhrase"
            label="Passphrase"
            :rules="passphraseRules"
            :type="showPassphrase ? 'text' : 'password'"
            :append-icon="showPassphrase ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleShowPassphrase"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <!-- Card Actions for Save and Cancel -->
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <v-container
          ><v-row justify="end">
            <v-col align="center" cols="12" lg="6" order="last" order-lg="first">
              <v-btn color="error" @click="cancel" block>
                <v-icon start color="error" icon="fa: fa-solid fa-cancel"></v-icon>Cancel
              </v-btn></v-col
            >
            <v-col align="center" cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                color="success"
                @click="updateCompanyDetails"
                :disabled="!valid"
                block
                :loading="isDeleting"
              >
                <v-icon start color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon>Save
              </v-btn></v-col
            >
          </v-row></v-container
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import signup from '@/assets/images/paymentGateway/payfast-signup.png'
import signupFilledIn from '@/assets/images/paymentGateway/payfast-signup-filled-in.png'
import accountDetails from '@/assets/images/paymentGateway/payfast-company-details.png'
import businessInfo from '@/assets/images/paymentGateway/payfast-business-information.png'
import businessAddress from '@/assets/images/paymentGateway/payfast-business-address.png'
import bankDetails from '@/assets/images/paymentGateway/payfast-bank-details.png'
import accountInfo from '@/assets/images/paymentGateway/payfast-account-holder-information.png'
import verifyAccount from '@/assets/images/paymentGateway/payfast-verify-account.png'
import dashboard from '@/assets/images/paymentGateway/payfast-dashboard.png'
import enterDetails from '@/assets/images/paymentGateway/payfast-enter-detailspng.png'
import axios from 'axios'
import Toast from 'primevue/toast'

export default {
  name: 'SetupPaymentGateway',
  data() {
    return {
      isDarkMode: false,
      isDeleting: false,
      valid: false,
      currentCompanyID: localStorage.getItem('currentCompany'),
      merchantIdRules: [(v: string) => !!v || 'Merchant ID is required'],
      merchantKeyRules: [(v: string) => !!v || 'Merchant Key is required'],
      passphraseRules: [(v: string) => !!v || 'Merchant Key is required'],
      showMerchantId: false,
      showMerchantKey: false,
      showPassphrase: false,
      activeSteps: { stepper3: 1 },
      items: {
        items: [
          'Step 1',
          'Step 2',
          'Step 3',
          'Step 4',
          'Step 5',
          'Step 6',
          'Step 7',
          'Step 8',
          'Step 9',
          'Step 10'
        ]
      },
      images: {
        signup: signup,
        signupFilledIn: signupFilledIn,
        accountDetails: accountDetails,
        businessInfo: businessInfo,
        businessAddress: businessAddress,
        bankDetails: bankDetails,
        accountInfo: accountInfo,
        verifyAccount: verifyAccount,
        dashboard: dashboard,
        enterDetails: enterDetails
      },
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      company: {
        accountDetails: {
          merchantId: '',
          merchantKey: '',
          passPhrase: ''
        }
      }
    }
  },
  components: {
    Toast
  },
  methods: {
    cancel() {
      this.$toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Company update cancelled',
        life: 3000
      })
    },
    async getCompanyDetails() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      // const apiURL = await this.getRequestUrl()
      const company_id = localStorage.getItem('currentCompany')
      await axios
        .get(`http://localhost:3000/company/id/${company_id}`, config)
        .then((response) => {
          this.company.accountDetails.merchantId = response.data.data.accountDetails.merchantId
          this.company.accountDetails.merchantKey = response.data.data.accountDetails.merchantKey
          this.company.accountDetails.passPhrase = response.data.data.accountDetails.passPhrase
          console.log(this.company)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company details retrieved',
            life: 3000
          })
        })
        .catch((error) => {
          console.log(error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Company details retrieval failed',
            life: 3000
          })
        })
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async updateCompanyDetails() {
      this.isDeleting = true
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      const data = {
        currentEmployeeId: localStorage.getItem('employeeId'),
        updateCompanyDto: this.company
      }
      console.log('Data: ', data)

      await axios
        .patch(`${apiURL}company/update/${localStorage.getItem('currentCompany')}`, data, config)
        .then((response) => {
          console.log(response)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Company updated',
            life: 3000
          })
          setTimeout(() => {
            this.isDeleting = false
            this.getCompanyDetails()
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
          this.isDeleting = false
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Company update failed',
            life: 3000
          })
        })
    },
    rulesPassed() {
      if (this.company.accountDetails.merchantId && this.company.accountDetails.merchantKey) {
        this.valid = true
      } else {
        this.valid = false
      }
    },
    toggleShowMerchantId() {
      this.showMerchantId = !this.showMerchantId
    },
    toggleShowMerchantKey() {
      this.showMerchantKey = !this.showMerchantKey
    },
    toggleShowPassphrase() {
      this.showPassphrase = !this.showPassphrase
    }
  },
  mounted() {
    this.isDarkMode = localStorage.getItem('theme') === 'true' ? true : false
    this.getCompanyDetails()
  }
}
</script>
