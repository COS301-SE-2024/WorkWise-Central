<template>
  <Toast position="top-center" />
  <v-app :theme="isDarkMode ? 'dark' : 'light'">
    <!-- Toolbar -->
    <v-app-bar class="bg-background">
      <v-toolbar-title class="d-flex justify-start">
        <v-label :class="'h4 text-primary'">Work</v-label>
        <v-label :class="'h4 text-secondary'">Wise</v-label>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        dark
        @click="loginDialog = true"
        rounded="md"
        variant="outlined"
        align-center
        justify-center
        class="my-3 text-center mr-4"
        size="large"
      >
        Login
      </v-btn>
      <v-btn
        color="secondary"
        dark
        @click="signupDialog = true"
        rounded="md"
        align-center
        variant="elevated"
        class="my-3 text-center"
        size="large"
      >
        Sign up
      </v-btn>
      <v-btn @click="toggleDarkMode" base-color="background" text
        ><v-icon :icon="isDarkMode ? 'fa: fa-solid fa-sun' : 'fa: fa-solid fa-moon'"></v-icon
      ></v-btn>
    </v-app-bar>
    <!-- Main Content -->
    <v-main :theme="isDarkMode ? 'dark' : 'light'">
      <v-row style="height: 1000px">
        <!-- Left Half -->
        <v-col
          cols="12"
          lg="6"
          align-self="center"
          order="last"
          order-lg="first"
          order-md="first"
          order-sm="last"
        >
          <v-row justify="center"
            ><v-col align-self="center">
              <h1 :class="['splash-title', 'header-title', 'text-center']">
                Welcome To <span class="text-primary">Work</span>
                <span class="text-secondary">Wise</span> Central
              </h1>
            </v-col></v-row
          >
          <v-container>
            <v-row
              ><v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn
                  color="primary"
                  dark
                  @click="loginDialog = true"
                  rounded="md"
                  variant="outlined"
                  align-center
                  width="50%"
                  justify-center
                  class="my-3 text-center"
                  size="large"
                  block
                >
                  Login
                </v-btn></v-col
              >
              <v-col cols="12" lg="6" order="first" order-lg="last">
                <v-btn
                  color="secondary"
                  dark
                  @click="signupDialog = true"
                  rounded="md"
                  align-center
                  variant="elevated"
                  class="my-3 text-center"
                  width="50%"
                  block
                  size="large"
                >
                  Sign Up
                </v-btn></v-col
              ></v-row
            ></v-container
          >

          <v-col>
            <v-dialog
              :opacity="0"
              v-model="loginDialog"
              max-width="400"
              @click:outside="resetFields"
            >
              <Toast position="top-center" />
              <v-card
                width="auto"
                height="auto"
                border="md"
                :theme="isDarkMode ? 'dark' : 'light'"
                rounded="md"
                class="bg-background"
              >
                <v-col>
                  <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                    Log into existing account
                  </h4>
                </v-col>
                <v-spacer></v-spacer>
                <v-col
                  ><v-form ref="form" v-model="valid" class="bg-background">
                    <v-row align="center"
                      ><v-col
                        ><label for="email" style="font-size: 14px; font-weight: lighter"
                          >Username</label
                        >

                        <v-text-field
                          :theme="isDarkMode ? 'dark' : 'light'"
                          :label="username ? '' : 'Enter your username'"
                          type="username"
                          name="username"
                          v-model="username"
                          :rules="usernameRules"
                          rounded="md"
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
                          :theme="isDarkMode ? 'dark' : 'light'"
                          :label="password ? '' : 'Enter your password'"
                          :type="showPassword ? 'text' : 'password'"
                          name="password"
                          v-model="password"
                          :rules="passwordRules"
                          :append-icon="
                            showPassword ? 'fa:fa-solid fa-eye-slash' : 'fa:fa-solid fa-eye'
                          "
                          @click:append="toggleShowPassword"
                          rounded="md"
                          variant="solo"
                          required
                        ></v-text-field></v-col
                    ></v-row>
                  </v-form>
                  <v-col cols="12" lg="6">
                    <v-btn variant="text" @click="forgotPassword"> Forgot Password?</v-btn></v-col
                  >
                </v-col>
                <v-container>
                  <v-row
                    ><v-col cols="12" lg="6" order="last" order-lg="first">
                      <v-btn
                        :disabled="!valid"
                        text
                        @click="login"
                        @keypress.enter="login"
                        rounded="md"
                        :loading="loading"
                        size="large"
                        color="primary"
                        variant="elevated"
                        width="100%"
                        block
                        >Login</v-btn
                      >
                    </v-col>
                    <v-col cols="12" lg="6" order="first" order-lg="last">
                      <v-btn
                        text
                        @click="(signupDialog = true)((loginDialog = false))(resetFields)"
                        rounded="md"
                        color="secondary"
                        size="large"
                        variant="elevated"
                        width="100%"
                        block
                      >
                        Sign up</v-btn
                      >
                    </v-col></v-row
                  ></v-container
                >

                <v-alert v-model="alertLogin" type="success">
                  You have successfully logged in!</v-alert
                >
                <v-alert v-model="alertLoginFailure" type="error">
                  Please enter valid credentials</v-alert
                >
              </v-card>
            </v-dialog>
            <!-- Forgot Password -->
            <v-dialog :opacity="0" v-model="forgotPasswordDialog" max-width="400">
              <v-sheet
                elevation="14"
                rounded="md"
                width="auto"
                height="auto"
                :theme="isDarkMode ? 'dark' : 'light'"
                class="bg-background"
              >
                <v-col>
                  <v-form ref="form" v-model="valid" class="bg-background">
                    <v-row>
                      <v-col>
                        <label style="font-size: 14px; font-weight: lighter">Reset password</label>
                        <v-text-field
                          :label="email ? '' : 'Enter your email'"
                          type="email"
                          v-model="email"
                          :rules="emailRules"
                          rounded="md"
                          variant="solo"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                  <v-col>
                    <v-btn
                      :disabled="!valid"
                      text
                      rounded="md"
                      width="100%"
                      size="large"
                      variant="elevated"
                      color="primary"
                      @click="showOTP"
                      >Reset</v-btn
                    >
                  </v-col>
                </v-col>
              </v-sheet>
            </v-dialog>

            <v-dialog :opacity="0" v-model="OTPDialog" max-width="400">
              <v-sheet
                elevation="14"
                rounded="md"
                width="auto"
                height="auto"
                :theme="isDarkMode ? 'dark' : 'light'"
                class="bg-background"
              >
                <v-col>
                  <v-row>
                    <v-col>
                      <label style="font-size: 16px; font-weight: normal">
                        Please check your email to change your password. Follow the instructions provided in the email to complete the process.
                      </label>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn
                        rounded="md"
                        width="100%"
                        size="large"
                        variant="elevated"
                        color="primary"
                        @click="OTPDialog = false"
                      >
                        Close
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-sheet>
            </v-dialog>

            <!-- Flow 1 -->
            <v-dialog
              :opacity="0"
              v-model="signupDialog"
              max-width="400"
              @click:outside="resetFields"
            >
              <v-sheet
                elevation="14"
                rounded="md"
                width="auto"
                height="auto"
                :theme="isDarkMode ? 'dark' : 'light'"
                class="bg-background"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Create an account
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>

                  <v-col>
                    <v-form ref="form" v-model="valid" class="bg-background">
                      <v-row align="center"
                        ><v-col>
                          <label style="font-size: 14px; font-weight: lighter">Email</label>
                          <v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="email ? '' : 'Enter your email'"
                            type="email"
                            v-model="email"
                            :rules="emailRules"
                            rounded="md"
                            variant="solo"
                            required
                          ></v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Password</label>
                          <v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="signupPassword ? '' : 'Enter your password'"
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            v-model="signupPassword"
                            :rules="passwordRules"
                            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="toggleShowPassword"
                            rounded="md"
                            variant="solo"
                            required
                            aria-placeholder="Enter your password"
                          ></v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter"
                            >Confirm Password</label
                          ><v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="confirm_password ? '' : 'Confirm your password'"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="toggleShowPassword"
                            name="confirm_password"
                            v-model="confirm_password"
                            :rules="
                              ([(v) => v === signupPassword || 'Passwords do not match'],
                              [(v) => !!v || 'Confirm password is required'])
                            "
                            rounded="md"
                            variant="solo"
                            required
                          >
                          </v-text-field></v-col
                      ></v-row>
                    </v-form>
                  </v-col>
                  <v-container
                    ><v-row>
                      <v-col cols="12" lg="6" order="last" order-lg="first">
                        <v-btn
                          @click="(loginDialog = true), (signupDialog = false)"
                          rounded="md"
                          width="100%"
                          size="large"
                          variant="elevated"
                          color="secondary"
                          block
                          >Login</v-btn
                        >
                      </v-col>
                      <v-col cols="12" lg="6" order="first" order-lg="last">
                        <Toast position="top-center" />
                        <v-btn
                          :disabled="!valid"
                          text
                          @click="nextFlow1"
                          rounded="md"
                          boarder="xl"
                          width="100%"
                          size="large"
                          variant="elevated"
                          color="primary"
                          block
                          >Continue</v-btn
                        >
                      </v-col></v-row
                    ></v-container
                  >
                </v-col>
              </v-sheet>
            </v-dialog>
            <!-- Flow 2 -->
            <v-dialog
              :opacity="0"
              v-model="signup1Dialog"
              max-width="400"
              @click:outside="resetFields"
            >
              <v-sheet
                width="auto"
                height="auto"
                border="md"
                rounded="md"
                :theme="isDarkMode ? 'dark' : 'light'"
                class="bg-background"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Create your profile
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-form ref="form" v-model="valid" class="bg-background">
                      <v-row align="center"
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Name</label>
                          <v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="name ? '' : 'Enter your name'"
                            type="name"
                            v-model="name"
                            :rules="nameRules"
                            rounded="md"
                            variant="solo"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Surname</label
                          ><v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="surname ? '' : 'Enter your surname'"
                            type="surname"
                            v-model="surname"
                            :rules="surnameRules"
                            rounded="md"
                            variant="solo"
                            required
                            aria-placeholder="Enter your password"
                          ></v-text-field></v-col
                      ></v-row>
                    </v-form>
                  </v-col>
                  <v-container
                    ><v-row>
                      <v-col cols="12" lg="6" order="last" order-lg="first">
                        <v-btn
                          @click="(signupDialog = true)((signup1Dialog = false))"
                          rounded="md"
                          color="secondary"
                          size="large"
                          variant="elevated"
                          width="100%"
                          block
                          >Back</v-btn
                        > </v-col
                      ><v-col cols="12" lg="6" order="first" order-lg="last">
                        <v-btn
                          :disabled="!valid"
                          text
                          @click="nextFlow2"
                          rounded="md"
                          size="large"
                          color="primary"
                          variant="elevated"
                          width="100%"
                          block
                          >Continue</v-btn
                        >
                      </v-col>
                    </v-row></v-container
                  >
                </v-col>
              </v-sheet>
            </v-dialog>
            <v-col xs="3" align-self="center">
              <v-dialog
                :opacity="0"
                v-model="signupUsernameDialog"
                max-width="400"
                @click:outside="resetFields"
              >
                <v-sheet
                  width="auto"
                  height="auto"
                  border="md"
                  rounded="md"
                  :theme="isDarkMode ? 'dark' : 'light'"
                >
                  <v-col>
                    <v-col>
                      <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                        Create your profile
                      </h4></v-col
                    >
                    <v-form ref="form" v-model="valid">
                      <v-row
                        ><v-col align-self="center" cols="12"
                          ><label style="font-size: 14px; font-weight: lighter">Username</label>
                          <v-combobox
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="username ? '' : 'Select your username'"
                            v-model="username"
                            :items="usernameList"
                            :rules="usernameRules"
                            rounded="md"
                            variant="solo"
                            clearable
                            required
                          ></v-combobox
                        ></v-col>
                        <v-col cols="12">
                          <small class="text-caption">Profile Picture</small>
                          <v-file-input
                            variant="solo"
                            accept="image/*"
                            width="100%"
                            placeholder="Profile Picture"
                            @change="handleImageUpload"
                            v-model="profile_picture"
                            hint="Image size limit of  5MB"
                            persistent-hint
                            color="black"
                            rounded="md"
                            required
                            :rules="company_logo_rules"
                            data-testid="company-logo-file-input"
                          ></v-file-input> </v-col
                      ></v-row>
                    </v-form>
                  </v-col>
                  <v-container
                    ><v-row>
                      <v-col cols="12" lg="6" order="last" order-lg="first">
                        <v-btn
                          :disabled="!valid"
                          text
                          @click="(signup1Dialog = true)((signupUsernameDialog = false))"
                          rounded="md"
                          size="large"
                          color="secondary"
                          variant="elevated"
                          width="100%"
                          block
                          >Back</v-btn
                        ></v-col
                      ><v-col cols="12" lg="6" order="first" order-lg="last">
                        <Toast position="top-center" />
                        <v-btn
                          :disabled="!valid"
                          text
                          @click="nextFlowUsername"
                          rounded="md"
                          size="large"
                          color="primary"
                          variant="elevated"
                          width="100%"
                          block
                          >Continue</v-btn
                        ></v-col
                      ></v-row
                    ></v-container
                  >
                </v-sheet>
              </v-dialog>
            </v-col>
            <!-- Flow 3 -->
            <v-dialog
              :opacity="0"
              v-model="signup2Dialog"
              max-width="400"
              @click:outside="resetFields"
            >
              <v-sheet
                width="auto"
                height="auto"
                border="md"
                rounded="md"
                :theme="isDarkMode ? 'dark' : 'light'"
                class="bg-background"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Create your profile
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-form ref="form" v-model="valid" class="bg-background">
                      <v-row align="center"
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Date of Birth</label
                          ><v-text-field
                            :label="birthDate ? '' : 'Select your date of birth'"
                            v-model="birthDate"
                            :rules="date_rules"
                            :format="format"
                            type="date"
                            required
                            :flow="flow"
                          ></v-text-field
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
                            rounded="md"
                            variant="solo"
                            clearable
                            required
                            :theme="isDarkMode ? 'dark' : 'light'"
                          >
                          </v-select></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lmighter"
                            >Preferred Language</label
                          >
                          <v-select
                            color="secondary"
                            :label="language ? '' : 'Select your preferred language'"
                            hint="Chose your preferred language"
                            :items="languageList"
                            :rules="language_rules"
                            v-model="language"
                            rounded="md"
                            variant="solo"
                            clearable
                            required
                            :theme="isDarkMode ? 'dark' : 'light'"
                          >
                          </v-select></v-col
                      ></v-row>
                    </v-form>
                  </v-col>
                  <v-container
                    ><v-row>
                      <v-col cols="12" lg="6" order="last" order-lg="first">
                        <v-btn
                          @click="(signupUsernameDialog = true)((signup2Dialog = false))"
                          rounded="md"
                          color="secondary"
                          size="large"
                          variant="elevated"
                          width="100%"
                          block
                          >Back</v-btn
                        > </v-col
                      ><v-col cols="12" lg="6" order="first" order-lg="last">
                        <v-btn
                          :disabled="!valid"
                          text
                          @click="nextFlow3"
                          rounded="xmdl"
                          size="large"
                          color="primary"
                          variant="elevated"
                          width="100%"
                          block
                          >Continue</v-btn
                        >
                      </v-col></v-row
                    ></v-container
                  >
                </v-col>
              </v-sheet>
            </v-dialog>
            <!-- Flow 4 -->
            <v-dialog
              :opacity="0"
              v-model="signupAddressDialog"
              max-width="1000"
              @click:outside="resetFields"
            >
              <v-sheet
                width="auto"
                height="auto"
                border="md"
                rounded="md"
                :theme="isDarkMode ? 'dark' : 'light'"
                class="bg-background"
              >
                <v-col>
                  <v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Enter your residential details
                    </h4></v-col
                  >
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-form ref="form" v-model="valid" class="bg-background">
                      <v-row justify="space-around"
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Street</label
                          ><v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="street ? '' : 'Enter your street name'"
                            type="input"
                            v-model="street"
                            :rules="streetRules"
                            rounded="md"
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
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="suburb ? '' : 'Enter your suburb name'"
                            type="input"
                            v-model="suburb"
                            :rules="suburbRules"
                            rounded="md"
                            variant="solo"
                            required
                          >
                          </v-text-field> </v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">City</label
                          ><v-text-field
                            :label="city ? '' : 'Select your city'"
                            type="input"
                            v-model="city"
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :rules="cityRules"
                            rounded="md"
                            variant="solo"
                            required
                          ></v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Province</label
                          ><v-select
                            :label="province ? '' : 'Select your province'"
                            type="input"
                            v-model="province"
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :rules="provinceRules"
                            rounded="md"
                            variant="solo"
                            :items="provinceList"
                            required
                          ></v-select></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Postal Code</label
                          ><v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="postal_code ? '' : 'Enter your postal code'"
                            type="input"
                            v-model="postal_code"
                            :rules="postalCodeRules"
                            required
                          >
                          </v-text-field></v-col
                      ></v-row>
                      <v-row
                        ><v-col
                          ><label style="font-size: 14px; font-weight: lighter">Phone Number</label
                          ><v-text-field
                            :theme="isDarkMode ? 'dark' : 'light'"
                            :label="phone_number ? '' : 'Enter your phone number'"
                            type="input"
                            v-model="phone_number"
                            :rules="phoneNumberRules"
                            rounded="md"
                            variant="solo"
                            required
                          >
                          </v-text-field></v-col
                      ></v-row>
                    </v-form>
                  </v-col>
                  <v-container>
                    <v-row>
                      <v-col cols="12" lg="6" order="last" order-lg="first">
                        <v-btn
                          @click="(signup2Dialog = true)((signupAddressDialog = false))"
                          rounded="md"
                          color="secondary"
                          size="large"
                          variant="elevated"
                          width="100%"
                          block
                          >Back</v-btn
                        > </v-col
                      ><v-col cols="12" lg="6" order="first" order-lg="last">
                        <v-btn
                          :disabled="!valid"
                          text
                          @click="nextFlowAddress"
                          rounded="md"
                          size="large"
                          color="primary"
                          variant="elevated"
                          width="100%"
                          block
                          >Continue</v-btn
                        >
                      </v-col></v-row
                    ></v-container
                  >
                </v-col>
              </v-sheet>
            </v-dialog>
            <!-- Flow 5 -->
            <v-dialog
              :opacity="0"
              v-model="signup3Dialog"
              max-width="700"
              style="height: 750px"
              @click:outside="resetFields"
            >
              <!-- <v-sheet
                :bg-color="isDarkMode === true ? modal_dark_theme_color : modal_light_theme_color"
              > -->
              <v-card
                class="mx-auto bg-background"
                width="400"
                :theme="isDarkMode ? 'dark' : 'light'"
              >
                <v-col
                  ><v-col>
                    <h4 class="text-center" style="font-size: 20px; font-weight: lighter">
                      Please select of the following details
                    </h4></v-col
                  >

                  <v-container
                    ><v-row>
                      <v-col cols="12" lg="6">
                        <RegisterCompanyModal :isDarkMode="isDarkMode" /> </v-col
                      ><v-col cols="12" lg="6">
                        <JoinCompanyModal :isDarkMode="isDarkMode" /></v-col></v-row></v-container
                ></v-col>
              </v-card>

              <!-- </v-sheet> -->
            </v-dialog>

            <!-- Register Company Modal -->

            <p class="text-center h6" :theme="isDarkMode ? 'dark' : 'light'">
              By clicking Continue to login or sign up, you agree to WorkWise Central's User
              Agreement, Privacy Policy, and Cookie Policy
            </p>
          </v-col>
        </v-col>

        <!-- Right Half -->

        <v-col cols="12" lg="6" order="first" order-lg="last" order-md="last" order-sm="first">
          <div class="background-image pa-2"></div>
        </v-col>
      </v-row>
      <!-- <v-footer :theme="isDarkMode ? 'dark' : 'light'" class="bg-background">
         <v-container>
          <v-row justify="space-between">
            <v-col cols="12" md="6">
              <span class="h6">&copy; 2024 WorkWise Central</span>
            </v-col>
          </v-row>
        </v-container>
      </v-footer> -->
      <div><MarketingSplash /></div>

      <!-- <div>
        <ServicesSplash  />
      </div> -->
      <div>
        <h1 :class="['splash-title', 'header-title', 'text-center']">
          How to use <span class="text-primary">Work</span
          ><span class="text-secondary">Wise</span> Central
        </h1>
        <v-row justify="end" style="height: 500px">
          <Tutorial />
        </v-row>
      </div>

      <v-footer> </v-footer>
    </v-main>
  </v-app>
