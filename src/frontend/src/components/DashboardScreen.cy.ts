import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import Modals from '../views/Modals.vue'

it('shows the register company modal', () => {
  const vuetify = createVuetify()
  mount(Modals, {
    global: {
      plugins: [vuetify]
    }
  })
  
})