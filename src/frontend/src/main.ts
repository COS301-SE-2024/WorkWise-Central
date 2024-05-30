import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import Vue from 'vue'

const vuetify = createVuetify({
  components,
  directives
})
// Vue.use(Vuetify)
createApp(App).use(router).use(vuetify).mount('#app')

// export default new Vue({
//   theme: {
//     dark: false,
//     themes: {
//       light: {
//         primary: '#3f51b5',
//         secondary: '#b0bec5',
//         accent: '#8c9eff',
//         error: '#b71c1c'
//       },
//       dark: {
//         primary: '#3f51b5',
//         secondary: '#b0bec5',
//         accent: '#8c9eff',
//         error: '#b71c1c'
//       }
//     }
//   }
// })
