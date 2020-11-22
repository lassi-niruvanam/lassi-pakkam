import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import lassiPlugin from './plugins/lassi';
import vuetify, { i18n } from './plugins/vuetify';
import router from './router';

Vue.use(lassiPlugin)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
