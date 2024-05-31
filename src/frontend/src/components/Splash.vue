<template>
  <v-app :style="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color">
    <v-layout>
      <!-- Toolbar -->
      <v-app-bar
        app
        :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>
          <span class="colorAccent toolbar-text">Work</span>
          <span class="colorAccent2 toolbar-text">Wise</span>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="toggleDarkMode">Theme change</v-btn>
      </v-app-bar>
      <!-- Main Content -->
      <v-main>
        <v-sheet :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color">
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
                    <v-sheet
                      width="500"
                      height="600"
                      border="md"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                      rounded="xl"
                    >
                      <v-col>
                        <v-col>
                          <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                            Log into existing account
                          </h4></v-col
                        >
                        <v-spacer></v-spacer>
                        <v-col
                          ><v-form ref="form" v-model="valid">
                            <v-row align="center"
                              ><v-col
                                ><label for="email" style="font-size: 20px; font-weight: lighter"
                                  >Email</label
                                >

                                <v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your username"
                                  type="email"
                                  v-model="username"
                                  :rules="usernameRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                ></v-text-field
                              ></v-col>
                            </v-row>
                            <v-row align="center"
                              ><v-col
                                ><label for="password" style="font-size: 20px; font-weight: lighter"
                                  >Password</label
                                >
                                <v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your password"
                                  type="password"
                                  v-model="password"
                                  :rules="passwordRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                ></v-text-field></v-col
                            ></v-row>
                          </v-form>
                        </v-col>

                        <v-col cols="8" offset="2">
                          <v-btn
                            :disabled="!valid"
                            text
                            @click="testRequest"
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
                  <!-- Flow 1 -->
                  <v-dialog v-model="signupDialog" max-width="500" style="height: 700px">
                    <v-sheet
                      elevation="14"
                      rounded="xl"
                      width="500"
                      height="700"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                    >
                      <v-col>
                        <v-col>
                          <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                            Create an account
                          </h4></v-col
                        >
                        <v-spacer></v-spacer>

                        <v-col>
                          <v-form ref="form" v-model="valid">
                            <v-row align="center"
                              ><v-col>
                                <label>Email</label>
                                <v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your email"
                                  type="email"
                                  v-model="email"
                                  :rules="emailRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                ></v-text-field></v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>Password</label>
                                <v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your password"
                                  type="password"
                                  v-model="password"
                                  :rules="passwordRules"
                                  rounded="xl"
                                  variant="solo"
                                  aria-placeholder="Enter your password"
                                ></v-text-field></v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>Confirm Password</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Confirm your Password"
                                  type="password"
                                  v-model="confirm_password"
                                  :rules="[(v) => v === password || 'Passwords do not match']"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                ></v-text-field></v-col
                            ></v-row>
                          </v-form>
                        </v-col>
                        <v-col cols="8" offset="2">
                          <v-btn
                            :disabled="!valid"
                            text
                            @click="nextFlow1"
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
                  <!-- Flow 2 -->
                  <v-dialog v-model="signup1Dialog" max-width="500" style="height: 700px">
                    <v-sheet
                      width="500"
                      height="700"
                      border="md"
                      rounded="xl"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                    >
                      <v-col>
                        <v-col>
                          <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                            Create your profile
                          </h4></v-col
                        >
                        <v-spacer></v-spacer>
                        <v-col>
                          <v-form ref="form" v-model="valid">
                            <v-row align="center"
                              ><v-col
                                ><label>Name</label>
                                <v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your name"
                                  type="input"
                                  v-model="name"
                                  :rules="nameRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                ></v-text-field
                              ></v-col>
                            </v-row>
                            <v-row
                              ><v-col
                                ><label>Surname</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your surname"
                                  type="input"
                                  v-model="surname"
                                  :rules="surnameRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                  aria-placeholder="E1nter your password"
                                ></v-text-field></v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>Username</label>
                                <v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your display name"
                                  type="input"
                                  v-model="username"
                                  :rules="usernameRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                ></v-text-field></v-col
                            ></v-row>
                          </v-form>
                        </v-col>
                        <v-col cols="8" offset="2">
                          <v-btn
                            :disabled="!valid"
                            text
                            @click="nextFlow2"
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
                  <!-- Flow 3 -->
                  <v-dialog v-model="signup2Dialog" max-width="500" style="height: 700px">
                    <v-sheet
                      width="500"
                      height="700"
                      border="md"
                      rounded="xl"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                    >
                      <v-col>
                        <v-col>
                          <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                            Create your profile
                          </h4></v-col
                        >
                        <v-spacer></v-spacer>
                        <v-col>
                          <v-form ref="form" v-model="valid">
                            <v-row justify="space-around"
                              ><v-col
                                ><v-date-picker width="400" color="primary"></v-date-picker
                              ></v-col>
                            </v-row>
                            <v-row algin="center"
                              ><v-col
                                ><label>Gender</label>
                                <v-select
                                  color="grey-lighten-4"
                                  label="Gender"
                                  hint="Chose your gender"
                                  :items="genderList"
                                  :rules="gender_rules"
                                  v-model="gender"
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
                                  :items="languageList"
                                  :rules="language_rules"
                                  v-model="language"
                                  rounded="xl"
                                  variant="solo"
                                  clearable
                                >
                                </v-select></v-col
                            ></v-row>
                          </v-form>
                        </v-col>

                        <v-col cols="8" offset="2">
                          <v-btn
                            :disabled="!valid"
                            text
                            @click="nextFlow3"
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
                  <!-- Flow 4 -->
                  <v-dialog v-model="signupAddressDialog" max-width="1000" style="height: 1200px">
                    <v-sheet
                      width="1000"
                      height="1200"
                      border="md"
                      rounded="xl"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                    >
                      <v-col>
                        <v-col>
                          <h4 class="text-center" style="font-size: 30px; font-weight: lighter">
                            Enter your residential details
                          </h4></v-col
                        >
                        <v-spacer></v-spacer>
                        <v-col>
                          <v-form ref="form" v-model="valid">
                            <v-row justify="space-around"
                              ><v-col
                                ><label>Street</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your street name"
                                  type="input"
                                  v-model="street"
                                  :rules="streetRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                >
                                </v-text-field>
                              </v-col>
                            </v-row>
                            <v-row algin="center"
                              ><v-col
                                ><label>Suburb</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your suburb name"
                                  type="input"
                                  v-model="suburb"
                                  :rules="suburbRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                >
                                </v-text-field> </v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>City</label
                                ><v-select
                                  label="Enter your city name"
                                  type="input"
                                  v-model="city"
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  :rules="cityRules"
                                  rounded="xl"
                                  variant="solo"
                                  :items="cityList"
                                  required
                                ></v-select></v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>Postal Code</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your postal code"
                                  type="input"
                                  v-model="postal_code"
                                  :rules="postalCodeRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                >
                                </v-text-field></v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>Complex</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your complex name"
                                  type="input"
                                  v-model="complex"
                                  :rules="complexRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                >
                                </v-text-field></v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>House Number</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your house number"
                                  type="input"
                                  v-model="houseNumber"
                                  :rules="houseRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                >
                                </v-text-field></v-col
                            ></v-row>
                            <v-row
                              ><v-col
                                ><label>Phone Number</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your phone number"
                                  type="input"
                                  v-model="phone_number"
                                  :rules="phoneNumberRules"
                                  rounded="xl"
                                  variant="solo"
                                  required
                                >
                                </v-text-field></v-col
                            ></v-row>
                          </v-form>
                        </v-col>

                        <v-col cols="8" offset="2">
                          <v-btn
                            :disabled="!valid"
                            text
                            @click="nextFlowAddress"
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
                            @click="(signup2Dialog = true)((signupAddressDialog = false))"
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
                  <!-- Flow 5 -->
                  <v-dialog v-model="signup3Dialog" max-width="500" style="height: 750px">
                    <v-sheet
                      width="400"
                      height="350"
                      border="md"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                      rounded="xl"
                    >
                      <v-container
                        ><v-row
                          ><v-col align-self="center"
                            ><v-col cols="8" offset="2">
                              <v-btn
                                text
                                @click="nextFlow4"
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
                                @click="nextFlow4"
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
        </v-sheet>
      </v-main>
    </v-layout>
  </v-app>
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
import axios from 'axios'
import * as bcrypt from 'bcryptjs'

