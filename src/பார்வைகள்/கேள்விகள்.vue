<template>
    <v-container fluid class="pa-10">
      <v-card
        class="mx-auto"
        flat
        max-width="1000"
      >
        <v-row>
          <v-col cols="12" class="text-center pa-10">
            <v-img
             src="@/assets/தென்னை_மரம்.svg"
             max-height="250"
             contain
            ></v-img>
            <h1 class="display-1 font-weight-bold mb-3">
              {{ $மொ('கேள்விகள்.தலைப்பு') }}
            </h1>
          </v-col>
          <v-col
            cols="12" class="px-10"
            v-for="(கேள்வி, இ) in கேள்விகள்" :key="'கேள்வி-' + இ"
          >
            <h2
              class="headline font-weight-bold mb-3"
              v-html="compiledMarkdown( $மொ('கேள்விகள்.'+ கேள்வி.கேள்வி) )"
            >
            </h2>

            <div
             v-for="(பதில், ஈ) in கேள்வி.பதில்" :key="'பதில்-' + ஈ"
             v-html="compiledMarkdown( $மொ('கேள்விகள்.' + பதில்) )"
            ></div>

          </v-col>
          <v-col cols="12" class="text-center pa-10">
            <v-img
             src="@/assets/பனை.svg"
             max-height="250"
             contain
            ></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
</template>
<script setup lang="ts">
import {marked} from 'marked'
import DOMPurify from 'dompurify';
import {கிளிமூக்கை_பயன்படுத்து} from "@lassi-js/kilimukku-vue"

const {மொழியாக்கம்_பயன்படுத்து} = கிளிமூக்கை_பயன்படுத்து();
const {$மொ} = மொழியாக்கம்_பயன்படுத்து({})

const compiledMarkdown = (உரை: string) => {
  return DOMPurify.sanitize(marked(உரை));
}

const கேள்விகள் = [
  {
    'கேள்வி': 'பெயர்.கேள்வி',
    'பதில்': ['பெயர்.பதில்.௧']
  },
  {
    'கேள்வி': 'ஆங்கிலம்.கேள்வி',
    'பதில்': ['ஆங்கிலம்.பதில்.௧', 'ஆங்கிலம்.பதில்.௨', 'ஆங்கிலம்.பதில்.௩']
  },
  {
    'கேள்வி': 'தெரியாதா.கேள்வி',
    'பதில்': ['தெரியாதா.பதில்.௧', 'தெரியாதா.பதில்.௨']
  },
  {
    'கேள்வி': 'கற்றுக்கொள்ள.கேள்வி',
    'பதில்': ['கற்றுக்கொள்ள.பதில்.௧', 'கற்றுக்கொள்ள.பதில்.௨']
  },
  {
    'கேள்வி': 'ஆங்கிலம்தெரியும்.கேள்வி',
    'பதில்': ['ஆங்கிலம்தெரியும்.பதில்.௧', 'ஆங்கிலம்தெரியும்.பதில்.௨', 'ஆங்கிலம்தெரியும்.பதில்.௩']
  },
  {
    'கேள்வி': 'கூகல்.கேள்வி',
    'பதில்': ['கூகல்.பதில்.௧']
  },
  {
    'கேள்வி': 'ஏற்கனவே.கேள்வி',
    'பதில்': ['ஏற்கனவே.பதில்.௧', 'ஏற்கனவே.பதில்.௨']
  }
];
</script>
