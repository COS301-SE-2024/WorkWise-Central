// https://on.cypress.io/api

describe('Calendar and dashboard test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/dashboard')
  })
})

describe('App Routes', () => {
  // Testing root route
  it('visits the root URL and checks if it renders correctly', () => {
    cy.visit('/')
  })
})

describe('Stat view checker', () => {
  it("'visits the app root url and checks if it render and checks the right values", () => {
    // Visit the root URL
    cy.visit('statisticView')
    // Testing splash view route
    it('visits the splash view URL and checks if it renders correctly', () => {
      cy.visit('/')
    })
  })
})

describe('Clients management check  ', () => {
  it("'visits the app root url and checks if it render and checks the right values", () => {
    // Visit the root URL
    cy.visit('/client-desk-view')
    // Testing modals route
    it('visits the modals URL and checks if it renders correctly', () => {
      cy.visit('/modals')
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
      // Testing client route
      it('visits the client URL and checks if it renders correctly', () => {
        cy.visit('/client')
      })
    })

    describe('Job Assignment view check', () => {
      it("'visits the app root url and checks if it render and checks the right values", () => {
        // Visit the root URL

        // Testing client employee view route
        it('visits the client employee view URL and checks if it renders correctly', () => {
          cy.visit('/client-employee-view')
        })

        // Testing job assignment view route
        it('visits the job assignment view URL and checks if it renders correctly', () => {
          cy.visit('/jobAssignmentView')
        })

        // Testing manager view route
        it('visits the manager view URL and checks if it renders correctly', () => {
          cy.visit('/manager')
        })

        // Testing dashboard route
        it('visits the dashboard URL and checks if it renders correctly', () => {
          cy.visit('/dashboard')
        })

        // Testing add job route
        it('visits the add job URL and checks if it renders correctly', () => {
          cy.visit('/add-job')
        })

        // Testing add employee route
        it('visits the add employee URL and checks if it renders correctly', () => {
          cy.visit('/add-employee')
        })

        // Testing add client route
        it('visits the add client URL and checks if it renders correctly', () => {
          cy.visit('/add-client')
        })

        // Testing calendar route
        it('visits the calendar URL and checks if it renders correctly', () => {
          cy.visit('/calendar')
        })

        // Testing job details route
        it('visits the job details URL and checks if it renders correctly', () => {
          cy.visit('/details-of-job')
        })

        // Testing email confirmation route
        it('visits the email confirmation URL and checks if it renders correctly', () => {
          cy.visit('/email-confirmation')
        })

        // Testing profile route
        it('visits the profile URL and checks if it renders correctly', () => {
          cy.visit('/profile')
        })

        // Testing company settings route
        it('visits the company settings URL and checks if it renders correctly', () => {
          cy.visit('/companySettings')
        })

        // Testing edit company route
        it('visits the edit company URL and checks if it renders correctly', () => {
          cy.visit('/companySettingsView/editCompany')
        })

        // Testing edit roles route
        it('visits the edit roles URL and checks if it renders correctly', () => {
          cy.visit('/companySettingsView/editRoles')
        })

        // Testing edit structure route
        it('visits the edit structure URL and checks if it renders correctly', () => {
          cy.visit('/companySettingsView/editStructure')
        })

        // Testing loading screen route
        it('visits the loading screen URL and checks if it renders correctly', () => {
          cy.visit('/loading')
        })

        // Testing backlog route
        it('visits the backlog URL and checks if it renders correctly', () => {
          cy.visit('/backlog')
        })

        // Testing notification settings route
        it('visits the notification settings URL and checks if it renders correctly', () => {
          cy.visit('/notificationSettings')
        })

        // Testing preference settings route
        it('visits the preference settings URL and checks if it renders correctly', () => {
          cy.visit('/preferenceSettings')
        })

        // Testing statistics route
        it('visits the statistics URL and checks if it renders correctly', () => {
          cy.visit('/statistics')
        })

        // Testing statistic view route
        it('visits the statistic view URL and checks if it renders correctly', () => {
          cy.visit('/statisticView')
        })

        // Testing dummy kanban route
        it('visits the dummy kanban URL and checks if it renders correctly', () => {
          cy.visit('/dummy-kanban')
        })

        // Testing inventory route
        it('visits the inventory URL and checks if it renders correctly', () => {
          cy.visit('/inventory')
        })

        // Testing notifications route
        it('visits the notifications URL and checks if it renders correctly', () => {
          cy.visit('/notifications')
        })

        // Testing manage companies route
        it('visits the manage companies URL and checks if it renders correctly', () => {
          cy.visit('/manageCompanies')
        })

        // Testing teamwork load route
        it('visits the teamwork load URL and checks if it renders correctly', () => {
          cy.visit('/teamwork-load')
        })

        // Testing client center route
        it('visits the client center URL and checks if it renders correctly', () => {
          cy.visit('/client-center')
        })

        // Testing employee center route
        it('visits the employee center URL and checks if it renders correctly', () => {
          cy.visit('/employee-center')
        })

        // Testing inventory center route
        it('visits the inventory center URL and checks if it renders correctly', () => {
          cy.visit('/inventory-center')
        })

        // Testing task center route
        it('visits the task center URL and checks if it renders correctly', () => {
          cy.visit('/task-center')
        })

        // Testing client feedback route
        it('visits the client feedback URL and checks if it renders correctly', () => {
          cy.visit('/client-feedback')
        })

        // Testing report view route
        it('visits the report view URL and checks if it renders correctly', () => {
          cy.visit('/report-view')
        })

        // Testing messages route
        it('visits the messages URL and checks if it renders correctly', () => {
          cy.visit('/messages')
        })

        // Testing stock take route
        it('visits the stock take URL and checks if it renders correctly', () => {
          cy.visit('/stock-take')
        })

        // Testing appointments route
        it('visits the appointments URL and checks if it renders correctly', () => {
          cy.visit('/appointments')
        })

        // Testing tutorial route
        it('visits the tutorial URL and checks if it renders correctly', () => {
          cy.visit('/tutorial')
        })

        // Testing edit tags route
        it('visits the edit tags URL and checks if it renders correctly', () => {
          cy.visit('/edit-tags')
        })

        // Testing edit priority route
        it('visits the edit priority URL and checks if it renders correctly', () => {
          cy.visit('/edit-priority')
        })

        // Testing edit status route
        it('visits the edit status URL and checks if it renders correctly', () => {
          cy.visit('/edit-status')
        })
      })
    })
  })
})

describe('My Eleventh Test', () => {
  it('visits the app root url and checks if it renders correctly', () => {
    // Visit the root URL
    cy.visit('/backlog')

    // Testing teams route
    it('visits the teams URL and checks if it renders correctly', () => {
      cy.visit('/teams')
    })
  })
})
