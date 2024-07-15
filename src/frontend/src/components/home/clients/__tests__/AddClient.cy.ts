import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import AddClient from '../management/AddClient.vue'

it('renders add client form on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1366x768 pixels

  const vuetify = createVuetify()
  mount(AddClient, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Add Client').click() // Clicks the button containing the text 'Add Client'
  cy.get('input[type="name"]').type('Test')
  cy.get('input[type="surname"]').type('Running')
  cy.get('input[type="email"]').type('testrunning@test.com')
  cy.get('input[type="number"]').type('000000000000')
  cy.get('input[type="street"]').type('Test Street')
  cy.get('input[type="city"]').type('Test City', { force: true })
  cy.get('input[type="postcode"]').type('0000')
  cy.get('input[type="complex"]').type('Test Complex')
  cy.get('input[type="houseNumber"]').type('0000')
})
