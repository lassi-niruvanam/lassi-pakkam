<template>
    <v-container class="mt-10">
      <v-row class="text-center">
        <v-col cols="12">
          <v-card
            class="mx-auto"
            max-width="600"
            flat
          >
            <h1>லஸ்ஸி மென்பொருள் உருவாக்கியவர்களை இங்கே தொடரலாம்</h1>
            <v-card
              v-for="(uruvakkiyavar, i) in uruvakkiyavarkal"
              :key="i"
              class="my-10"
              :href="uruvakkiyavar.இணைப்பு"
              target="_blank"
            >
              <div class="d-flex flex-no-wrap">
                <v-avatar
                  class="ma-3"
                  size="125"
                >
                  <v-img :src="padam(uruvakkiyavar)"></v-img>
                </v-avatar>
                <div>
                  <v-card-title
                    class="headline"
                    v-text="uruvakkiyavar.பெயர்"
                  ></v-card-title>
                  <v-card-subtitle class="text-left" v-text="uruvakkiyavar.வேலை"></v-card-subtitle>
                  <v-card-text class="text--primary text-left">
                    <div>{{ uruvakkiyavar.மினஞ்சல் }}</div>
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import MD5 from 'crypto-js/md5';

export default {
    name: 'அறிமுகம்',
    methods: {
      padam: function(உருவாக்கியவர்) {
        return உருவாக்கியவர்.படம் || 'https://www.gravatar.com/avatar/' + MD5(உருவாக்கியவர்.மினஞ்சல்.trim().toLowerCase()) + '?s=200'
      }
    },
    data: () => ({
      panel: [],
      tabs: 0,
      uruvakkiyavarkal: [
        {
          'பெயர்': 'ம. ஜூலீஎன்',
          'வேலை': 'முதலில் உருவாக்கியவர்',
          'மினஞ்சல்': 'julien.malard@mail.mcgill.ca',
          'இணைப்பு': 'https://github.com/julienmalard'
        }
      ],
    }),
};
</script>

<style scoped>
</style>
