// https://on.cypress.io/api

describe('Calendar and dashboard test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/dashboard')
  })
})

describe('Stat view checker', () => {
  it("'visits the app root url and checks if it render and checks the right values", () => {
    // Visit the root URL
    cy.visit('statisticView')
  })
})

describe('Clients management check  ', () => {
  it("'visits the app root url and checks if it render and checks the right values", () => {
    // Visit the root URL
    cy.visit('/client-desk-view')
  })
})

describe('Clients Center  ', () => {
  it('visits the app root url and checks if it render and checks the right values', () => {
    // Visit the root URL
    cy.visit('/client-desk-view')
  })
})

describe('Employeees management checking', () => {
  it('visits the app root url and checks if it render and checks the right values', () => {
    // Visit the root URL
    cy.visit('/manager-employees')
  })
})

describe('Job Assignment view check', () => {
  it("'visits the app root url and checks if it render and checks the right values", () => {
    // Visit the root URL
    cy.visit('/jobAssignmentView')
  })
})

describe('My Sixth Test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/job-card')
  })
})

describe('My Seventh Test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/add-job')
  })
})

describe('My Eighth Test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/add-employee')
  })
})

describe('My Ninth Test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/add-client')
  })
})

describe('My Tenth Test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/support')
  })
})

describe('My Eleventh Test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/backlog')
  })
})
