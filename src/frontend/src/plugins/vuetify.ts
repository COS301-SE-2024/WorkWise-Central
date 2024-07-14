import { createVuetify } from 'vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import { fa } from 'vuetify/iconsets/fa'
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
          class: 'text-h5 font-weight-regular bg-secondary justify-end text-center'
        },
        VCardText: { class: 'text-h7 font-weight-regular justify-center bg-cardColor' },
        VCardActions: { class: 'text-h6 font-weight-regular justify-center bg-cardColor' }
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
      density: 'compact',
      clearable: true,
      color: 'cardColor'
    },

    VCard: {
      elevation: 14,
      rounded: 'md',
      height: 'auto',

      VCardTitle: {
        class: 'text-h5 font-weight-regular  d-flex justify-center bg-cardColor text-secondary'
      },
      VCardText: {
        class: 'bg-cardColor',
        VList: {
          class: 'bg-cardColor',
          VListItem: {
            class: 'bg-cardColor'
          }
        }
      },
      VCard: {
        class: 'bg-cardColor'
      }
    },
    VBtn: {
      rounded: 'md',
      variant: 'text',
      class: 'text-none font-weight-regular hello',
      size: 'large',
      color: 'primary'
    },
    VCardTitle: {
      class: 'text-h5 font-weight-regular bg-secondary justify-center'
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
    VIcon: {
      color: 'secondary'
    },
    Small: {
      color: 'elementTextColor',
      VTextField: {
        class: 'bg-primary'
      }
    },
    VRow: {
      VCol: {
        Label: {
          class: 'font-weight-bold',
          style: 'font-size: 20px'
        }
      }
    },
    VChip: {
      rounded: 'md'
    },
    VCalender: {
      class: 'bg-cardColor'
    },
    VSelect: {
      color: 'background'
    },
    VExpansionPanel: {
      class: 'bg-cardColor'
    },
    VStepper: {
      class: 'bg-cardColor'
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
    aliases,
    sets: {
      mdi,
      fa
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#F7F8F9',
          primary: '#F0984D',
          secondary: '#227D9B',
          accent: '#82B1FF',
          error: '#e639462',
          info: '#2196F3',
          success: '#1F845A',
          warning: '#E2B203',
          cardColor: '#F1F2F4',
          elementTextColor: '#4C9FC3', // most important color for text
          headingTextColor: '#091E42',
          n_elementTextColor: '#8C9BAB', // most nonImportant color for text
          highlighter: '#DEE4EA',
          tableRowColor: '',
          firstPlace: '#E2B203',
          secondPlace: '#626F86',
          thirdPlace: '#533F04',
          secondRowColor: '#dcdfe4',
          buttonText: '#F7F8F9'
        }
      },
      dark: {
        colors: {
          background: '#161A1D',
          primary: '#F38A3F', // Lighter shade of blue for better visibility in dark mode
          secondary: '#4C9FC3', // A medium gray, less harsh than pure black or white
          accent: '#448AFF', // A slightly brighter blue to stand out in dark mode
          error: '#E63946', // Keeping error color consistent as it needs to attract attention
          info: '#64B5F6', // A lighter blue for info to ensure readability
          success: '#81C784', // A lighter green for success messages
          warning: '#FFD54F', // A lighter yellow for warnings to ensure they stand out
          cardColor: '#22272B',
          elementTextColor: '#B6C2CF',
          headingTextColor: '#DCDFE4',
          n_elementTextColor: '#8C9BAB', // most nonImportant color for text
          highlighter: '#DEE4EA',
          tableRowColor: '#454f5',
          firstPlace: '#FFD700',
          secondPlace: '#C0C0C0',
          thirdPlace: '#CD7F32',
          secondRowColor: '#454f59',
          buttonText: '#F7F8F9'
        }
      }
    }
  }
})

export default vuetify
