import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
// import Vue from 'vue';
// import Vuetify from 'vuetify/lib'
// import 'vuetify/dist/vuetify.min.css';

// Vue.use(Vuetify,{
//     theme: {
//         primary: '#3f51b5',
//         secondary: '#b0bec5',
//         accent: '#8c9eff',
//         error: '#b71c1c',
//     }
// });
