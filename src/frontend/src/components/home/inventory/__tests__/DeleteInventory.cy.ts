import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import DeleteInventory from '../management/DeleteInventory.vue'
it('renders delete inventory form on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1366x768 pixels
  const vuetify = createVuetify()
  mount(DeleteInventory, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Delete').click() // Clicks the button containing the text 'Delete Inventory'
})