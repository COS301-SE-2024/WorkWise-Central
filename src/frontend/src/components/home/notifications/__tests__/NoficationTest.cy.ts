import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import AppointmentsPage from '../appointments/AppointmentsPage.vue'
import VideoConferencing from '../appointments/VideoConferencing.vue'
import NotificationsPage from '../management/NotificationsPage.vue'
import MessageBoard from '../messages/MessageBoard.vue'

it('renders AppointmentsPage on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(AppointmentsPage, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders VideoConferencing on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(VideoConferencing, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders NotificationsPage on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(NotificationsPage, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders MessageBoard on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(MessageBoard, {
    global: {
      plugins: [vuetify]
    }
  })
})
