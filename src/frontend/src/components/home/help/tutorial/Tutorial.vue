<template>
  <v-col :cols="12">
    <v-sheet rounded class="w-lg-screen" elevation="0">
      <div>
        <v-expansion-panels class="my-4" variant="accordion">
          <!--          <v-expansion-panel-->
          <!--            :title="tutorialQuestions[0]"-->
          <!--            :theme="isdarkmode === true ? 'dark' : 'light'"-->
          <!--            style="font-family: Nunito, sans-serif"-->
          <!--          >-->
          <!--            <v-expansion-panel-text>-->
          <!--              <v-col :cols="12"-->
          <!--                ><v-stepper v-model="activeSteps.stepper1" :items="items.items_login" show-actions>-->
          <!--                  <template #[`item.1`]>-->
          <!--                    <h3 class="text-h6">Splash Page</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="login.splash" />-->
          <!--                  </template>-->

          <!--                  <template #[`item.2`]>-->
          <!--                    <h3 class="text-h6">Login Modal</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="login.textfields" />-->
          <!--                  </template>-->
          <!--                  <template #[`item.3`]>-->
          <!--                    <h3 class="text-h6">Login Button Click</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="login.button" />-->
          <!--                  </template> </v-stepper-->
          <!--              ></v-col>-->
          <!--            </v-expansion-panel-text>-->
          <!--          </v-expansion-panel>-->
          <!--          <v-expansion-panel-->
          <!--            :title="tutorialQuestions[1]"-->
          <!--            :theme="isdarkmode === true ? 'dark' : 'light'"-->
          <!--            style="font-family: Nunito, sans-serif"-->
          <!--          >-->
          <!--            <v-expansion-panel-text>-->
          <!--              <v-col :cols="12"-->
          <!--                ><v-stepper v-model="activeSteps.stepper2" :items="items.items_signup" show-actions>-->
          <!--                  <template #[`item.1`]>-->
          <!--                    <h3 class="text-h6">Splash Page Click Signup Button</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="signup.splash" />-->
          <!--                  </template>-->
          <!--                  <template #[`item.2`]>-->
          <!--                    <h3 class="text-h6">Input Email & Password</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="signup.email" />-->
          <!--                  </template>-->

          <!--                  <template #[`item.3`]>-->
          <!--                    <h3 class="text-h6">Username Modal</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="signup.username" />-->
          <!--                  </template>-->

          <!--                  <template #[`item.4`]>-->
          <!--                    <h3 class="text-h6">Personal Details Modal</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="signup.birthdate" />-->
          <!--                  </template>-->
          <!--                  <template #[`item.5`]>-->
          <!--                    <h3 class="text-h6">Address Modal</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="signup.address" /> </template-->
          <!--                  ><template #[`item.6`]>-->
          <!--                    <h3 class="text-h6">Register or Join Company buttons</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="signup.registerjoin" /> </template-->
          <!--                  ><template #[`item.7`]>-->
          <!--                    <h3 class="text-h6">Register Company Modal</h3>-->

          <!--                    <br />-->
          <!--                    <v-img :src="signup.company" />-->
          <!--                  </template> </v-stepper-->
          <!--              ></v-col>-->
          <!--            </v-expansion-panel-text>-->
          <!--          </v-expansion-panel>-->
          <v-expansion-panel
            :title="tutorialQuestions[2]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper3"
                  :items="items.items_calendar"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Calendar Navigation Bar</h3>

                    <br />
                    <v-img :src="calendar.nav" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Dashboard List Option</li>
                        <li>Click on Calendar List Sub Options that pops up</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.2`]>
                    <h3 class="text-h6">Calendar Event Clicked</h3>

                    <br />
                    <v-img :src="calendar.event_click" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You can click on your desired event or date format</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.3`]>
                    <h3 class="text-h6">Calendar Job Card Popup</h3>

                    <br />
                    <v-img :src="calendar.job_card" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>The job card options will pop up</li>
                        <li>You can view more details on the job</li>
                        <li>
                          You can upload images and mark the checklist on the job and Log inventory
                          items
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[3]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper v-model="activeSteps.stepper4" :items="items.items_tables" show-actions>
                  <template #[`item.1`]>
                    <h3 class="text-h6">Employee Table View</h3>

                    <br />
                    <v-img :src="table.view" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Employee List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Employee Details table view</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Employee Table View Search Bar</h3>

                    <br />
                    <v-img :src="table.search" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>You can filter through the employees using the search bar</li>
                        <li>
                          Click on the search bar and type your desired employees, Firstname,
                          Surname, Phone, Email or Role
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Search Bar Result</h3>

                    <br />
                    <v-img :src="table.search_value" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Resultant search options will pop up</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.4`]>
                    <h3 class="text-h6">Sorting Fields</h3>

                    <br />
                    <v-img :src="table.sort" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Clicking on the arrow on the right of the table name allows you to sort
                          the results by that value in either descending or ascending order
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.5`]>
                    <h3 class="text-h6">Table Pagination</h3>

                    <br />
                    <v-img :src="table.pagination" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          You can paginate the results so that it shows the vaues you want to see
                        </li>
                        <li>
                          Click on the pagination options at the bottom of the table to navigate
                          through the results
                        </li>
                      </ul>
                    </div> </template
                  ><template #[`item.6`]>
                    <h3 class="text-h6">Pagination options</h3>

                    <br />
                    <v-img :src="table.pagination_options" />
                    <div>
                      <ul class="custom-list">
                        <li>The options to paginate are between 10, 25, 100 & All.</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[5]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper5"
                  :items="items.items_newClients"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Click Add Client Button</h3>

                    <br />
                    <v-img :src="addNewClient.buttn" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Client List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Client Details table view</li>
                        <li>Click on the add Client Button</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Fill Fields & Click Create Client</h3>

                    <br />
                    <v-img :src="addNewClient.fields" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Create Client modal will pop up</li>
                        <li>Fill in the details of the client you'd like to add</li>
                        <li>
                          Once you've filled in the details click on the Green Create Client Button
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[6]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper6"
                  :items="items.items_viewClientDetails"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Client Action Button</h3>

                    <br />
                    <v-img :src="viewClientDetails.view_client_action" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Client List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Client Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Client View Client Button</h3>

                    <br />
                    <v-img :src="viewClientDetails.view_client" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Youll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "View"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Client View</h3>

                    <br />
                    <v-img :src="viewClientDetails.client_view" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Youll be met with a modal with the clients information</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[33]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper7"
                  :items="items.items_inventoryAdd"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Action Button</h3>

                    <br />
                    <v-img :src="deleteClient.client_action_button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Client List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Client Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Delete Menu Button</h3>

                    <br />
                    <v-img :src="deleteClient.delete_client_button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Youll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Delete"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Delete Client Modal</h3>

                    <br />
                    <v-img :src="deleteClient.client_delete_modal" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a modal with caution message</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[38]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper7"
                  :items="items.items_editClient"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Action Button</h3>

                    <br />
                    <v-img :src="editClient.client_action_button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Client List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Client Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Edit Menu Button</h3>

                    <br />
                    <v-img :src="editClient.client_edit_menu" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Youll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Edit"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Edit Client Modal</h3>

                    <br />
                    <v-img :src="editClient.client_edit" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          You'll be met with a modal where you can edit the clients information
                        </li>
                        <li>
                          You can click on the Save button once you have made the changes to desired
                          fields
                        </li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[4]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper8"
                  :items="items.items_newEmployee"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Click Add Employee Button</h3>

                    <br />
                    <v-img :src="addNewEmployees.button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Employee List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Employee Details table view</li>
                        <li>Click on the add Employee Button</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.2`]>
                    <h3 class="text-h6">Superior Employee Dropdown</h3>

                    <br />
                    <v-img :src="addNewEmployees.superior" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with the Add Employee Modal</li>
                        <li>
                          You can click on one of the drop downs and select the options depending on
                          if the dropdown allows multiple selections or one
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Fill Details Of New Employee</h3>

                    <br />
                    <v-img :src="addNewEmployees.fields" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Fill in the desired fields which are not optional</li>
                        <li>Once you've added the information click on the "Add" button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[7]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper9"
                  :items="items.items_editEmployee"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Employee Action Button</h3>

                    <br />
                    <v-img :src="editEmployee.button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Employee List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Employee Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Employee Action Menu</h3>

                    <br />
                    <v-img :src="editEmployee.options" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Edit"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Employee Edit Modal</h3>

                    <v-img :src="editEmployee.complete" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with the Edit Employee Modal</li>
                        <li>
                          You can click on one of the drop downs and select the options depending on
                          if the dropdown allows multiple selections or one
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[34]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper10"
                  :items="items.items_inventoryAdd"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Action Button</h3>

                    <br />
                    <v-img :src="deleteEmployee.employee_delete_action" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Employee List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Employee Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Delete Menu Button</h3>

                    <br />
                    <v-img :src="deleteEmployee.employee_delete_menu" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Edit"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Delete Employee Modal</h3>

                    <br />
                    <v-img :src="deleteEmployee.employee_delete_modal" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a modal with caution message</li>
                        <li>You can delete this employee by clicking the delete button</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[8]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper11"
                  :items="items.items_viewEmployeeDetails"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Employee Action Button</h3>

                    <br />
                    <v-img :src="viewEmployee.action" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Employee List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Employee Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Employee Menu</h3>

                    <br />
                    <v-img :src="viewEmployee.button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Edit"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Employee View Modal</h3>

                    <br />
                    <v-img :src="viewEmployee.view" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Youll be met with a modal with the employee information</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[9]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper12"
                  :items="items.items_addJob"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Click Add Employees Button</h3>

                    <br />
                    <v-img :src="addJob.button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Job List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Job Details table view</li>
                        <li>Click on the addJob Button</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Job Title & Description</h3>

                    <br />
                    <v-img :src="addJob.description" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Enter the name you would like to give to your job</li>
                        <li>Enter the name of the client you would like to attach to your job</li>
                        <li>Enter a description for the job</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Job Start & End Time</h3>

                    <br />
                    <v-img :src="addJob.startDate" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Select the start date and time that the jobs is meant to commence</li>
                        <li>Select the end date and time that the jobs is meant to conclude</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.4`]>
                    <h3 class="text-h6">Assign Employees</h3>

                    <br />
                    <v-img :src="addJob.assign" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Assign company employees to the job using the drop down</li>
                      </ul>
                    </div> </template
                  ><template #[`item.5`]>
                    <h3 class="text-h6">Create Job</h3>

                    <br />
                    <v-img :src="addJob.final" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Assign company employees to the job using the drop down</li>
                        <li>Assign a priority level, tags, and an image to job</li>
                        <li>Fill in the address at which the job will be taking place</li>
                        <li>Once the information has been provided click on "Create Job"</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[10]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper14"
                  :items="items.items_editJob"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Job Card</h3>

                    <br />
                    <v-img :src="editJob.editjob_card" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          You can click on any job or event on the calendar or kanban and the job
                          card will pop up
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Click Edit Job</h3>

                    <br />
                    <v-img :src="editJob.editjob_edit_details_clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>CLick on "Edit Details" button</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Ability to Edit Job And Save Updates</h3>

                    <br />
                    <v-img :src="editJob.editjob_card_edit_details" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Details text fields about the jobs will pop up</li>
                        <li>You can edit any of these fields as you would like</li>
                        <li>Click "Save" once you're done</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.4`]>
                    <h3 class="text-h6">Click 'Change Client'</h3>

                    <br />
                    <v-img :src="editJob.editjob_change_client_clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Click on "Edit Details" button</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.5`]>
                    <h3 class="text-h6">Client Change From Current Clients</h3>

                    <br />
                    <v-img :src="editJob.editjob_card_client" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Use the dropdown to change the current client of the job</li>
                        <li>Once you've changed the client click on Save</li>
                        <li>If you wish to close the modal click "Cancel"</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.6`]>
                    <h3 class="text-h6">Click Selected Employees</h3>

                    <br />
                    <v-img :src="editJob.editjob_select_employees_clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Click on "Selected employees" button if you wish to change the assigned
                          employees
                        </li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.7`]>
                    <h3 class="text-h6">Assigned Employees Change From Current Employees</h3>

                    <br />
                    <v-img :src="editJob.editjob_card_select_employees" />
                  </template>
                  <template #[`item.8`]>
                    <h3 class="text-h6">Click Update Status</h3>

                    <br />
                    <v-img :src="editJob.editjob_update_status_clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Click on "Update Status" button</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.9`]>
                    <h3 class="text-h6">Update Status of Job</h3>

                    <br />
                    <v-img :src="editJob.editjob_update_status" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Use the radio buttons to change the current status of the job</li>
                        <li>Once you've changed the status click on Save</li>
                        <li>If you wish to close the modal click "Cancel"</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.10`]>
                    <h3 class="text-h6">Click Change Due Date</h3>

                    <br />
                    <v-img :src="editJob.editjob_change_due_date_clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Click on "Change Due Date" button</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.11`]>
                    <h3 class="text-h6">Due Date Adjustment Options</h3>

                    <br />
                    <v-img :src="editJob.editjob_change_due_date" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Use the date picker to change the start and end, time and date of the job
                        </li>
                        <li>Once you've changed the status click on "Save"</li>
                        <li>If you wish to clear the dates you can click on the "Remove" button</li>
                        <li>If you wish to close the modal click "Cancel"</li>
                      </ul>
                    </div></template
                  ></v-stepper
                ></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[35]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper15"
                  :items="items.items_inventoryAdd"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Action Button</h3>

                    <br />
                    <v-img :src="deleteJob.job_delete_action" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Job List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Job Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Delete Menu Button</h3>

                    <br />
                    <v-img :src="deleteJob.job_delete_menu" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Delete"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Delete Job Modal</h3>

                    <br />
                    <v-img :src="deleteJob.job_delete_modal" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a modal with caution message</li>
                        <li>You can delete this Job by clicking the delete button</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[11]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper16"
                  :items="items.items_viewJobDetails"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Job action</h3>

                    <br />
                    <v-img :src="viewJob.action" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Job List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Job Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Job Menu</h3>

                    <br />
                    <v-img :src="viewJob.menu" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "View"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">View Job Modal</h3>

                    <br />
                    <v-img :src="viewJob.card" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a modal with the job information</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[32]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper24"
                  :items="items.items_inventoryAdd"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Add Inventory Button</h3>

                    <br />
                    <v-img :src="inventoryAdd.add_button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Inventory List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Inventory Details table view</li>
                        <li>Click on the Add Inventory Button</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Add Inventory Fields</h3>

                    <br />
                    <v-img :src="inventoryAdd.add_fields" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Enter the product name you would like to give to your inventory item
                        </li>
                        <li>Enter the description of the item you would like to add</li>
                        <li>Enter a cost price</li>
                        <li>Enter a stack level</li>
                        <li>Enter a recorder level</li>
                        <li>Click "Create"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Add Inventory Button</h3>

                    <br />
                    <v-img :src="inventoryAdd.add_create" />
                  </template> </v-stepper
              ></v-col>
            </v-expansion-panel-text> </v-expansion-panel
          ><v-expansion-panel
            :title="tutorialQuestions[36]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper25"
                  :items="items.items_editInventory"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Action Button</h3>

                    <br />
                    <v-img :src="editInventory.inventory_action_button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Inventory List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Inventory Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Edit Menu Button</h3>

                    <br />
                    <v-img :src="editInventory.inventory_edit_menu_clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Edit"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Edit Inventory Modal</h3>

                    <br />
                    <v-img :src="editInventory.inventory_edit_modal" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with the Edit Employee Modal</li>
                        <li>
                          You can edit the text fields as you would like and save those updates
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text> </v-expansion-panel
          ><v-expansion-panel
            :title="tutorialQuestions[37]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper27"
                  :items="items.items_editInventory"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Action Button</h3>

                    <br />
                    <v-img :src="viewInventory.inventory_action_button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Inventory List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Inventory Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Edit Menu Button</h3>

                    <br />
                    <v-img :src="viewInventory.inventory_view_menu" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "View"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">View Inventory Modal</h3>

                    <br />
                    <v-img :src="viewInventory.inventory_view_modal" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Youll be met with a modal with the inventory item information</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text> </v-expansion-panel
          ><v-expansion-panel
            :title="tutorialQuestions[39]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper28"
                  :items="items.items_editInventory"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Action Button</h3>

                    <br />
                    <v-img :src="deleteInventory.inventory_action_button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Open the navigation bar</li>
                        <li>Click on the Inventory List Option</li>
                        <li>Click on Management List Sub Options that pops up</li>
                        <li>You'll be met with the Inventory Details table view</li>
                        <li>
                          Click on the 3 orange dots on the far right next to client you would like
                          to view
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Delete Menu Button</h3>

                    <br />
                    <v-img :src="deleteInventory.inventory_delete_menu_clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a small menu</li>
                        <li>
                          Depending on your role in the company your options that will be available
                          are "View", "Edit" or "Delete"
                        </li>
                        <li>Click on "Delete"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Delete Inventory Modal</h3>

                    <br />
                    <v-img :src="deleteInventory.inventory_delete_modal" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You'll be met with a modal with caution message</li>
                        <li>You can delete this Inventory by clicking the delete button</li>
                        <li>You can close this modal by clicking the close button</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[12]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper17"
                  :items="items.items_useUserSettings"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Click User Button</h3>

                    <br />
                    <v-img :src="useUserSettings.button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>This step can be performed on any page with a AppBar/ToolBar</li>
                        <li>
                          Click on the users button on the top left with their initials or picture
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Click 'Settings' Button</h3>

                    <br />
                    <v-img :src="useUserSettings.clicked" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          You'll be met with a context menu, with the users name and other
                          directives
                        </li>
                        <li>Click on "Settings"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Update User Details</h3>

                    <br />
                    <v-img :src="useUserSettings.profile" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          You can fill in the desired text fields that you would like to changed
                        </li>
                        <li>
                          Once that is done you can update these changes by clicking the "Update
                          Profile"
                        </li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.4`]>
                    <h3 class="text-h6">Edit Notification Preferences And Navigation Menu</h3>

                    <br />
                    <v-img :src="useUserSettings.notification" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          You can changed the company Notification settings to what you prefer
                        </li>
                        <li>
                          You can toggle the three switches to change to receiving Push, In-App or
                          Email notifications
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[13]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper18"
                  :items="items.items_useCompanySettings"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Click More & Company Settings On Nav Bar</h3>

                    <br />
                    <v-img :src="useCompanySettings.nav" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Navigate to the Nav bar and click on "More" and the "Company settings"
                          will pop up
                        </li>
                        <li>Click on "Company Settings"</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Can Edit Company Settings Details</h3>

                    <br />
                    <v-img :src="useCompanySettings.settings" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>you can change the company settings by changing the fields</li>
                        <li>Click on "SAVE" to apply the changes</li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.3`]>
                    <h3 class="text-h6">Company Role & Permissions</h3>

                    <br />
                    <v-img :src="useCompanySettings.roles" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          you can change the company roles permissions suite by changing the
                          selected fields in the drop down
                        </li>
                        <li>Click on "SAVE" to apply the changes</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.4`]>
                    <h3 class="text-h6">Company Role & Permissions</h3>

                    <br />
                    <v-img :src="useCompanySettings.options" /> </template
                  ><template #[`item.5`]>
                    <h3 class="text-h6">Edit Permission Suite of Roles</h3>

                    <br />
                    <v-img :src="useCompanySettings.complete" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Click on "SAVE" to apply the changes</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[14]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper19"
                  :items="items.items_changeTheme"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Click Moon Icon to Switch to Dark Mode</h3>

                    <br />
                    <v-img :src="themeChange.light" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          On the top right corner there is a moon cresent icon click that to change
                          to Dark Mode
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Dark Mode</h3>

                    <br />
                    <v-img :src="themeChange.dark" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Once in dark mode this will turn into a Sun icon signifying changing back
                          to Light Mode
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            :title="tutorialQuestions[15]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper20"
                  :items="items.items_manageCompanies"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">Manage Companies Navigation-Bar</h3>

                    <br />
                    <v-img :src="manageCompanies.navbar" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          To switch companies click on the companies name on the top left of the
                          screen
                        </li>
                        <li>A menu will appear</li>
                      </ul>
                    </div>
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
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Click on the drop down to see the menu of companies you can switch to, or
                          are registered under
                        </li>
                        <li>select the company you would like to switch</li>
                        <li>Select Save to switch to that company</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.4`]>
                    <h3 class="text-h6">Manage Companies Redirect</h3>

                    <br />
                    <v-img :src="manageCompanies.redirect" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          You will be reloaded to the home page of the company you switched to
                        </li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text> </v-expansion-panel
          ><v-expansion-panel
            :title="tutorialQuestions[17]"
            :theme="isDarkMode === true ? 'dark' : 'light'"
            style="font-family: Nunito, sans-serif"
          >
            <v-expansion-panel-text>
              <v-col :cols="12"
                ><v-stepper
                  v-model="activeSteps.stepper30"
                  :items="items.items_logout"
                  show-actions
                >
                  <template #[`item.1`]>
                    <h3 class="text-h6">User Button</h3>

                    <br />
                    <v-img :src="logout.navbar" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>
                          Navigate to the Nav bar and click on "More" and the "Company settings" &
                          "Logout" will pop up
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #[`item.2`]>
                    <h3 class="text-h6">Click Login Button</h3>

                    <br />
                    <v-img :src="logout.button" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>Click on "Logout"</li>
                      </ul>
                    </div>
                  </template>
                  <template #[`item.3`]>
                    <h3 class="text-h6">Redirect To Splash Page</h3>

                    <br />
                    <v-img :src="logout.splash" />
                    <br />
                    <div>
                      <ul class="custom-list">
                        <li>You will be redirected to the splash page</li>
                      </ul>
                    </div>
                  </template>
                </v-stepper></v-col
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-sheet>
  </v-col>
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