export default {
  data: () => ({
    saltRounds: 10,

    loginDialog: false,
    signupDialog: false,
    signup1Dialog: false,
    signup2Dialog: false,
    signup3Dialog: false,
    signupAddressDialog: false,
    genderList: ['Male', 'Female', 'Other'],
    languageList: ['English', 'French', 'Portuguese'],
    cityList: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Bloemfontein'],
    email: '',
    password: '',
    confirm_password: '',
    encryptedPassword: '',
    name: '',
    surname: '',
    username: '',
    gender: '',
    language: '',
    street: '',
    city: '',
    suburb: '',
    postal_code: '',
    complex: '',
    houseNumber: '',
    phone_number: '',
    email: '',
    skils: '',
    roles: '',
    url: 'http://localhost:3000/users',
    valid: true,
    isdarkmode: true,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    usernameRules: [(v) => !!v || 'Username is required'],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 8 || 'Password must be at least 8 characters',
      (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
      (v) => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
      (v) => /[0-9]/.test(v) || 'Password must contain at least one number',
      (v) => /[^A-Za-z0-9]/.test(v) || 'Password must contain at least one special character'
    ],
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length >= 3 || 'Name must be at least 3 characters',
      (v) => /^[a-zA-Z]*$/.test(v) || 'Name must contain only letters'
    ],
    surnameRules: [
      (v) => !!v || 'Surname is required',
      (v) => v.length >= 3 || 'Surname must be at least 3 characters'
    ],
    usernameRules: [
      (v) => !!v || 'Username is required',
      (v) => v.length >= 3 || 'Username must be at least 3 characters'
    ],
    date_rules: [
      (v) => !!v || 'Date of birth is required',
      (v) => v.length >= 3 || 'Date of birth must be at least 3 characters'
    ],
    gender_rules: [(v) => !!v || 'Please select your gender'],
    language_rules: [(v) => !!v || 'Please select your preferred language'],
    streetRules: [(v) => !!v || 'Street name is required'],
    suburbRules: [(v) => !!v || 'Suburb name is required'],
    cityRules: [(v) => !!v || 'City name is required'],
    postalCodeRules: [(v) => !!v || 'Postal code is required'],
    complexRules: [(v) => !!v || 'Complex name is required'],
    houseRules: [
      (v) => !!v || 'House number is required',
      (v) => /^[0-9]*$/.test(v) || 'House number must contain only numbers'
    ],
    phoneNumberRules: [
      (v) => !!v || 'Phone number is required',
      (v) => v.length >= 10 || 'Phone number must be at least 10 characters',
      (v) => /^[0-9]*$/.test(v) || 'Phone number must contain only numbers'
    ]
  }),
  methods: {
    login() {
      if (this.$refs.form.validate())
        if (this.email === 'admin' && this.password === 'admin') {
          axios.get('http://localhost:3000/users')
          this.$router.push('/dashboard')
        }
    },
    testRequest() {
      axios
        .get('http://localhost:3000/', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signup() {
      this.encryptedPassword = bcrypt.hashSync(
        this.password,
        this.saltRounds,
        function (err, hash) {
          if (err) {
            console.log(err)
          }
          console.log(hash)
        }
      )
      // axios.post('http://localhost:3000/users', {
      //   systemDetails: { email: this.email, password: this.encryptedPassword, username: this.username },
      //   personalInfo: { firstname: this.name, surname: this.surname },
      //   profile: { displayName: this.username },
      //   roles: { plumber: true },
      //   joinedCompanies: {},
      //   skills: { None: true },
      //   address: {},
      //   contactInfo: {}
      // })
      this.$router.push('/dashboard')
    },
    nextFlow1() {
      if (this.$refs.form.validate()) {
        this.signupDialog = false
        this.signup1Dialog = true
      }
    },
    nextFlow2() {
      if (this.$refs.form.validate()) {
        this.signup1Dialog = false
        this.signup2Dialog = true
      }
    },
    nextFlow3() {
      if (this.$refs.form.validate()) {
        this.signup2Dialog = false
        this.signupAddressDialog = true
      }
    },
    nextFlowAddress() {
      if (this.$refs.form.validate()) {
        this.signupAddressDialog = false
        this.signup3Dialog = true
      }
    },
    nextFlow4() {
      this.signup3Dialog = false
      this.signup()
    },
    changeTheme() {},
    openDialog() {
      this.dialog = true
    },
    submit() {
      if (this.$refs.form.validate()) {
      }
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
  height: 80px;
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
