import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import MessageBoard from '../messages/MessageBoard.vue'

it('renders message board on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1366x768 pixels

  const vuetify = createVuetify()
  mount(MessageBoard, {
    global: {
      plugins: [vuetify]
    }
  })
})
