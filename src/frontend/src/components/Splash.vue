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
      <!-- <v-switch label="Theme"></v-switch> -->
    </v-app-bar>
    <!-- Main Content -->
    <v-main>
      <v-container fluid fill-height>
        <v-row>
          <!-- Left Half -->
          <v-col cols="6" align-self="center">
            <v-col>
              <h1 class="splash-title header-title text-center">
                Welcome To <span class="colorAccent">Work</span>
                <span class="colorAccent2">Wise</span> Central
              </h1>
            </v-col>
            <v-col>
              <v-col offset="4"
                ><v-btn
                  color="blue-accent-2"
                  dark
                  @click="loginDialog = true"
                  rounded="xl"
                  align-center
                  justify-center
                  class="my-3 button-width button-height text-center"
                  size="x-large"
                >
                  Log in
                </v-btn></v-col
              >

              <v-dialog v-model="loginDialog" max-width="500" style="height: 700px">
                <v-sheet width="500" height="600" border="md" color="" rounded="xl">
                  <v-col>
                    <v-col>
                      <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                        Log into existing account
                      </h4></v-col
                    >
                    <v-spacer></v-spacer>
                    <v-col>
                      <v-row align="center"
                        ><v-col
                          ><label for="email" style="font-size: 20px; font-weight: lighter"
                            >Email</label
                          >
                          <v-text-field
                            color="grey-lighten-3"
                            label="Enter your email"
                            type="email"
                            v-model="email"
                            rounded="xl"
                            variant="solo"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-row align="center"
                        ><v-col
                          ><label for="password" style="font-size: 20px; font-weight: lighter"
                            >Password</label
                          >
                          <v-text-field
                            color="grey-lighten-4"
                            label="Enter your password"
                            type="password"
                            v-model="password"
                            rounded="xl"
                            variant="solo"
                          ></v-text-field></v-col
                      ></v-row>
                    </v-col>

                    <v-col cols="8" offset="2">
                      <v-btn
                        text
                        @click="login"
                        rounded="xl"
                        size="x-large"
                        color="blue-accent-2"
                        variant="elevated"
                        width="100%"
                        >Login</v-btn
                      >
                    </v-col>
                    <v-col cols="8" offset="2">
                      <v-btn
                        text
                        @click="(signupDialog = true)((loginDialog = false))"
                        rounded="xl"
                        color="blue-grey-darken-1"
                        size="x-large"
                        variant="elevated"
                        width="100%"
                      >
                        Sign up</v-btn
                      >
                    </v-col>
                  </v-col>
                </v-sheet>
              </v-dialog>

              <v-col offset="4"
                ><v-btn
                  color="blue-grey-darken-1"
                  dark
                  @click="signupDialog = true"
                  rounded="xl"
                  align-center
                  class="my-3 button-width button-height text-center"
                  size="x-large"
                >
                  Sign up
                </v-btn></v-col
              >

              <v-dialog v-model="signupDialog" max-width="500" style="height: 700px">
                <v-sheet elevation="14" rounded="xl" width="500" height="700">
                  <v-col>
                    <v-col>
                      <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                        Create an account
                      </h4></v-col
                    >
                    <v-spacer></v-spacer>

                    <v-col>
                      <v-row align="center"
                        ><v-col>
                          <label>Email</label>
                          <v-text-field
                            color="grey-lighten-4"
                            label="Enter your email"
                            type="email"
                            v-model="email"
                            rounded="xl"
                            variant="solo"
                          ></v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label>Password</label>
                          <v-text-field
                            color="grey-lighten-4"
                            label="Enter your password"
                            type="password"
                            v-model="password"
                            rounded="xl"
                            variant="solo"
                            aria-placeholder="Enter your password"
                          ></v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label>Confirm Password</label
                          ><v-text-field
                            color="grey-lighten-4"
                            label="Confirm your Password"
                            type="password"
                            v-model="password"
                            rounded="xl"
                            variant="solo"
                          ></v-text-field></v-col
                      ></v-row>
                    </v-col>
                    <v-col cols="8" offset="2">
                      <v-btn
                        text
                        @click="(signupDialog = false), (signup1Dialog = true)"
                        rounded="xl"
                        boarder="xl"
                        width="100%"
                        size="x-large"
                        variant="elevated"
                        color="blue-accent-2"
                        >Continue</v-btn
                      > </v-col
                    ><v-col cols="8" offset="2">
                      <v-btn
                        @click="(loginDialog = true), (signupDialog = false)"
                        rounded="xl"
                        width="100%"
                        size="x-large"
                        variant="elevated"
                        color="blue-grey-darken-1"
                        >Log in</v-btn
                      >
                    </v-col>
                  </v-col>
                </v-sheet>
              </v-dialog>

              <v-dialog v-model="signup1Dialog" max-width="500" style="height: 700px">
                <v-sheet width="500" height="700" border="md" color="" rounded="xl">
                  <v-col>
                    <v-col>
                      <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                        Create your profile
                      </h4></v-col
                    >
                    <v-spacer></v-spacer>
                    <v-col>
                      <v-row align="center"
                        ><v-col
                          ><label>Name</label>
                          <v-text-field
                            color="grey-lighten-4"
                            label="Enter your name"
                            type="input"
                            v-model="name"
                            rounded="xl"
                            variant="solo"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-row
                        ><v-col
                          ><label>Surname</label
                          ><v-text-field
                            color="grey-lighten-4"
                            label="Enter your surname"
                            type="input"
                            v-model="surname"
                            rounded="xl"
                            variant="solo"
                            aria-placeholder="E1nter your password"
                          ></v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label>Display Name</label>
                          <v-text-field
                            color="grey-lighten-4"
                            label="Enter your display name"
                            type="input"
                            v-model="display_name"
                            rounded="xl"
                            variant="solo"
                          ></v-text-field></v-col
                      ></v-row>
                    </v-col>
                    <v-col cols="8" offset="2">
                      <v-btn
                        text
                        @click="(signup1Dialog = false)((signup2Dialog = true))"
                        rounded="xl"
                        size="x-large"
                        color="blue-accent-2"
                        variant="elevated"
                        width="100%"
                        >Continue</v-btn
                      >
                    </v-col>
                    <v-col cols="8" offset="2">
                      <v-btn
                        @click="(signupDialog = true)((signup1Dialog = false))"
                        rounded="xl"
                        color="blue-grey-darken-1"
                        size="x-large"
                        variant="elevated"
                        width="100%"
                        >Back</v-btn
                      >
                    </v-col>
                  </v-col>
                </v-sheet>
              </v-dialog>

              <v-dialog v-model="signup2Dialog" max-width="500" style="height: 700px">
                <v-sheet width="500" height="700" border="md" color="" rounded="xl">
                  <v-col>
                    <v-col>
                      <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                        Create your profile
                      </h4></v-col
                    >
                    <v-spacer></v-spacer>
                    <v-col>
                      <v-row
                        ><v-col
                          ><label>Date of Birth</label
                          ><v-text-field
                            color="grey-lighten-4"
                            label="Date of birth"
                            type="input"
                            v-model="date"
                            rounded="xl"
                            variant="solo"
                            clearable
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-row algin="center"
                        ><v-col
                          ><label>Gender</label>
                          <v-select
                            color="grey-lighten-4"
                            label="Gender"
                            hint="Chose your gender"
                            rounded="xl"
                            variant="solo"
                            clearable
                          >
                          </v-select></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label>Preferred Language</label>
                          <v-select
                            color="grey-lighten-4"
                            label="Preferred Language"
                            hint="Chose your preferred language"
                            rounded="xl"
                            variant="solo"
                            clearable
                          >
                          </v-select></v-col
                      ></v-row>
                    </v-col>

                    <v-col cols="8" offset="2">
                      <v-btn
                        text
                        @click="(signup2Dialog = false)((signup3Dialog = true))"
                        rounded="xl"
                        size="x-large"
                        color="blue-accent-2"
                        variant="elevated"
                        width="100%"
                        >Continue</v-btn
                      >
                    </v-col>
                    <v-col cols="8" offset="2">
                      <v-btn
                        @click="(signup1Dialog = true)((signup2Dialog = false))"
                        rounded="xl"
                        color="blue-grey-darken-1"
                        size="x-large"
                        variant="elevated"
                        width="100%"
                        >Back</v-btn
                      >
                    </v-col>
                  </v-col>
                </v-sheet>
              </v-dialog>
              <v-dialog v-model="signup3Dialog" max-width="500" style="height: 700px">
                <v-sheet width="500" height="250" border="md" color="" rounded="xl">
                  <v-container
                    ><v-row
                      ><v-col align-self="center"
                        ><v-col cols="8" offset="2">
                          <v-btn
                            text
                            @click="(signup2Dialog = false)(signup)"
                            rounded="xl"
                            color="blue-accent-2"
                            variant="elevated"
                            width="100%"
                            align-center
                            justify-center
                            class="my-3 button-width button-height text-center"
                            size="x-large"
                            >Register a company</v-btn
                          >
                        </v-col>
                        <v-col cols="8" offset="2">
                          <v-btn
                            @click="((signup2Dialog = false))"
                            rounded="xl"
                            color="blue-grey-darken-1"
                            variant="elevated"
                            width="100%"
                            align-center
                            justify-center
                            class="my-3 button-width button-height text-center"
                            size="x-large"
                            >Join a company</v-btn
                          >
                        </v-col></v-col
                      ></v-row
                    ></v-container
                  >
                </v-sheet>
              </v-dialog>
              <p class="text-center">
                By clicking Continue to join or sign in, you agree to WorkWise Central’s User
                Agreement, Privacy Policy, and Cookie Policy
              </p>
            </v-col>
          </v-col>

          <!-- Right Half -->
          <v-col cols="6">
            <div class="w-full h-full">
              <v-img
                src="/img/splash2.png"
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
  VDialog,
  VSpacer,
  VContainer,
  VCol,
  VRow,
  VApp,
  VImg,
  VSelect,
  VLayout,
  VMain,
  VSwitch
} from 'vuetify/components'

export default {
  data: () => ({
    loginDialog: false,
    signupDialog: false,
    signup1Dialog: false,
    signup2Dialog: false,
    signup3Dialog: false,
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
    VDialog,
    VSpacer,
    VContainer,
    VCol,
    VRow,
    VApp,
    VImg,
    VSelect,
    VLayout,
    VMain,
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
