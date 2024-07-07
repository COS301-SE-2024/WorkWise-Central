import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import DeleteClient from '../management/DeleteClient.vue'

it('renders delete client form', () => {
  const vuetify = createVuetify()
  mount(DeleteClient, {
    global: {
      plugins: [vuetify]
    }
  })
})
