import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import ClientPortal from '../client_portal/ClientPortal.vue'

it('renders message board on a laptop viewport', () => {

    const vuetify = createVuetify()
    mount(ClientPortal, {
        global: {
            plugins: [vuetify]
        }
    })
})
