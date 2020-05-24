import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueI18n from 'vue-i18n'
import messages from '../trads.json'
import மொழிபெயர்ப்புகள் from '../மொழியாக்கம்/மொழியாக்கம்'

Vue.use(require('vue-cookies'))
Vue.use(Vuetify);
Vue.use(VueI18n);

export const மொழி_மேலாண்மை = new மொழிபெயர்ப்புகள்(messages, 'தமிழ்')

export const i18n = new VueI18n({
  locale: Vue.$cookies.get('மொழி') || 'தமிழ்',
  fallbackLocale: 'தமிழ்',
  messages
})

const ops = {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
}


export default new Vuetify({
  ops
});
