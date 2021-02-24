import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'
import punycode from 'punycode'
import மொழிபெயர்ப்புகள் from '../trads.json'
import மொழியாக்கம் from '../மொழியாக்கம்/மொழியாக்கம்'
import { வலதிலிருந்து } from '../nuchabal/nuchabal'
import VueWorker from 'vue-worker'

Vue.use(require('vue-cookies'))
Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(VueWorker)

const தனிப்பட்ட_மொழிகள் = {
  'லஸ்ஸி.இந்தியா': ['தமிழ்'],
  'लस्सी.भारत': ['हिंदी', 'मराठी', 'नेपाली'],
  'ਲੱਸੀ.ਭਾਰਤ': ['ਪੰਜਾਬੀ']
}

function தனிப்பட்ட_மொழியை_பெறு () {
  var ஆள்களப்_பெயர்
  try {
    ஆள்களப்_பெயர் = punycode.toUnicode(window.location.host)
  } catch (பிழை) {
    ஆள்களப்_பெயர் = window.location.host
  }
  const சாத்தியங்கள் = தனிப்பட்ட_மொழிகள்[ஆள்களப்_பெயர்]
  if (சாத்தியங்கள்) {
    return சாத்தியங்கள்[Math.floor(Math.random() * சாத்தியங்கள்.length)]
  }
  return 'தமிழ்'
}

export const மொழி_மேலாண்மை = new மொழியாக்கம்(மொழிபெயர்ப்புகள், 'தமிழ்')

export const i18n = new VueI18n({
  locale: Vue.$cookies.get('மொழி') || தனிப்பட்ட_மொழியை_பெறு(),
  fallbackLocale: JSON.parse(Vue.$cookies.get('மொழி௨') || '["தமிழ்"]'),
  messages: மொழிபெயர்ப்புகள்
})

const ops = {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
}

export default new Vuetify({
  ops,
  rtl: வலதிலிருந்து(i18n.locale),
  theme: {
    themes: {
      light: {
        primary: "#FFAB00",
        secondary: "#FF0000",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        lightblue: "#14c6FF",
        yellow: "#FFCF00",
        pink: "#FF1976",
        orange: "#FF8657",
        magenta: "#C33AFC",
        darkblue: "#1E2D56",
        gray: "#909090",
        neutralgray: "#9BA6C1",
        green: "#2ED47A",
        red: "#FF5c4E",
        darkblueshade: "#308DC2",
        lightgray: "#BDBDBD",
        lightpink: "#FFCFE3",
        white: "#FFFFFF"
      }
    }
  }
})
