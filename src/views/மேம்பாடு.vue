<template>
    <v-container class="mt-10">
      <v-card
        class="mx-auto"
        max-width="1000"
        flat
      >
        <v-expansion-panels
          v-model="panel"
          multiple
        >
          <v-expansion-panel
            class="my-2"
            v-for="(niral, i) in niralmozhikal"
            :key="i"
          >
            <v-expansion-panel-header>
              <v-row>
                <v-col cols=3>
                  <v-img v-if="padam(niral)"
                    tile class="mx-auto" max-height="70" contain max-width="70"
                    :src="padam(niral)">
                  </v-img>
                  <h1 v-else class="text-center display-4">
                    {{ niralmozhi_peyar(niral)[0] }}
                  </h1>
                  <v-card-title
                    class="justify-center pb-0"
                    v-text="niralmozhi_peyar(niral)"
                  ></v-card-title>
                </v-col>
                <v-divider vertical/>
                <v-col class="text-center" cols=4>
                  <h1 class="font-weight-bold my-3">
                    {{ $t('மேம்பாடு.மொழிகள்') }}
                  </h1>
                  <p class="display-2">{{ uraikku(mozhikal(niral).length) }}</p>
                </v-col>
                <v-col class="text-center" cols=4>
                  <h1 class="font-weight-bold my-3">
                    {{ $t('மேம்பாடு.நிறைவு') }}
                  </h1>
                  <v-progress-circular
                    size="60"
                    :value="niraivu_ellam(niral) * 100"
                    width="8"
                    :color="niraivu_ellam(niral) === 0 ? 'grey lighten-2' : 'amber accent-4'"
                  >{{ uraikku(Math.round(niraivu_ellam(niral) * 100)) }} %</v-progress-circular>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider class="mb-2"></v-divider>
              <div class="d-flex">
                <v-tabs
                 v-model="tabs"
                 color="amber accent-4"
                >
                  <v-tab :ripple="false">{{ $t('மேம்பாடு.மொழியாக்கம்_மேம்பாடு') }}</v-tab>
                  <!-- <v-tab :ripple="false">விவரக்குறிப்பு</v-tab> -->
                </v-tabs>
                <div
                  class="my-auto"
                >
                  <v-btn
                    :href="'https://github.com/lassi-samaaj/lassi-ilakkanangal/tree/master/மூலம்/லஸ்ஸியிலக்கணங்கள்/இலக்கணங்கள்/' + niral"
                    target="_blank"
                    color="orange"
                    outlined
                  >
                    {{ $t('மேம்பாடு.இப்பொதே_பங்களி') }}
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </div>
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <v-card
                    flat
                    class="pa-5"
                    min-height="150"
                  >
                    <v-row>
                      <v-col cols=12>
                        <v-row>
                          <v-col cols=2>
                            <h3 class="display-5 grey--text">{{ mozhi_peyar(mulmozhi(niral)) }}</h3>
                          </v-col>
                          <v-col cols=10 class="my-auto">
                            <v-progress-linear
                              :value="100"
                              :buffer-value="100"
                              color="grey lighten-2"
                              height="11"
                              rounded
                            ></v-progress-linear>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col v-for="(m, i) in mozhikal(niral).slice(1)" :key="i" cols=12>
                        <v-row>
                          <v-col cols=2>
                            <h3 class="display-5">{{ mozhi_peyar(m) }}</h3>
                          </v-col>
                          <v-col cols=10 class="my-auto">
                            <v-progress-linear
                              :value="niraivu(niral, m) * 100"
                              :buffer-value="100"
                              color="amber"
                              height="11"
                              rounded
                            ></v-progress-linear>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>
                <!-- <v-tab-item>
                  <v-card
                    flat
                    class="pa-5"
                    min-height="300"
                  ></v-card>
                </v-tab-item> -->
              </v-tabs-items>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
</template>
<script>
import uraikku from '../ennikkai/ennikkai'
import { num, code, பெயர் as மொழிபெயர் } from '../nuchabal/nuchabal'
import { நிரல்மொழிகள், இயற்கை_மொழிகள், நிறைவு, பெயர் as நிரல்பெயர்} from 'lassi-ilakkanankal'


export default {
    name: 'அறிமுகம்',
    methods: {
      tyar: function (பொருந்தக்கூடிய) {
        return Math.round(Object.values(பொருந்தக்கூடிய).filter(k=>k).length / Object.keys(பொருந்தக்கூடிய).length * 100)
      },
      uraikku: function (en) {
        return uraikku(en, num(this.$i18n.locale))
      },
      niralmozhi_peyar: function(நிரல்மொழி) {
        return நிரல்பெயர்(நிரல்மொழி, code(this.$i18n.locale)) || நிரல்மொழி
      },
      mozhi_peyar: function(மொழி) {
        return மொழிபெயர்(மொழி)
      },
      mulmozhi: function (நிரல்மொழி) {
        return இயற்கை_மொழிகள்(நிரல்மொழி)[0]
      },
      mozhikal: function(நிரல்மொழி) {
        return இயற்கை_மொழிகள்(நிரல்மொழி)
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
        panel: [],
        tabs: 0,
        niralmozhikal: நிரல்மொழிகள்.sort((a, b) => (this.mozhikal(a).length < this.mozhikal(b).length)),
        takavalkal: {
          'python': {
            'படம்': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
          },
          'javascript': {
            'படம்': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png'
          },
          'json': {
            'படம்': 'https://www.json.org/img/json160.gif'
          },
          'vue': {
            'படம்': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png'
          },
          'css': {
            'படம்': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg'
          },
          'எழில்': {
            'படம்':'https://a.fsdn.com/allura/p/ezhillang/icon?1505797486?&w=180'
          },
          'قلب': {

          },
          'cplusplus': {
            'படம்':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1920px-ISO_C%2B%2B_Logo.svg.png',
          },
          'java': {
            'படம்':'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1024px-Java_programming_language_logo.svg.png'
          },
          'react': {
            'படம்':'https://cdn.auth0.com/blog/react-js/react.png'
          },
          'citrine': {
            'படம்':'http://citrine-lang.org/img/logo.png'
          },
          'lark': {
            'படம்':'https://raw.githubusercontent.com/lark-parser/lark/master/docs/ide/lark-logo.png'
          }
        }
      }
    }
};
</script>
<style scoped>
</style>
