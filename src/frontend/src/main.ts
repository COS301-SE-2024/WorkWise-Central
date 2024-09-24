import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { KanbanPlugin } from '@syncfusion/ej2-vue-kanban'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import Lara from '@primevue/themes/lara'
//import Nora from '@primevue/themes/nora'
import ToastService from 'primevue/toastservice'
import VNetworkGraph from 'v-network-graph'
import 'v-network-graph/lib/style.css'
import './assets/styles.css'
import 'vuetify/dist/vuetify.min.css'
//import firebaseMessaging from '@/store/firebase'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './index.css'
import ConfirmationService from 'primevue/confirmationservice'
import '@/assets/theme.css'

//To refer to API in Dev and Prod
export const API_URL: string =
  import.meta.env.ENVIRONMENT == 'prod'
    ? import.meta.env.VITE_SERVER_API_PROD
    : import.meta.env.VITE_SERVER_API_DEV

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
//app.config.globalProperties.$messaging = firebaseMessaging

app.use(KanbanPlugin)
app.use(vuetify)
app.use(router)
app.use(ToastService)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(VNetworkGraph)
app.use(pinia)
app.use(ConfirmationService)
// app.use(store)
app.mount('#app')
