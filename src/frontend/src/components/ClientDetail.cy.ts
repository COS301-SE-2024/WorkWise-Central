import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientDetails from "./ClientDetails.vue"

it("renders client detials", () => {
    const vuetify = createVuetify();
    mount(ClientDetails, {
        global: {
        plugins: [vuetify]
        }
    })
    cy.contains('Client Details')
    cy.contains('First name of client')
    cy.contains('Second name of client')
    cy.contains('Client email address')
    cy.contains('Client phone number')
    cy.contains('Company address')
    cy.contains('Preferred language')
});

it("click create client button", () => {
    const vuetify = createVuetify();
    mount(ClientDetails, {
        global: {
        plugins: [vuetify]
        }
    })

    cy.contains('button','CREATE CLIENT').click()
});
