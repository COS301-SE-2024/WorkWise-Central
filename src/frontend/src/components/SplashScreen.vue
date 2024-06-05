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
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <v-col>
                  <h1 class="splash-title header-title text-center">
                    Welcome To <span class="colorAccent">Work</span>
                    <span class="colorAccent2">Wise</span> Central
                  </h1>
                </v-col>
                <v-col>
                  <v-col offset="4"
                    ><v-btn
                      v-model="loginButton"
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
                                  >Username</label
                                >

                                <v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Enter your username"
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
                      <v-alert v-model="alertLogin" type="success">
                        You have successfully logged in!</v-alert
                      >
                      <v-alert v-model="alertLoginFailure" type="error">
                        Please enter valid credentials</v-alert
                      >
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
                                ><label>Confirm Password</label
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  label="Confirm your Password"
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
                  <v-dialog v-model="signup2Dialog" max-width="500" style="height: 1100px">
                    <v-sheet
                      width="500"
                      height="1100"
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
                                ><label>Select your birth date</label
                                ><v-date-picker dark width="400" v-model="birthDate"></v-date-picker
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
                                  required
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
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
                                  required
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
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
                  <v-dialog v-model="signup3Dialog" max-width="700" style="height: 750px">
                    <v-sheet
                      width="700"
                      height="550"
                      border="md"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                      rounded="xl"
                    >
                      <v-container
                        ><v-row align-content="center"
                          ><v-col align-self="center"
                            ><v-col cols="8" offset="2">
                              <v-btn
                                text
                                @click="(registerDialog = true)((signup3Dialog = false))"
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
                                @click="finalFlow"
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
                      ><v-alert v-model="alertSignUp" type="success">Successful Sign up</v-alert>
                      <v-alert v-model="alertSignUpFailure" type="error">Sign up failed</v-alert>
                    </v-sheet>
                  </v-dialog>

                  <v-dialog max-width="500" height="800" v-model="joinDialog">
                    <v-sheet
                      elevation="14"
                      rounded="xl"
                      width="500"
                      height="800"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                    >
                      <v-form ref="form" v-model="valid">
                        <v-col>
                          <v-col>
                            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
                              Join Company
                            </h4></v-col
                          >
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-col>
                              <small
                                class="text-caption"
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                >Search for the company by name</small
                              >
                              <v-autocomplete
                                density="compact"
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                label="Company Name"
                                variant="solo"
                                rounded="xl"
                                v-model="req_obj.company_name"
                                :items="[
                                  'Plumber Tronics',
                                  'Nedbank',
                                  'FNB',
                                  'Talker',
                                  'Friends',
                                  'Wyoming'
                                ]"
                              ></v-autocomplete
                            ></v-col>
                            <v-container fill-height fluid>
                              <v-row align="center" justify="center">
                                <h2 style="font-weight: lighter">OR</h2>
                              </v-row>
                            </v-container>
                            <v-col>
                              <small
                                class="text-caption"
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                >Enter the Company ID</small
                              >
                              <v-text-field
                                density="compact"
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                label="Enter the company ID"
                                rounded="xl"
                                variant="solo"
                                v-model="req_obj.companyID"
                                required
                              ></v-text-field
                            ></v-col>
                          </v-col>
                          <v-col cols="8" offset="2" align="center">
                            <v-btn
                              text
                              rounded="xl"
                              boarder="xl"
                              width="85%"
                              height="35"
                              variant="elevated"
                              color="blue-accent-2"
                              :disabled="req_obj.company_name === '' && req_obj.companyID === ''"
                              @click="joinDialog = false"
                              >JOIN COMPANY</v-btn
                            >
                          </v-col>
                        </v-col>
                      </v-form>
                    </v-sheet>
                  </v-dialog>

                  <v-dialog max-width="500" height="800" v-model="registerDialog">
                    <v-sheet
                      elevation="14"
                      rounded="xl"
                      width="500"
                      height="800"
                      :color="
                        isdarkmode === true ? modal_dark_theme_color : modal_light_theme_color
                      "
                    >
                      <v-form ref="form" v-model="valid" @submit.prevent="registrationHandler">
                        <v-col>
                          <v-col>
                            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
                              Register your company
                            </h4></v-col
                          >
                          <v-spacer></v-spacer>
                          <v-col>
                            <v-col>
                              <small
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                class="text-caption"
                                >Company name*</small
                              >
                              <v-text-field
                                density="compact"
                                color="grey-lighten-4"
                                label="Enter the company's name"
                                v-model="req_obj1.name"
                                :rules="company_name_rules"
                                rounded="xl"
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                variant="solo"
                                required
                              ></v-text-field
                            ></v-col>
                            <v-col>
                              <small
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                class="text-caption"
                                >Type of business*</small
                              >
                              <v-autocomplete
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                density="compact"
                                color="grey-lighten-4"
                                label="Plumbing"
                                v-model="req_obj1.type"
                                rounded="xl"
                                variant="solo"
                                :items="registerList"
                              ></v-autocomplete>
                            </v-col>

                            <v-col>
                              <small
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                class="text-caption"
                                >Company email address</small
                              >
                              <v-text-field
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                density="compact"
                                color="grey-lighten-4"
                                label="Enter the company's email adress"
                                type="email"
                                v-model="req_obj1.contactDetails.email"
                                :rules="email_rules"
                                rounded="xl"
                                variant="solo"
                                required
                              ></v-text-field
                            ></v-col>
                            <v-col>
                              <small
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                class="text-caption"
                                >Company phone number</small
                              >
                              <v-text-field
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                density="compact"
                                color="grey-lighten-4"
                                label="Enter the company's phone number"
                                :rules="phone_number_rules"
                                rounded="xl"
                                variant="solo"
                                v-model="req_obj1.contactDetails.phoneNumber"
                                required
                              ></v-text-field
                            ></v-col>
                            <v-col>
                              <small
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                class="text-caption"
                                >Company registration number</small
                              >
                              <v-text-field
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                density="compact"
                                color="grey-lighten-4"
                                label="Enter the company's registration number"
                                type="number"
                                v-model="req_obj1.registrationNumber"
                                rounded="xl"
                                variant="solo"
                                required
                              ></v-text-field
                            ></v-col>

                            <v-col>
                              <small
                                :style="
                                  isdarkmode === true
                                    ? dark_theme_text_color
                                    : light_theme_text_color
                                "
                                class="text-caption"
                                >Company VAT number</small
                              >
                              <v-text-field
                                :bg-color="
                                  isdarkmode === true
                                    ? modal_dark_theme_color
                                    : modal_light_theme_color
                                "
                                density="compact"
                                color="grey-lighten-4"
                                label="Enter the company's VAT number"
                                :rules="vat_number_rules"
                                type="number"
                                rounded="xl"
                                v-model="req_obj1.vatNumber"
                                variant="solo"
                                required
                              ></v-text-field
                            ></v-col>

                            <small
                              :style="
                                isdarkmode === true ? dark_theme_text_color : light_theme_text_color
                              "
                              class="text-caption"
                              >Company address</small
                            >
                            <v-row>
                              <v-col
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  density="compact"
                                  color="grey-lighten-4"
                                  label="Street"
                                  rounded="xl"
                                  v-model="req_obj1.address.street"
                                  variant="solo"
                                  required
                                ></v-text-field
                              ></v-col>
                              <v-col
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  density="compact"
                                  color="grey-lighten-4"
                                  label="Suburb"
                                  rounded="xl"
                                  v-model="req_obj1.address.suburb"
                                  variant="solo"
                                  required
                                ></v-text-field
                              ></v-col>
                            </v-row>
                            <v-row>
                              <v-col
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  density="compact"
                                  color="grey-lighten-4"
                                  label="City"
                                  rounded="xl"
                                  v-model="req_obj1.address.city"
                                  variant="solo"
                                  required
                                ></v-text-field
                              ></v-col>
                              <v-col
                                ><v-text-field
                                  :bg-color="
                                    isdarkmode === true
                                      ? modal_dark_theme_color
                                      : modal_light_theme_color
                                  "
                                  density="compact"
                                  color="grey-lighten-4"
                                  label="Zip Code"
                                  rounded="xl"
                                  v-model="req_obj1.address.postalCode"
                                  variant="solo"
                                  required
                                ></v-text-field
                              ></v-col>
                            </v-row>
                          </v-col>
                          <v-col
                            :style="
                              isdarkmode === true ? dark_theme_text_color : modal_light_theme_color
                            "
                            cols="8"
                            offset="2"
                            align="center"
                          >
                            <v-btn
                              type="submit"
                              rounded="xl"
                              boarder="xl"
                              width="60%"
                              height="35"
                              variant="elevated"
                              color="blue-accent-2"
                              :disabled="click_create_client"
                              >Continue</v-btn
                            >
                          </v-col>
                        </v-col>
                      </v-form>
                    </v-sheet>
                  </v-dialog>
                  <p class="text-center">
                    By clicking Continue to join or sign in, you agree to WorkWise Central's User
                    Agreement, Privacy Policy, and Cookie Policy
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
  VMain
} from 'vuetify/components'
import axios from 'axios'
import { defineComponent } from 'vue'
import router from "@/router/index";

