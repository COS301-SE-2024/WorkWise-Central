import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientDesk from './ClientDesk.vue'

it('renders client desk', () => {
  const vuetify = createVuetify()
  mount(ClientDesk, {
    global: {
      plugins: [vuetify]
    }
  })
})
