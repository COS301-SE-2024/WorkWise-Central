import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import JobDetails from './AddJob.vue'

it('renders job detials', () => {
  const vuetify = createVuetify()
  mount(JobDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('click create client button', () => {
  const vuetify = createVuetify()
  mount(JobDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})

it('click create Job Button', () => {
  const vuetify = createVuetify()
  mount(JobDetails, {
    global: {
      plugins: [vuetify]
    }
  })
})
