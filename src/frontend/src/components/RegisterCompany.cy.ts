import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import RegisterCompany from '../components/RegisterCompanyModal.vue'

it('shows the register company modal', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('Register your company')
  cy.contains('Company name')
  cy.contains('Type of business')
  cy.contains('Company email address')
  cy.contains('Company phone number')
  cy.contains('Company registration number')
  cy.contains('Company VAT number')
  cy.contains('Company address')
})

it('click register company', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('CONTINUE').click()
})
