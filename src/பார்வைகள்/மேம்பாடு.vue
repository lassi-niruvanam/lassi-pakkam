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
          லஸ்ஸிக்கு மேலே தொடர்ந்து வேலை செய்கிறோம்
        </h1>
        <v-expansion-panels>
            <niralmozhi-mempatu v-for="நிரல்மொழி in நிரல்மொழிகள்"
            :key="நிரல்மொழி" :niralmozhi="நிரல்மொழி" />
        </v-expansion-panels>
      </v-card>
    </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue';

import {லஸ்ஸியை_பயன்படுத்து } from "@/plugins/லஸ்ஸி"
import NiralmozhiMempatu from "@/components/நிரல்மொழி_மேம்பாடு.vue"

const{ நிரல்மொழிகள்} = லஸ்ஸியை_பயன்படுத்து();

const தாவல = ref([]);

</script>
