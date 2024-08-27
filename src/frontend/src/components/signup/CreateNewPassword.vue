<template>
  <Toast position="top-center" />
  <v-app :theme="isDarkMode ? 'dark' : 'light'">
    <v-app-bar class="bg-background">
      <v-toolbar-title
        ><v-label :class="'h4 text-primary'">Rest</v-label>
        <v-label :class="'h4 text-secondary'">Password</v-label></v-toolbar-title
      >
      <v-btn @click="toggleDarkMode" base-color="background"
        ><v-icon :icon="isDarkMode ? 'fa: fa-solid fa-sun' : 'fa: fa-solid fa-moon'"></v-icon
      ></v-btn>
    </v-app-bar>
    <v-main :theme="isDarkMode ? 'dark' : 'light'">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-card>
              <v-card-title class="text-center">Create New Password</v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="passwordRules"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append="toggleShowPassword"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="confirmPasswordRules"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append="toggleShowPassword"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-container
                  ><v-row
                    ><v-col>
                      <v-btn color="primary" @click="submit" block :disabled="!valid">
                        Submit
                      </v-btn></v-col
                    ></v-row
                  ></v-container
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script >
import axios from 'axios'
import Toast from 'primevue/toast'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CreateNewPassword',
  props: {
    user: Object
  },
  components: {
    Toast
  },
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      password: '',
      confirmPassword: '',
      valid: false,
      showPassword: false,
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v) ||
          'Password must contain at least one uppercase letter, one lowercase letter and one number',
        (v) =>
          /(?=.*[!@#$%^&*])/.test(v) || 'Password must contain at least one special character'
      ],
      confirmPasswordRules: [
        (v) => !!v || 'Confirm Password is required',
        (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v) ||
          'Password must contain at least one uppercase letter, one lowercase letter and one number',
        (v) =>
          /(?=.*[!@#$%^&*])/.test(v) || 'Password must contain at least one special character',
        function (v) {
          return v === this.password || 'Passwords do not match'
        }.bind(this)
      ]
    }
  },
  methods: {
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async submit() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      try {
        const urlParams = new URL(window.location.href).searchParams;
        const userId = urlParams.get('uId');
        const token = urlParams.get('tok');
        console.log('User ID:', userId);
        console.log('Token:', token);
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        const apiUrl = await this.getRequestUrl()
        const response = await axios.post(`${apiUrl}users/reset-pass`, {
          userId: userId,
          token: token,
          newPassword: this.password
        }, config)
        console.log(response)
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password updated',
          life: 3000
        })

        setTimeout(() => {
          this.$router.push({ name: 'splash' })
        }, 2000)
      } catch (error) { console.log(error)}
    },
    toggleDarkMode() {
      console.log(this.isDarkMode)
      if (this.isDarkMode === true) {
        this.isDarkMode = false
        console.log(this.isDarkMode)
      } else {
        this.isDarkMode = true
        console.log(this.isDarkMode)
      }
      localStorage.setItem('theme', this.isDarkMode) // save the theme to session storage
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    }
  }
})
</script>
