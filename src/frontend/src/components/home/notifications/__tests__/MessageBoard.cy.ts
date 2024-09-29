import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import MessageBoard from '../messages/MessageBoard.vue'

it('renders message board on a laptop viewport', () => {

  const vuetify = createVuetify()
  mount(MessageBoard, {
    global: {
      plugins: [vuetify]
    }
  })
})