import addclient_button from '@/assets/images/tutorial/addNewClient/addclient_button.png'
import addclient_fields from '@/assets/images/tutorial/addNewClient/addclient_fields.png'

import button from '@/assets/images/tutorial/addNewEmployee/addemployee_button.png'
import fields from '@/assets/images/tutorial/addNewEmployee/addemployee_fields.png'
import superior from '@/assets/images/tutorial/addNewEmployee/addemployee_supirior.png'

import emp_btn from '@/assets/images/tutorial/editEmployee/employee_edit_action.png'
import complete from '@/assets/images/tutorial/editEmployee/employee_edit_modal.png'
import menu from '@/assets/images/tutorial/editEmployee/editemployee_menu.png'
import options from '@/assets/images/tutorial/editEmployee/employee_edit.png'
import roles from '@/assets/images/tutorial/editEmployee/editemployee_roles.png'

import log_btn from '@/assets/images/tutorial/logout/logout_dashboard_click_button.png'
import navbar from '@/assets/images/tutorial/logout/logout_dashboard.png'
import log_splash from '@/assets/images/tutorial/logout/logout_dashboard_redirect.png'

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

import calendar_nav from '@/assets/images/tutorial/calendar/calendar_nav.png'
import calendar_event_click from '@/assets/images/tutorial/calendar/calendar_event_click.png'
import calendar_job_card from '@/assets/images/tutorial/calendar/calendar_job_card.png'

