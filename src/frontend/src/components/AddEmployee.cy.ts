import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import AddEmployee from "./AddEmployee.vue"

it("renders add employee", () => {
    const vuetify = createVuetify();
    mount(AddEmployee, {
        global: {
        plugins: [vuetify]
        }
    })
    cy.contains('Add Employee')
    cy.contains('Add employee using employee username')
    cy.contains('OR')
    cy.contains('Send the employee the company ID to join the company')
    cy.contains('Send the employee this link')
});

it("click add employee button", () => {
    const vuetify = createVuetify();
    mount(AddEmployee, {
        global: {
        plugins: [vuetify]
        }
    })

    cy.contains('button','add employee').click()
});
