<template>
  <div>
    <v-list>
      <v-list-item>
        <v-card flat width="100%">
          <v-card-text class="pa-0">
            <v-text-field
             v-model="உரை"
             label="பரிந்துரையை உள்ளிடு"
             :dir="வலதிலிருந்து(vendiyamozhi) ? 'rtl': 'ltr'"
             outlined autofocus hide-details
             color="amber"
            >பரிந்துரையு</v-text-field>
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

import parindurai from './பரிந்துரை'

export default {
  name: 'மொழியாக்கம்-பரிந்துரைகள்',
  props: ['parinduraikal', 'mulurai', 'irukkummozhiyakkam', 'vendiyamozhi'],
  components: {parindurai},
  data: function () {
    return {
      உரை: ''
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
    வலதிலிருந்து
  }
}
</script>

<style>

</style>
