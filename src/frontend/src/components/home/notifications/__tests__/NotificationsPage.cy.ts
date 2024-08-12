import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import NotificationsPage from '../management/NotificationsPage.vue'
it('renders notifications page on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1366x768 pixels
  const vuetify = createVuetify()
  mount(NotificationsPage, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'All').click() // Clicks the button containing the text 'All'
  cy.contains('button', 'Unread').click() // Clicks the button containing the text 'Unread'
  cy.contains('button', 'Read').click() // Clicks the button containing the text 'Read'
})
