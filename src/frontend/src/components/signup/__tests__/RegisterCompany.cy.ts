import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import RegisterCompany from '../RegisterCompanyModal.vue'

it('shows the register company modal', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('Register your company')
})

it('shows company name test input', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('Company Name')
})

it('shows type of business name  test input', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('Type of business*')
})

it('shows company email address and test input', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('Company email address')
})

it('shows company phone number and test input', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('Company phone number*')
})

it('shows the company registration and test input', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('Company registration number*')
})

it('shows the VAT number and test input', () => {
  const vuetify = createVuetify()
  mount(RegisterCompany, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('Company VAT number*')
})
