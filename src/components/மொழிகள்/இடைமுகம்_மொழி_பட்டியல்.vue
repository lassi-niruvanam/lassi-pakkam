<template>
  <v-menu
    open-on-hover
    offset="10px"
    min-width="225"
    :location="isRtl ? 'bottom right' : 'bottom left'"
  >
    
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind="{props}"/>
    </template>
    
    <v-list
      class="overflow-y-auto"
      max-height="500px"
      min-width="200px"
    >
      <mozhi-uruppati
        v-for="குறியீடு in கிடைக்கும்_மொழி_குறியீடுகள்.sort((இ, ஈ) => இ === மொழி ? -1 : 1)"
        :key="குறியீடு"
        :kuriyitu="குறியீடு"
        :terntetuttappattatu="குறியீடு === மொழி"
      />
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import {useRtl} from 'vuetify';
import {மொழிகளைப்_பயன்படுத்து, கிளிமூக்கை_பயன்படுத்து} from "@lassi-js/kilimukku-vue";
import MozhiUruppati from '@/components/மொழிகள்/மொழி_மேம்பாடு.vue';

const {மொழி} = மொழிகளைப்_பயன்படுத்து();


const {isRtl} = useRtl();
const { கிடைக்கும்_மொழிகளை_பயன்படுத்து } = கிளிமூக்கை_பயன்படுத்து();
const {கிடைக்கும்_மொழி_குறியீடுகள்} = கிடைக்கும்_மொழிகளை_பயன்படுத்து({});
</script>

<style></style>
