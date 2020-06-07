import Vue from 'vue';
import Router from 'vue-router';
import அறிமுகம் from './views/அறிமுகம்.vue';
Vue.use(Router);

export default new Router({
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
            component: () => import('./views/அறிமுகம்.vue')
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
            path: '/மேம்பாடு/:niralmozhi',
            component: () => import('./views/நிரல்மொழி.vue')
        },
        {
            path: '/sign-in',
            name: 'signin',
            component: () => import('./views/Signin.vue')
        },
        {
            path: '/பங்களி',
            name: 'பங்களி',
            component: () => import('./views/பங்களி.vue')
        },
        {
            path: '/பதிவிறக்கங்கள்',
            name: 'பதிவிறக்கங்கள்',
            component: () => import('./views/பதிவிறக்கங்கள்.vue')
        },
        {
            path: '/மொழியாக்கம்',
            name: 'மொழியாக்கம்',
            component: () => import('./views/மொழியாக்கம்.vue')
        }
    ]
});
