import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import InventoryDetails from '../management/InventoryDetails.vue'
it('renders inventory details form on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1366x768 pixels
  const vuetify = createVuetify()
  mount(InventoryDetails, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'View').click() // Clicks the button containing the text 'Edit Inventory'
  cy.contains('button', 'Close').click() // Clicks the button containing the text 'Delete Inventory'
})
