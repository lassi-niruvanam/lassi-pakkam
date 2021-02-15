<template>
  <v-sheet
    elevation="12"
    class="pa-12 mx-auto mb-10" width="1200"
  >
    <v-row class="text-center">
      <v-col cols="6">
        <v-toolbar flat>
          <v-row>
            <v-col cols="4" class="ps-0">
              <v-autocomplete
                :items="நிரல்மொழிகள்"
                v-model="நிரல்மொழி"
                :label="$t('அறிமுகம்.உதாரணம்.நிரல்_மொழி')"
                :disabled="!உதாரணமுரைதயார்"
                color="amber accent-4"
                item-color="amber accent-4"
                cache-items
                hide-no-data
                outlined
                dense
                hide-details
              ></v-autocomplete>
            </v-col>
            <v-col cols="4" class="px-3">
              <v-autocomplete
                :items="மொழிகள்"
                v-model="உள்மொழி"
                :label="$t('அறிமுகம்.உதாரணம்.மூல்_மொழி')"
                :disabled="!உதாரணமுரைதயார்"
                hide-no-data
                outlined
                dense
                color="amber accent-4"
                item-color="amber accent-4"
                hide-details
              >
                <template v-slot:item="{ item }">
                  <v-list-item-avatar>
                    <v-icon v-if="நிறைவு(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                    <v-progress-circular v-else
                      :value="நிறைவு(item) * 100"
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
            <v-col cols="4" class="pe-0">
              <v-autocomplete
                v-model="உள்நிரலெண்ணுரு"
                :items="[{text: $t('அறிமுகம்.உதாரணம்.தனிப்பட்ட'), value: null}].concat(நிரலெண்ணுருமுறைமைகள்.map(இ => ({text: இ, value :இ})))"
                :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
                :disabled="!உதாரணமுரைதயார்"
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
      </v-col>
      <v-col cols="6">
        <v-toolbar flat>
          <v-row>
            <v-col cols="4" class="ps-0">
              <v-autocomplete
                v-model="நிரல்மொழி"
                :items="நிரல்மொழிகள்"
                disabled
                hide-no-data
                outlined
                dense
                color="amber accent-4"
                item-color="amber accent-4"
                hide-details
              ></v-autocomplete>
            </v-col>
            <v-col cols="4" class="px-3">
              <v-autocomplete
                :items="மொழிகள்"
                v-model="வெள்மொழி"
                :label="$t('அறிமுகம்.உதாரணம்.வேண்டிய_மொழி')"
                :disabled="!வெளுரைதயார் || !உதாரணமுரைதயார்"
                hide-no-data
                outlined
                dense
                color="amber accent-4"
                item-color="amber accent-4"
                hide-details
              >
                <template v-slot:item="{ item }">
                  <v-list-item-avatar>
                    <v-icon v-if="நிறைவு(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                    <v-progress-circular v-else
                      :value="நிறைவு(item) * 100"
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
            <v-col cols="4" class="pe-0">
              <v-autocomplete
                :items="[{text: $t('அறிமுகம்.உதாரணம்.தனிப்பட்ட'), value: null}].concat(நிரலெண்ணுருமுறைமைகள்.map(இ => ({text: இ, value :இ})))"
                v-model="வெள்நிரலெண்ணுரு"
                :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
                :disabled="!வெளுரைதயார் || !உதாரணமுரைதயார்"
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
      </v-col>
    </v-row>
    <v-row v-if="$லஸ்ஸி.தயாரானது" class="text-center mt-0">
      <v-col cols="6">
        <v-textarea
          v-model="உதாரணமுரை"
          :disabled="!உதாரணமுரைதயார்"
          :loading="!உதாரணமுரைதயார்"
          :no-resize="true"
          :label="$t('அறிமுகம்.உதாரணம்.உள்ளீடு')"
          :dir="வலதிலிருந்து(உள்மொழி) ? 'rtl': 'ltr'"
          v-bind:class="[நோக்குநிலை(உள்மொழி)]"
          height="500"
          flat
          outlined
          color="amber accent-4"
        >
        </v-textarea>
      </v-col>
      <v-col cols="6">
        <v-textarea
          v-model="வெளியீடு"
          v-bind:class="[நோக்குநிலை(வெள்மொழி)]"
          height="500"
          :readonly="வெளுரைதயார்"
          :disabled="!வெளுரைதயார் || !உதாரணமுரைதயார்"
          :loading="!வெளுரைதயார்"
          :no-resize="true"
          :label="$t('அறிமுகம்.உதாரணம்.வெளியீடு')"
          outlined
          :dir="வலதிலிருந்து(வெள்மொழி) ? 'rtl': 'ltr'"
          color="amber accent-4"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-if="$லஸ்ஸி.கிடையாது" cols="12">
        <v-card flat class="text-center py-6">
          <v-img
           :src="require('../assets/ஐஸ்_வண்டி.svg')"
           max-height="250"
           contain
          ></v-img>
          <h2>{{ $t('அறிமுகம்.உதாரணம்.லஸ்ஸி_கிடையாது') }}</h2>
          <p>{{ $t('அறிமுகம்.உதாரணம்.லஸ்ஸி_கிடையாது_துணை') }}</p>
        </v-card>
      </v-col>
      <v-col v-else cols="12">
        <v-card flat class="text-center py-6">
          <v-img
           :src="require('../assets/தென்னை_மரம்.svg')"
           max-height="250"
           contain
          ></v-img>
          <h2>{{ $t('அறிமுகம்.உதாரணம்.லஸ்ஸியை_ஏற்றுகிறது') }}</h2>
        </v-card>
        <v-progress-circular
          size="50"
          indeterminate
          width="5"
          color="amber accent-2"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { நிரல்மொழிகள், இயற்கை_மொழிகள், நிறைவு } from 'lassi-ilakkanankal'
