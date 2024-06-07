import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          background: '#FFFFFF', // light theme background color
          surface: '#000000', // light theme surface color
          primary: '#1976D2', // light theme primary color
          secondary: '#424242', // light theme secondary color
          accent: '#82B1FF', // light theme accent color
          error: '#FF5252', // light theme error color
          info: '#2196F3', // light theme info color
          success: '#4CAF50', // light theme success color
          warning: '#FB8C00' // light theme warning color
        },
      },
      dark: {
        colors: {
          background: '#121212', // dark theme background color
          surface: '#1E1E1E', // dark theme surface color
          primary: '#1976D2', // dark theme primary color
          secondary: '#03DAC6', // dark theme secondary color
          accent: '#FF4081', // dark theme accent color
          error: '#CF6679', // dark theme error color
          info: '#03A9F4', // dark theme info color
          success: '#4CAF50', // dark theme success color
          warning: '#FFB300' // dark theme warning color
        },
      },
    },
  },
})

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker)
app.use(vuetify)
app.use(router)
app.mount('#app')