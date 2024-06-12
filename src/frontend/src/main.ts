import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { KanbanPlugin } from '@syncfusion/ej2-vue-kanban'
import { registerLicense } from '@syncfusion/ej2-base'

const lice = 'ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Vd0VjUH1YdHFQRGhZ'
registerLicense(lice)

const app = createApp(App)
app.use(KanbanPlugin)
app.use(vuetify)
app.use(router)
app.mount('#app')
