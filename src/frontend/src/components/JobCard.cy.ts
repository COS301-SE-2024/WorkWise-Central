import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import JobCard from './JobCard.vue'

it('renders client desk', () => {
  const vuetify = createVuetify()
  mount(JobCard, {
    global: {
      plugins: [vuetify]
    }
  })
})
