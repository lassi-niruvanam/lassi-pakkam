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
                  <v-img v-if="niral.படம்"
                    tile class="mx-auto" width="70"
                    :src="niral.படம்">
                  </v-img>
                  <h1 v-else class="text-center display-4">
                    {{ niral.பெயர்[0] }}
                  </h1>
                  <v-card-title
                    class="justify-center pb-0"
                    v-text="niral.பெயர்"
                  ></v-card-title>
                </v-col>
                <v-divider vertical/>
                <v-col class="text-center" cols=4>
                  <h1 class="font-weight-bold my-3">
                    மொழிகள்
                  </h1>
                  <p class="display-2">{{ Object.values(niral.மொழிகள்).length + 1 }}</p>
                </v-col>
                <v-col class="text-center" cols=4>
                  <h1 class="font-weight-bold my-3">
                    நிறைவு
                  </h1>
                  <v-progress-circular
                    :indeterminate="indeterminate"
                    :rotate="rotate"
                    size="50"
                    :value="tyar(niral.பொருந்தக்கூடிய)"
                    width="7"
                    color="amber accent-4"
                  >{{ tyar(niral.பொருந்தக்கூடிய) }}%</v-progress-circular>
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
                  <v-tab :ripple="false">மொழியாக்கம் மேம்பாடு</v-tab>
                  <v-tab :ripple="false">விவரக்குறிப்பு</v-tab>
                </v-tabs>
                <v-btn
                  class="my-auto"
                  color="orange"
                  outlined
                >
                  இப்பொதே பங்களி
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <v-card
                    flat
                    class="pa-5"
                    min-height="300"
                  >
                    <v-row>
                      <v-col cols=12>
                        <v-row>
                          <v-col cols=2>
                            <h3 class="display-5 grey--text">{{ niral.மூல்மொழி }}</h3>
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
                      <v-col v-for="(m, i) in Object.keys(niral.மொழிகள்)" :key="i" cols=12>
                        <v-row>
                          <v-col cols=2>
                            <h3 class="display-5">{{ m }}</h3>
                          </v-col>
                          <v-col cols=10 class="my-auto">
                            <v-progress-linear
                              :value="(niral.மொழிகள்[m][1])/niral.மொழிகள்[m][0] * 100"
                              :buffer-value="(niral.மொழிகள்[m][1]+niral.மொழிகள்[m][2])/niral.மொழிகள்[m][0] * 100"
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
                <v-tab-item>
                  <v-card
                    flat
                    class="pa-5"
                    min-height="300"
                  ></v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
</template>
<script>
export default {
    name: 'அறிமுகம்',
    methods: {
      tyar: function (பொருந்தக்கூடிய) {
        return Math.round(Object.values(பொருந்தக்கூடிய).filter(k=>k).length / Object.keys(பொருந்தக்கூடிய).length * 100)
      }
    },
    data: () => ({
      panel: [],
      tabs: 0,
      niralmozhikal: [
        {
          'பெயர்': 'பைத்தான்',
          'மூல்மொழி': 'English',
          'படம்': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': true, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'தமிழ்': [40, 30, 5],
            'français': [40, 35, 0]
          }
        },
        {
          'பெயர்': 'யாவாக்கிறிட்டு',
          'படம்': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
          'மூல்மொழி': 'English',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': false, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'தமிழ்': [40, 30, 5],
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        },
        {
          'பெயர்': 'வியூ',
          'மூல்மொழி': 'English',
          'படம்':'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': true, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'தமிழ்': [40, 30, 5],
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        },
        {
          'பெயர்': 'ஸீயெஸெஸ்',
          'மூல்மொழி': 'English',
          'படம்':'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': true, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'தமிழ்': [40, 30, 5],
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        },
        {
          'பெயர்': 'எழில்',
          'மூல்மொழி': 'தமிழ்',
          'படம்':'https://a.fsdn.com/allura/p/ezhillang/icon?1505797486?&w=180',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': true, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        },
        {
          'பெயர்': 'قلب',
          'மூல்மொழி': 'العربية',
          'படம்':'',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': true, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        },
        {
          'பெயர்': 'C++',
          'மூல்மொழி': 'English',
          'படம்':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1920px-ISO_C%2B%2B_Logo.svg.png',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': false, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        },
        {
          'பெயர்': 'Java',
          'மூல்மொழி': 'English',
          'படம்':'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1024px-Java_programming_language_logo.svg.png',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': false, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        },
        {
          'பெயர்': 'React',
          'மூல்மொழி': 'English',
          'படம்':'https://cdn.auth0.com/blog/react-js/react.png',
          'பொருந்தக்கூடிய': {'ஒருங்குறி': false, 'இல்லக்கணம்': true, '': ''},
          'மொழிகள்': {
            'français': [40, 2, 0],
            'ਪੰਜਾਬੀ': [40, 40, 0]
          }
        }
      ],
    }),
};
</script>
<style scoped>
</style>
