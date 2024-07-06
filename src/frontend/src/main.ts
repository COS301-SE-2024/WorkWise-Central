import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { KanbanPlugin } from '@syncfusion/ej2-vue-kanban'
import { registerLicense } from '@syncfusion/ej2-base'

const lice = 'ORg4AjUWIQA/Gnt2UFhhQlJBfVhdWnxLflFyVWJZdVpxfldAcC0sT3RfQFljT35bdkRgX3pYc3NURQ=='
registerLicense(lice)

const app = createApp(App)
app.use(KanbanPlugin)
app.use(vuetify)
app.use(router)
app.mount('#app')
