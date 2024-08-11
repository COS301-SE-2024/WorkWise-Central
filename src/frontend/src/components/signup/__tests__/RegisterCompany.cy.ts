import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import RegisterComapny from '../RegisterCompanyModal.vue'

it('shows the register company modal', () => {
  const vuetify = createVuetify()
  mount(RegisterComapny, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').contains('Register Company')
})

it('click register company', () => {
  const vuetify = createVuetify()
  mount(RegisterComapny, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.contains('.v-sheet', 'Register your company')
})

it('check the text near the text fields if they are correct', () => {
  const vuetify = createVuetify()
  mount(RegisterComapny, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('button').click()
  cy.get('label').contains('Company Name')
  cy.get('label').contains('Type of business*')
  cy.get('label').contains('Company email address')
  cy.get('label').contains('Company phone number*')
  cy.get('label').contains('Company registration number*')
  cy.get('label').contains('Company VAT number*')
  cy.get('label').contains('Company VAT number*')
  cy.contains('Company logo')
  cy.contains('Image size limit of 5MB')
  cy.get('label').contains('Company address*')
  cy.get('label').contains('Street')
  cy.get('label').contains('Suburb')
  cy.get('label').contains('Province')
  cy.get('label').contains('City/Town')
  cy.get('label').contains('Postal Code')
  cy.get('label').contains('Complex/Building')
})

it('testing error messages on blur', () => {
  const vuetify = createVuetify()
  mount(RegisterComapny, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('.v-btn').click()
  cy.get('[data-testid=company-name-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=company-name-field] > .v-input__details').contains(
    'Company name is required'
  )

  cy.get('[data-testid=type-of-company-autocomplete]').click()
  cy.focused().blur()
  cy.get('[data-testid=type-of-company-autocomplete] > .v-input__details').contains(
    'Business type required'
  )

  cy.get('[data-testid=company-email-address-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=company-email-address-field] > .v-input__details').contains(
    'Email should contain an @ symbol'
  )

  cy.get('[data-testid=company-phone-number-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=company-phone-number-field] > .v-input__details').contains(
    'Phone number is required'
  )

  cy.get('[data-testid=company-registration-number-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=company-registration-number-field] > .v-input__details').contains(
    'Company registration number is required'
  )

  cy.get('[data-testid=company-VAT-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=company-VAT-field] > .v-input__details').contains('VAT number is required')

  // cy.get('[data-testid=company-logo-file-input]').click()
  // cy.focused().blur()
  // cy.get('[data-testid=company-logo-file-input] > .v-input__details').contains(
  //   'Description is required'
  // )

  cy.get('[data-testid=street-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=street-field] > .v-input__details').contains('Street is required')

  cy.get('[data-testid=suburb-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=suburb-field] > .v-input__details').contains('Suburb is required')

  cy.get('[data-testid=province-autocomplete]').click()
  cy.focused().blur()
  cy.get('[data-testid=province-autocomplete] > .v-input__details').contains('Province is required')

  cy.get('[data-testid=city-town-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=city-town-field] > .v-input__details').contains('City is required')

  cy.get('[data-testid=postal-code-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=postal-code-field] > .v-input__details').contains('Postal code is required')

  cy.get('[data-testid=complex-field]').click()
  cy.focused().blur()
  cy.get('[data-testid=complex-field] > .v-input__details').contains('Complex/Buidling is required')
})
