<template>
  <v-list-item three-line>
    <payanalar-padam
     :peyar="பெயர்.slice(0,2)"
     :padam="படம்"
    />

    <v-list-item-content>
      <v-card outlined>
        <v-card-title>
          {{பெயர் + (பெயர் === parindurai.பங்களிப்பாளர் ? '' : ` [${parindurai.பங்களிப்பாளர்}]`)}}
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
        <v-textarea v-if="சொந்தது"
         :value="புது_மதிப்பு"
         class="overflow-y-auto ma-4 mb-0 pa-2"
         outlined auto-grow rows="1"
         :class="{ காலாவதியானது: காலாவதியானது && !உபயோகத்தில்}"
         :dir="வலதிலிருந்து(vendiyamozhi) ? 'rtl': 'ltr'"
         hide-details
         @blur="semi"
        ></v-textarea>
        <v-card-actions>
          <v-spacer/>
          <v-btn icon color="purple" disabled>
            <v-icon>mdi-comment-outline</v-icon>
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
import payanalarPadam from '../../components/பயனாளர்_படம்'

export default {
  name: 'பரிந்துரை',
  props: ['parindurai', 'mulurai', 'irukkummozhiyakkam', 'vendiyamozhi'],
  components: { payanalarPadam },
  data: function () {
    return {
      படம்: null,
      பெயர்: this.parindurai.பங்களிப்பாளர்,
      புது_மதிப்பு: this.parindurai.பரிந்துரை
    }
  },
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
    semi: function() {
      if (this.புது_மதிப்பு.trim() === this.parindurai.பரிந்துரை) return
      this.$emit('semi', this.புது_மதிப்பு)
    },
    வலதிலிருந்து
  },
  mounted: async function() {
    this.படம் = await this.$கணக்கு.தத.பயனாளர்_படத்தை_பெறு(this.parindurai.பங்களிப்பாளர்)
    this.பெயர் = await this.$கணக்கு.தத.பயனாளர்_பெயரை_பெறு(this.$i18n.locale, this.parindurai.பங்களிப்பாளர்)
  }
}
</script>

<style>
.காலாவதியானது {
  opacity: 0.4;
}
</style>
