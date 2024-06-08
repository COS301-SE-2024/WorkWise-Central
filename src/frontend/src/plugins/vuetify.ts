import 'vuetify/dist/vuetify.min.css'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { createVuetify } from 'vuetify'
export default createVuetify({
  components: {
    VDateInput,    
    VCalendar    
  }
})