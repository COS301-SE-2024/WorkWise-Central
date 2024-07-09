import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import * as components from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'

const vuetify = createVuetify({
  blueprint: md3,
  locale: {
    locale: 'en'
  },
  defaults: {
    VDialog: {
      VCard: {
        VCardTitle: {
          class: 'text-h5 font-weight-regular bg-primary justify-center'
        },
        VCardText: {},
        VCardActions: {}
      },
      VSheet: {
        VCardTitle: {
          class: 'text-h5 font-weight-regular bg-primary justify-center'
        }
      }
    },
    VTextField: {
      variant: 'solo',
      rounded: 'md',
      density: 'compact'
    },
    
    VCard: {
      elevation: 14,
      rounded: 'md',
      height: 'auto'
    },
    VBtn: {
      rounded: 'md',
      variant: 'text',
      class: 'text-none font-weight-regular hello',
      size: 'large'
    },
    VCardTitle: {
      class: ''
    },
    VSheet: {
      elevation: 14,
      rounded: 'md',
      height: 'auto'
    },
    VDivider: {
      thickness: 3
    },
    VAutocomplete: {
      density: 'compact',
      rounded: 'md',
      variant: 'solo'
    },
    VIcon:{
      color:'elementTextColor'
    }
  },
  directives,
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280
    }
  },
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
          background: '#F7F8F9',
          primary: '#2C3E5D',
          secondary: '#879898',
          accent: '#82B1FF',
          error: '#e639462',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          cardColor: '#F1F2F4',
          elementTextColor: '#44546F', // most important color for text
          n_elementTextColor: '#8C9BAB', // most nonImportant color for text
          highlighter: '#DEE4EA',
          tableRowColor: ''
        }
      },
      dark: {
        colors: {
          background: '#161A1D',
          primary: '#8babf1', // Lighter shade of blue for better visibility in dark mode
          secondary: '#879898', // A medium gray, less harsh than pure black or white
          accent: '#448AFF', // A slightly brighter blue to stand out in dark mode
          error: '#E63946', // Keeping error color consistent as it needs to attract attention
          info: '#64B5F6', // A lighter blue for info to ensure readability
          success: '#81C784', // A lighter green for success messages
          warning: '#FFD54F', // A lighter yellow for warnings to ensure they stand out
          cardColor: '#22272B',
          elementTextColor: '#B6C2CF',
          n_elementTextColor: '#8C9BAB', // most nonImportant color for text
          highlighter: '#DEE4EA',
          tableRowColor: '#454f5'
        }
      }
    }
  }
})

export default vuetify
