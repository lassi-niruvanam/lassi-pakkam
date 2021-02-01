import Vue from 'vue';
import Router from 'vue-router';
import அறிமுகம் from './views/அறிமுகம்.vue';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'அறிமுகம்',
          component: அறிமுகம்
      },
      {
          path: '/அறிமுகம்',
          name: 'அறிமுகம்',
          component: அறிமுகம்
      },
      {
          path: '/கேள்விகள்',
          name: 'கேள்விகள்',
          component: () => import('./views/கேள்விகள்.vue')
      },
      {
          path: '/மேம்பாடு',
          name: 'மேம்பாடு',
          component: () => import('./views/மேம்பாடு.vue')
      },
      {
          path: '/கணக்கு',
          name: 'கணக்கு',
          component: () => import('./views/கணக்கு/கணக்கு.vue')
      },
      {
        path: '/பங்களி',
        name: 'பங்களி',
        component: () => import('./views/பங்களி/பங்களி.vue')
      },
      {
          path: '/பங்களி/இலக்கணங்கள்/:niralmozhi',
          component: () => import('./views/பங்களி/நிரல்மொழி.vue')
      },
      {
          path: '/பங்களி/வலைப்பக்கம்',
          component: () => import('./views/பங்களி/மொழியாக்கம்.vue')
      },
      {
          path: '/பதிவிறக்கங்கள்',
          name: 'பதிவிறக்கங்கள்',
          component: () => import('./views/பதிவிறக்கங்கள்.vue')
      },
      {
          path: '/தொடர்பு',
          name: 'தொடர்பு',
          component: () => import('./views/தொடர்பு.vue')
      },
      { path: '*', redirect: '/' }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.afterEach((to) => {
    // https://stackoverflow.com/questions/51639850/how-to-change-page-titles-when-using-vue-router
    // https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title || 'லஸ்ஸி'
    })
})

export default router
