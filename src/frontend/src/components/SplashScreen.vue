<template>
  <v-app :style="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color">
    <!-- Toolbar -->
    <v-app-bar
      app
      :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
      dark
    >
      <v-app-bar-title>
        <span class="colorAccent toolbar-text">Work</span>
        <span class="colorAccent2 toolbar-text">Wise</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="toggleDarkMode"><v-icon>mdi-globe-light-outline</v-icon></v-btn>
    </v-app-bar>
    <!-- Main Content -->
    <v-main :class="{ 'modal-dark-theme': isdarkmode, 'modal-light-theme': !isdarkmode }">
      <v-row style="height: 1000px; width: 2000px" no-gutters>
        <!-- Left Half -->
        <v-col cols="6" sm="3" md="6" align-self="center">
          <v-row justify="center"
            ><v-col align-self="center">
              <h1
                :class="[
                  'splash-title',
                  'header-title',
                  'text-center',
                  { 'dark-theme-text': isdarkmode, 'light-theme-text': !isdarkmode }
                ]"
              >
                Welcome To <span class="colorAccent">Work</span>
                <span class="colorAccent2">Wise</span> Central
              </h1>
            </v-col></v-row
          >

          <v-col>
            <v-row justify="center">
              <v-col cols="8" offset="3"
                ><v-btn
                  color="#5A82AF"
                  dark
                  @click="loginDialog = true"
                  rounded="xl"
                  align-center
                  justify-center
                  class="my-3 button-width button-height text-center"
                  size="large"
                >
                  Log in
                </v-btn></v-col
              ></v-row
            >

            <v-dialog v-model="loginDialog" max-width="400" min-height="500">
              <v-sheet
                width="auto"
                height="auto"
                border="md"
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                rounded="xl"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Log into existing account
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>
                  <v-col
                    ><v-form ref="form" v-model="valid">
                      <v-row align="center"
                        ><v-col
                          ><label for="email" style="font-size: 14px; font-weight: lighter"
                            >Username</label
                          >

                          <v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="username ? '' : 'Enter your username'"
                            type="username"
                            name="username"
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
                          ><label for="password" style="font-size: 14px; font-weight: lighter"
                            >Password</label
                          >
                          <v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="password ? '' : 'Enter your password'"
                            type="password"
                            name="password"
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
                      @click="login"
                      rounded="xl"
                      size="large"
                      color="#5A82AF"
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
                      size="large"
                      variant="elevated"
                      width="100%"
                    >
                      Sign up</v-btn
                    >
                  </v-col>
                </v-col>
                <v-alert v-model="alertLogin" type="success">
                  You have successfully logged in!</v-alert
                >
                <v-alert v-model="alertLoginFailure" type="error">
                  Please enter valid credentials</v-alert
                >
              </v-sheet>
            </v-dialog>
            <v-row justify="center"
              ><v-col cols="8" offset="3"
                ><v-btn
                  color="blue-grey-darken-1"
                  dark
                  @click="signupDialog = true"
                  rounded="xl"
                  align-center
                  class="my-3 button-width button-height text-center"
                  size="large"
                >
                  Sign up
                </v-btn></v-col
              ></v-row
            >

            <!-- Flow 1 -->
            <v-dialog v-model="signupDialog" max-width="400" min-height="700">
              <v-sheet
                elevation="14"
                rounded="xl"
                width="auto"
                height="auto"
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Create an account
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>

                  <v-col>
                    <v-form ref="form" v-model="valid">
                      <v-row align="center"
                        ><v-col>
                          <label style="font-size: 14px; font-weight: lighter">Email</label>
                          <v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="email ? '' : 'Enter your email'"
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
                          ><label style="font-size: 14px; font-weight: lighter">Password</label>
                          <v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="password ? '' : 'Enter your password'"
                            type="password"
                            name="password"
                            v-model="password"
                            :rules="passwordRules"
                            rounded="xl"
                            variant="solo"
                            aria-placeholder="Enter your password"
                          ></v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter"
                            >Confirm Password</label
                          ><v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="confirm_password ? '' : 'Confirm your password'"
                            type="password"
                            name="confirm_password"
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
                      size="large"
                      variant="elevated"
                      color="#5A82AF"
                      >Continue</v-btn
                    > </v-col
                  ><v-col cols="8" offset="2">
                    <v-btn
                      @click="(loginDialog = true), (signupDialog = false)"
                      rounded="xl"
                      width="100%"
                      size="large"
                      variant="elevated"
                      color="blue-grey-darken-1"
                      >Log in</v-btn
                    >
                  </v-col>
                </v-col>
              </v-sheet>
            </v-dialog>
            <!-- Flow 2 -->
            <v-dialog v-model="signup1Dialog" max-width="400" min-height="700">
              <v-sheet
                width="auto"
                height="auto"
                border="md"
                rounded="xl"
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Create your profile
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-form ref="form" v-model="valid">
                      <v-row align="center"
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Name</label>
                          <v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="name ? '' : 'Enter your name'"
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
                          ><label style="font-size: 14px; font-weight: lighter">Surname</label
                          ><v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="surname ? '' : 'Enter your surname'"
                            type="input"
                            v-model="surname"
                            :rules="surnameRules"
                            rounded="xl"
                            variant="solo"
                            required
                            aria-placeholder="Enter your password"
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
                      size="large"
                      color="#5A82AF"
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
                      size="large"
                      variant="elevated"
                      width="100%"
                      >Back</v-btn
                    >
                  </v-col>
                </v-col>
              </v-sheet>
            </v-dialog>
            <v-col xs="3" align-self="center">
              <v-dialog v-model="signupUsernameDialog" max-width="400" min-height="700">
                <v-sheet
                  width="auto"
                  height="700"
                  border="md"
                  rounded="xl"
                  :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
                >
                  <v-col>
                    <v-col>
                      <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                        Create your profile
                      </h4></v-col
                    >
                    <v-form ref="form" v-model="valid">
                      <v-row
                        ><v-col align-self="center"
                          ><label style="font-size: 14px; font-weight: lighter">Username</label>
                          <v-combobox
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="username ? '' : 'Select your username'"
                            v-model="username"
                            :items="usernameList"
                            :rules="usernameRules"
                            rounded="xl"
                            variant="solo"
                            clearable
                            required
                            @update:modalValue="usernameExist"
                          ></v-combobox></v-col
                      ></v-row>
                    </v-form>
                  </v-col>
                  <v-col cols="8" offset="2">
                    <v-btn
                      :disabled="!valid"
                      text
                      @click="nextFlowUsername"
                      rounded="xl"
                      size="large"
                      color="#5A82AF"
                      variant="elevated"
                      width="100%"
                      >Continue</v-btn
                    ></v-col
                  >
                </v-sheet>
              </v-dialog>
            </v-col>
            <!-- Flow 3 -->
            <v-dialog v-model="signup2Dialog" max-width="400" min-height="800">
              <v-sheet
                width="auto"
                height="auto"
                border="md"
                rounded="xl"
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Create your profile
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-form ref="form" v-model="valid">
                      <v-row align="center"
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Date of Birth</label
                          ><VueDatePicker
                            :label="birthDate ? '' : 'Select your date of birth'"
                            v-model="birthDate"
                            :rules="date_rules"
                            :format="format"
                            required
                            :flow="flow"
                          ></VueDatePicker
                        ></v-col>
                      </v-row>
                      <v-row algin="center"
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Gender</label>
                          <v-select
                            :label="gender ? '' : 'Select your gender'"
                            hint="Chose your gender"
                            :items="genderList"
                            :rules="gender_rules"
                            v-model="gender"
                            rounded="xl"
                            variant="solo"
                            clearable
                            required
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                          >
                          </v-select></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter"
                            >Preferred Language</label
                          >
                          <v-select
                            color="grey-lighten-4"
                            :label="language ? '' : 'Select your preferred language'"
                            hint="Chose your preferred language"
                            :items="languageList"
                            :rules="language_rules"
                            v-model="language"
                            rounded="xl"
                            variant="solo"
                            clearable
                            required
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
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
                      size="large"
                      color="#5A82AF"
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
                      size="large"
                      variant="elevated"
                      width="100%"
                      >Back</v-btn
                    >
                  </v-col>
                </v-col>
              </v-sheet>
            </v-dialog>
            <!-- Flow 4 -->
            <v-dialog v-model="signupAddressDialog" max-width="1000" min-height="900">
              <v-sheet
                width="auto"
                height="auto"
                border="md"
                rounded="xl"
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Enter your residential details
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-form ref="form" v-model="valid">
                      <v-row justify="space-around"
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Street</label
                          ><v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="street ? '' : 'Enter your street name'"
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
                          ><label style="font-size: 14px; font-weight: lighter">Suburb</label
                          ><v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="suburb ? '' : 'Enter your suburb name'"
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
                          ><label style="font-size: 14px; font-weight: lighter">City</label
                          ><v-select
                            :label="city ? '' : 'Select your city'"
                            type="input"
                            v-model="city"
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
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
                          ><label style="font-size: 14px; font-weight: lighter">Postal Code</label
                          ><v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="postal_code ? '' : 'Enter your postal code'"
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
                          ><label style="font-size: 14px; font-weight: lighter">Phone Number</label
                          ><v-text-field
                            :bg-color="
                              isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                            "
                            :label="phone_number ? '' : 'Enter your phone number'"
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
                      size="large"
                      color="#5A82AF"
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
                      size="large"
                      variant="elevated"
                      width="100%"
                      >Back</v-btn
                    >
                  </v-col>
                </v-col>
              </v-sheet>
            </v-dialog>
            <!-- Flow 5 -->
            <v-dialog v-model="signup3Dialog" max-width="700" style="height: 750px">
              <!-- <v-sheet
                :bg-color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
              > -->
              <v-card
                class="mx-auto"
                width="400"
                :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color"
              >
                <template v-slot:title>
                  <span class="font-weight-light">Please select one of the two options</span>
                </template>
                <v-card-actions>
                  <v-col cols="6"> <RegisterCompanyModal :isdarkmode="isdarkmode" /> </v-col
                  ><v-col cols="6"> <JoinCompanyModal :isdarkmode="isdarkmode" /></v-col
                ></v-card-actions>
              </v-card>

              <!-- </v-sheet> -->
            </v-dialog>

            <!-- Register Company Modal -->

            <p
              class="text-center"
              :class="{ 'light-theme-text': !isdarkmode, 'dark-theme-text': isdarkmode }"
            >
              By clicking Continue to join or sign in, you agree to WorkWise Central's User
              Agreement, Privacy Policy, and Cookie Policy
            </p>
          </v-col>
        </v-col>

        <!-- Right Half -->
        <v-col cols="6" sm="3" md="6">
          <div class="w-full h-full background-image"></div>
        </v-col>
      </v-row>
      <v-footer :color="isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" sm="6">
              <span>&copy; 2024 WorkWise Central</span>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-main>
  </v-app>
