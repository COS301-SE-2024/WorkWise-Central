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
    // cy.contains('Name of client')
    // cy.contains('Client email address')
    // cy.contains('Client phone number')
    // cy.contains('Client address')
    // cy.contains('Company (if applicable)')
    // cy.contains('Company address (if applicable)')
    // cy.contains('Preferred language')
});

it("click create client button", () => {
    const vuetify = createVuetify();
    mount(JobDetails, {
        global: {
        plugins: [vuetify]
        }
    })

    cy.contains('button','add new client').click()
});

it("click create Job Button", () => {
    const vuetify = createVuetify();
    mount(JobDetails, {
        global: {
        plugins: [vuetify]
        }
    })

    cy.contains('button','add new client').click()
});