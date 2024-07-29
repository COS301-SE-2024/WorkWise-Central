import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import DeleteEmployee from '../management/DeleteEmployee.vue'

it('renders add employee', () => {
  const vuetify = createVuetify()
  mount(DeleteEmployee, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('Delete')
  cy.get('button').contains('Delete')
})
