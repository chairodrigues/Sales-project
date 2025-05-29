import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5e5e5e',
        secondary: '#9FDDF7',
        success: '#2e8b57',
        error: '#E10000',
        warning: '#FECC00',
        info: '#2196F3'
      },
    },
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
})
