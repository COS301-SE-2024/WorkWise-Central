import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import DashboardScreen from '../home/DashboardScreen.vue'
it('renders inventory details form on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1366x768 pixels
  const vuetify = createVuetify()
  mount(DashboardScreen, {
    global: {
      plugins: [vuetify]
    }
  })
})
