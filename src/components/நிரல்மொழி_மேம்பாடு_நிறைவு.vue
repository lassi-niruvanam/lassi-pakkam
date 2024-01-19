<template>
  <v-list-item>
    <v-list-item-title>
      <v-row>
        <v-col cols=2>

          <p :class="{'display-5': true, 'text-grey': mozhi === mulMozhi }">{{ மொழி_பெயர் || mozhi }}</p>
        </v-col>
        <v-col cols=10 class="my-auto">
          <v-progress-linear
            :model-value="இந்த_நிறைவு * 100"
            :buffer-value="100"
            :color="mozhi === mulMozhi ? 'grey-lighten-3': 'amber'"
            height="11"
            rounded
          >
        </v-progress-linear>
        </v-col>
      </v-row>
    </v-list-item-title>
  </v-list-item>
  
</template>
<script setup lang="ts">
import { லஸ்ஸியை_பயன்படுத்து } from '@/plugins/லஸ்ஸி';
import { கிளிமூக்கை_பயன்படுத்து } from '@lassi-js/kilimukku-vue';

const சொத்துகள் = defineProps<{niralmozhi: string, mozhi: string, mulMozhi?: string}>();

const { கிடைக்கும்_மொழிகளை_பயன்படுத்து } = கிளிமூக்கை_பயன்படுத்து();
const {மொழியின்_பெயர், } = கிடைக்கும்_மொழிகளை_பயன்படுத்து({});

const {நிறைவு} = லஸ்ஸியை_பயன்படுத்து();
const இந்த_நிறைவு = நிறைவு({நிரல்மொழி: சொத்துகள்.niralmozhi, மொழி: சொத்துகள்.mozhi})

const மொழி_பெயர் = மொழியின்_பெயர்(சொத்துகள்.mozhi);
</script>