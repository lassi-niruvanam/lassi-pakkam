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
                        :items="[$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட')].concat(niral_enuru_muraimaikal)"
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
                  :dir="dàg(ul_mozhi) ? 'rtl': 'ltr'"
                  height="500"
                  flat
                  outlined
                  color="amber accent-4"
                ></v-textarea>
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
                        :items="[$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட')].concat(niral_enuru_muraimaikal)"
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
                  v-if="lassi_tayar"
                  v-model="veliyidu"
                  height="500"
                  flat
                  :readonly="vel_urai_tayar"
                  :disabled="!vel_urai_tayar || !udaranam_urai_tayar"
                  :loading="!vel_urai_tayar"
                  :no-resize="true"
                  :label="$t('அறிமுகம்.உதாரணம்.வெளியீடு')"
                  outlined
                  :dir="dàg(vel_mozhi) ? 'rtl': 'ltr'"
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
                    color="amber lighten-4"
                  />
                  <p class="my-5">
                    லஸ்ஸியை ஏற்றுகிறது...
                  </p>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>

      </v-row>
    </v-container>
</template>

<script>
import { dàg, code, num, பெயர் } from '../nuchabal/nuchabal'
import { முறைமைகள் } from '../ennikkai/ennikkai'
import { நிரல்மொழிகள், இயற்கை_மொழிகள், நிறைவு } from 'lassi-ilakkanankal'
// import scriptjs from 'scriptjs'


