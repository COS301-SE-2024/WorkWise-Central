import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import JoinCompanyModal from '../JoinCompanyModal.vue'

it('renders client detials', () => {
  const vuetify = createVuetify()
  mount(JoinCompanyModal, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('Join Company')
  cy.contains('Search for the company by name')
  cy.contains('OR')
  cy.contains('Enter the Company ID')
})

it('click create client button', () => {
  const vuetify = createVuetify()
  mount(JoinCompanyModal, {
    global: {
      plugins: [vuetify]
    }
  })

  cy.contains('button', 'JOIN COMPANY').click()
})
