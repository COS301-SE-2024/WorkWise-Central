import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import EditClient from '../management/EditClient.vue'

it('renders edit client form', () => {
  const vuetify = createVuetify()
  mount(EditClient, {
    global: {
      plugins: [vuetify]
    }
  })
})
