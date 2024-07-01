import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import SplashScreen from '../SplashScreen.vue'

it('shows the splash screen', () => {
  const vuetify = createVuetify()
  mount(SplashScreen, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('WorkWise')
  cy.contains('Welcome To WorkWise Central')
})

it('performs login', () => {
  const vuetify = createVuetify()
  mount(SplashScreen, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Log in').click() // Clicks the button containing the text 'Log in'

  cy.get('input[name="username"]').type('test')
  cy.get('input[name="password"]').type('test')
  // cy.contains('button', 'LOGIN').click() // Clicks the button containing the text 'Log in'
})

it('performs register', () => {
  const vuetify = createVuetify()
  mount(SplashScreen, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Sign up').click() // Clicks the button containing the text 'Sign up'
  cy.get('input[type="email"]').type('test@test.com')
  cy.get('input[name="password"]').type('Test123#')
  cy.get('input[name="confirm_password"]').type('Test123#')
})

it('performs theme change', () => {
  const vuetify = createVuetify()
  mount(SplashScreen, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Theme').click() // Clicks the button containing the text 'Change Theme'
})