import client_view from '@/assets/images/tutorial/viewClientDetails/client_view.png'
import edit_client_button from '@/assets/images/tutorial/viewClientDetails/edit_client_button.png'
import view_client_action from '@/assets/images/tutorial/viewClientDetails/view_client_action_button.png'
import view_client from '@/assets/images/tutorial/viewClientDetails/view_client_button.png'

import employee_view from '@/assets/images/tutorial/viewEmployeeDetails/employee_view.png'
import employee_action from '@/assets/images/tutorial/viewEmployeeDetails/employee_edit_action.png'
import employee_view_button from '@/assets/images/tutorial/viewEmployeeDetails/employee_view_button.png'

import view_job_action from '@/assets/images/tutorial/viewJob/view_job_action.png'
import view_card from '@/assets/images/tutorial/viewJob/view_job_card.png'
import view_job_menu from '@/assets/images/tutorial/viewJob/view_job_menu.png'

import inventory_add_button from '@/assets/images/tutorial/addInventory/inventory_add_button.png'
import inventory_add_create from '@/assets/images/tutorial/addInventory/inventory_add_create.png'
import inventory_add_fields from '@/assets/images/tutorial/addInventory/inventory_add_fields.png'

import client_action_button from '@/assets/images/tutorial/deleteClient/client_action_button.png'
import delete_client_button from '@/assets/images/tutorial/deleteClient/delete_client_button.png'
import client_delete_modal from '@/assets/images/tutorial/deleteClient/client_delete_modal.png'

