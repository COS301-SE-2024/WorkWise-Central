import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import JobDetails from '../management/AddJob.vue'

it('renders job detials', () => {
  const vuetify = createVuetify()
  mount(JobDetails, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.contains('.v-btn', 'Add Job')
})

it('click create Job Button', () => {
  const vuetify = createVuetify()
  mount(JobDetails, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('.v-btn').click()
  cy.contains('.v-card', 'Job Details')
  cy.contains('Job Title*')
  cy.contains('Client')
  cy.contains('If it is a new client, create the employee first. Add new client')
  cy.contains('Job description')
  cy.contains('SELECT START DATE')
  cy.contains('START DATE')
  cy.contains('END DATE')
  cy.contains('Assign Employees')
  cy.contains('Priority')
  cy.contains('Tags')
  cy.contains('Job address')
  cy.contains('Street')
  cy.contains('Suburb')
  cy.contains('Province')
  cy.contains('City/Town')
  cy.contains('Postal Code')
  cy.contains('Complex/Building')
  cy.contains('Complex or Building Name, unit number or floor')
  cy.contains('.v-btn', 'Create Job')
  cy.contains('.v-btn', 'Cancel')
})

it('testing error messages on blur', () => {
  const vuetify = createVuetify()
  mount(JobDetails, {
    global: {
      plugins: [vuetify]
    }
  })
  cy.get('.v-btn').click()
  cy.get('[data-testid=job-title-field]').click()
  cy.focused().blur()
})
