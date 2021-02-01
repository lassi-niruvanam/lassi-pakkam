<template>
    <v-container fluid class="mt-10">
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/lassi.svg')"
            class="my-3"
            contain
            height="250"
          />
        </v-col>
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            {{ $t('அறிமுகம்.தலைப்பு') }}
          </h1>
          <v-card flat class="mx-auto" max-width="380">
            <p class="subheading font-weight-regular">
              {{ $t('அறிமுகம்.துணைத்தலைப்பு') }}
            </p>
          </v-card>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            {{ $t('அறிமுகம்.எதற்கு') }}
          </h2>

          <v-card flat class="mx-auto" max-width="550">
            <p class="subheading font-weight-regular">
              {{ $t('அறிமுகம்.எதற்கு_பதில்') }}
            </p>
          </v-card>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            {{ $t('அறிமுகம்.எப்படி') }}
          </h2>

          <v-card flat class="mx-auto" max-width="550">
            <p class="subheading font-weight-regular">
              {{ $t('அறிமுகம்.எப்படி_பதில்') }}
            </p>
          </v-card>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            {{ $t('அறிமுகம்.செயலில்') }}
          </h2>

          <v-card flat class="mx-auto" max-width="550">
            <p class="subheading font-weight-regular">
              {{ $t('அறிமுகம்.செயலில்_விவரம்') }}
            </p>
          </v-card>
        </v-col>
        <v-sheet
          elevation="12"
          class="pa-12 mx-auto mb-10" min-width="1200"
        >
          <v-row class="text-center">
            <v-col cols="6" class="mx-auto">
              <v-card class="mx-auto" width="500" flat>
                <v-toolbar class="mb-5" flat>
                  <v-row>
                    <v-col cols=4 class="ps-0">
                      <v-autocomplete
                        :items="niral_mozhikal"
                        v-model="niral_mozhi"
                        :label="$t('அறிமுகம்.உதாரணம்.நிரல்_மொழி')"
                        :disabled="!udaranam_urai_tayar"
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="px-3">
                      <v-autocomplete
                        :items="mozhikal"
                        v-model="ul_mozhi"
                        :label="$t('அறிமுகம்.உதாரணம்.மூல்_மொழி')"
                        :disabled="!udaranam_urai_tayar"
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      >
                        <template v-slot:item="{ item }">
                          <v-list-item-avatar>
                            <v-icon v-if="niraivu(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                            <v-progress-circular v-else
                              :value="niraivu(item) * 100"
                              size="20"
                              rotate="270"
                              color="amber accent-4"
                            ></v-progress-circular>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title v-text="item"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="pe-0">
                      <v-autocomplete
                        v-model="ul_niral_enuru"
                        :items="[{text: $t('அறிமுகம்.உதாரணம்.தனிப்பட்ட'), value: null}].concat(niral_enuru_muraimaikal.map(x => ({text: x, value :x})))"
                        :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
                        :disabled="!udaranam_urai_tayar"
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                </v-row>
                </v-toolbar>

                <v-textarea
                  v-model="udaranam_urai"
                  :disabled="!udaranam_urai_tayar"
                  :loading="!udaranam_urai_tayar"
                  :no-resize="true"
                  :label="$t('அறிமுகம்.உதாரணம்.உள்ளீடு')"
                  :dir="வலதிலிருந்து(ul_mozhi) ? 'rtl': 'ltr'"
                  v-bind:class="[nokkunilai(ul_mozhi)]"
                  height="500"
                  flat
                  outlined
                  color="amber accent-4"
                >
                </v-textarea>
              </v-card>
            </v-col>
            <v-col cols="6" class="mx-auto">
              <v-card class="mx-auto" width="500" flat>
                <v-toolbar class="mb-5" flat>
                  <v-row>
                    <v-col cols=4 class="ps-0">
                      <v-autocomplete
                        v-model="niral_mozhi"
                        :items="niral_mozhikal"
                        disabled
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="px-3">
                      <v-autocomplete
                        :items="mozhikal"
                        v-model="vel_mozhi"
                        :label="$t('அறிமுகம்.உதாரணம்.வேண்டிய_மொழி')"
                        :disabled="!vel_urai_tayar || !udaranam_urai_tayar"
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      >
                        <template v-slot:item="{ item }">
                          <v-list-item-avatar>
                            <v-icon v-if="niraivu(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                            <v-progress-circular v-else
                              :value="niraivu(item) * 100"
                              size="20"
                              rotate="270"
                              color="amber accent-4"
                            ></v-progress-circular>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title v-text="item"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="pe-0">
                      <v-autocomplete
                        :items="[{text: $t('அறிமுகம்.உதாரணம்.தனிப்பட்ட'), value: null}].concat(niral_enuru_muraimaikal.map(x => ({text: x, value :x})))"
                        v-model="vel_niral_enuru"
                        :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
                        :disabled="!vel_urai_tayar || !udaranam_urai_tayar"
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                </v-row>
                </v-toolbar>
                <v-textarea
                  v-if="$lassi.lassi_tayar"
                  v-model="veliyidu"
                  v-bind:class="[nokkunilai(vel_mozhi)]"
                  height="500"
                  :readonly="vel_urai_tayar"
                  :disabled="!vel_urai_tayar || !udaranam_urai_tayar"
                  :loading="!vel_urai_tayar"
                  :no-resize="true"
                  :label="$t('அறிமுகம்.உதாரணம்.வெளியீடு')"
                  outlined
                  :dir="வலதிலிருந்து(vel_mozhi) ? 'rtl': 'ltr'"
                  color="amber accent-4"
                ></v-textarea>
                <v-card
                 v-else
                 height="500"
                 flat
                >
                  <v-progress-circular
                    size="100"
                    indeterminate=""
                    width="15"
                    class="mt-10"
                    color="amber accent-2"
                  />
                  <h2 class="my-5">
                    {{ $t('அறிமுகம்.லஸ்ஸியை_ஏற்றுகிறது') }}
                  </h2>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>

      </v-row>
    </v-container>
