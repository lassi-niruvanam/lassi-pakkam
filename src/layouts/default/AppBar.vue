<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon>
      <img contain width="60" src="@/assets/சின்னம்.svg" />
    </v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-tabs
        v-model="தற்பொழுது_தாவல்"
        color="secondary"
      >
          <v-tab
            v-for="தாவல் in தாவல்கள்"
            :to="encodeURI('/'+தாவல்)"
            :key="தாவல்"
            :ripple="false"
            color="secondary"
          >
            <h3>{{ $மொ('தாவல்.' + தாவல்) }}</h3>
          </v-tab>
      </v-tabs>
      
    </v-app-bar-title>
    <v-btn icon="mdi-git" href="https://github.com/lassi-niruvanam/lassi" />
    <itaimukam-mozhi-pattiyal>
      <template #activator="{props}">
        <v-btn v-bind="props" icon="mdi-earth" color="primary"/>
      </template>
    </itaimukam-mozhi-pattiyal>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ItaimukamMozhiPattiyal from "@/components/மொழிகள்/இடைமுகம்_மொழி_பட்டியல்.vue"
import {கிளிமூக்கை_பயன்படுத்து} from "@lassi-js/kilimukku-vue"

const {மொழியாக்கம்_பயன்படுத்து} = கிளிமூக்கை_பயன்படுத்து();
const {$மொ} = மொழியாக்கம்_பயன்படுத்து({})
const தற்பொழுது_தாவல் = ref('அறிமுகம்');
const தாவல்கள் =[
  'அறிமுகம்', 'கேள்விகள்', 'மேம்பாடு',
  // 'பங்களி',
  // 'பதிவிறக்கங்கள்', 'தொடர்பு'
]

</script>
