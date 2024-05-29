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
                <v-btn text @click="(signupDialog = true)((loginDialog = false))">Sign up</v-btn>
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
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="signup1Dialog" max-width="500" max-height="400">
          <v-card
            prepend-icon="mdi-account"
            title="Create your profile"
            rounded="xl"
            max-height="600"
          >
            <v-card-text>
              <v-text-field
                label="Enter your name"
                prepend-icon="mdi-name"
                type="input"
                v-model="name"
              ></v-text-field>
              <v-text-field
                label="Enter your surname"
                prepend-icon="mdi-surname"
                type="input"
                v-model="surname"
                aria-placeholder="Enter your password"
              ></v-text-field>
              <v-text-field
                label="Enter your display name"
                prepend-icon="mdi-lock"
                type="password"
                v-model="display_name"
              ></v-text-field>
              <v-avatar label="Upload your profile pricture" type="file" v-model="image">
                <!-- <v-img src="C:\Users\Kumbirai\OneDrive\Documents\GitHub\WorkWise-Central\src\frontend\img\avatar.jpg"></v-img> -->
              </v-avatar>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="(signup1Dialog = false)((signup2Dialog = true))" rounded="xl"
                >Continue</v-btn
              >
              <v-btn
                color="primary"
                @click="(signupDialog = true)((signup1Dialog = false))"
                rounded="xl"
                >Back</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="signup2Dialog" max-width="500" max-height="400">
          <v-card
            prepend-icon="mdi-account"
            title="Create your profile"
            rounded="xl"
            max-height="600"
          >
            <v-card-text>
              <v-text-field
                label="Date of birth"
                prepend-icon="mdi-birth"
                type="input"
                v-model="date"
              ></v-text-field>
              <v-select label="Gender" items="['Male','Female','Other']" hint="Chose your gender">
              </v-select>
              <v-select
                label="Preferred Lanaguage"
                items="['English','French','Shona']"
                hint="Chose your preferred lanaguage"
              >
              </v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="(signup2Dialog = false)(signup)" rounded="xl">Continue</v-btn>
              <v-btn
                color="primary"
                @click="(signup1Dialog = true)((signup2Dialog = false))"
                rounded="xl"
                >Back</v-btn
              >
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
  VApp,
  VAvatar,
  VImg,
  VSelect
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
    VSelect
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
