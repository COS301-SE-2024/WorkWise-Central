// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
//ORIGINAL CONFIGURATION
// Import commands.js using ES2015 syntax:
import './commands'
import 'vuetify/styles'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
// Example use:
// cy.mount(MyComponent)

//CONFIGURATION WITH MICHAEL AND KUBOS
// import { h } from 'vue'
// import { mount } from 'cypress/vue'
// import { VApp } from 'vuetify/components'
// import vuetify from '../../src/plugins/vuetify'
//
// type MountParams = Parameters<typeof mount>
// type OptionsParam = MountParams[1]
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       mount(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         component: any,
//         options?: OptionsParam
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       ): Chainable<any>
//     }
//   }
// }
//
// Cypress.Commands.add('mount', (component, options = {}) => {
//   options.global = options.global || {}
//   options.global.plugins = options.global.plugins || []
//
//   options.global.plugins.push({
//     install(app) {
//       app.use(vuetify)
//     }
//   })
//
//   return mount(VApp, {
//     ...options,
//     slots: {
//       default: h(component, options.props, {
//         ...options.slots
//       })
//     }
//   })
// })
