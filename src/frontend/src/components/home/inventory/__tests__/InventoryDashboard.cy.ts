import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import InventoryDashboard from '../management/InventoryDashboard.vue'
it('renders inventory dashboard on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1366x768 pixels
  const vuetify = createVuetify()
  mount(InventoryDashboard, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Add Inventory').click() // Clicks the button containing the text 'Add Inventory'
})
