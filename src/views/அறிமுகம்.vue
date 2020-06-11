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
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="pe-0">
                      <v-autocomplete
                        :items="[$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட')].concat(niral_enuru_muraimaikal)"
                        v-model="ul_niral_enuru"
                        :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
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
                  height="500"
                  flat
                  :no-resize="true"
                  :label="$t('அறிமுகம்.உதாரணம்.உள்ளீடு')"
                  outlined
                  :dir="dàg(ul_mozhi) ? 'rtl': 'ltr'"
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
                        :items="niral_mozhikal"
                        v-model="niral_mozhi"
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
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        item-color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="pe-0">
                      <v-autocomplete
                        :items="[$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட')].concat(niral_enuru_muraimaikal)"
                        v-model="vel_niral_enuru"
                        :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
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
                  v-model="velidu"
                  height="500"
                  flat
                  :no-resize="true"
                  :label="$t('அறிமுகம்.உதாரணம்.வெளியீடு')"
                  outlined
                  :dir="dàg(vel_mozhi) ? 'rtl': 'ltr'"
                  color="amber accent-4"
                  :readonly="true"
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
import { dàg } from '../nuchabal/nuchabal'
import scriptjs from 'scriptjs'

const mozhikal = ['தமிழ்', 'ਪੰਜਾਬੀ', 'فارسی', 'français', 'English']

export default {
    name: 'அறிமுகம்',
    watch: {
      niral_mozhi: function (val) {
        this.udaranam_urai = this.lassi(this.udaranankal[val] || '', this.ul_mozhi, this.ul_niral_enuru)
      },
      ul_mozhi: function () {
        this.udaranam_urai = this.lassi(this.udaranankal[this.niral_mozhi] || '', this.ul_mozhi, this.ul_niral_enuru)
      },
      ul_niral_enuru: function () {
        this.udaranam_urai = this.lassi(this.udaranankal[this.niral_mozhi] || '', this.ul_mozhi, this.ul_niral_enuru)
      },
    },
    computed: {
      velidu: function() {
        const தனிப்பட்ட = this.$t('அறிமுகம்.உதாரணம்.தனிப்பட்ட')
        try {
          return `லஸ்ஸி.மொழியாக்கம்(
              உரை="""${this.udaranam_urai}""",
              நிரல்மொழி="${this.niral_mozhi}",
              மொழி="${this.vel_mozhi}",
              எண்ணுரு=${this.vel_niral_enuru === தனிப்பட்ட ? "None" : this.vel_niral_enuru},
              மூல்மொழி="${this.ul_mozhi}",
              மூலெண்ணுரு=${this.ul_niral_enuru === தனிப்பட்ட ? "None" : this.ul_niral_enuru}
            )`
        }
        catch(err) {
          return err
        }
      }
    },
    mounted() {
      const t = this
      scriptjs('https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js',
        function () {
          window.languagePluginLoader.then(
            () => {
              window.pyodide.runPythonAsync("import setuptools, micropip")
            }
          ).then(
            () => {
              window.pyodide.runPythonAsync("micropip.install('lassi')")
            }
          ).then(
            () => {
              window.pyodide.runPythonAsync("import லஸ்ஸி")
            }
          ).then( () => {
            console.log('Eureka!')
            t.lassi_tayar = true
            }
          )
        })
    },
    methods: {
      dàg: function(langue) {
        return dàg(langue)
      }
    },
    data: function() {
      return {
        lassi_tayar: false,
        niral_mozhikal: ['பைத்தான்', 'யாவாக்கிறிட்டு', 'ஜேஸான்'],
        niral_mozhi: 'பைத்தான்',
        mozhikal: mozhikal,
        ul_mozhi: mozhikal.includes(this.$i18n.locale) ? this.$i18n.locale : 'தமிழ்',
        vel_mozhi: 'English',
        niral_enuru_muraimaikal: ['தமிழ்', 'ਗੁਰਸੁਥੀ', 'فارسی', 'Latin'],
        ul_niral_enuru: 'தனிப்பட்ட',
        vel_niral_enuru: 'தனிப்பட்ட',
        udaranankal: {
          'பைத்தான்': `class Circle(object):\n    def __init__(self, radius):\n        self.radius = radius`,
          'யாவாக்கிறிட்டு': `class Circle {\n    constructor(radius) {\n        this.radius = radius;\n    }\n}`
        },
        udaranam_urai: `class Circle(object):\n    def __init__(self, radius):\n        self.radius = radius`
      }
    }
};
</script>

<style scoped>
</style>