</template>
<script>
import RegisterCompanyModal from './RegisterCompanyModal.vue'
import JoinCompanyModal from './JoinCompanyModal.vue'
import axios from 'axios'
import { defineComponent } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  components: {
    RegisterCompanyModal,
    JoinCompanyModal,
    VueDatePicker
  },
  data: () => ({
    click_create_client: false,
    saltRounds: 10,
    loginDialog: false,
    alertSignUp: false,
    alertSignUpFailure: false,
    alertLogin: false,
    signupDialog: false,
    signup1Dialog: false,
    signup2Dialog: false,
    signupUsernameDialog: false,
    signup3Dialog: false,
    alertLoginFailure: false,
    joinDialog: false,
    registerDialog: false,
    exists: false,
    signupAddressDialog: false,
    genderList: ['Male', 'Female', 'Other'],
    languageList: [
      'English',
      'Afrikaans',
      'isiNdebele',
      'isiXhosa',
      'isiZulu',
      'Sesotho',
      'Setswana',
      'Sepedi',
      'Siswati',
      'Tshivenda',
      'Xitsonga'
    ],
    cityList: [
      'Johannesburg',
      'Cape Town',
      'Durban',
      'Pretoria',
      'Bloemfontein',
      'Port Elizabeth',
      'East London',
      'Kimberley',
      'Polokwane',
      'Nelspruit',
      'Pietermaritzburg',
      'George',
      'Rustenburg',
      'Stellenbosch',
      'Grahamstown (now Makhanda)',
      'Vereeniging',
      'Tzaneen',
      'Upington',
      'Richards Bay',
      'Potchefstroom'
    ],
    randomNumber: 0,
    email: '',
    flow: ['year', 'month', 'calendar'],
    access_token: '',
    password: '',
    confirm_password: '',
    date: '',
    name: '',
    surname: '',
    username: '',
    gender: '',
    birthDate: null,
    language: '',
    street: '',
    city: '',
    dummyUsername: '',
    suburb: '',
    postal_code: '',
    complex: '',
    houseNumber: '',
    phone_number: '',
    skills: [],
    currentCompany: {},
    profilePicture: '',
    usernameList: [],
    resetForm() {
      this.$refs.form.reset()
    },
    validateForm() {
      console.log(this.$refs.form)
      if (this.$refs.form.validate()) {
        console.log('Valid form')
        return true
      } else {
        console.log('Invalid form')
        return false
      }
    },
    req_obj1: {
      name: '',
      type: '',
      registrationNumber: '',
      vatNumber: '',
      contactDetails: {
        email: '',
        phoneNumber: ''
      },
      address: {
        street: '',
        suburb: '',
        city: '',
        postalCode: '',
        complex: '',
        houseNumber: ''
      }
    },
    skils: '',
    roles: '',
    url: 'http://localhost:3000/users',
    valid: true,
    isdarkmode: true,
    light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
    dark_theme_text_color: 'color: #DCDBDB',
    modal_dark_theme_color: '#2b2b2b',
    modal_light_theme_color: '#FFFFFF',
    req_obj: {
      company_name: '',
      companyID: ''
    },
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
      // usernameExist() || 'Username already exists'
    ],
    date_rules: [
      (v) => !!v || 'Date of birth is required',
      (v) => v.length >= 3 || 'Date of birth must be at least 3 characters'
    ],
    company_name_rules: [
      (v) => !!v || 'Company name is required',
      (v) => /^[A-Z]/.test(v) || 'Company name must start with a capital letter',
      (v) => !/[ &-]$/.test(v) || 'Company name must not end with a space or special character',
      (v) => v.length <= 50 || 'Company name must be less than 50 characters',
      (v) =>
        /^[A-Z][a-zA-Z &-]{0,48}[a-zA-Z]$/.test(v) ||
        'Company name can contain both capital and lowercase letters, spaces, "&", or "-"'
    ],
    email_rules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    phone_number_rules: [
      (v) => !!v || 'Phone number is required',
      (v) => /^(\+27\d{9})$/.test(v) || 'Phone number must be a valid South African number'
    ],
    vat_number_rules: [
      (v) => !!v || 'VAT number is required',
      (v) => /^\d{10}$/.test(v) || 'VAT number must be a valid South African VAT number'
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
    populateUsernameList() {
      while (this.usernameList.length < 10) {
        this.randomNumber = Math.floor(Math.random() * 1000)
        this.username = this.name + this.surname + this.randomNumber
        this.usernameExist()
        if (!this.exists) {
          this.usernameList.push(this.username)
        }
      }
    },
    format(date) {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `Selected date is ${day}/${month}/${year}`
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    companyLogoHandler() {
      console.log('')
    },
    async login() {
      if (this.$refs.form.validate()) {
        await axios
          .post('http://localhost:3000/auth/login', {
            identifier: this.username,
            password: this.password
          })
          .then((response) => {
            console.log(response)
            console.log(response.data.access_token)
            sessionStorage.setItem('access_token', response.data.access_token)
            sessionStorage.setItem('id', response.data.id)
            this.alertLoginFailure = false
            this.alertLogin = true
            this.resetForm()
            this.$router.push('/dashboard')
          })
          .catch((error) => {
            console.log(error.response.data.message)
            this.alertLogin = false
            this.alertLoginFailure = true
          })
      }
    },
    birthDateFormatter(date) {
      this.date = new Date(date).toISOString()
    },
    async signup() {
      this.birthDateFormatter(this.birthDate)
      await axios
        .post('http://localhost:3000/users/create', {
          username: this.username,
          password: this.password,
          personalInfo: {
            firstName: this.name,
            surname: this.surname,
            dateOfBirth: this.date,
            gender: this.gender,
            preferredLanguage: this.language
          },
          address: {
            street: this.street,
            suburb: this.suburb,
            city: this.city,
            postalCode: this.postal_code,
            complex: this.complex,
            houseNumber: this.houseNumber
          },
          contactInfo: {
            phoneNumber: this.phone_number,
            email: this.email
          },
          profile: {
            displayName: this.name + ' ' + this.surname,
            displayImage: this.profilePicture
          },
          skills: this.skills,
          currentCompany: this.company
        })
        .then((response) => {
          console.log(response)
          this.alertSignUpFailure = false
          this.alertSignUp = true
          sessionStorage.setItem('access_token', response.data.access_token)
          sessionStorage.setItem('id', response.data.id)
          this.resetForm()
        })
        .catch((error) => {
          console.log(error)
          this.alertSignUp = false
          this.alertSignUpFailure = true
        })
    },
    nextFlow1() {
      this.signupDialog = false
      this.signup1Dialog = true
    },
    nextFlow2() {
      this.signup1Dialog = false
      this.signupUsernameDialog = true
      this.populateUsernameList()
    },
    nextFlowUsername() {
      if (this.usernameExist() === false) {
        alert('Username already exists')
      } else {
        this.signupUsernameDialog = false
        this.signup2Dialog = true
      }
    },
    nextFlow3() {
      this.signup2Dialog = false
      this.signupAddressDialog = true
    },
    nextFlowAddress() {
      this.signupAddressDialog = false
      this.signup3Dialog = true
      this.signup()
    },
    registerOpen() {
      this.registerDialog = true
      this.signup3Dialog = false
    },
    finalFlow() {
      this.signup3Dialog = false
      this.joinDialog = true
      this.signup()
    },
    usernameExist() {
      axios
        .post('http://localhost:3000/users/exists', {
          params: {
            username: this.username
          }
        })
        .then((response) => {
          console.log(response)
          this.exists = response
        })
        .catch((error) => {
          console.log(error)
        })
      return this.exists
    },
    openDialog() {
      this.dialog = true
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
  }
})
</script>
<style scoped>
.light-theme-text {
  color: rgb(0, 0, 0);
  opacity: 65%;
}

.dark-theme-text {
  color: #dcdbdb;
}

.modal-dark-theme {
  background-color: #2b2b2b;
}

.modal-light-theme {
  background-color: #ffffff;
}
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

.background-image {
  background-image: url('/img/WorkWiseLogo.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
}

.grad-class {
  background: #3a7bd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3a6073, #3a7bd5); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3a6073,
    #3a7bd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
