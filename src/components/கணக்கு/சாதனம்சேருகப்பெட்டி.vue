<template>
  <v-card max-width="500">
    <v-card-title>சாதனம் சேருக</v-card-title>
    <v-divider></v-divider>

    <v-stepper v-model="படி">
      <v-stepper-items>
        <v-stepper-content :step="0" class="pa-0">
          <v-list>
            <v-list-item @click="காகிதசாபிசேருக()">
              <v-list-item-avatar>
                <v-img
                 :src="require('../../assets/உன்றா-காகிதம்.svg')"
                 max-height="75"
                 contain
                 class="ma-2"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>காகித சாபியை உருவாக்கு</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-action>
            </v-list-item>

            <v-list-item @click="சாதனம்சேருக()">
              <v-list-item-avatar>
                <v-img
                 :src="require('../../assets/உன்றா-கணினி-கைபேசி.svg')"
                 max-height="75"
                 contain
                 class="ma-2"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>வேறொரு சாதனத்தை சேரு</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-action>
            </v-list-item>

          </v-list>
        </v-stepper-content>

        <v-stepper-content :step="1">
          இது உங்கள் ரகசிய காகிதசாபி:
          <div v-if="காகிதசாபி">
            <h3 class="text-center ma-4">{{ காகிதசாபி }}</h3>
            <p>இந்த ரகசிய காகிதசாபியை இது ஒரே ஒரு தடவை இங்கே காண்பிக்கும்.
            நீங்கள் அதை எதோ ஒரு காகித சீட்டில் எழுதி பாதுகாப்பான இடத்தில் வைக்கவும்.</p>
            <p>உங்கள் சாதனத்தை காணாமல் போனால், இந்த ரகசிய சாபியை பயன்படுத்து
            உங்களால் உங்கள் கணக்கில் மறுப்படியும் உள்ளிட முடியும்.</p>
          </div>
          <div v-else>
            <v-progress-circular
              size="50"
              color="amber"
              class="ma-4"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-btn outlined color="amber" class="mt-2" @click="ஆரம்பம்()">
            <v-icon>mdi-arrow-left</v-icon>
            முந்தைய
          </v-btn>
        </v-stepper-content>

        <v-stepper-content :step="2">
          இது உங்கள் ரகசிய அழைப்பு குறியீடு:
          <div v-if="அழைப்பு">
            <h2 class="text-center ma-4">{{ வடிவூட்டவழைப்பு(அழைப்பு) }}</h2>
            உங்கள் புது சாதனத்தில் லஸ்ஸி கணக்கு பக்கத்துக்கு சென்று இந்த குறியீட்டை உள்ளிடவும்.
          </div>
          <div v-else>
            <v-progress-circular
              size="50"
              color="amber"
              class="text-center ma-4"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-btn outlined color="amber" class="mt-2" @click="ஆரம்பம்()">
            <v-icon>mdi-arrow-left</v-icon>
            முந்தைய
          </v-btn>
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>

  </v-card>
</template>

<script>
import { மூப்பத்தின்மம்_மொழியாக்கம் } from '../../ennikkai/ennikkai'

export default {
  name: 'சாதனம்சேருகப்பெட்டி',
  data: function () {
    return {
      படி: 0,
      அழைப்பு: undefined,
      காகிதசாபி: undefined
    }
  },
  computed: {

  },
  methods: {
    காகிதசாபிசேருக: function() {
      this.படி = 1
      if (!this.காகிதசாபி) {
        this.காகிதசாபி = "காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி காகிதசாபி"
      }
    },
    சாதனம்சேருக: function() {
      this.படி = 2
      if (this.அழைப்பு && !(this.அழைப்பு.id in this.$கணக்கு.குழு.state.invitations)) {
        this.அழைப்பு = undefined
      }
      if (!this.அழைப்பு) {
        this.அழைப்பு = this.$கணக்கு.அழைக்க(this.$கணக்கு.பயனாளர்_அடையாளம்)
      }
    },
    ஆரம்பம்: function() {
      this.படி = 0
    },
    வடிவூட்டவழைப்பு: function (அழைப்பு) {
      return மூப்பத்தின்மம்_மொழியாக்கம்(அழைப்பு.invitationSeed, 'latin', this.$i18n.locale)
    }
  }
}
</script>

<style>

</style>
