import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientDetails from '../management/AddClient.vue'

it('renders client detials', () => {
  const vuetify = createVuetify()
  mount(ClientDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('click create client button', () => {
  const vuetify = createVuetify()
  mount(ClientDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})
