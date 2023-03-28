// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'அறிமுகம்',
    component: () => import('@/பார்வைகள்/அறிமுகம்.vue'),
  },
  {
    path: encodeURI('/அறிமுகம்'),
    name: 'அறிமுகம்',
    component: () => import('@/பார்வைகள்/அறிமுகம்.vue'),
  },
  {
    path: encodeURI('/கேள்விகள்'),
    name: 'கேள்விகள்',
    component: () => import('@/பார்வைகள்/கேள்விகள்.vue'),
  },
  {
    path: encodeURI('/மேம்பாடு'),
    name: 'மேம்பாடு',
    component: () => import('@/பார்வைகள்/மேம்பாடு.vue'),
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
