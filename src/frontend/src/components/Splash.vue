<template>
  <v-layout>
    <!-- Toolbar -->
    <v-app-bar app color="white" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="colorAccent toolbar-text">Work</span>
        <span class="colorAccent2 toolbar-text">Wise</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-switch label="Theme"></v-switch>
    </v-app-bar>
    <!-- Main Content -->
    <v-main>
      <v-container fluid fill-height>
        <v-row>
          <!-- Left Half -->
          <v-col cols="6" align-self="center">
            <div>
              <h1 class="splash-title header-title text-center">
                Welcome To <span class="colorAccent">Work</span>
                <span class="colorAccent2">Wise</span> Central
              </h1>
            </div>
            <div>
              <v-btn
                color="colorAccent"
                dark
                @click="loginDialog = true"
                rounded="xl"
                align-center
                justify-center
                class="my-3 button-width button-height text-center"
              >
                Log in
              </v-btn>
              <v-dialog v-model="loginDialog" max-width="500" style="height: 700px">
                <v-sheet></v-sheet>
                <v-card title="Log into existing account" rounded="xl">
                  <v-card-text>
                    <v-row dense>
                      <v-col>
                        <v-text-field
                          label="Email"
                          type="email"
                          v-model="email"
                          rounded="xl"
                          variant="solo"
                        ></v-text-field>
                        <v-text-field
                          label="Password"
                          type="password"
                          v-model="password"
                          rounded="xl"
                          variant="solo"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn text @click="login">Login</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text @click="(signupDialog = true)((loginDialog = false))"
                      >Sign up</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                color="primary"
                dark
                @click="signupDialog = true"
                rounded="xl"
                align-center
                class="my-3 button-width button-height text-center"
              >
                Sign up
              </v-btn>
              <v-dialog v-model="signupDialog" max-width="500" max-height="400">
                <v-sheet elevation="14" rounded="xl">
                  <v-card title="Create an account" rounded="xl" max-height="600">
                    <v-card-text>
                      <v-text-field
                        label="Enter your email"
                        type="email"
                        v-model="email"
                        rounded="xl"
                        variant="solo"
                        aria-placeholder="Enter your email address"
                      ></v-text-field>
                      <v-text-field
                        label="Enter your password"
                        type="password"
                        v-model="password"
                        rounded="xl"
                        variant="solo"
                        aria-placeholder="Enter your password"
                      ></v-text-field>
                      <v-text-field
                        label="Confirm your Password"
                        type="password"
                        v-model="password"
                        rounded="xl"
                        variant="solo"
                      ></v-text-field>
                    </v-card-text>
                    <v-col class="d-flex justify-center align-center">
                      <v-btn
                        text
                        @click="(signupDialog = false), (signup1Dialog = true)"
                        rounded="xl"
                        boarder="xl"
                        >Sign up</v-btn
                      >

                      <v-btn
                        color="primary"
                        @click="(loginDialog = true), (signupDialog = false)"
                        rounded="xl"
                        >Log in</v-btn
                      >
                    </v-col>
                  </v-card>
                </v-sheet>
              </v-dialog>
              <v-dialog v-model="signup1Dialog" max-width="500" max-height="400">
                <v-sheet elevation="14" rounded="xl">
                  <v-card title="Create your profile" rounded="xl" max-height="600">
                    <v-card-text>
                      <v-text-field
                        label="Enter your name"
                        type="input"
                        v-model="name"
                        rounded="xl"
                        variant="solo"
                      ></v-text-field>
                      <v-text-field
                        label="Enter your surname"
                        type="input"
                        v-model="surname"
                        rounded="xl"
                        variant="solo"
                        aria-placeholder="Enter your password"
                      ></v-text-field>
                      <v-text-field
                        label="Enter your display name"
                        type="input"
                        v-model="display_name"
                        rounded="xl"
                        variant="solo"
                      ></v-text-field>
                    </v-card-text>
                    <v-col class="d-flex justify-center align-center">
                      <v-btn
                        text
                        @click="(signup1Dialog = false)((signup2Dialog = true))"
                        rounded="xl"
                        >Continue</v-btn
                      >
                      <v-btn
                        color="primary"
                        @click="(signupDialog = true)((signup1Dialog = false))"
                        rounded="xl"
                        >Back</v-btn
                      >
                    </v-col>
                  </v-card>
                </v-sheet>
              </v-dialog>

              <v-dialog v-model="signup2Dialog" max-width="500" max-height="400">
                <v-sheet elevation="14" rounded="xl">
                  <v-card title="Create your profile" rounded="xl" max-height="600">
                    <v-card-text>
                      <v-text-field
                        label="Date of birth"
                        type="input"
                        v-model="date"
                        rounded="xl"
                        variant="solo"
                        clearable
                      ></v-text-field>
                      <v-select
                        label="Gender"
                        hint="Chose your gender"
                        rounded="xl"
                        variant="solo"
                        clearable
                      >
                      </v-select>
                      <v-select
                        label="Preferred Language"
                        hint="Chose your preferred language"
                        rounded="xl"
                        variant="solo"
                        clearable
                      >
                      </v-select>
                    </v-card-text>
                    <v-col class="d-flex justify-center align-center">
                      <v-btn text @click="(signup2Dialog = false)(signup)" rounded="xl"
                        >Continue</v-btn
                      >
                      <v-btn
                        color="primary"
                        @click="(signup1Dialog = true)((signup2Dialog = false))"
                        rounded="xl"
                        >Back</v-btn
                      >
                    </v-col>
                  </v-card>
                </v-sheet>
              </v-dialog>
              <p class="text-center">
                By clicking Continue to join or sign in, you agree to WorkWise Central’s User
                Agreement, Privacy Policy, and Cookie Policy
              </p>
            </div>
          </v-col>

          <!-- Right Half -->
          <v-col cols="6">
            <div class="w-full h-full">
              <v-img
                src="/img/splash.jpg"
                alt="splash"
                class="w-full h-full object-cover"
                rounded="xl"
              ></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
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
  VApp,
  VAvatar,
  VImg,
  VSelect,
  VToolbar,
  VToolbarTitle,
  VAppBarNavIcon,
  VLayout,
  VMain,
  VFooter,
  VDivider,
  VSwitch
} from 'vuetify/components'

export default {
  data: () => ({
    loginDialog: false,
    signupDialog: false,
    signup1Dialog: false,
    signup2Dialog: false,

    email: '',
    password: ''
  }),
  methods: {
    login() {},
    signup() {},
    nextFlow() {},
    changeTheme() {},
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
    VApp,
    VAvatar,
    VImg,
    VSelect,
    VToolbar,
    VToolbarTitle,
    VAppBarNavIcon,
    VLayout,
    VMain,
    VFooter,
    VDivider,
    VSwitch
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
.toolbar-text {
  font-size: 36px;
  font-display: 'Lato';
}
.background-image-column {
  /* Set the background image */
  background-image: url('C:\Users\Kumbirai\OneDrive\Documents\GitHub\WorkWise-Central\src\frontend\img\splash.jpg');
  /* Position the background image to fill the right side */
  background-position: right;
  background-size: cover; /* Auto width, full height */
  background-repeat: no-repeat;
  max-height: max-content;
}
</style>
