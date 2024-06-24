import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import AddEmployee from './AddEmployee.vue'

it('renders add employee', () => {
  const vuetify = createVuetify()
  mount(AddEmployee, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('Add Employee')
  cy.contains('Add employee using employee username')
})

it('click add employee button', () => {
  const vuetify = createVuetify()
  mount(AddEmployee, {
    global: {
      plugins: [vuetify]
    }
  })
})
