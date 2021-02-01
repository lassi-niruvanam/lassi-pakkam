import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import lassiPlugin from './plugins/lassi'
import கணக்கு_உட்சேருகி from './plugins/கணக்கு'
import vuetify, { i18n } from './plugins/vuetify'
import router from './router'

Vue.use(lassiPlugin)
Vue.use(கணக்கு_உட்சேருகி)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