import employee_delete_action from '@/assets/images/tutorial/deleteEmployee/employee_delete_action.png'
import employee_delete_modal from '@/assets/images/tutorial/deleteEmployee/employee_delete_modal.png'
import employee_delete_menu from '@/assets/images/tutorial/deleteEmployee/employee_delete_menu.png'

import job_delete_menu from '@/assets/images/tutorial/deleteJob/job_delete_menu.png'
import job_delete_modal from '@/assets/images/tutorial/deleteJob/job_delete_modal.png'

import client_edit from '@/assets/images/tutorial/editClient/client_edit.png'
// import client_action_button from '@/assets/images/tutorial/editClient/client_action_button.png'
import client_edit_menu from '@/assets/images/tutorial/editClient/client_edit_menu.png'

import inventory_action_button from '@/assets/images/tutorial/editInventory/inventory_action_button.png'
import inventory_edit_menu_clicked from '@/assets/images/tutorial/editInventory/inventory_edit_menu_clicked.png'
import inventory_edit_modal from '@/assets/images/tutorial/editInventory/inventory_edit_modal.png'

// import inventory_action_button from '@/assets/images/tutorial/viewInventory/inventory_action_button.png'
import inventory_view_menu from '@/assets/images/tutorial/viewInventory/inventory_view_menu.png'
import inventory_view_modal from '@/assets/images/tutorial/viewInventory/inventory_view_modal.png'