</template>
<script>
import RegisterCompanyModal from './RegisterCompanyModal.vue'
import JoinCompanyModal from './JoinCompanyModal.vue'
import axios from 'axios'
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'
import Tutorial from '../home/help/tutorial/Tutorial.vue'
import MarketingSplash from './MarketingSplash.vue'
// import ServicesSplash from './ServicesSplash.vue'
export default defineComponent({
  components: {
    RegisterCompanyModal,
    JoinCompanyModal,
    Toast,
    Tutorial,
    MarketingSplash
    // ServicesSplash
  },
  data: () => ({
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    click_create_client: false,
    tabs: [
      { title: 'Client Management', icon: 'mdi-account-group' },
      { title: 'Project Management', icon: 'mdi-account-group' },
      { title: 'Employee Management', icon: 'mdi-account-group' },
      { title: 'Team Management', icon: 'mdi-account-group' },
      { title: 'Operations', icon: 'mdi-account-group' },
      { title: 'Client Projects', icon: 'mdi-account-group' }
    ],
    text: 'sidgkbvufteWOARBGADIGU8AjgnWJVG',
    saltRounds: 10,
    tab: false,
    loginDialog: false,
    alertSignUp: false,
    alertSignUpFailure: false,
    alertLogin: false,
    loading: false,
    signupDialog: false,
    signup1Dialog: false,
    signup2Dialog: false,
    signupUsernameDialog: false,
    signup3Dialog: false,
    alertLoginFailure: false,
    joinDialog: false,
    registerDialog: false,
    forgotPasswordDialog: false,
    OTPDialog: false,
    exists: false,
    signupAddressDialog: false,
    genderList: ['Male', 'Female', 'Other'],
    languageList: [
      'Afrikaans',
      'English',
      'Ndebele',
      'Sotho',
      'Swati',
      'Tsonga',
      'Tswana',
      'Venda',
      'Xhosa',
      'Zulu'
    ],
    services: [
      {
        title: 'Plumbing Services',
        text1: 'Manage your plumbing services',
        text2: 'Project Management, Job Management, Employee Management',
        text3: 'Team Management, Operations, Client Projects'
      },
      {
        title: 'Electronics Services',
        text1: 'Manage your electronics services',
        text2: 'Project Management, Job Management, Employee Management',
        text3: 'Team Management, Operations, Client Projects'
      },
      {
        title: 'Electricians Services',
        text1: 'Manage your electricians services',
        text2: 'Project Management, Job Management, Employee Management',
        text3: 'Team Management, Operations, Client Projects'
      }
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
    provinceList: [
      'Eastern Cape',
      'Free State',
      'Gauteng',
      'KwaZulu-Natal',
      'Limpopo',
      'Mpumalanga',
      'North West',
      'Northern Cape',
      'Western Cape'
    ],
    randomNumber: 0,
    email: '',
    flow: ['year', 'month', 'calendar'],
    access_token: '',
    password: '',
    signupPassword: '',
    profilePicture: '',
    confirm_password: '',
    showPassword: false,
    date: '',
    emailExists: false,
    name: '',
    surname: '',
    username: '',
    gender: '',
    birthDate: null,
    language: '',
    street: '',
    city: '',
    province: '',
    dummyUsername: '',
    suburb: '',
    postal_code: '',
    complex: '',
    houseNumber: '',
    phone_number: '',
    skills: [],
    currentCompany: {},

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
    isDarkMode: false,
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
      (v) => v <= new Date().toISOString().substr(0, 10) || 'Date of birth must be before today'
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
      (v) => (v.length >= 10 && v.length <= 10) || 'Phone number must be 10 characters',
      (v) => /^[0-9]*$/.test(v) || 'Phone number must contain only numbers',
      (v) => /^0[0-9]*$/.test(v) || 'Phone number must start with 0'
    ],
    company_logo_rules: [(v) => !!v || 'Profile picture is required'],
    provinceRules: [(v) => !!v || 'Province name is required']
  }),

  methods: {
    handleKeypress(e) {
      if (e.key === 'Enter') {
        this.login()
      }
    },
    resetFields() {
      this.date = ''
      this.name = ''
      this.email = ''
      this.surname = ''
      this.username = ''
      this.password = ''
      this.confirm_password = ''
      this.signupPassword = ''
      this.gender = ''
      this.language = ''
      this.street = ''
      this.city = ''
      this.dummyUsername = ''
      this.suburb = ''
      this.postal_code = ''
      this.complex = ''
      this.houseNumber = ''
      this.phone_number = ''
      this.birthDate = null
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
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
    forgotPassword() {
      this.loginDialog = false
      this.forgotPasswordDialog = true
    },
    async showOTP() {
      const exist = await this.emailExist()
      if (!exist) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Email does not exist',
          life: 3000
        })
      } else {
        this.forgotPasswordDialog = false
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
        try {
          this.OTPDialog = true
          const apiUrl = await this.getRequestUrl()
          await axios.post(`${apiUrl}users/request/reset-pass`, {
            email: this.email
          }, config)
        } catch (error) {
          console.log(error)
        }
      }
      // this.$router.push({ name: 'new-password' })
    },
    format(date) {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `Selected date is ${day}/${month}/${year}`
    },
    handleImageUpload(event) {
      const target = event.target
      if (target.files && target.files[0]) {
        const file = target.files[0]
        this.profilePicture = file
        const reader = new FileReader()

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            this.req_obj.logo = e.target.result
          }
        }
        reader.readAsDataURL(file)
      }
      console.log(this.req_obj.logo)
    },
    convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result.toString())
        reader.onerror = (error) => reject(error)
      })
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, 3000)
      isDarkMode = localStorage.getItem('theme')
    },
    companyLogoHandler() {
      console.log('')
    },
    async login() {
      this.loading = true
      const apiURL = await this.getRequestUrl()
      if (this.$refs.form.validate()) {
        await axios
          .post(apiURL + 'auth/login', {
            identifier: this.username,
            password: this.password
          })
          .then((response) => {
            console.log(response)
            console.log(response.data.access_token)
            console.log(response.data.user.joinedCompanies[0].companyId)
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('currentCompany', response.data.user.joinedCompanies[0].companyId)
            localStorage.setItem('employeeId', response.data.user.joinedCompanies[0].employeeId)
            localStorage.setItem('email', this.email)
            localStorage.setItem('username', this.username)
            this.$toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User successfully logged in',
              life: 3000
            })
            // this.resetForm()
            setTimeout(() => {
              this.loading = false
              this.$router.push({ name: 'dashboard' })
            }, 2000)
          })
          .catch((error) => {
            console.log(error)
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User unsuccessfully logged in',
              life: 3000
            })
            this.loading = false
          })
      }
    },
    birthDateFormatter(date) {
      this.date = new Date(date).toISOString()
    },
    /*
    async imageURL() {
      const apiURL = await this.getRequestUrl()
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .post(
          apiURL + 'users/newUser/profilePic',
          {
            profilePicture: this.profilePicture
          },
          config
        )
        .then((response) => {
          console.log(response)
          this.profilePicture = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
*/
    async signup() {
      const apiURL = await this.getRequestUrl()
      this.birthDateFormatter(this.birthDate)
      const jsonData = {
        username: this.username,
        password: this.signupPassword,
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
          province: this.province,
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
          displayName: this.name + ' ' + this.surname
        },
        skills: this.skills,
        currentCompany: this.company
      }
      if (this.profilePicture !== '') {
        jsonData.profilePicture = await this.convertImageToBase64(this.profilePicture)
      }

      await axios
        .post(apiURL + 'users/create', jsonData)
        .then((response) => {
          console.log(response)
          this.alertSignUpFailure = false
          this.alertSignUp = true
          localStorage.setItem('access_token', response.data.data.access_token)
          localStorage.setItem('id', response.data.data.id)
          localStorage.setItem('email', this.email)
          localStorage.setItem('username', this.username)
        })
        .catch((error) => {
          console.log(error)
          this.alertSignUp = false
          this.alertSignUpFailure = true
        })
    },
    async nextFlow1() {
      try {
        this.emailExists = await this.emailExist()
        console.log(this.emailExists)
        if (this.emailExists === true) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email already exists',
            life: 3000
          })
        } else {
          // Handle the case where the email does not exist
          this.signupDialog = false
          this.signup1Dialog = true
        }
      } catch (error) {
        console.error('Error during next flow:', error)
      }
    },
    nextFlow2() {
      this.signup1Dialog = false
      this.signupUsernameDialog = true
      this.populateUsernameList()
    },
    async nextFlowUsername() {
      //this.profilePicture = await this.imageURL()
      try {
        this.exists = await this.usernameExist()
        if (this.exists === true) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Username already exists',
            life: 6000
          })
        } else {
          this.signupUsernameDialog = false
          this.signup2Dialog = true
        }
      } catch (error) {
        console.error('Error during next flow for username:', error)
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
    async emailExist() {
      try {
        const apiURL = await this.getRequestUrl()
        const response = await axios.post(`${apiURL}users/exists/email`, {
          email: this.email
        })
        console.log(response.data.data)
        return response.data.data
      } catch (error) {
        console.error('Error checking email existence:', error)
        return null // Return null or handle the error as needed
      }
    },
    async usernameExist() {
      try {
        const apiURL = await this.getRequestUrl()
        const response = await axios.post(`${apiURL}users/exists/username`, {
          username: this.username
        })
        console.log(response.data.data)
        return response.data.data
      } catch (error) {
        console.error('Error checking username existence:', error)
        return null // Return null or handle the error as needed
      }
    },
    checkUsernameExist() {
      console.log('Checking if username exists')
      this.usernameExist()
      console.log(this.exists)
      if (this.exists === true) {
        alert('Username already exists')
        return true
      }
      return false
    },
    checkEmailExist() {
      this.emailExist()
      console.log(this.emailExists)
      if (this.emailExists === true) {
        alert('Email already exists')
        return true
      }
      return false
    },
    openDialog() {
      this.dialog = true
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
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
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

.grad-class {
  background: #3a7bd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3a6073, #3a7bd5); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3a6073,
    #3a7bd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
