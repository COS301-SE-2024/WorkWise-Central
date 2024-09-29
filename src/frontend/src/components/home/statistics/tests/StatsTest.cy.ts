import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientBreakdown from '../ClientBreakdown.vue'
import EmployeeBreakdown from '../EmployeeBreakdown.vue'
import InventoryBreakdown from '../InventoryBreakdown.vue'
import InvoiceBreakdown from '../InvoiceBreakdown.vue'
import JobBreakdown from '../JobBreakdown.vue'
import StatisticsDashboard from '../StatisticsDashboard.vue'
import TeamBreakdown from '../TeamBreakdown.vue'

it('renders ClientBreakdown on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(ClientBreakdown, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders EmployeeBreakdown on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(EmployeeBreakdown, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders InventoryBreakdown on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(InventoryBreakdown, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders InvoiceBreakdown on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(InvoiceBreakdown, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders JobBreakdown on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(JobBreakdown, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders StatisticsDashboard on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(StatisticsDashboard, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('renders TeamBreakdown on a laptop viewport', () => {
  cy.viewport(1920, 1080) // Sets the viewport size to 1920x1080 pixels

  const vuetify = createVuetify()
  mount(TeamBreakdown, {
    global: {
      plugins: [vuetify]
    }
  })
})
