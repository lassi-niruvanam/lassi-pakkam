<template>
    <v-container fluid class="ma-10">
      <v-row class="py-20">
        <v-col cols="12" class="text-center mb-5">
          <h1 class="display-1 font-weight-bold mb-3">
            லஸ்ஸியைப் பற்றி அடிக்கடி கேட்கப்படும் கேள்விகள்
          </h1>
        </v-col>
        <v-col
          cols="12"
          v-for="(kelvi, i) in kelvikal" :key="i"
        >
          <h2 class="headline font-weight-bold mb-3">
            {{ kelvi.கேள்வி }}
          </h2>

          <p class="subheading font-weight-regular" max-width="100">
            {{ kelvi.பதில் }}
          </p>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'கேள்விகள்',
    data: () => ({
      kelvikal: [
        {
          'கேள்வி': 'அதின் பெயர் எதற்கு லஸ்ஸி?',
          'பதில்': 'எதற்கு வேண்டாம்?'
        },
        {
          'கேள்வி': 'எதற்கு சாதாரன் ஆங்கில பைத்தான் அல்லது யாவாக்கிறிட்டில் நிரலாக்கம் செய்ய முடியாது?',
          'பதில்': ''
        },
        {
          'கேள்வி': 'ஏற்கனவை உபயோகத்தில் உள்ள எழில் அல்லது قلب மாதிரி நிரல் மொழிகளை எதற்கு பயன் செய்ய வேண்டாம்?',
          'பதில்': ''
        }
      ],
    }),
};
</script>
<style scoped>
</style>
