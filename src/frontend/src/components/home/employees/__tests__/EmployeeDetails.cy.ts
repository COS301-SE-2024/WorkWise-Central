import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import EmployeeDetails from '../management/EmployeeDetails.vue'

it('renders add employee', () => {
  const vuetify = createVuetify()
  mount(EmployeeDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})
