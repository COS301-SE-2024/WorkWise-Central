<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-col :cols="12">
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">SUPPORT</h4></v-col
        >
      </v-col>
      <v-col :cols="12">
        <v-tabs v-model="tab" align-tabs="center" color="primary">
          <v-tab :value="1">FAQ</v-tab>
          <v-tab :value="2">TUTORIAL</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab" height="auto">
          <v-tabs-window-item :value="1">
            <v-col :cols="12">
              <v-sheet rounded class="w-lg-screen" elevation="0">
                <div>
                  <v-expansion-panels class="my-4" variant="accordion">
                    <v-expansion-panel
                      v-for="i in 14"
                      :key="i"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-title color="faqQuestion"
                        ><b>{{ faqs[i].question }}</b></v-expansion-panel-title
                      >
                      <v-expansion-panel-text>{{
                        faqs[i].answer
                      }}</v-expansion-panel-text></v-expansion-panel
                    >
                  </v-expansion-panels>
                </div>
              </v-sheet>
            </v-col>
          </v-tabs-window-item>
          <v-tabs-window-item :value="2">
            <v-col :cols="12">
              <v-sheet rounded class="w-lg-screen" elevation="0">
                <div>
                  <v-expansion-panels class="my-4" variant="accordion">
                    <v-expansion-panel
                      :title="tutorialQuestions[0]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_login" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="login.splash" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="login.modal" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="login.textfields" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="login.button" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[1]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_signup" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="signup.email" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="signup.email" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="signup.username" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="signup.birthdate" /> </template
                            ><template #[`item.5`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="signup.address" /> </template
                            ><template #[`item.6`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="signup.registerjoin" /> </template
                            ><template #[`item.7`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="signup.company" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[2]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_calendar" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="login.splash" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="login.modal" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="login.textfields" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="login.button" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[4]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_newEmployee" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="addNewEmployees.button" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="addNewEmployees.fields" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="addNewEmployees.superior" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[3]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_tables" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="table.view" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="table.search" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="table.search_value" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="table.sort" /> </template
                            ><template #[`item.5`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="table.pagination" /> </template
                            ><template #[`item.6`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="table.pagination_options" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[5]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_newClients" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="addNewClient.buttn" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="addNewClient.fields" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[6]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper
                            v-model="step"
                            :items="items.items_viewClientDetails"
                            show-actions
                          >
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="login.splash" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="login.modal" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="login.textfields" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="login.button" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[7]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_editEmployee" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="editEmployee.button" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="editEmployee.options" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="editEmployee.menu" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <v-img :src="editEmployee.roles" />
                            </template>
                            <template #[`item.5`]>
                              <h3 class="text-h6">Create button</h3>

                              <v-img :src="editEmployee.complete" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[8]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper
                            v-model="step"
                            :items="items.items_viewEmployeeDetails"
                            show-actions
                          >
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="login.splash" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="login.modal" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="login.textfields" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="login.button" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[9]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_addJob" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="addJob.button" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="addJob.description" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="addJob.startDate" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="addJob.assign" /> </template
                            ><template #[`item.5`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="addJob.final" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[10]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_editJob" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="editJob.editjob_card" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="editJob.editjob_edit_details_clicked" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="editJob.editjob_card_edit_details" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_change_client_clicked" />
                            </template>
                            <template #[`item.5`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_card_client" />
                            </template>
                            <template #[`item.6`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_card_select_employees" />
                            </template>
                            <template #[`item.7`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_update_status_clicked" />
                            </template>
                            <template #[`item.8`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_update_status" />
                            </template>
                            <template #[`item.9`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_change_due_date_clicked" />
                            </template>
                            <template #[`item.10`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_change_due_date" />
                            </template>
                            <template #[`item.11`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="editJob.editjob_change_client_clicked" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[11]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper
                            v-model="step"
                            :items="items.items_viewJobDetails"
                            show-actions
                          >
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="login.splash" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="login.modal" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="login.textfields" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="login.button" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[12]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper
                            v-model="step"
                            :items="items.items_useUserSettings"
                            show-actions
                          >
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="useUserSettings.button" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="useUserSettings.clicked" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="useUserSettings.profile" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="useUserSettings.notification" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[13]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper
                            v-model="step"
                            :items="items.items_useCompanySettings"
                            show-actions
                          >
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="useCompanySettings.nav" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="useCompanySettings.settings" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="useCompanySettings.roles" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="useCompanySettings.options" /> </template
                            ><template #[`item.5`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="useCompanySettings.complete" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[14]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_changeTheme" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Splash Page</h3>

                              <br />
                              <v-img :src="login.splash" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="login.modal" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="login.textfields" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="login.button" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                      :title="tutorialQuestions[15]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper
                            v-model="step"
                            :items="items.items_manageCompanies"
                            show-actions
                          >
                            <template #[`item.1`]>
                              <h3 class="text-h6">Manage Companies Navigation-Bar</h3>

                              <br />
                              <v-img :src="manageCompanies.navbar" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Manage Companies Navigation-Bar clicked</h3>

                              <br />
                              <v-img :src="manageCompanies.navbar_click" />
                            </template>

                            <template #[`item.3`]>
                              <h3 class="text-h6">Manage Companies Dropdown</h3>

                              <br />
                              <v-img :src="manageCompanies.dropdown" />
                            </template>
                            <template #[`item.4`]>
                              <h3 class="text-h6">Manage Companies Redirect</h3>

                              <br />
                              <v-img :src="manageCompanies.redirect" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text> </v-expansion-panel
                    ><v-expansion-panel
                      :title="tutorialQuestions[17]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_logout" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="logout.navbar" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="logout.button" />
                            </template>
                            <template #[`item.3`]>
                              <h3 class="text-h6">Create button</h3>

                              <br />
                              <v-img :src="logout.splash" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text> </v-expansion-panel
                    ><v-expansion-panel
                      :title="tutorialQuestions[16]"
                      :theme="isdarkmode === true ? 'dark' : 'light'"
                      style="font-family: Nunito, sans-serif"
                    >
                      <v-expansion-panel-text>
                        <v-col :cols="12"
                          ><v-stepper v-model="step" :items="items.items_changeTheme" show-actions>
                            <template #[`item.1`]>
                              <h3 class="text-h6">Login Modal</h3>

                              <br />
                              <v-img :src="themeChange.light" />
                            </template>

                            <template #[`item.2`]>
                              <h3 class="text-h6">Click Login Button</h3>

                              <br />
                              <v-img :src="themeChange.dark" />
                            </template> </v-stepper
                        ></v-col>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-sheet>
            </v-col>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
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

