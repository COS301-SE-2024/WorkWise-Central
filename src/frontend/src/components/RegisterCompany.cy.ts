import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import RegisterCompany from '../components/RegisterCompanyModal.vue'

it('shows the register company modal', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    gloabal: {
      plugins: [vuetify]
    }
  })
  cy.contains('Register your company')
    cy.contains('Company name*Type of business*Company email addressCompany phone numberCompany registration numberCompany VAT numberCompany logoCompany addressContinue')
})