export default {
    name: 'அறிமுகம்',
    watch: {
      niral_mozhi: function() {
        this.ul_urai_pudippippu()
      },
      ul_mozhi: function() {
        this.ul_urai_pudippippu()
      },
      ul_niral_enuru: function() {
        this.ul_urai_pudippippu()
      },
      vel_mozhi: function() {
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
      var blob = new Blob([
        `
        // self.languagePluginUrl = 'http://localhost:8000/'
importScripts('https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js')
self.postMessage({"செய்தி": "தயார்"});

var onmessage = function(e) { // eslint-disable-line no-unused-vars
languagePluginLoader.then(() => {
  self.pyodide.loadPackage(['micropip', 'regex']).then(() => {
    const data = e.data;
    const keys = Object.keys(data);
    for (let key of keys) {
      if (key !== 'python') {
        // Keys other than python must be arguments for the python script.
        // Set them on self, so that \`from js import key\` works.
        self[key] = data[key];
      }
    }
    self.pyodide.runPythonAsync(data.python, () => {})
        .then((results) => { self.postMessage({results}); })
        .catch((err) => {
          self.postMessage({error : err.message});
        });
  });
});
}`
      ], { type: "text/javascript" })

      // Note: window.webkitURL.createObjectURL() in Chrome 10+.
      this.pyodideWorker = new Worker(window.URL.createObjectURL(blob))
      this.pyodideWorker.onerror = (e) => {
        console.log(`பையோடைட் பிழை: ${e.filename}, கோடு: ${e.lineno}, ${e.message}`)
      }
      this.pyodideWorker.onmessage = (e) => {
        const {results, error, செய்தி} = e.data
        if (results) {
          if (this.lassi_veliyidu === 'உள்') {
            this.udaranam_urai = results
            this.udaranam_urai_tayar = true
          } else if (this.lassi_veliyidu === 'வெள்') {
            this.veliyidu = results
            this.vel_urai_tayar = true
          }
          this.lassi_veliyidu = null
        } else if (error) {
          console.log('பையோடைட் பிழை: ', error)
          if (this.lassi_veliyidu === 'வெள்') {
            this.veliyidu = error
          }
          this.lassi_veliyidu = null
          this.vel_urai_tayar = true
        } else if (செய்தி) {
          if (செய்தி === 'தயார்') {
            console.log('லஸ்ஸி தயார்')
            this.lassi_tayar = true
            this.ul_urai_pudippippu()
          }
        }
      }
    },
    methods: {
      dàg: function(langue) {
        return dàg(langue)
      },
      niraivu: function(mozhi) {
        return நிறைவு(this.niral_mozhi, code(mozhi))
      },
      lassi: function(urai, niralmozhi, ul_mozhi, vel_mozhi, ul_niral_enuru, vel_niral_enuru) {
        const தனிப்பட்ட = this.$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட')
        ul_niral_enuru = ul_niral_enuru || தனிப்பட்ட
        vel_niral_enuru = vel_niral_enuru || தனிப்பட்ட

        const குறிப்பிடு = `
def fonc(*args):
  import லஸ்ஸி
  return லஸ்ஸி.மொழியாக்கம்(
      உரை="""${urai}\n""",
      நிரல்மொழி="${niralmozhi}",
      மொழி="${code(vel_mozhi)}",
      எண்ணுரு="${vel_niral_enuru === தனிப்பட்ட ? num(vel_mozhi) : vel_niral_enuru}",
      மூல்மொழி="${code(ul_mozhi)}",
      மூலெண்ணுரு="${ul_niral_enuru === தனிப்பட்ட ? num(ul_mozhi) : ul_niral_enuru}",
      இனங்காட்டிகள்=${JSON.stringify(this.inankattikal)}
  )

try:
  res = fonc()
except ModuleNotFoundError:
  import micropip
  micropip.install('lark-parser')
  micropip.install('semantic-version')
  micropip.install('lassi-ilakkanankal')
  res = micropip.install('lassi').then(fonc)
res
`
        this.pyodideWorker.postMessage({
          python: குறிப்பிடு
        })
      },
      pudippippu: function() {

        if (!this.lassi_veliyidu) {
          this.vel_urai_tayar = false
          this.lassi_veliyidu = 'வெள்'
          this.lassi(
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
          if (this.ul_mozhi === இயற்கை_மொழிகள்(this.niral_mozhi)[0]) {
            this.udaranam_urai = udaranam_urai
            return
          }
          this.udaranam_urai_tayar = false
          this.lassi_veliyidu = 'உள்'
          this.lassi(
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
      }
    },
    computed: {
      mozhikal: function() {
        return இயற்கை_மொழிகள்(this.niral_mozhi).map(மொழி => பெயர்(மொழி))
      }
    },
    data: function() {
      return {
        lassi_tayar: false,
        niral_mozhikal: நிரல்மொழிகள்,
        niral_mozhi: 'python',
        veliyidu: '',
        ul_mozhi: 'தமிழ்',
        vel_mozhi: 'English',
        niral_enuru_muraimaikal: முறைமைகள்,
        ul_niral_enuru: this.$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட'),
        vel_niral_enuru: this.$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட'),
        udaranankal: {
          'python': `class Circle(object):\n    pi = 3.141592653\n    def __init__(self, radius):\n        self.radius = radius\n    def circumference(self):\n        return 2 * self.pi * self.radius\n    def area(self):\n        return self.pi ** 2 * self.radius\nradii = range(5)\ncircles = [Circle(radius=r) for r in radii]\nfor c in circles:\n    print(c.circumference(), c.area())`,
          'javascript': `class Circle {\n    constructor(radius) {\n        this.radius = radius;\n    }\n}`,
          'json': `{\n    "list": [1,2,3.4],\n    "number": 1e5,\n    "nested": {\n        "bool": true, \n        "None": null}}`
        },
        udaranam_urai: '',
        udaranam_urai_tayar: false,
        vel_urai_tayar: false,
        lassi_veliyidu: null,
        inankattikal: [
            {
                'fr': 'fonction',
                'த': "செயலி",
                'en': 'function'
            },
            {
                'fr': 'soimême',
                'த': "தன்",
                'en': 'self'
            },
            {
                'fr': 'Cercle',
                'த': "வட்டம்_தொகுப்பு",
                'en': 'Circle'
            },
            {
                'fr': 'cercle',
                'த': "வட்டம்",
                'en': 'circle'
            },
            {
                'fr': '__init__',
                'த': "__துவக்கம்__",
                'en': '__init__'
            },
            {
                'fr': 'rayon',
                'த': "ஆரம்",
                'en': 'radius'
            },
            {
                'fr': 'circonférence',
                'த': "சுற்றளவு",
                'en': 'circumference'
            },
            {
                'fr': 'pi',
                'த': "பை",
                'en': 'pi'
            }
            ,
            {
                'fr': 'rayons',
                'த': "ஆரங்கள்",
                'en': 'radii'
            }
            ,
            {
                'fr': 'gamme',
                'த': "சரகம்",
                'en': 'range'
            }
            ,
            {
                'fr': 'cercles',
                'த': "வட்டங்கள்",
                'en': 'circles'
            }
            ,
            {
                'fr': 'r',
                'த': "ஆ",
                'en': 'r'
            },
            {
                'fr': 'objet',
                'த': "பொருள்",
                'en': 'object'
            },
            {
                'fr': 'affiche',
                'த': "பதிப்பி",
                'en': 'print'
            },
            {
                'fr': 'superficie',
                'த': "பரப்பளவு",
                'en': 'area'
            },
            {
                'fr': 'x',
                'த': "இ",
                'en': 'x'
            },
            {
                'fr': 'y',
                'த': "ஈ",
                'en': 'y'
            },
            {
                'fr': 'z',
                'த': "ஊ",
                'en': 'z'
            },
            {
                'fr': 'w',
                'த': "ஏ",
                'en': 'w'
            },
            {
                'fr': 'c',
                'த': "வ",
                'en': 'c'
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
</style>
