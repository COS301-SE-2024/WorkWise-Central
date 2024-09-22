import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { KanbanPlugin } from '@syncfusion/ej2-vue-kanban'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import VNetworkGraph from 'v-network-graph'
import 'v-network-graph/lib/style.css'
import './assets/styles.css'
import 'vuetify/dist/vuetify.min.css'
//import firebaseMessaging from '@/store/firebase'
import Vue3Geolocation from 'vue3-geolocation'

//To refer to API in Dev and Prod
export const API_URL: string = import.meta.env.VITE_SERVER_API
export const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const app = createApp(App)
//app.config.globalProperties.$messaging = firebaseMessaging
app.use(KanbanPlugin)
app.use(vuetify)
app.use(Vue3Geolocation)
app.use(router)
app.use(ToastService)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(VNetworkGraph)
// app.use(store)
app.mount('#app')