// import inventory_action_button from '@/assets/images/tutorial/deleteInventory/inventory_action_button.png'
import inventory_delete_modal from '@/assets/images/tutorial/deleteInventory/inventory_delete_modal.png'
import inventory_delete_menu_clicked from '@/assets/images/tutorial/deleteInventory/inventory_delete_menu_clicked.png'

// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
// import splash_login from '@/assets/images/tutorial/signup/signup_address.png'
// import login_modal from '@/assets/images/tutorial/signup/signup_birthdate_gender.png'
// import login_textfields from '@/assets/images/tutorial/signup/signup_email_password.png'
// import login_button from '@/assets/images/tutorial/signup/signup_name.png'
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
  name: 'TutorialComponent',
  data() {
    const stepperCount = 35
    const activeSteps: Record<string, number> = {}
    for (let i = 1; i <= stepperCount; i++) {
      activeSteps[`stepper${i}`] = 1
    }

    return {
      activeSteps,
      isDarkMode: sessionStorage['theme'] === 'true',
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
        username: username,
        c_profile: create_profile
      },
      calendar: {
        nav: calendar_nav,
        event_click: calendar_event_click,
        job_card: calendar_job_card
      },
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
      viewEmployee: {
        view: employee_view,
        action: employee_action,
        button: employee_view_button
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
      viewJob: {
        action: view_job_action,
        card: view_card,
        menu: view_job_menu
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
      viewClientDetails: {
        client_view: client_view,
        view_client_action: view_client_action,
        view_client: view_client
      },
      inventoryAdd: {
        add_button: inventory_add_button,
        add_create: inventory_add_create,
        add_fields: inventory_add_fields
      },
      deleteClient: {
        client_action_button: client_action_button,
        delete_client_button: delete_client_button,
        client_delete_modal: client_delete_modal
      },
      deleteEmployee: {
        employee_delete_action: employee_delete_action,
        employee_delete_modal: employee_delete_modal,
        employee_delete_menu: employee_delete_menu
      },
      deleteJob: {
        job_delete_menu: job_delete_menu,
        job_delete_modal: job_delete_modal,
        job_delete_action: view_job_action
      },
      editClient: {
        client_edit: client_edit,
        client_action_button: client_action_button,
        client_edit_menu: client_edit_menu
      },
      editInventory: {
        inventory_action_button: inventory_action_button,
        inventory_edit_menu_clicked: inventory_edit_menu_clicked,
        inventory_edit_modal: inventory_edit_modal
      },
      viewInventory: {
        inventory_action_button: inventory_action_button,
        inventory_view_menu: inventory_view_menu,
        inventory_view_modal: inventory_view_modal
      },
      deleteInventory: {
        inventory_action_button: inventory_action_button,
        inventory_delete_modal: inventory_delete_modal,
        inventory_delete_menu_clicked: inventory_delete_menu_clicked
      },
      tutorialQuestions: [
        'How to Login?',
        'How to SignUp?',
        'How to use Calendar?',
        'How to use the tables?',
        'How to add New Employees?',
        'How to add New Clients?',
        'How to view Client details?',
        'How to edit an employee?',
        'How to view an employee?',
        'How to add a job?',
        'How to edit a job?',
        'How to view a job?',
        'How to use User settings?',
        'How to use company settings',
        'How to change application theme?',
        'How to switch companies?',
        'How to change themes?',
        'How to Log out?',
        'How to Configure Company Settings?',
        'How to Manage Employee Details?',
        'How to Assign Tasks to Employees?',
        'How to Manage Client Details?',
        'How to edit your profile?',
        'How to Set Up Notifications?',
        'How to Create and Manage Projects?',
        'How to Use the Kanban Board?',
        'How to Generate Reports?',
        'How to Analyze Performance Metrics?',
        'How to Integrate with Other Tools?',
        'How to use the Support?',
        'How to troubleshoot Common Issues?',
        'How to optimize System Usage?',
        'How to add new inventory item?',
        'How to delete Client?',
        'How to delete Employee?',
        'How to delete Job?',
        'How to edit Inventory?',
        'How to view Inventory?',
        'How to edit Client?',
        'How to delete Inventory Item?'
      ],
      shipping: 0,
      step: 1,
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
      }
    }
  }
})
</script>

<style scoped>
.custom-list {
  list-style-type: disc;
  padding-left: 20px;
}

.custom-list li {
  margin-bottom: 8px;
}
</style>
