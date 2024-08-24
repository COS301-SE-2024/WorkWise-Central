<template>
  <v-expansion-panels class="my-4" variant="accordion">
    <v-expansion-panel
      :title="tutorialQuestions[0]"
      :theme="isDarkMode === true ? 'dark' : 'light'"
      style="font-family: Nunito, sans-serif"
    >
      <v-expansion-panel-text>
        <v-col :cols="12"
          ><v-stepper v-model="activeSteps.stepper1" :items="items.items_login" show-actions>
            <template #[`item.1`]>
              <h3 class="text-h6">Splash Page</h3>

              <br />
              <v-img :src="login.splash" />
            </template>

            <template #[`item.2`]>
              <h3 class="text-h6">Login Modal</h3>

              <br />
              <v-img :src="login.textfields" />
            </template>
            <template #[`item.3`]>
              <h3 class="text-h6">Login Button Click</h3>

              <br />
              <v-img :src="login.button" />
            </template> </v-stepper
        ></v-col>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel
      :title="tutorialQuestions[1]"
      :theme="isDarkMode === true ? 'dark' : 'light'"
      style="font-family: Nunito, sans-serif"
    >
      <v-expansion-panel-text>
        <v-col :cols="12"
          ><v-stepper v-model="activeSteps.stepper2" :items="items.items_signup" show-actions>
            <template #[`item.1`]>
              <h3 class="text-h6">Splash Page Click Signup Button</h3>

              <br />
              <v-img :src="signup.splash" />
            </template>
            <template #[`item.2`]>
              <h3 class="text-h6">Input Email & Password</h3>

              <br />
              <v-img :src="signup.email" />
            </template>

            <template #[`item.3`]>
              <h3 class="text-h6">Username Modal</h3>

              <br />
              <v-img :src="signup.username" />
            </template>

            <template #[`item.4`]>
              <h3 class="text-h6">Personal Details Modal</h3>

              <br />
              <v-img :src="signup.birthdate" />
            </template>
            <template #[`item.5`]>
              <h3 class="text-h6">Address Modal</h3>

              <br />
              <v-img :src="signup.address" /> </template
            ><template #[`item.6`]>
              <h3 class="text-h6">Register or Join Company buttons</h3>

              <br />
              <v-img :src="signup.registerjoin" /> </template
            ><template #[`item.7`]>
              <h3 class="text-h6">Register Company Modal</h3>

              <br />
              <v-img :src="signup.company" />
            </template> </v-stepper
        ></v-col>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import splash_login from '@/assets/images/tutorial/login/splash_page_login_button.png'
import login_modal from '@/assets/images/tutorial/login/login_modal_signup_button.png'
import login_textfields from '@/assets/images/tutorial/login/login_textfields.png'
import login_button from '@/assets/images/tutorial/login/login_button_click.png'
import address from '@/assets/images/tutorial/signup/signup_address.png'
import birthdate from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
import email from '@/assets/images/tutorial/signup/signup_email_password.png'
import name from '@/assets/images/tutorial/signup/signup_name.png'
import company from '@/assets/images/tutorial/signup/signup_register_company.png'
import registerjoin from '@/assets/images/tutorial/signup/signup_register_or_join_company.png'
import splash from '@/assets/images/tutorial/signup/signup_splash.png'
import username from '@/assets/images/tutorial/signup/signup_username.png'
import create_profile from '@/assets/images/tutorial/signup/signup_create_profile.png'

export default defineComponent({
  name: 'SignUpLoginTutorial',

  data() {
    const stepperCount = 5
    const activeSteps: Record<string, number> = {}
    for (let i = 1; i <= stepperCount; i++) {
      activeSteps[`stepper${i}`] = 1
    }

    return {
      tutorialQuestions: [
        'How to Login?',
        'How to SignUp?',
        'How to use Calendar?',
        'How to use the tables?',
        'How to add New Employees?'
      ],
      activeSteps,
      login: {
        splash: splash_login,
        modal: login_modal,
        textfields: login_textfields,
        button: login_button
      },
      signup: {
        address: address,
        birthdate: birthdate,
        email: email,
        name: name,
        company: company,
        registerjoin: registerjoin,
        splash: splash,
        username: username,
        c_profile: create_profile
      },
      items: {
        items_login: ['Step 1', 'Step 2', 'Step 3'],
        items_signup: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'],
        items_calendar: ['Step 1', 'Step 2', 'Step 3'],
        items_tables: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'],
        items_newEmployee: ['Step 1', 'Step 2', 'Step 3'],
        items_newClients: ['Step 1', 'Step 2'],
        items_viewClientDetails: ['Step 1', 'Step 2', 'Step 3'],
        items_editEmployee: ['Step 1', 'Step 2', 'Step 3'],
        items_viewEmployeeDetails: ['Step 1', 'Step 2', 'Step 3'],
        items_addJob: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
        items_editJob: [
          'Step 1',
          'Step 2',
          'Step 3',
          'Step 4',
          'Step 5',
          'Step 6',
          'Step 7',
          'Step 8',
          'Step 9',
          'Step 10',
          'Step 11'
        ],
        items_viewJobDetails: ['Step 1', 'Step 2', 'Step 3'],
        items_useUserSettings: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_useCompanySettings: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
        items_changeTheme: ['Step 1', 'Step 2'],
        items_manageCompanies: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_logout: ['Step 1', 'Step 2', 'Step 3'],
        items_inventoryAdd: ['Step 1', 'Step 2', 'Step 3'],
        items_deleteClient: ['Step 1', 'Step 2', 'Step 3'],
        items_deleteInventory: ['Step 1', 'Step 2', 'Step 3'],
        items_deleteJob: ['Step 1', 'Step 2', 'Step 3'],
        items_editClient: ['Step 1', 'Step 2', 'Step 3'],
        items_editInventory: ['Step 1', 'Step 2', 'Step 3']
      },
      isDarkMode: sessionStorage['theme'] === 'true'
    }
  }
})
</script>

<style scoped></style>
