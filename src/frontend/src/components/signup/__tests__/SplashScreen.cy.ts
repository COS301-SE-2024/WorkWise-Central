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
  cy.contains('WorkWise').should('exist')
  cy.contains('Welcome To WorkWise Central').should('exist')
  cy.contains('button', 'Log in').should('exist')
  cy.contains('button', 'Sign up').should('exist')
  
})

it('performs login', () => {
  const vuetify = createVuetify()
  mount(SplashScreen, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('button', 'Log in').click() // Clicks the button containing the text 'Log in'

  cy.get('input[name="username"]').type('kkkkk')
  cy.get('input[name="password"]').type('Rosex123#')
  //cy.contains('button', 'Login').click() // Clicks the button containing the text 'Log in'
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
  cy.contains('button', 'Continue').click() // Clicks the button containing the text 'Sign Up'
  cy.get('input[type="name"]').type('Test')
  cy.get('input[type="surname"]').type('Running')
  cy.contains('button', 'Continue') // Clicks the button containing the text 'Sign Up'
})

// it('performs theme change', () => {
//   const vuetify = createVuetify()
//   mount(SplashScreen, {
//     global: {
//       plugins: [vuetify]
//     }
//   })
//   cy.contains('button', 'Theme').click() // Clicks the button containing the text 'Change Theme'
// })
