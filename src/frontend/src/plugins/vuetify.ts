// import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { createVuetify } from 'vuetify'

export default createVuetify({
  components: {
    VCalendar
  }
})

// Vue.use(Vuetify,{
//     theme: {
//         primary: '#3f51b5',
//         secondary: '#b0bec5',
//         accent: '#8c9eff',
//         error: '#b71c1c',
//     }
// });