import addclient_button from '@/assets/images/tutorial/addNewClient/addclient_button.png'
import addclient_fields from '@/assets/images/tutorial/addNewClient/addclient_fields.png'

import button from '@/assets/images/tutorial/addNewEmployee/addemployee_button.png'
import fields from '@/assets/images/tutorial/addNewEmployee/addemployee_fields.png'
import superior from '@/assets/images/tutorial/addNewEmployee/addemployee_supirior.png'

import emp_btn from '@/assets/images/tutorial/editEmployee/editemployee_button.png'
import complete from '@/assets/images/tutorial/editEmployee/editemployee_complete.png'
import menu from '@/assets/images/tutorial/editEmployee/editemployee_menu.png'
import options from '@/assets/images/tutorial/editEmployee/editemployee_options.png'
import roles from '@/assets/images/tutorial/editEmployee/editemployee_roles.png'

import log_btn from '@/assets/images/tutorial/logout/logout_button.png'
import navbar from '@/assets/images/tutorial/logout/logout_navbar_more.png'
import log_splash from '@/assets/images/tutorial/logout/logout_splash.png'

import tab_pagination from '@/assets/images/tutorial/tables/table_pagination.png'
import tab_pag_options from '@/assets/images/tutorial/tables/table_pagination_options.png'
import tab_search from '@/assets/images/tutorial/tables/table_search.png'
import tab_search_val from '@/assets/images/tutorial/tables/table_search_value.png'
import tab_sort from '@/assets/images/tutorial/tables/table_sort.png'
import tab_view from '@/assets/images/tutorial/tables/table_view.png'

