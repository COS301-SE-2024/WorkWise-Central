import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { KanbanPlugin } from '@syncfusion/ej2-vue-kanban'
import { registerLicense } from '@syncfusion/ej2-base'

const lice = 'ORg4AjUWIQA/Gnt2UFhhQlJBfVhdWnxLflFyVWJZdVpxfldAcC0sT3RfQFljT35bdkRgX3pYc3NURQ=='
registerLicense(lice)

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker)
app.use(KanbanPlugin)
app.use(vuetify)
app.use(router)
app.mount('#app')
