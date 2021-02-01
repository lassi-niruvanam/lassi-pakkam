<template>
  <v-list-item three-line>
    <v-list-item-avatar color="amber darken-2" class="white--text headline">
      {{parindurai.பங்களிப்பாளர்.slice(0,2) }}
    </v-list-item-avatar>

    <v-list-item-content>
      <v-card outlined>
        <v-card-title>
          {{parindurai.பங்களிப்பாளர்}}
          <v-spacer/>
          <v-tooltip v-if="உபயோகத்தில்" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" color="amber">mdi-check-decagram</v-icon>
            </template>
            <span>இந்த பரிந்துரை ஏற்றுக்கொள்ளப்பட்டுள்ளது.</span>
          </v-tooltip>
          <v-tooltip v-else-if="காலாவதியானது" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" color="orange">mdi-alert-outline</v-icon>
            </template>
            <span>இந்த பரிந்துரை காலாவதியானது.</span>
          </v-tooltip>
        </v-card-title>

        <v-divider/>
        <v-card
         max-height="100" class="overflow-y-auto ma-4 pa-2"
         :class="{ காலாவதியானது: காலாவதியானது && !உபயோகத்தில்}"
         :dir="வலதிலிருந்து(vendiyamozhi) ? 'rtl': 'ltr'"
         flat
        >{{parindurai.உரை}}</v-card>
        <v-card-actions>
          <v-spacer/>
          <v-btn icon color="purple">
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
          <v-btn v-if="சொந்தது" icon color="blue">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn v-if="சொந்தது" icon color="red" @click="nikku">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import MD5 from 'crypto-js/md5'
import { வலதிலிருந்து } from '../../nuchabal/nuchabal'


export default {
  name: 'பரிந்துரை',
  props: ['parindurai', 'mulurai', 'irukkummozhiyakkam', 'vendiyamozhi'],
  computed: {
    சொந்தது: function(){
      return this.parindurai.பங்களிப்பாளர் === this.$கணக்கு.பயனாளர்_அடையாளம்
    },
    காலாவதியானது: function() {
      return this.parindurai.மூலுரை !== MD5(this.mulurai).toString()
    },
    உபயோகத்தில்: function() {
      return this.parindurai.உரை === this.irukkummozhiyakkam
    }
  },
  methods: {
    nikku: function() {
      this.$emit('nikku')
    },
    வலதிலிருந்து
  }
}
</script>

<style>
.காலாவதியானது {
  opacity: 0.4;
}
</style>
