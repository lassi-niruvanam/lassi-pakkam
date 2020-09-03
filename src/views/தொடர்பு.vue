<template>
    <v-container class="mt-10">
      <v-row class="text-center">
        <v-col cols="12">
          <v-card
            class="mx-auto"
            max-width="600"
            flat
          >
            <h1> {{ $t('தொடர்பு.தலைப்பு') }}</h1>
          </v-card>
          <v-card
            class="mx-auto overflow-y-auto"
            max-width="600"
            max-height="500"
            flat
          >
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
                    v-text="$t('தொடர்பு.பெயர்கள்.'+uruvakkiyavar.பெயர்)"
                  ></v-card-title>
                  <v-card-subtitle class="text-left" v-text="$t('தொடர்பு.வேலைகள்.'+uruvakkiyavar.வேலை)"></v-card-subtitle>
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
    name: 'தொடர்பு',
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
          'பெயர்': 'ஜூலீஎன்',
          'வேலை': 'முதலில் உருவாக்கியவர்',
          'மினஞ்சல்': 'julien.malard@mail.mcgill.ca',
          'இணைப்பு': 'https://github.com/julienmalard'
        },
        {
          'பெயர்': 'யோல்',
          'வேலை': 'உருவாக்கியவர்',
          'மினஞ்சல்': 'joel.harms@mail.mcgill.ca',
          'இணைப்பு': 'https://github.com/joelz575',
          'படம்': 'https://i1.rgstatic.net/ii/profile.image/841536820477952-1577649421273_Q128/Joel_Harms.jpg'
        },
        {
          'பெயர்': 'எர்னெஸ்த்',
          'வேலை': 'மொழிபெயர்ப்பாளர்',
          'மினஞ்சல்': 'ernest.habanabakize@mail.mcgill.ca',
          'இணைப்பு': 'https://ca.linkedin.com/in/ernesthabana?challengeId=AQECzBJ47twIJwAAAXRB5UP6y-yAMxTmH-qpDHhwxmFGeNcIUUC-ar4D7aaxm3ZJmQP3HXTS-zv6E611qWo_UUb6Xcnpo1cjSg&submissionId=c2dc2f81-7c32-3016-fecd-f246d5f1086d',
          'படம்': 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmcgill.ca%2Fmastercardfdn-scholars%2Ffiles%2Fmastercardfdn-scholars%2Fstyles%2Fwysiwyg_medium%2Fpublic%2Fernest_habanabakize_0.jpg%3Fitok%3DZfv9kGY0&f=1&nofb=1'
        }
      ],
    }),
};
</script>

<style scoped>
</style>
