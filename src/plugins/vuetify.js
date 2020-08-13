import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n'
import மொழிபெயர்ப்புகள் from '../trads.json'
import மொழியாக்கம் from '../மொழியாக்கம்/மொழியாக்கம்'
import { dàg } from '../nuchabal/nuchabal'
import VueWorker from 'vue-worker'

Vue.use(require('vue-cookies'))
Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(VueWorker)

export const மொழி_மேலாண்மை = new மொழியாக்கம்(மொழிபெயர்ப்புகள், 'தமிழ்')
console.log(Vue.$cookies.get('மொழி௨'))

export const i18n = new VueI18n({
  locale: Vue.$cookies.get('மொழி') || 'தமிழ்',
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
  rtl: dàg(i18n.locale)
});
