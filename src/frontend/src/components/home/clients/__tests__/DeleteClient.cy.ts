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
  cy.contains('button', 'Delete').click()
  cy.contains('.v-card', 'Delete Client').should('exist')
})
it('delete a client', () => {
  cy.viewport(1920, 1080)
  const vuetify = createVuetify()
  mount(DeleteClient, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Delete').should('exist').click()
  cy.contains('.v-card', 'Delete Client').should('exist')
  cy.contains('.v-btn', 'Delete').should('exist')
})
it('cancels', () => {
  cy.viewport(1920, 1080)
  const vuetify = createVuetify()
  mount(DeleteClient, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Delete').should('exist').click()
  cy.contains('.v-card', 'Delete Client').should('exist')
  cy.contains('.v-btn', 'Cancel').should('exist').click()
})
