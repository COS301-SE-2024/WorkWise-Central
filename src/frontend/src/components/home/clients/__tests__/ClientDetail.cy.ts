import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientDetails from '../management/AddClient.vue'

it('renders client detials', () => {
  cy.viewport(1920, 1080)
  const vuetify = createVuetify()
  mount(ClientDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('click create client button', () => {
  const vuetify = createVuetify()
  mount(ClientDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})
