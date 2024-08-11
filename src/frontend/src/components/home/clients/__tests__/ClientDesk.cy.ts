import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientDesk from '../management/ClientDesk.vue'

it('renders client desk', () => {
  cy.viewport(1920, 1080)
  const vuetify = createVuetify()
  mount(ClientDesk, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('.v-text-field', 'Search').should('exist')
  cy.contains('.v-btn', 'Add Client').should('exist')
})
