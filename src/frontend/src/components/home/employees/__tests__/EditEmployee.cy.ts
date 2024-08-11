import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import EditEmployee from '../management/EditEmployee.vue'

it('renders add employee', () => {
  const vuetify = createVuetify()
  mount(EditEmployee, {
    global: {
      plugins: [vuetify]
    }
  })
  // cy.contains('Edit')
})
