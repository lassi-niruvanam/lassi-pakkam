<template>
    <v-container fluid class="mt-10">
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            லஸ்ஸிக்கு உங்களை வரவேற்கிறோம்
          </h1>
          <v-card flat class="mx-auto" max-width="550">
            <p class="subheading font-weight-regular">
              லஸ்ஸி என்பது கணினி மொழியின் மொழியாக்கத்துக்காக
              <br>ஒரு மென்பொருள் சட்டகம் ஆகும்.
            </p>
          </v-card>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            எதற்கு தேவை?
          </h2>

          <v-card flat class="mx-auto" max-width="550">
            <p class="subheading font-weight-regular">
              ஒவ்வொரு நிரல் மொழியுக்கு பின்னால் ஒரு இயற்கை அல்லது மநிதர் மொழி உள்ளது.
              லஸ்ஸியால் எல்லோரால் சொந்த மொழியில் நிரலாக்கம் செய்ய முடியும்.
            </p>
          </v-card>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            எப்படி வேலை செய்கிறது?
          </h2>

          <v-card flat class="mx-auto" max-width="550">
            <p class="subheading font-weight-regular">
              தரப்படுத்தப்பட்ட இலக்கணம் மொழியாக்கம் விதிகள் மற்றும் மொழிபெயர்ப்புகளால்
              லஸ்ஸி உங்கள் நிரலின் மொழிமாற்றம் செய்யும்.
            </p>
          </v-card>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            செயலில் உதாரணம்
          </h2>

          <v-card flat class="mx-auto" max-width="550">
            <p class="subheading font-weight-regular">
              கீழ்கண்ட பெட்டியில் லஸ்ஸியின் திறன்களை சோதியுங்கள்.
            </p>
          </v-card>
        </v-col>
        <v-sheet
          elevation="12"
          class="pa-12 mx-auto mb-10" min-width="1200"
        >
          <v-row class="text-center">
            <v-col cols="6">
              <v-card class="mx-auto" width="500" flat>
                <v-toolbar class="mb-5" flat>
                  <v-row>
                    <v-col cols=4 class="pl-0">
                      <v-autocomplete
                        :items="niral_mozhikal"
                        v-model="niral_mozhi"
                        label="கணினி மொழி"
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="px-3">
                      <v-autocomplete
                        :items="mozhikal"
                        v-model="ul_mozhi"
                        label="மூல் மொழி"
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="pr-0">
                      <v-autocomplete
                        :items="niral_enuru_muraimaikal"
                        v-model="ul_niral_enuru"
                        label="எண்ணுரு முறைமை"
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
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
                  label="லஸ்ஸிக்கு உள்ளீடு"
                  outlined
                  color="amber accent-4"
                ></v-textarea>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card class="mx-auto" width="500" flat>
                <v-toolbar class="mb-5" flat>
                  <v-row>
                    <v-col cols=4 class="pl-0">
                      <v-autocomplete
                        :items="niral_mozhikal"
                        v-model="niral_mozhi"
                        readonly
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="px-3">
                      <v-autocomplete
                        :items="mozhikal"
                        v-model="vel_mozhi"
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols=4 class="pr-0">
                      <v-autocomplete
                        :items="niral_enuru_muraimaikal"
                        v-model="vel_niral_enuru"
                        cache-items
                        hide-no-data
                        outlined
                        dense
                        color="amber accent-4"
                        hide-details
                      ></v-autocomplete>
                    </v-col>
                </v-row>
                </v-toolbar>
                <v-textarea
                  v-model="velidu"
                  :height="500"
                  flat
                  :no-resize="true"
                  label="வெளியீடு"
                  outlined
                  color="amber accent-4"
                  :readonly="true"
                ></v-textarea>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>

      </v-row>
    </v-container>
</template>

<script>
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
        return this.lassi(this.udaranam_urai, this.vel_mozhi, this.vel_niral_enuru)
      }
    },
    methods: {
      lassi: function(txt, mozhi, ennuru) {
        return txt + ' ' + mozhi + ' ' + ennuru
      }
    },
    data: () => ({
      niral_mozhikal: ['பைத்தான்', 'யாவாக்கிறிட்டு', 'ஜேஸான்'],
      niral_mozhi: 'பைத்தான்',
      mozhikal: ['தமிழ்', 'ਪੰਜਾਬੀ', 'فارسی', 'français', 'English'],
      ul_mozhi: 'தமிழ்',
      vel_mozhi: 'English',
      niral_enuru_muraimaikal: ['தனிப்பட்ட', 'தமிழ்', 'ਗੁਰਸੁਥੀ', 'فارسی', 'Latin'],
      ul_niral_enuru: 'தனிப்பட்ட',
      vel_niral_enuru: 'தனிப்பட்ட',
      udaranankal: {
        'பைத்தான்': `class Circle(object):\n    def __init__(self, radius):\n        self.radius = radius`,
        'யாவாக்கிறிட்டு': `class Circle {\n    constructor(height, width) {\n        this.height = height;\n        this.width = width;\n    }\n}`
      },
      udaranam_urai: `class Circle(object):\n    def __init__(self, radius):\n        self.radius = radius`
    })
};
</script>

<style scoped>
</style>
