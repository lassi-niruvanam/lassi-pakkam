<template>
  <v-progress-linear
    :model-value="இந்த_நிறைவு * 100"
    :buffer-value="100"
    color="amber"
    height="11"
    rounded
  ></v-progress-linear>
</template>
<script setup lang="ts">
import { லஸ்ஸியை_பயன்படுத்து } from '@/plugins/லஸ்ஸி';


const சொத்துகள் = defineProps<{niralmozhi: string, mozhi: string}>();


const {நிறைவு} = லஸ்ஸியை_பயன்படுத்து();
const இந்த_நிறைவு = நிறைவு({நிரல்மொழி: சொத்துகள்.niralmozhi, மொழி: சொத்துகள்.mozhi})

</script>