<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon>
      <img contain width="60" src="@/assets/சின்னம்.svg" />
    </v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-tabs
        v-model="தற்பொழுது_தாவல்"
        :left="true"
        color="secondary"
      >
          <v-tab
            v-for="தாவல் in தாவல்கள்"
            :to="encodeURI('/'+தாவல்)"
            :key="தாவல்"
            :ripple="false"
            color="secondary"
          >
            <h3>{{ $t('தாவல்.' + தாவல்) }}</h3>
          </v-tab>
      </v-tabs>
      
    </v-app-bar-title>
    <v-btn icon href="https://github.com/lassi-niruvanam/lassi">
      <v-icon>
      mdi-git
    </v-icon></v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const தற்பொழுது_தாவல் = ref('அறிமுகம்');
const தாவல்கள் =[
  'அறிமுகம்', 'கேள்விகள்', 'மேம்பாடு',
  // 'பங்களி',
  // 'பதிவிறக்கங்கள்', 'தொடர்பு'
]

</script>
