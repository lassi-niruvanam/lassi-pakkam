<template>
  <v-container class="mt-10">
    <v-img
     :src="require('../assets/தாமரை.svg')"
     max-height="75" class="my-5"
     contain
    ></v-img>
    <v-row>
      <v-col cols="6">
        <h2> {{ $t('தொடர்பு.தலைப்பு') }}</h2>
        <v-list
          class="overflow-y-auto" height="50vh"
        >
          <template v-for="(uruvakkiyavar, i) in uruvakkiyavarkal">
            <v-divider
              v-if="i !== 0"
              :key="`${i}-கோடு`"
            ></v-divider>
            <v-list-item
              :key="i"
              three-line
              :href="uruvakkiyavar.இணைப்பு"
              rel=”noopener”
              target="_blank"
            >
              <v-list-item-avatar size="80">
                <v-img :src="padam(uruvakkiyavar)"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{ $t('தொடர்பு.பெயர்கள்.'+uruvakkiyavar.பெயர்) }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ $t('தொடர்பு.வேலைகள்.'+uruvakkiyavar.வேலை) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ uruvakkiyavar.மினஞ்சல் }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
      <v-col cols="6">
        <h2> நம்ம தொடர்பு </h2>
        <p><v-icon>mdi-email</v-icon> <a href="mailto:julien.malard@mail.mcgill.ca">julien.malard@mail.mcgill.ca</a></p>
        <p><v-icon>mdi-xml</v-icon> <a href="https://github.com/lassi-samaaj">https://github.com/lassi-samaaj</a></p>

        <h2> படம் பண்புக்கூறுகள் </h2>
        <ul>
          <li>
            <a href="https://commons.wikimedia.org/wiki/User:Valluvar_Vallalar_Vattam?uselang=ta" rel="noopener" target="_blank">
              வள்ளுவர் வள்ளலார் வட்டம்
            </a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.bn" rel="noopener" target="_blank">
              படைப்பாக்கப் பொதுமங்கள் (CC BY-SA 4.0)</a> என்று உரிமை.
          </li>
          <li><a href="https://undraw.co/illustrations" rel="noopener" target="_blank">உன்றா</a></li>
        </ul>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-img
         :src="require('../assets/தென்னை_மரம்.svg')"
         max-height="250"
         contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MD5 from 'crypto-js/md5'

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
