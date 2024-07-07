import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import DeleteClient from '../management/DeleteClient.vue'

it('renders delete client form', () => {
  cy.viewport(1920, 1080)
  const vuetify = createVuetify()
  mount(DeleteClient, {
    global: {
      plugins: [vuetify]
    }
  })
})