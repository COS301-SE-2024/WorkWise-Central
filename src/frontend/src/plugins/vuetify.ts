import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import * as components from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  directives,
  components: {
    VDateInput,
    VCalendar,
    VTimePicker,
    ...components
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#6a99ce',
          secondary: '#879898',
          accent: '#82B1FF',
          error: '#e639462',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      dark: {
        colors: {
          primary: '#6a99ce', // Lighter shade of blue for better visibility in dark mode
          secondary: '#879898', // A medium gray, less harsh than pure black or white
          accent: '#448AFF', // A slightly brighter blue to stand out in dark mode
          error: '#E63946', // Keeping error color consistent as it needs to attract attention
          info: '#64B5F6', // A lighter blue for info to ensure readability
          success: '#81C784', // A lighter green for success messages
          warning: '#FFD54F' // A lighter yellow for warnings to ensure they stand out
        }
      }
    }
  }
})

export default vuetify
