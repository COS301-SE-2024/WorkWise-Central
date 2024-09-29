import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import JobChecklist from '../management/JobChecklist.vue'

it('renders message board on a laptop viewport', () => {

    const vuetify = createVuetify()
    mount(JobChecklist, {
        global: {
            plugins: [vuetify]
        }
    })
})
