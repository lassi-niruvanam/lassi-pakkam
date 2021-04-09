<template>
  <v-stepper v-model="படி">
    <v-stepper-items>

      <v-stepper-content :step="0">
        <v-row class="text-center">
          <v-col>
            <h1>நீங்கள் வெளியேறிவிட்டீர்கள்</h1>
            <v-img
             :src="require('../../assets/உன்றா-விண்மீன்.svg')"
             max-height="150"
             contain
             class="ma-10"
            ></v-img>
            <v-btn
              color="orange"
              class="mx-10 my-2"
              outlined
              @click="செல்லு(1)"
            >
              எனக்கு கணக்கு இருக்கிறது
            </v-btn>
            <v-btn
              color="orange"
              class="mx-10 my-2"
              outlined
              @click="செல்லு(4)"
            >
              எனக்கு புது கணக்கு வேண்டும்
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>

      <v-stepper-content :step="1">
        <v-row class="text-center">
          <v-col cols="12"><h1>எப்படி உள்ளிட விரம்புகிறீர்கள்</h1></v-col>
          <v-col cols="6">
            <v-card
              class="mx-10"
              outlined
              @click="செல்லு(2)"
            >
              <v-img
               :src="require('../../assets/உன்றா-கணினி-கைபேசி.svg')"
               max-height="100"
               contain
               class="ma-10"
              ></v-img>
              <v-card-title class="justify-center">
                வேறு ஒரு சாதனத்தால் உள்ளிடவும்
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="mx-10"
              outlined
              @click="செல்லு(3)"
            >
              <v-img
               :src="require('../../assets/உன்றா-காகிதம்.svg')"
               max-height="100"
               contain
               class="ma-10"
              ></v-img>
              <v-card-title class="justify-center">
                காகித சாபியால் உள்ளிடவும்
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-row class="mx-10 mb-2">
              <v-btn outlined color="amber" @click="செல்லு(0)">
                <v-icon>mdi-arrow-left</v-icon>
                முந்தைய
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-stepper-content>

        <v-stepper-content :step="2">
          <v-row class="text-center">
            <v-col cols="12">
              <h1>வேறு சாதானத்தில் அழைப்பு குறியீட்டை உருவாக்கி அதை கீழே உள்ளிடுங்கள்</h1>
              <v-img
               :src="require('../../assets/உன்றா-ரகசிய-குறியீடு.svg')"
               max-height="150"
               contain
               class="ma-10"
              ></v-img>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                   v-model="அழைப்பு"
                   label="ரகசிய அழைப்பு குறியீடு"
                   outlined
                   color="amber darken-2"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                   v-model="பயனாளர்பெயர்"
                   label="பயனாளர் பெயர்"
                   outlined
                   color="amber darken-2"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                   v-model="சாதனம்பெயர்"
                   label="இந்த சாதனத்தின் பெயர்"
                   outlined
                   color="amber darken-2"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row class="mx-0 mb-2">
                <v-btn outlined color="amber" @click="செல்லு(1)">
                  <v-icon>mdi-arrow-left</v-icon>
                  முந்தைய
                </v-btn>
                <v-spacer/>
                <v-btn outlined :disabled="!(அழைப்பு && பயனாளர்பெயர் && சாதனம்பெயர்)" color="amber" @click="உள்ளிடு_அழைப்பு()">
                  அடுத்து
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-stepper-content>


        <v-stepper-content :step="3">
          <v-row class="text-center">
            <v-col cols="12">
              <h1>காகித சாபியை கீழே உள்ளிடுங்கள்</h1>
              <v-img
               :src="require('../../assets/உன்றா-ரகசிய-குறியீடு.svg')"
               max-height="150"
               contain
               class="ma-10"
              ></v-img>
              <v-text-field
               v-model="காகிதசாபி"
               label="காகித சாபியை உள்ளிடுங்கள்"
               :rules="காகிதசாபிவிதிகள்"
               outlined
               color="amber darken-2"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row class="mx-0 mb-2">
                <v-btn outlined color="amber" @click="செல்லு(1)">
                  <v-icon>mdi-arrow-left</v-icon>
                  முந்தைய
                </v-btn>
                <v-spacer/>
                <v-btn outlined color="amber" :disabled="!காகிதசாபி" @click="உள்ளிடு_காகிதசாபி()">
                  அடுத்து
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-stepper-content>

      <v-stepper-content :step="4">
        <v-row class="text-center">
          <v-col cols="12">
            <h1>உங்கள் பயனாளர் பெயர் தேர்ந்தேடுங்கள்</h1>
            <v-img
             :src="require('../../assets/கோலம்.svg')"
             max-height="250"
             contain
            ></v-img>
            <p>இந்த பெயர் உங்கள் சொந்த மொழியிலே எழ்தவும். ஒருங்குறி, இடைவெளிகள், நிறுத்தற்குறி எல்லாம் ஆதரிக்கப்பட்டுள்ளன.</p>
            <p>இந்த இரந்து பெயர்களை அப்புறமாக மாற்ற முடியாது. இந்த இரண்டு தகவல்கள் பகிரங்கமாக வெளியிடப்படும்.</p>
            <v-row>
              <v-col cols="6">
                <v-text-field
                 v-model="பயனாளர்பெயர்"
                 label="உங்கள் பெயர்"
                 :rules="பயனாளர்பெயர்விதிகள்"
                 outlined
                 color="amber darken-2"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                 v-model="சாதனம்பெயர்"
                 label="இந்த சாதனத்தின் பெயர்"
                 :rules="சாதனம்பெயர்விதிகள்"
                 outlined
                 color="amber darken-2"
                >
                </v-text-field>
              </v-col>
            </v-row>

          </v-col>
          <v-col cols="12">
            <v-row class="mx-0 mb-2">
              <v-btn outlined color="amber" @click="செல்லு(0)">
                <v-icon>mdi-arrow-left</v-icon>
                முந்தைய
              </v-btn>
              <v-spacer/>
              <v-btn outlined color="amber" :disabled="!(பயனாளர்பெயர் && சாதனம்பெயர்)" @click="உள்ளிடு_புதுகணக்கு()">
                அடுத்து
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { மூப்பத்தின்மம்_மொழியாக்கம் } from '../../ennikkai/ennikkai'
const franc = require('franc-all')
const bip39 = require('bip39')
window.bip39 = bip39