</template>

<script>
import { வலதிலிருந்து, நோக்குநிலை, குறியீடு, எண்ணுரு, பெயர் } from '../nuchabal/nuchabal'
import { முறைமைகள் } from '../ennikkai/ennikkai'
import { நிரல்மொழிகள், இயற்கை_மொழிகள், நிறைவு } from 'lassi-ilakkanankal'

const முதல்_நிரல்_மொழி = 'python'

export default {
    name: 'அறிமுகம்',
    watch: {
      niral_mozhi: function() {
        this.ul_urai_pudippippu()
      },
      ul_mozhi: function(புதுச, பழச) {
        if (புதுச === this.vel_mozhi) {
          this.vel_mozhi = பழச
        }
        this.ul_urai_pudippippu()
      },
      ul_niral_enuru: function() {
        this.ul_urai_pudippippu()
      },
      vel_mozhi: function(புதுச, பழச) {
        this.veliyidu = ''
        if (புதுச === this.ul_mozhi) {
          this.ul_mozhi = பழச
          this.ul_urai_pudippippu()
        }
        this.pudippippu()
      },
      vel_niral_enuru: function() {
        this.pudippippu()
      },
      udaranam_urai: function() {
        this.pudippippu()
      },
      mozhikal: function(val) {
        let saattiyam = val.includes(this.$i18n.locale) ? this.$i18n.locale : 'தமிழ்'
        this.ul_mozhi = val.includes(saattiyam) ? saattiyam : val[0]
      }
    },
    mounted() {
      window.lassi = this.$lassi
      this.ul_urai_pudippippu()
    },
    methods: {
      வலதிலிருந்து: function(langue) {
        return வலதிலிருந்து(langue)
      },
      niraivu: function(mozhi) {
        return நிறைவு(this.niral_mozhi, குறியீடு(mozhi))
      },
      லஸ்ஸி: function(உரை, நிரல்மொழி, உள்_மொழி, வெள்_மொழி, உள்_நிரல்_எண்ணுரு, வெள்_நிரல்_எண்ணுரு) {
        வெள்_நிரல்_எண்ணுரு = வெள்_நிரல்_எண்ணுரு ? வெள்_நிரல்_எண்ணுரு : எண்ணுரு(வெள்_மொழி)
        உள்_நிரல்_எண்ணுரு = உள்_நிரல்_எண்ணுரு ? உள்_நிரல்_எண்ணுரு : எண்ணுரு(உள்_மொழி)

        this.$lassi.mozhiyakkam(
          உரை, நிரல்மொழி, உள்_மொழி, வெள்_மொழி, உள்_நிரல்_எண்ணுரு, வெள்_நிரல்_எண்ணுரு,
          JSON.stringify(this.inankattikal),
          (e) => {
            if (this.lassi_veliyidu === 'உள்') {
              this.udaranam_urai = e
              this.udaranam_urai_tayar = true
            } else if (this.lassi_veliyidu === 'வெள்') {
               this.veliyidu = e
               this.vel_urai_tayar = true
               this.pizhai = null
            }
            this.lassi_veliyidu = null
          },
          (error) => {
            console.log('பையோடைட் பிழை: ', error)
            if (this.lassi_veliyidu === 'வெள்') {
              this.veliyidu = error
              this.pizhai = error
            }
            this.lassi_veliyidu = null
            this.vel_urai_tayar = true
          }
        )
      },
      pudippippu: function() {

        if (!this.lassi_veliyidu) {
          this.vel_urai_tayar = false
          this.lassi_veliyidu = 'வெள்'
          this.லஸ்ஸி(
            this.udaranam_urai,
            this.niral_mozhi,
            this.ul_mozhi,
            this.vel_mozhi,
            this.ul_niral_enuru,
            this.vel_niral_enuru,
          )
         }
      },
      ul_urai_pudippippu: function() {
        const udaranam_urai = this.udaranankal[this.niral_mozhi]

        if (udaranam_urai && !this.lassi_veliyidu) {
          if (குறியீடு(this.ul_mozhi) === இயற்கை_மொழிகள்(this.niral_mozhi)[0]) {
            this.udaranam_urai = udaranam_urai
            return
          }
          this.udaranam_urai_tayar = false
          this.lassi_veliyidu = 'உள்'
          this.லஸ்ஸி(
            udaranam_urai,
            this.niral_mozhi,
            "English",
            this.ul_mozhi,
            'latin',
            this.ul_niral_enuru
          )
        } else {
          this.udaranam_urai = ''
        }
      },
      ul_mozhi_pudippippu: function() {
        this.mozhi = this.mozhi || பெயர்(this.mozhikal[0])
      },
      nokkunilai: function(மொழி) {
        const nokkunilai = நோக்குநிலை(மொழி)
        switch (nokkunilai) {
          case 'செங்குத்து-வஇட':
          return 'vertical-rl'
          case 'செங்குத்து-இடவ':
          return 'vertical-lr'
        }
      }
    },
    computed: {
      mozhikal: function() {
        return இயற்கை_மொழிகள்(this.niral_mozhi).map(மொழி => பெயர்(மொழி)).sort((a,b) => this.niraivu(a) < this.niraivu(b))
      }
    },
    data: function() {
      return {
        niral_mozhikal: நிரல்மொழிகள்,
        niral_mozhi: முதல்_நிரல்_மொழி,
        veliyidu: '',
        ul_mozhi: 'தமிழ்',
        vel_mozhi: 'English',
        niral_enuru_muraimaikal: முறைமைகள்,
        ul_niral_enuru: null,
        vel_niral_enuru: null,
        pizhai: null,
        udaranankal: {
          'python': `class Circle(object):
    pi = 3.141592653
    def __init__(self, radius):
        self.radius = radius
    def circumference(self):
        return 2 * self.pi * self.radius
    def area(self):
        return self.pi * self.radius ** 2

radii = range(5)
circles = [Circle(radius=r) for r in radii]

for c in circles:
    print(c.circumference(), c.area())
`,
          'javascript': `class Circle {
    constructor(radius) {
        this.radius = radius;
    }
}
`,
          'json': `{
    "list": [1,2,3.4],
    "number": 1e5,
    "nested": {
        "bool": true,
        "None": null
      }
  }`,
        },
        udaranam_urai: '',
        udaranam_urai_tayar: false,
        vel_urai_tayar: false,
        lassi_veliyidu: null,
        inankattikal: [
          {
              'fr': 'fonction',
              'த': "செயலி",
              'en': 'function',
              'de': 'funktion',
              'rw': 'umumaro'
          },
          {
              'fr': 'soimême',
              'த': "தன்",
              'en': 'self',
              'de': 'eigen',
              'rw': 'bwite',
              'हिं': 'स्वयं',
              '汉': '自个儿'
          },
          {
              'fr': 'Cercle',
              'த': "வட்டம்_தொகுப்பு",
              'en': 'Circle',
              'de': 'Kreis',
              'rw': 'Uruziga',
              'हिं': 'वृत्त_वर्ग',
              '汉': '圈类別'
          },
          {
              'fr': 'cercle',
              'த': "வட்டம்",
              'en': 'circle',
              'de': 'kreis',
              'rw': 'uruziga',
              'हिं': 'वृत्त',
              '汉': '圈'
          },
          {
              'fr': '__init__',
              'த': "__துவக்கம்__",
              'en': '__init__',
              'de': '__kreation__',
              'rw': '__rema__',
              'हिं': '__प्रारंभ__',
              '汉': '__初始化__'
          },
          {
              'fr': 'rayon',
              'த': "ஆரம்",
              'en': 'radius',
              'de': 'radius',
              'rw': 'akarambararo',
              'हिं': 'त्रिज्या',
              '汉': '半径'
          },
          {
              'fr': 'circonférence',
              'த': "சுற்றளவு",
              'en': 'circumference',
              'de': 'Umfang',
              'rw': 'umuzenguruko',
              'हिं': 'परिधि',
              '汉': '圓周'
          },
          {
              'fr': 'pi',
              'த': "பை",
              'en': 'pi',
              'de': 'Pi',
              'rw': 'pi',
              'हिं': 'पाई',
              '汉': '圓周率'
          }
          ,
          {
              'fr': 'rayons',
              'த': "ஆரங்கள்",
              'en': 'radii',
              'de': 'radii',
              'rw': 'uturambararo',
              'हिं': 'त्रिज्याएं',
              '汉': '半径清单'
          }
          ,
          {
              'fr': 'gamme',
              'த': "சரகம்",
              'en': 'range',
              'de': 'reichweite',
              'rw': 'kugeraKu',
              'हिं': 'श्रृंखला',
              '汉': '顺序'
          }
          ,
          {
              'fr': 'cercles',
              'த': "வட்டங்கள்",
              'en': 'circles',
              'de': 'kreiseListe',
              'rw': 'inziga',
              'हिं': 'वृत्तएं',
              '汉': '圈清单'
          }
          ,
          {
              'fr': 'r',
              'த': "ஆ",
              'en': 'r',
              'de': 'r',
              'हिं': 'त्रि',
              '汉': '这个半径',
              'rw': 'r'
          },
          {
              'fr': 'objet',
              'த': "பொருள்",
              'en': 'object',
              'de': 'Objekt',
              'हिं': 'वस्तु',
              '汉': '对象'
          },
          {
              'fr': 'affiche',
              'த': "பதிப்பி",
              'en': 'print',
              'de': 'drucke',
              'rw': 'sohoraUrupapuro',
              'हिं': 'चपाना',
              '汉': '打印'
          },
          {
              'fr': 'superficie',
              'த': "பரப்பளவு",
              'en': 'area',
              'de': 'Fläche',
              'rw': 'Ubuso',
              'हिं': 'क्षेत्रफल',
              '汉': '面积'
          },
          {
              'fr': 'x',
              'த': "இ",
              'en': 'x',
              'de': 'x',
              'rw': 'x'
          },
          {
              'fr': 'y',
              'த': "ஈ",
              'en': 'y',
              'de': 'y',
              'rw': 'y'
          },
          {
              'fr': 'z',
              'த': "ஊ",
              'en': 'z',
              'de': 'z',
              'rw': 'z'
          },
          {
              'fr': 'w',
              'த': "ஏ",
              'en': 'w',
              'de': 'w'
          },
          {
              'fr': 'c',
              'த': "வ",
              'en': 'c',
              'de': 'c',
              'हिं': 'वृ',
              '汉': '这个圈',
              'rw': 'i'
          },
          {
            'de': 'drücke',
            'en': 'push'
          }
        ]
      }
    }
};
</script>

<style>
::selection {
  background: #FFECB3;
  color: #000;
  text-shadow: none;
}

.vertical-rl textarea {
  writing-mode: vertical-rl
}

.vertical-lr textarea {
  writing-mode: vertical-lr
}
</style>
