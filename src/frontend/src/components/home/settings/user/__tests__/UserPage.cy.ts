import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import UserPage from '../UserPage.vue'
import settingsMenu from '../../SettingsMenu.vue'
import userAvatar from '../UserProfileAvatar.vue'

const vuetify = createVuetify()

describe('UserPage', () => {
  beforeEach(() => {
    // Mount the component before each test
    mount(UserPage, {
      global: {
        plugins: [vuetify],
        components: {
          settingsMenu,
          userAvatar
        }
      }
    })
  })

  it('renders the user profile page correctly', () => {
    cy.contains('h1', 'Your Profile').should('be.visible')
  })

  it('renders the Personal Information section', () => {
    cy.contains('h5', 'Personal Information').should('be.visible')
    cy.get('label[for="firstName"]').should('contain', 'First Name')
    cy.get('label[for="surname"]').should('contain', 'Surname')
    cy.get('label[for="dateOfBirth"]').should('contain', 'Date of Birth')
    cy.get('label[for="gender"]').should('contain', 'Gender')
    cy.get('label[for="phone"]').should('contain', 'Phone')
    cy.get('label[for="email"]').should('contain', 'Email')
    cy.get('label[for="preferredLanguage"]').should('contain', 'Preferred Language')
  })

  it('renders the Address Information section', () => {
    cy.contains('h5', 'Address Information').should('be.visible')
    cy.get('label[for="street"]').should('contain', 'Street')
    cy.get('label[for="suburb"]').should('contain', 'Suburb')
    cy.get('label[for="city"]').should('contain', 'City')
    cy.get('label[for="postalCode"]').should('contain', 'Postal Code')
    cy.get('label[for="complex"]').should('contain', 'Complex')
    cy.get('label[for="houseNumber"]').should('contain', 'House Number')
    cy.get('label[for="preferredProvince"]').should('contain', 'Province')
  })

  it('should update user profile information', () => {
    cy.get('input[id="firstName"]').type('John')
    cy.get('input[id="surname"]').type('Doe')
    cy.get('input[id="dateOfBirth"]').type('1990-01-01')
    cy.get('input[id="phone"]').type('1234567890')
    cy.get('input[id="email"]').type('john.doe@example.com')
    cy.get('input[id="street"]').type('123 Main St')
    cy.get('input[id="suburb"]').type('Central')
    cy.get('input[id="city"]').type('Pretoria')
    cy.get('input[id="postalCode"]').type('0001')
    cy.get('input[id="complex"]').type('Complex A')
    cy.get('input[id="houseNumber"]').type('45')
    cy.get('button').contains('Update Profile').click()

    cy.window().then((win) => {
      cy.spy(win.console, 'log').should('have.been.called')
    })
  })

  it('should validate phone and email fields', () => {
    cy.get('input[id="phone"]').type('12345')
    cy.get('input[id="email"]').type('invalid-email')

    cy.get('button').contains('Update Profile').click()

    cy.get('input[id="phone"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Phone number must be 10 digits long and numeric')
    })

    cy.get('input[id="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('E-mail must be valid')
    })
  })
})