import dark_mode from '@/assets/images/tutorial/themeChange/theme_change_dark.png'
import light_mode from '@/assets/images/tutorial/themeChange/theme_change_light.png'

import dropdown from '@/assets/images/tutorial/manageCompanies/managecompanies_company_dropdown.png'
import mngc_navbar from '@/assets/images/tutorial/manageCompanies/managecompanies_navbar.png'
import mngc_navbar_click from '@/assets/images/tutorial/manageCompanies/managecompanies_navbar_click.png'
import mngc_redirect from '@/assets/images/tutorial/manageCompanies/managecompanies_redirect.png'

import cmp_roles from '@/assets/images/tutorial/useCompanySettings/company_roles.png'
import cmp_complete from '@/assets/images/tutorial/useCompanySettings/company_roles_complete.png'
import cmp_options from '@/assets/images/tutorial/useCompanySettings/company_roles_options.png'
import cmp_settings from '@/assets/images/tutorial/useCompanySettings/company_settings.png'
import cmp_nav from '@/assets/images/tutorial/useCompanySettings/company_settings_nav.png'

import usr_set_button from '@/assets/images/tutorial/useUserSettings/user_settings_button.png'
import usr_set_clicked from '@/assets/images/tutorial/useUserSettings/user_settings_button_clicked.png'
import usr_notification from '@/assets/images/tutorial/useUserSettings/user_settings_notification_settings.png'
import usr_profile from '@/assets/images/tutorial/useUserSettings/user_settings_your_profile.png'

import add_job_final from '@/assets/images/tutorial/addJob/addjob_final_step.png'
import add_job_button from '@/assets/images/tutorial/addJob/addjob_select_button.png'
import add_job_assign from '@/assets/images/tutorial/addJob/addjob_select_employee_to_assign.png'
import add_job_startDate from '@/assets/images/tutorial/addJob/addjob_startdate.png'
import add_job_description from '@/assets/images/tutorial/addJob/addjob_title_job_description.png'

import editjob_card from '@/assets/images/tutorial/editJob/editjob_card.png'
import editjob_card_client from '@/assets/images/tutorial/editJob/editjob_card_change_client.png'
import editjob_change_due_date from '@/assets/images/tutorial/editJob/editjob_card_change_due_date.png'
import editjob_change_due_date_clicked from '@/assets/images/tutorial/editJob/editjob_card_click_change_due_date.png'
import editjob_change_client_clicked from '@/assets/images/tutorial/editJob/editjob_card_click_change_client.png'
import editjob_edit_details_clicked from '@/assets/images/tutorial/editJob/editjob_card_click_edit_details.png'
import editjob_select_employees_clicked from '@/assets/images/tutorial/editJob/editjob_card_click_select_employees.png'
import editjob_update_status_clicked from '@/assets/images/tutorial/editJob/editjob_card_click_update_status.png'
import editjob_card_edit_details from '@/assets/images/tutorial/editJob/editjob_card_edit_details.png'
import editjob_card_select_employees from '@/assets/images/tutorial/editJob/editjob_card_select_employees.png'
import editjob_update_status from '@/assets/images/tutorial/editJob/editjob_card_update_status.png'

// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'

