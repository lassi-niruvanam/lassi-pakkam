<template>
    <v-container fluid class="pa-10">
      <v-card
        class="mx-auto"
        flat
        max-width="1000"
      >
        <v-row>
          <v-col cols="12" class="text-center pa-10">
            <h1 class="display-1 font-weight-bold mb-3">
              {{ $t('கேள்விகள்.தலைப்பு') }}
            </h1>
          </v-col>
          <v-col
            cols="12" class="px-10"
            v-for="(kelvi, i) in kelvikal" :key="i"
          >
            <h2
              class="headline font-weight-bold mb-3"
              v-html="compiledMarkdown( $t('கேள்விகள்.'+ kelvi.கேள்வி) )"
            >
            </h2>

            <div
             v-for="(badil, j) in kelvi.பதில்" :key="j"
             v-html="compiledMarkdown( $t('கேள்விகள்.' + badil) )"
            ></div>

          </v-col>
        </v-row>
      </v-card>
    </v-container>
</template>
<script>
import marked from 'marked'

export default {
    name: 'கேள்விகள்',
    methods: {
      compiledMarkdown: (txt) => {
        console.log(marked)
        return marked(txt, { sanitize: true });
      }
    },
    data: () => ({
      kelvikal: [
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
          'கேள்வி': 'கூகல்.கேள்வி',
          'பதில்': ['கூகல்.பதில்.௧']
        },
        {
          'கேள்வி': 'ஏற்கனவை.கேள்வி',
          'பதில்': ['ஏற்கனவை.பதில்.௧', 'ஏற்கனவை.பதில்.௨']
        }
      ],
    }),
};
</script>
<style scoped>
</style>
