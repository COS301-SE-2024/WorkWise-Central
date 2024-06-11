import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientEmployeeView from './ClientEmployeeView.vue'

it('renders client employee view', () => {
  const vuetify = createVuetify()
  mount(ClientEmployeeView, {
    global: {
      plugins: [vuetify]
    }
  })
})
