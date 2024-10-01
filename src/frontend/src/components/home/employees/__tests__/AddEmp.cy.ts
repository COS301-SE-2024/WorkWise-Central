import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import AddEmployee from '../management/AddEmployee.vue'

it('renders add employee', () => {
  const vuetify = createVuetify()
  mount(AddEmployee, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('Add Employee')
})

// it('click add employee button', () => {
//     const vuetify = createVuetify()
//     mount(AddEmployee, {
//         global: {
//             plugins: [vuetify]
//         }
//     })
// })
//
// it('click add employee button opens dialog', () => {
//     const vuetify = createVuetify()
//     mount(AddEmployee, {
//         global: {
//             plugins: [vuetify]
//         }
//     })
//     cy.get('button').click()
//     cy.contains('Add Employee')
//     cy.contains('Add employee using employee username')
//     cy.contains("Select the role you'd like to change this employee to")
//     cy.contains("Select the employee you'd like to be superior of this employee")
//     cy.get('button').contains('Add')
// })
//
// it('check the input text fields', () => {
//     const vuetify = createVuetify()
//     mount(AddEmployee, {
//         global: {
//             plugins: [vuetify]
//         }
//     })
//     cy.get('button').click()
//     cy.get('[data-testid=superior-select]').contains('Superior')
//     cy.get('[data-testid=role-select]').contains('Company Role')
//     cy.get('[data-testid=superior-select]').contains(
//         "Select the employee you'd like to be superior of this employee"
//     )
//     cy.get('[data-testid=role-select]').contains(
//         "Select the role you'd like to change this employee to"
//     )
// })
//
// it('check typing the Username textfield', () => {
//     const vuetify = createVuetify()
//     mount(AddEmployee, {
//         global: {
//             plugins: [vuetify]
//         }
//     })
//     cy.get('button').click()
//     cy.get('[data-testid=username-textfield]').type('Kezzo')
//     cy.focused().clear()
//
//     cy.get('[data-testid=username-textfield]').type('Daniels_5')
//     cy.focused().clear()
//
//     cy.get('[data-testid=username-textfield]').type('Daniel_6')
//     cy.focused().clear()
//
//     cy.get('[data-testid=username-textfield]').type('choppa')
//     cy.focused().clear()
//
//     cy.get('[data-testid=username-textfield]').type('gropper')
//     cy.focused().clear()
//
//     cy.get('[data-testid=username-textfield]').type('123665')
//     cy.focused().clear()
//
//     cy.get('[data-testid=username-textfield]').type('Hashhers89')
//     cy.focused().clear()
// })
