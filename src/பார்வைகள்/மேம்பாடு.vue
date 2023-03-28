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
        <v-expansion-panels
          v-model="தாவல்"
          multiple
        >
          <v-expansion-panel
            class="my-2"
            v-for="(நிரல்மொழி, i) in நிரல்மொழிகள்"
            :key="i"
          >
            <niralmozhi-mempatu :niralmozhi="நிரல்மொழி" />
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { 
  Nuchabäl
} from 'nuchabal'
import { லஸ்ஸி_இலக்கணங்கள் } from 'lassi-ilakkanankal'
import {லஸ்ஸியை_பயன்படுத்து } from "@/plugins/லஸ்ஸி"
import NiralmozhiMempatu from "@/components/நிரல்மொழி_மேம்பாடு.vue"
const nuchabäl = new Nuchabäl({});
const இலக்கணங்கள் = new லஸ்ஸி_இலக்கணங்கள்({});

const{ நிரல்மொழிகள்} = லஸ்ஸியை_பயன்படுத்து();

const தாவல் = ref([]);
/*
export default {
    methods: {
      niralmozhi_peyar: function(நிரல்மொழி) {
        return நிரல்பெயர்(நிரல்மொழி, குறியீடு(this.$i18n.locale)) || நிரல்மொழி
      },
      mozhi_peyar: function(மொழி) {
        return மொழிபெயர்(மொழி)
      },
      niraivu_ellam: function(நிரல்மொழி) {
        let மொழிகள் = this.mozhikal(நிரல்மொழி).slice(1)
        if (!மொழிகள்.length) {
          return  0
        }
        return மொழிகள்.map(மொழி => this.niraivu(நிரல்மொழி, மொழி)).reduce((a, b) => (a + b)) / மொழிகள்.length;
      },
      niraivu: function(நிரல்மொழி, மொழி) {
        return நிறைவு(நிரல்மொழி, மொழி)
      },
      padam: function(நிரல்மொழி) {
        if (this.takavalkal[நிரல்மொழி]) {
          return this.takavalkal[நிரல்மொழி]['படம்']
        }
      }
    },
    data: function () {
      return {
        tabs: 0,
      }
    }
};
*/
</script>