export default defineComponent({
  name: 'SupportComponent',
  data() {
    return {
      isdarkmode: sessionStorage['theme'] === 'true',
      tab: null,
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
        username: username
      },
      calendar: {},
      addNewEmployees: {
        button: button,
        fields: fields,
        superior: superior
      },
      editEmployee: {
        button: emp_btn,
        complete: complete,
        menu: menu,
        options: options,
        roles: roles
      },
      logout: {
        button: log_btn,
        navbar: navbar,
        splash: log_splash
      },
      table: {
        pagination: tab_pagination,
        pagination_options: tab_pag_options,
        search: tab_search,
        search_value: tab_search_val,
        sort: tab_sort,
        view: tab_view
      },
      themeChange: {
        dark: dark_mode,
        light: light_mode
      },
      manageCompanies: {
        dropdown: dropdown,
        navbar: mngc_navbar,
        navbar_click: mngc_navbar_click,
        redirect: mngc_redirect
      },
      useCompanySettings: {
        roles: cmp_roles,
        complete: cmp_complete,
        options: cmp_options,
        settings: cmp_settings,
        nav: cmp_nav
      },
      useUserSettings: {
        button: usr_set_button,
        clicked: usr_set_clicked,
        notification: usr_notification,
        profile: usr_profile
      },
      addNewClient: {
        buttn: addclient_button,
        fields: addclient_fields
      },
      addJob: {
        final: add_job_final,
        button: add_job_button,
        assign: add_job_assign,
        startDate: add_job_startDate,
        description: add_job_description
      },
      editJob: {
        editjob_card: editjob_card,
        editjob_card_client: editjob_card_client,
        editjob_change_due_date: editjob_change_due_date,
        editjob_change_due_date_clicked: editjob_change_due_date_clicked,
        editjob_change_client_clicked: editjob_change_client_clicked,
        editjob_edit_details_clicked: editjob_edit_details_clicked,
        editjob_select_employees_clicked: editjob_select_employees_clicked,
        editjob_update_status_clicked: editjob_update_status_clicked,
        editjob_card_edit_details: editjob_card_edit_details,
        editjob_card_select_employees: editjob_card_select_employees,
        editjob_update_status: editjob_update_status
      },
      faqs: [
        {
          question: 'What is the purpose of this app?',
          answer:
            'Our app is designed to help service delivery companies and other specialized teams, such as those in network setup and IT technician spaces with git, manage their jobs efficiently. It offers features similar to Monday.com and Trello, enabling teams to track progress, assign jobs, collaborate, and streamline workflows.'
        },
        {
          question: 'How do I create a new project in the app?',
          answer:
            "To create a new project, click on the 'New Project' button on the dashboard. Enter the project details, set deadlines, assign team members, and add any relevant notes or files. Once done, click 'Create' to get started."
        },
        {
          question: 'Can I integrate this app with other tools we use?',
          answer:
            "Yes, our app supports integration with various tools commonly used in project support, such as Slack, Google Drive, and Microsoft Teams. You can find these integration options in the 'Settings' menu under 'Integrations.'"
        },
        {
          question: 'How do I assign jobs to team members?',
          answer:
            "To assign jobs, navigate to your project, click on the 'Tasks' tab, and select 'Add Task.' Enter the job details, set the priority, and use the dropdown menu to assign the job to a specific team member. Click 'Save' to assign the job."
        },
        {
          question: 'Is there a way to track the time spent on each job?',
          answer:
            "Yes, our app includes a time-tracking feature. When you start a job, click the 'Start Timer' button. Once you finish, click 'Stop Timer.' The time spent will be logged automatically, and you can view time reports under the 'Reports' section."
        },
        {
          question: 'How do I add comments or updates to a job?',
          answer:
            "To add comments or updates, open the specific job you want to update. There is a 'Comments' section where you can type your message. Click 'Post' to add your comment. Team members assigned to the job will be notified of your update."
        },
        {
          question: 'Can I customize the project workflow?',
          answer:
            "Absolutely! You can customize workflows to fit your team's specific needs. Go to the 'Workflow' tab within your project, where you can add, remove, or rename stages. Drag and drop jobs between stages to reflect their progress."
        },
        {
          question: 'How do I generate a project report?',
          answer:
            "To generate a project report, navigate to the 'Reports' section from the main menu. Select the project and the type of report you need (e.g., job completion, time tracking, resource allocation). Click 'Generate Report' to download or view it online."
        },
        {
          question: 'What should I do if I encounter a technical issue?',
          answer:
            "If you experience any technical issues, please contact our support team through the 'help' section in the app. You can submit a ticket detailing your problem, and our support staff will assist you as soon as possible."
        },
        {
          question: 'How secure is our data in this app?',
          answer:
            'Data security is our top priority. Our app uses advanced encryption methods to protect your data. Regular security audits are conducted, and we comply with industry standards to ensure your information is safe and secure.'
        },
        {
          question: 'Can I set up recurring jobs?',
          answer:
            "Yes, you can set up recurring jobs by selecting the 'Recurring' option when creating or editing a job. Choose the frequency (daily, weekly, monthly) and the app will automatically generate the job at the specified intervals."
        },
        {
          question: 'How can I invite new team members to the app?',
          answer:
            "To invite new team members, go to the 'Team' section and click on 'Invite Members.' Enter the email addresses of the people you want to invite, assign them roles, and click 'Send Invitation.' They will receive an email with instructions to join your team."
        },
        {
          question: 'Is there a mobile version of the app?',
          answer:
            'Yes, our app is available on both iOS and Android devices. You can download it from the App Store or Google Play Store to manage your projects on the go.'
        },
        {
          question: 'How do I update my account information?',
          answer:
            "To update your account information, click on your profile icon and select 'Account Settings.' Here, you can change your personal details, update your password, and manage notification preferences."
        },
        {
          question: 'Can I view all jobs assigned to me across different projects?',
          answer:
            "Yes, you can view all jobs assigned to you by clicking on the 'My Tasks' section from the dashboard. This view consolidates jobs from all projects, making it easier for you to manage your workload."
        }
      ],
      tutorialQuestions: [
        'How to Login?',
        'How to SignUp?',
        'How to use Calendar?',
        'How to use the tables?',
        'How to Add New Employees?',
        'How to Add New Clients?',
        'How to View Client details?',
        'How to edit an employee?',
        'How to view an employee?',
        'How to add a job?',
        'How to edit a job?',
        'How to view a job?',
        'How to use User settings?',
        'How to use company settings',
        'How to change application theme?',
        'How to manage companies?',
        'How to change themes?',
        'How to Log out?',
        'How to Configure Company Settings?',
        'How to Manage Employee Details?',
        'How to Assign Tasks to Employees?',
        'How to Manage Client Details?',
        'How to Edit Your Profile?',
        'How to Set Up Notifications?',
        'How to Create and Manage Projects?',
        'How to Use the Kanban Board?',
        'How to Generate Reports?',
        'How to Analyze Performance Metrics?',
        'How to Integrate with Other Tools?',
        'How to Get Support?',
        'How to Troubleshoot Common Issues?',
        'How to Optimize System Usage?'
      ],
      shipping: 0,
      step: 1,
      items: {
        items_login: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_signup: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'],
        items_calendar: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_tables: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'],
        items_newEmployee: ['Step 1', 'Step 2', 'Step 3'],
        items_newClients: ['Step 1', 'Step 2'],
        items_viewClientDetails: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_editEmployee: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
        items_viewEmployeeDetails: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
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
        items_viewJobDetails: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_useUserSettings: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_useCompanySettings: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
        items_changeTheme: ['Step 1', 'Step 2'],
        items_manageCompanies: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        items_logout: ['Step 1', 'Step 2', 'Step 3', 'Step 4']
      },
      products: [
        {
          name: 'Product 1',
          price: 10,
          quantity: 2
        },
        {
          name: 'Product 2',
          price: 15,
          quantity: 10
        }
      ]
    }
  },
  computed: {
    subtotal() {
      return this.products.reduce((acc, product) => acc + product.quantity * product.price, 0)
    },
    total() {
      return this.subtotal + Number(this.shipping ?? 0)
    }
  },
  methods: {
    sendEmail() {
      window.location.href = 'mailto:johndoe@example.com'
    },
    callPhone() {
      window.location.href = 'tel:+27734414451'
    }
  }
})
</script>

<style scoped></style>
