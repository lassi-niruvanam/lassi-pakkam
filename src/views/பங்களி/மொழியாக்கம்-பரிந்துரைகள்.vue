<template>
  <div>
    <v-list>
      <v-list-item>
        <payanalar-padam :peyar="பயனாளர்_அடையாளம்" :padam="பயனாளர்_படம்"/>
        <v-list-item-content class="pt-0">
          <v-card flat width="100%">
            <v-card-text class="pa-0">
              <v-text-field
               v-model="உரை"
               label="பரிந்துரையை உள்ளிடு"
               :dir="வலதிலிருந்து(vendiyamozhi) ? 'rtl': 'ltr'"
               outlined autofocus hide-details
               color="amber"
              >
                <template v-slot:prepend>

                </template>
             </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
               icon color="blue"
               @click="nagaledu"
              >
                <v-icon>mdi-copy</v-icon>
              </v-btn>
              <v-btn
               icon color="green"
               :disabled="!உரை.trim().length"
               @click="parinduraiyu"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn
               icon color="red"
               :disabled="!உரை.trim().length"
               @click="nikku"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <transition-group name="fade" mode="out-in" tag="div">
      <div v-if="parinduraikal.length" :key="0">
        <h2>பரிந்துரைகள்</h2>
        <v-divider/>
        <v-list style="max-height: 70vh" class="overflow-y-auto">
          <v-list-item>
            <parindurai
             v-for="பரிந்துரை in parinduraikal" :key="பரிந்துரை.குறி"
             :parindurai="பரிந்துரை" :mulurai="mulurai" :irukkummozhiyakkam="irukkummozhiyakkam"
             :vendiyamozhi="vendiyamozhi"
             @nikku="parindurainikku(பரிந்துரை.குறி)"/>
           </v-list-item>
        </v-list>
      </div>
      <div v-else :key="1">
        <v-card flat class="text-center py-12">
          <h2>இப்பொழுது வரை பரிந்துரை ஒன்றும் இல்லை</h2>
          <v-img
           :src="require('../../assets/கிணறு.svg')"
           max-height="250"
           contain
           class="ma-10"
          ></v-img>
        </v-card>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { வலதிலிருந்து } from '../../nuchabal/nuchabal'
import payanalarPadam from '../../components/பயனாளர்_படம்'

import parindurai from './பரிந்துரை'
import mixin from '../../mixins/நிகழ்வுகவனிப்பவாளர்'


export default {
  name: 'மொழியாக்கம்-பரிந்துரைகள்',
  props: ['parinduraikal', 'mulurai', 'irukkummozhiyakkam', 'vendiyamozhi'],
  components: { parindurai, payanalarPadam},
  mixins: [mixin],
  data: function () {
    return {
      உரை: '',
      பயனாளர்_அடையாளம்: null,
      பயனாளர்_படம்: null
    }
  },
  methods: {
    parinduraiyu: function () {
      if (this.உரை.trim().length) {
        this.$emit('parindurai', this.உரை)
      }
      this.nikku()
    },
    nikku: function () {
      this.உரை = ''
    },
    nagaledu: function() {
      this.உரை = this.mulurai
    },
    parindurainikku(குறி) {
      this.$emit('nikku', குறி)
    },
    வலதிலிருந்து,
    பயனாளர்_படத்தை_பெறு: async function() {
      const படம் = await this.$கணக்கு.தத.பயனாளர்_படத்தை_பெறு()
      this.பயனாளர்_படம் = படம்
    },
  },
  mounted: function() {
    this.கவனி(this.$கணக்கு, ['பயனாளர் மாற்றம்', 'அங்கீகாரம் தயார்'], () => {
      this.பயனாளர்_அடையாளம் = this.$கணக்கு.பயனாளர்_அடையாளம்
    })
    this.பயனாளர்_அடையாளம் = this.$கணக்கு.பயனாளர்_அடையாளம்

    this.கவனி(this.$கணக்கு, 'தத மாற்றம்', (தகவல்கள்) => {
      switch (தகவல்கள்.பெயர்) {
        case "பயனாளர்தகவல்கள்":
          this.பயனாளர்_படத்தை_பெறு()
          break;
        }
    })
    this.கவனி(this.$கணக்கு, 'தத தயார்', () => this.பயனாளர்_படத்தை_பெறு())
    if (this.$கணக்கு.தத) this.பயனாளர்_படத்தை_பெறு()

  },
}
</script>

<style>

</style>