import { வலதிலிருந்து, நோக்குநிலை, குறியீடு, எண்ணுரு, பெயர் } from '../nuchabal/nuchabal'
import { முறைமைகள் } from '../ennikkai/ennikkai'

export default {
  name: 'லஸ்ஸி-உதாரணம்',
  data: function() {
    return {
      நிரல்மொழிகள்,
      நிரல்மொழி: 'python',
      வெளியீடு: '',
      உள்மொழி: 'தமிழ்',
      வெள்மொழி: 'English',
      நிரலெண்ணுருமுறைமைகள்: முறைமைகள்,
      உள்நிரலெண்ணுரு: null,
      வெள்நிரலெண்ணுரு: null,
      பிழை: null,
      உதாரணங்கள்: {
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
      உதாரணமுரை: '',
      உதாரணமுரைதயார்: false,
      வெளுரைதயார்: false,
      இனங்காட்டிகள்: require('./இனங்காட்டிகள்.json')
    }
  },
  watch: {
    நிரல்மொழி: function() {
      this.உளுரைபுதிப்பிப்பு()
    },
    உள்மொழி: function(புதுச, பழச) {
      if (புதுச === this.வெள்மொழி) {
        this.வெள்மொழி = பழச
      }
      this.உளுரைபுதிப்பிப்பு()
    },
    உள்நிரலெண்ணுரு: function() {
      this.உளுரைபுதிப்பிப்பு()
    },
    வெள்மொழி: function(புதுச, பழச) {
      this.வெளியீடு = ''
      if (புதுச === this.உள்மொழி) {
        this.உள்மொழி = பழச
        this.உளுரைபுதிப்பிப்பு()
      }
      this.புதிப்பிப்பு()
    },
    வெள்நிரலெண்ணுரு: function() {
      this.புதிப்பிப்பு()
    },
    உதாரணமுரை: function() {
      this.புதிப்பிப்பு()
    },
    மொழிகள்: function(மொழி) {
      let சாத்தியம் = மொழி.includes(this.$i18n.locale) ? this.$i18n.locale : 'தமிழ்'
      this.உள்மொழி = மொழி.includes(சாத்தியம்) ? சாத்தியம் : மொழி[0]
    }
  },
  mounted() {
    this.உளுரைபுதிப்பிப்பு()
  },
  methods: {
    வலதிலிருந்து: function(langue) {
      return வலதிலிருந்து(langue)
    },
    நிறைவு: function(மொழி) {
      return நிறைவு(this.நிரல்மொழி, குறியீடு(மொழி))
    },
    லஸ்ஸி: function (இலக்கு, உரை, நிரல்மொழி, உள்_மொழி, வெள்_மொழி, உள்_நிரல்_எண்ணுரு, வெள்_நிரல்_எண்ணுரு, செயலி, பிழைசெயலி) {
      வெள்_நிரல்_எண்ணுரு = வெள்_நிரல்_எண்ணுரு ? வெள்_நிரல்_எண்ணுரு : எண்ணுரு(வெள்_மொழி)
      உள்_நிரல்_எண்ணுரு = உள்_நிரல்_எண்ணுரு ? உள்_நிரல்_எண்ணுரு : எண்ணுரு(உள்_மொழி)

      this.$லஸ்ஸி.மொழியாக்கம்(
        இலக்கு, உரை, நிரல்மொழி, உள்_மொழி, வெள்_மொழி, உள்_நிரல்_எண்ணுரு, வெள்_நிரல்_எண்ணுரு,
        JSON.stringify(this.இனங்காட்டிகள்), செயலி, பிழைசெயலி
      )
    },
    புதிப்பிப்பு: function() {
      this.வெளுரைதயார் = false

      this.லஸ்ஸி(
        'வெள்',
        this.உதாரணமுரை,
        this.நிரல்மொழி,
        this.உள்மொழி,
        this.வெள்மொழி,
        this.உள்நிரலெண்ணுரு,
        this.வெள்நிரலெண்ணுரு,
        (நி) => {
         this.வெளியீடு = நி
         this.வெளுரைதயார் = true
         this.பிழை = null
        },
        (பிழை) => {
          console.log('பையோடைட் பிழை: ', பிழை)
          this.வெளியீடு = பிழை
          this.பிழை = பிழை
          this.வெளுரைதயார் = true
        }
      )
    },
    உளுரைபுதிப்பிப்பு: function() {
      const உதாரணமுரை = this.உதாரணங்கள்[this.நிரல்மொழி]

      if (உதாரணமுரை) {
        if (குறியீடு(this.உள்மொழி) === இயற்கை_மொழிகள்(this.நிரல்மொழி)[0]) {
          this.உதாரணமுரை = உதாரணமுரை
          return
        }
        this.உதாரணமுரைதயார் = false
        this.லஸ்ஸி(
          'உள்',
          உதாரணமுரை,
          this.நிரல்மொழி,
          "English",
          this.உள்மொழி,
          'latin',
          this.உள்நிரலெண்ணுரு,
          (நி) => {
            this.உதாரணமுரை = நி
            this.உதாரணமுரைதயார் = true
          },
          (பிழை) => {
            console.log('பையோடைட் பிழை: ', பிழை)
            this.வெளுரைதயார் = true
          }
        )
      } else {
        this.உதாரணமுரை = ''
      }
    },
    உள்மொழிபுதிப்பிப்பு: function() {
      this.மொழி = this.மொழி || பெயர்(this.மொழிகள்[0])
    },
    நோக்குநிலை: function(மொழி) {
      const நோக்கு = நோக்குநிலை(மொழி)
      switch (நோக்கு) {
        case 'செங்குத்து-வஇட':
        return 'vertical-rl'
        case 'செங்குத்து-இடவ':
        return 'vertical-lr'
      }
    }
  },
  computed: {
    மொழிகள்: function() {
      return இயற்கை_மொழிகள்(this.நிரல்மொழி).map(மொழி => பெயர்(மொழி)).sort((இ,ஈ) => this.நிறைவு(இ) < this.நிறைவு(ஈ))
    }
  }
}
</script>

<style>
.vertical-rl textarea {
  writing-mode: vertical-rl
}

.vertical-lr textarea {
  writing-mode: vertical-lr
}
</style>
