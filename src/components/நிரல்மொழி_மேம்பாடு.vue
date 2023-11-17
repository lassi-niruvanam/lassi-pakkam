<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-row class="py-2">
        <v-col cols=3 class="text-center">
          <v-img v-if="படம்"
            tile class="mx-auto" max-height="70" contain max-width="70"
            :src="படம்" />
          <h1 v-else class="text-h1">
            {{ இந்த_நிரல்மொழி_பெயர் ? இந்த_நிரல்மொழி_பெயர்[0] : niralmozhi[0] }}
          </h1>
          <v-card-title
            class="justify-center pb-0"
          >{{ இந்த_நிரல்மொழி_பெயர் }}</v-card-title>
        </v-col>
        <v-divider vertical/>
        <v-col class="text-center" cols=4>
          <h1 class="font-weight-bold my-3">
            {{ $மொ('மேம்பாடு.மொழிகள்') }}
          </h1>
          <p class="text-h2">{{ மொழி_எண்_வடிவூட்டப்பட்டது }}</p>
        </v-col>
        <v-col class="text-center" cols=4>
          <h1 class="font-weight-bold my-3">
            {{ $மொ('மேம்பாடு.நிறைவு') }}
          </h1>
          <v-progress-circular
            :model-value="மொத்தமான_நிறைவு * 100"
            size="60"
            width="8"
            :color="மொத்தமான_நிறைவு === 0 ? 'grey lighten-2' : 'primary'"
          >{{ மொத்தமான_நிறைவு_வடிவூட்டப்பட்டது }} %</v-progress-circular>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      
      <div class="d-flex">
        <p class="text-h5">{{$மொ('மேம்பாடு.மொழியாக்கம்_மேம்பாடு')}}</p>
        <v-spacer/>
        <v-btn
            :href="'https://github.com/lassi-samaaj/lassi-ilakkanangal/tree/master/இலக்கணங்கள்/' + niralmozhi"
            rel=”noopener”
            target="_blank"
            color="primary"
            variant="outlined"
          >
            {{ $மொ('மேம்பாடு.இப்பொதே_பங்களி') }}
            <v-icon end>mdi-open-in-new</v-icon>
          </v-btn>
      </div>
      <v-list>
        <NiralmozhiMempatuNiraivu v-for="மொ in கிடைக்கும்_மொழிகள்" :key="மொ" :niralmozhi="niralmozhi" :mozhi="மொ" :mulMozhi="நிரல்மொழி_மூல்_மொழி"/>
      </v-list>
      
      
    </v-expansion-panel-text>
    
    <v-divider />
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { லஸ்ஸியை_பயன்படுத்து } from '@/plugins/லஸ்ஸி';
import { மொழிகளைப்_பயன்படுத்து, எண்களைப்_பயன்படுத்து, கிளிமூக்கை_பயன்படுத்து } from '@lassi-js/kilimukku-vue';

import NiralmozhiMempatuNiraivu from "./நிரல்மொழி_மேம்பாடு_நிறைவு.vue"

const {மொழியாக்கம்_பயன்படுத்து} = கிளிமூக்கை_பயன்படுத்து();
const {$மொ} = மொழியாக்கம்_பயன்படுத்து({})

const சொத்துகள் = defineProps<{niralmozhi: string}>();

const {மொழி} = மொழிகளைப்_பயன்படுத்து();
const {எண்ணை_வடிவூட்டு} = எண்களைப்_பயன்படுத்து();

const படம் = computed(()=>{
  switch (சொத்துகள்.niralmozhi) {
    case 'python': 
      return 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg';
    case 'javascript':
      return  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png'
    case 'json':
      return  'https://www.json.org/img/json160.gif'
    case 'vue':
      return  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png'
    case 'css':
      return  'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'
    case 'எழில்':
      return 'https://a.fsdn.com/allura/p/ezhillang/icon?1505797486?&w=180'
    case 'cplusplus':
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1920px-ISO_C%2B%2B_Logo.svg.png'
    case 'java':
      return 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1024px-Java_programming_language_logo.svg.png'
    case 'react':
      return 'https://cdn.auth0.com/blog/react-js/react.png'
    case 'citrine':
      return 'http://citrine-lang.org/img/logo.png'
    case 'lark':
      return 'https://raw.githubusercontent.com/lark-parser/lark/master/docs/ide/lark-logo.png'
    default:
      return undefined;
  }
})
const {மொழிகள், நிரல்மொழி_பெயர், நிறைவு, மூல்_மொழி} = லஸ்ஸியை_பயன்படுத்து();
const இந்த_நிரல்மொழி_பெயர் = நிரல்மொழி_பெயர்({நிரல்மொழி: computed(()=>சொத்துகள்.niralmozhi), மொழி: computed(()=>மொழி.value)})
const கிடைக்கும்_மொழிகள் = மொழிகள்({நிரல்மொழி: computed(()=>சொத்துகள்.niralmozhi)})
const மொழி_எண் = computed(()=>{
  return கிடைக்கும்_மொழிகள்.value.length
})
const நிரல்மொழி_மூல்_மொழி = மூல்_மொழி({நிரல்மொழி: computed(()=>சொத்துகள்.niralmozhi)})
const மொத்தமான_நிறைவு = நிறைவு({நிரல்மொழி:computed(()=>சொத்துகள்.niralmozhi)})
const மொத்தமான_நிறைவு_வடிவூட்டப்பட்டது = எண்ணை_வடிவூட்டு(computed(()=>Math.round(மொத்தமான_நிறைவு.value * 100)));

const மொழி_எண்_வடிவூட்டப்பட்டது = எண்ணை_வடிவூட்டு(மொழி_எண்);

// நிறைவு

</script>