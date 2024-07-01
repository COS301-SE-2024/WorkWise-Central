import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientDesk from 'WorkWise-Central/src/frontend/src/views/ClientDesk.vue'

it('renders client desk', () => {
  const vuetify = createVuetify()
  mount(ClientDesk, {
    global: {
      plugins: [vuetify]
    }
  })
})
