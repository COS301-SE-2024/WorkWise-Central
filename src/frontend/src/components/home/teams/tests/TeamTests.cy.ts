import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import CreateTeam from '../management/CreateTeam.vue'
import DeleteTeam from '../management/DeleteTeam.vue'
import TeamsDashboard from '../management/TeamsDashboard.vue'
import UpdateTeam from '../management/UpdateTeam.vue'
import ViewTeam from '../management/ViewTeam.vue'

it('renders CreateTeam on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(CreateTeam, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders DeleteTeam on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(DeleteTeam, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders TeamsDashboard on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(TeamsDashboard, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders UpdateTeam on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(UpdateTeam, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders ViewTeam on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(ViewTeam, {
    global: {
      plugins: [vuetify]
    }
  })
})
