// Import the necessary dependencies
import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import NotificationSettingsPage from '../Notifications.vue'
import settingsMenu from '../../SettingsMenu.vue'

// Create a Vuetify instance
const vuetify = createVuetify()

describe('NotificationSettingsPage', () => {
  beforeEach(() => {
    // Mount the component before each test
    mount(NotificationSettingsPage, {
      global: {
        plugins: [vuetify],
        components: {
          settingsMenu
        }
      }
    })
  })

  it('renders the notification settings page correctly', () => {
    // Check if the title is rendered correctly
    cy.contains('h1', 'Notification Settings').should('be.visible')
  })

  it('has a Push Notifications section', () => {
    cy.contains('h5', 'Push Notifications').should('be.visible')
    cy.contains('Enable Push Notifications').should('be.visible')
    cy.get('input[type="checkbox"]').first().should('be.checked')
  })

  it('has an In-App Notifications section', () => {
    cy.contains('h5', 'In-App Notifications').should('be.visible')
    cy.contains('Enable In-App Notifications').should('be.visible')
    cy.get('input[type="checkbox"]').eq(1).should('be.checked')
  })

  it('has an Email Notifications section', () => {
    cy.contains('h5', 'Email Notifications').should('be.visible')
    cy.contains('Enable Email Notifications').should('be.visible')
    cy.get('input[type="checkbox"]').last().should('be.checked')
  })

  it('shows the email address input when email notifications are enabled', () => {
    cy.get('input[type="checkbox"]').last().check({ force: true })
    cy.get('input[type="email"]').should('be.visible')
  })

  it('hides the email address input when email notifications are disabled', () => {
    cy.get('input[type="checkbox"]').last().uncheck({ force: true })
    cy.get('input[type="email"]').should('not.exist')
  })

  it('saves the notification settings when the form is submitted', () => {
    cy.get('input[type="checkbox"]').first().uncheck({ force: true })
    cy.get('input[type="checkbox"]').eq(1).uncheck({ force: true })
    cy.get('input[type="checkbox"]').last().check({ force: true })
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('button[type="submit"]').click()

    cy.window().then((win) => {
      const notificationForm = win.document.querySelector('[ref="notificationForm"]')
      cy.wrap(notificationForm).submit()
    })

    cy.window().then((win) => {
      cy.spy(win.console, 'log').should('have.been.calledWithMatch', {
        push: { enabled: false },
        inApp: { enabled: false },
        email: { enabled: true, address: 'test@example.com' }
      })
    })
  })
})
