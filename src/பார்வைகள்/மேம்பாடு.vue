<template>
    <v-container class="mt-10">
      <v-card
        class="mx-auto text-center"
        max-width="1000"
        flat
      >
        <v-img
         src="@/assets/வழுக்கு_மரம்.svg"
         max-height="250"
         contain
        ></v-img>
        <h1 class="display-1 font-weight-bold py-10">
          {{ $மொ('மேம்பாடு.தலைப்பு') }}
        </h1>
        <v-expansion-panels>
            <niralmozhi-mempatu v-for="நிரல்மொழி in நிரல்மொழிகள்"
            :key="நிரல்மொழி" :niralmozhi="நிரல்மொழி" />
        </v-expansion-panels>
      </v-card>
    </v-container>
</template>

<script setup lang="ts">
import {லஸ்ஸியை_பயன்படுத்து } from "@/plugins/லஸ்ஸி"
import NiralmozhiMempatu from "@/components/நிரல்மொழி_மேம்பாடு.vue"
import {கிளிமூக்கை_பயன்படுத்து} from "@lassi-js/kilimukku-vue"

const {மொழியாக்கம்_பயன்படுத்து} = கிளிமூக்கை_பயன்படுத்து();
const {$மொ} = மொழியாக்கம்_பயன்படுத்து({})

const{ நிரல்மொழிகள்} = லஸ்ஸியை_பயன்படுத்து();


</script>
