// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {மொழிகளைப்_பயன்படுத்து} from '@lassi-js/kilimukku-vue';

import அறிமுகம் from '@/பார்வைகள்/அறிமுகம்.vue'
import கேள்விகள் from '@/பார்வைகள்/கேள்விகள்.vue'
import மேம்பாடு from '@/பார்வைகள்/மேம்பாடு.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: அறிமுகம்,
  },
  {
    path: encodeURI('/அறிமுகம்'),
    name: 'அறிமுகம்',
    component: அறிமுகம்,
  },
  {
    path: encodeURI('/கேள்விகள்'),
    name: 'கேள்விகள்',
    component: கேள்விகள்,
  },
  {
    path: encodeURI('/மேம்பாடு'),
    name: 'மேம்பாடு',
    component: மேம்பாடு,
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach(to => {
  const {மொ} = to.query;
  if (மொ && typeof மொ === 'string') {
    const {மொழிகளை_தேர்ந்தெடுக்கொள்ளு} = மொழிகளைப்_பயன்படுத்து();
    மொழிகளை_தேர்ந்தெடுக்கொள்ளு(மொ);
  }
});

export default router
