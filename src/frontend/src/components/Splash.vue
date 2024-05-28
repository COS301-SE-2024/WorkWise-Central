<template>
  <v-container class="fill-height text center d-flex-column justify-center align-center">
    <v-row>
      <v-col cols="6">
        <div>
          <h1 class="splash-title header-title">
            Welcome To <span class="colorAccent">Work</span
            ><span class="colorAccent2">Wise</span> Central
          </h1>
        </div>

        <div>
          <v-btn
            color="colorAccent"
            dark
            @click="loginDialog = true"
            rounded="xl"
            align-center
            class="my-3 button-width button-height"
            >Log in</v-btn
          >
          <v-dialog v-model="loginDialog" max-width="500">
            <v-card prepend-icon="mdi-account" title="Log into existing account" rounded="xl">
              <v-card-text>
                <v-text-field
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-btn
          color="primary"
          dark
          @click="signupDialog = true"
          rounded="xl"
          align-center
          class="my-3 button-width button-height"
          >Sign up</v-btn
        >
        <v-dialog v-model="signupDialog" max-width="500" max-height="400">
          <v-card
            prepend-icon="mdi-account"
            title="Create an account"
            rounded="xl"
            max-height="600"
          >
            <v-card-text>
              <v-text-field
                label="Enter your email"
                prepend-icon="mdi-email"
                type="email"
                v-model="email"
                aria-placeholder="Enter your email address"
              ></v-text-field>
              <v-text-field
                label="Enter your password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                aria-placeholder="Enter your password"
              ></v-text-field>
              <v-text-field
                label="Confirm your Password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="nextFlow" rounded="xl">Sign up</v-btn>
              <v-btn color="primary" @click="login" rounded="xl">Log in</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-col cols="6">
      <img
        class="splash-image"
        src="C:\Users\Kumbirai\OneDrive\Documents\GitHub\WorkWise-Central\src\frontend\img\splash.jpg"
      />
    </v-col>
  </v-container>
</template>
<script>
import {
  VAppBar,
  VBtn,
  VTextField,
  VCard,
  VDialog,
  VCardActions,
  VCardText,
  VSpacer,
  VCardTitle,
  VContainer,
  VCol,
  VRow,
  VApp
} from 'vuetify/components'

export default {
  data: () => ({
    loginDialog: false,
    signupDialog: false,
    email: '',
    password: ''
  }),
  methods: {
    login() {
      // Implement login logic here
    },
    nextFlow() {},
    openDialog() {
      this.dialog = true
    }
  },
  components: {
    VAppBar,
    VBtn,
    VTextField,
    VCard,
    VDialog,
    VCardActions,
    VCardText,
    VSpacer,
    VCardTitle,
    VContainer,
    VCol,
    VRow,
    VApp
  }
}
</script>
<style scoped>
.header-title {
  font-size: 40px;
  font: 'Lato';
}
.fill-height {
  height: 100%;
}

.button-width {
  width: 400px;
}

.button-height {
  height: 100px;
}

.colorAccent {
  color: #6a99ce;
}
.colorAccent2 {
  color: #879898;
}
.text-start {
  text-align: start;
}

.splash-image {
  width: 140%;
  height: 100%;
  align-content: end;
}
</style>
