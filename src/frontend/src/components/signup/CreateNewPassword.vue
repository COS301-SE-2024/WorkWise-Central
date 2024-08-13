<template>
  <Toast position="top-center" />
  <v-app :theme="isdarkmode ? 'dark' : 'light'">
    <v-app-bar :theme="isdarkmode ? 'themes.dark' : 'themes.light'" class="bg-background">
      <v-toolbar-title
        ><v-label :class="'h4 text-primary'">Rest</v-label>
        <v-label :class="'h4 text-secondary'">Password</v-label></v-toolbar-title
      >
      <v-btn @click="toggleDarkMode" base-color="background"
        ><v-icon :icon="isdarkmode ? 'fa: fa-solid fa-sun' : 'fa: fa-solid fa-moon'"></v-icon
      ></v-btn>
    </v-app-bar>
    <v-main :theme="isdarkmode ? 'dark' : 'light'">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-card :theme="isdarkmode ? 'themes.dark' : 'themes.light'">
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
<script></script>
<script lang="ts">
// import axios from 'axios'
import Toast from 'primevue/toast'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
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
      password: '',
      confirmPassword: '',
      valid: false,
      showPassword: false,
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v: string) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v) ||
          'Password must contain at least one uppercase letter, one lowercase letter and one number',
        (v: string) =>
          /(?=.*[!@#$%^&*])/.test(v) || 'Password must contain at least one special character'
      ],
      confirmPasswordRules: [
        (v: string) => !!v || 'Confirm Password is required',
        (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v: string) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v) ||
          'Password must contain at least one uppercase letter, one lowercase letter and one number',
        (v: string) =>
          /(?=.*[!@#$%^&*])/.test(v) || 'Password must contain at least one special character',
        function (v: string) {
          return v === this.password || 'Passwords do not match'
        }.bind(this)
      ]
    }
  },
  methods: {
    async submit() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      try {
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password updated',
          life: 3000
        })
        setTimeout(() => {
          this.$router.push({ name: 'splash' })
        }, 2000)
      } catch (error) {}
    },
    toggleDarkMode() {
      console.log(this.isdarkmode)
      if (this.isdarkmode === true) {
        this.isdarkmode = false
        console.log(this.isdarkmode)
      } else {
        this.isdarkmode = true
        console.log(this.isdarkmode)
      }
      localStorage.setItem('theme', this.isdarkmode) // save the theme to session storage
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    }
  }
})
</script>
