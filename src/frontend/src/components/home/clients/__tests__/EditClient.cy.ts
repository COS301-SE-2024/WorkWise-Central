import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import EditClient from '../management/EditClient.vue'

it('renders edit client form', () => {
  cy.viewport(1920, 1080)
  const vuetify = createVuetify()
  mount(EditClient, {
    global: {
      plugins: [vuetify]
    }
  })
})
