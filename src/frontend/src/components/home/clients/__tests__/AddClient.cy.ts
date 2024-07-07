import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import AddClient from '../management/AddClient.vue'

it('renders add client form', () => {
  const vuetify = createVuetify()
  mount(AddClient, {
    global: {
      plugins: [vuetify]
    }
  })
})
