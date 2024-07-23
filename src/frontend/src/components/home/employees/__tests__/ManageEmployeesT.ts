import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ManageEmployeesT from '../management/ManageEmployees.vue'

it('renders manage employees', () => {
  const vuetify = createVuetify()
  mount(ManageEmployeesT, {
    global: {
      plugins: [vuetify]
    }
  })
})
