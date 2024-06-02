import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import JobDetails from "./JobDetailsList.vue"

it("renders job detials", () => {
    const vuetify = createVuetify();
    mount(JobDetails, {
        global: {
        plugins: [vuetify]
        }
    })
    cy.contains('Job Details')
    cy.contains('Client')
    cy.contains('If it is a new client, create the client first.')
    cy.contains('Job description')
    cy.contains('Date of job')
    cy.contains('Job address')
});

it("click create client button", () => {
    const vuetify = createVuetify();
    mount(JobDetails, {
        global: {
        plugins: [vuetify]
        }
    })

    cy.contains('button','Add new client').click()
});

it("click create Job Button", () => {
    const vuetify = createVuetify();
    mount(JobDetails, {
        global: {
        plugins: [vuetify]
        }
    })

    cy.contains('button','CREATE JOB').click()
});