export default defineComponent({

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
    signup3Dialog: false,
    alertLoginFailure: false,
    joinDialog: false,
    registerDialog: false,
    exists: false,
    signupAddressDialog: false,
    genderList: ['Male', 'Female', 'Other'],
    languageList: ['English', 'Afrikaans'],
    cityList: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Bloemfontein'],
    registerList: [
      'Construction Work',
      'Landscaping',
      'Lawn Care',
      'Gardening',
      'Tree Trimming',
      'Roofing',
      'Painting',
      'Plumbing',
      'Electrical Work',
      'Carpentry',
      'Masonry',
      'Welding',
      'HVAC Installation and Repair',
      'Window Cleaning',
      'Janitorial Services',
      'Carpet Cleaning',
      'Moving Services',
      'Packing and Unpacking Services',
      'Furniture Assembly',
      'Pest Control',
      'Extermination Services',
      'Pool Cleaning',
      'Snow Removal',
      'Demolition Services',
      'Flooring Installation',
      'Tile Installation',
      'Drywall Installation and Repair',
      'Insulation Installation',
      'Gutter Cleaning',
      'Pressure Washing',
      'Automotive Repair',
      'Auto Detailing',
      'Boat Cleaning',
      'Farm Work',
      'Harvesting',
      'Fishing Services',
      'Forestry Work',
      'Mining Services',
      'Oil and Gas Extraction',
      'Construction Site Cleanup',
      'Warehouse Labor',
      'Loading and Unloading Services',
      'Recycling Services',
      'Scrap Metal Collection',
      'Junk Removal',
      'Waste Management',
      'Event Setup and Teardown',
      'Concert Setup and Teardown',
      'Trade Show Setup and Teardown',
      'Exhibit Installation',
      'Rigging Services',
      'Scaffolding Services',
      'General Handyman Services',
      'Home Renovation',
      'Exterior Home Cleaning',
      'Agricultural Labor',
      'Livestock Care',
      'Equestrian Services',
      'Dog Walking',
      'Pet Grooming',
      'House Cleaning',
      'Maid Services',
      'Home Health Aide',
      'Personal Care Assistant',
      'Childcare Services',
      'Elderly Care Services',
      'Disaster Cleanup',
      'Restoration Services',
      'Fire Damage Cleanup',
      'Water Damage Cleanup',
      'Mold Remediation'
    ],

    email: '',
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
    suburb: '',
    postal_code: '',
    complex: '',
    houseNumber: '',
    phone_number: '',

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
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  methods: {
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
            this.$router.push('/modals')
          })
          .catch((error) => {
            console.log(error.response.data.message)
            this.alertLogin = false
            this.alertLoginFailure = true
          })
      }
    },
    birthDateFormatter(date) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      this.date = new Date(date).toLocaleDateString(undefined, options)
    },
    async signup() {
      // this.encryptedPassword = await bcrypt.hash(this.password, this.saltRounds)
      // console.log(this.encryptedPassword)
      this.birthDateFormatter(this.birthDate)
      await axios
        .post('http://localhost:3000/users/create', {
          systemDetails: { email: this.email, password: this.password, username: this.username },
          personalInfo: {
            firstName: this.name,
            surname: this.surname,
            dateOfBirth: this.date
          },
          profile: { displayName: this.username },
          address: {
            street: this.street,
            city: this.city,
            suburb: this.suburb,
            postalCode: this.postal_code,
            complex: 'none',
            houseNumber: 12
          },
          contactInfo: { phoneNumber: this.phone_number, email: this.email }
        })
        .then((response) => {
          console.log(response)
          this.alertSignUpFailure = false
          this.alertSignUp = true
        })
        .catch((error) => {
          console.log(error)
          this.alertSignUp = false
          this.alertSignUpFailure = true
        })
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
    registrationHandler() {
      console.log(JSON.stringify(this.req_obj1))
      axios
        .post('http://localhost:3000/company/create', this.req_obj1)
        .then((res) => {
          alert('The Company was registered successfully')
          sessionStorage['currentCompany'] = res.data.id
          router.push('/modals')
        })
        .catch((res) => {
          alert('The Company was not registered successfully')
          console.log(res)
        })
    },
    finalFlow() {
      this.signup3Dialog = false
      this.joinDialog = true
      this.signup()
    },
    registerCompany() {
      this.signup3Dialog = false
      this.$router.push('/register-modal')
      this.signup()
    },
    join() {
      if (this.$refs.form.validate()) {
        this.$router.push('/join')
      }
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
    VMain
  }
})
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
</style>
