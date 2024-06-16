import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import SplashScreen from '../components/SplashScreen.vue'

beforeEach(() => {
  const vuetify = createVuetify()
  mount(SplashScreen, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('shows the splash screen', () => {
  cy.contains('WorkWise')
  cy.contains('Welcome To WorkWise Central')
})

it('performs login', () => {
  cy.contains('button', 'Log in').click()
  cy.get('input[name="username"]').type('test')
  cy.get('input[name="password"]').type('test')
  // Ensure this matches your button's text
  cy.contains('button', 'LOGIN').click()
})

it('performs register', () => {
  cy.contains('button', 'Sign up').click()
  cy.get('input[type="email"]').type('test@test.com')
  cy.get('input[name="password"]').type('Test123#')
  cy.get('input[name="confirm_password"]').type('Test123#')
})

it('performs theme change', () => {
  cy.contains('button', 'Theme').click()
})