export default {
  name: 'உள்ளிடு',
  data: function () {
    return {
      படி: 0,
      அழைப்பு: '',
      பயனாளர்பெயர்: '',
      சாதனம்பெயர்: '',
      காகிதசாபி: '',
      பயனாளர்பெயர்விதிகள்: [
        ப => !!ப || 'பெயர் தேவையானது',
        ப => (ப.length < 3 || franc(ப, {minLength: 3}) === 'tam') || 'உங்கள் பெயரை தமிழில் எழுதுங்கள்'
      ],
      சாதனம்பெயர்விதிகள்: [
        ப => !!ப || 'சாதனம் பெயர் தேவையானது',
        ப => (ப.length < 3 || franc(ப, {minLength: 3}) === 'tam') || 'சாதனம் பெயரை தமிழில் எழுதுங்கள்'
      ],
      காகிதசாபிவிதிகள்: [
        சா => (!சா.trim().length || சா.trim().split(/\s+/g).length >= 12) || 'காகித சாபிக்கு ௰௨ வார்த்தைகள் இருக்க வேண்டியது'
      ]
    }
  },
  methods: {
    செல்லு (n) {
      this.படி = n
    },
    உள்ளிடு_அழைப்பு () {
      const அழைப்பு = மூப்பத்தின்மம்_மொழியாக்கம்(this.அழைப்பு, this.$i18n.locale, 'latin')
      this.$கணக்கு.அழைப்பால்_உள்ளிடு(அழைப்பு, this.பயனாளர்பெயர், this.சாதனம்பெயர்)
    },
    உள்ளிடு_புதுகணக்கு () {
      this.$கணக்கு.பயனாளர்_உருவாக்கு(this.பயனாளர்பெயர், this.சாதனம்பெயர்)
    }
  }
}
</script>

<style>

</style>
