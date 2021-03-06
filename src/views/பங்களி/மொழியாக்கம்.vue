<template>
  <v-container class="mt-10">
    <v-toolbar class="mb-7">
      <v-row>
        <v-col cols="2">
          <v-autocomplete
            v-model="மூல்மொழி"
            :items="மொழிகள்"
            :label="'மூல் மொழி'"
            cache-items
            hide-no-data
            outlined
            dense
            color="amber accent-4"
            item-color="amber accent-4"
            hide-details
          >
            <template v-slot:item="{ item }">
              <v-list-item-avatar>
                <v-icon v-if="நிரைவு(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                <v-progress-circular v-else
                  :value="நிரைவு(item) * 100"
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
        <v-col cols="2">
          <v-autocomplete
            v-model="நிலை"
            :items="நிலைகள்"
            :label="'நிலை'"
            cache-items
            hide-no-data
            outlined
            dense
            color="amber accent-4"
            item-color="amber accent-4"
            hide-details
          >
            <template v-slot:item="{ item }">
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action-text>
                ({{ உரைக்கு(காண்கசாபிகள்(item).length) }})
              </v-list-item-action-text>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-autocomplete
            v-model="வேண்டியமொழி"
            :items="மொழிகள்"
            :label="'மொழியாக்க மொழி'"
            cache-items
            hide-no-data
            outlined
            dense
            color="amber accent-4"
            item-color="amber accent-4"
            hide-details
          >
            <template v-slot:item="{ item }">
              <v-list-item-avatar>
                <v-icon v-if="நிரைவு(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                <v-progress-circular v-else
                  :value="நிரைவு(item) * 100"
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
        <v-col cols="2">
          <v-autocomplete
            v-model="திட்டம்"
            :items="['வலைப்பக்கம்', ...நிரல்மொழிகள்]"
            :label="'திட்டம்'"
            cache-items
            hide-no-data
            outlined
            dense
            color="amber accent-4"
            item-color="amber accent-4"
            hide-details
          >
          </v-autocomplete>
        </v-col>
        <v-row/>
        <v-spacer/>

        <v-btn icon v-if="மூல்_கோப்பு" class="my-auto me-2">
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </v-row>
    </v-toolbar>
    <v-divider class="mb-2"/>
    <transition-group name="fade" mode="out-in">
      <v-row v-show="உரைப்பட்டியல்.length" :key="0">
        <v-col cols="3">
          <v-card outlined>
            <mozhiyakkam-pattiyal
             :uraipattiyal="உரைப்பட்டியல்"
             @terndedu="terndedu"
            />
          </v-card>
        </v-col>
        <v-col cols="9">
          <transition-group name="fade" mode="out-in">
            <span v-if="தேர்ந்தேடுக்கப்பட்டது" :key="0">
              <v-list-item v-if="மூலுரை" class="my-2">
                <v-list-item-avatar></v-list-item-avatar>
                <v-card flat width="100%">
                  <v-switch
                   v-model="மொழிபெயர்ப்பை_காமி"
                   :disabled="!இருக்கும்_மொழிபெயர்ப்பு"
                   :label="மொழிபெயர்ப்பை_காமி && இருக்கும்_மொழிபெயர்ப்பு ? 'இருக்கும் மொழிபெயர்ப்பு' : 'மூல் உரை'"
                  ></v-switch>
                  <v-card-text class="pa-0">
                    <v-textarea
                     outlined readonly auto-grow rows="1" hide-details class="mb-4"
                     append-icon="mdi-content-copy"
                     @click:append="nagaledu(மொழிபெயர்ப்பை_காமி && இருக்கும்_மொழிபெயர்ப்பு ? இருக்கும்_மொழிபெயர்ப்பு : மூலுரை)"
                     :value="மொழிபெயர்ப்பை_காமி && இருக்கும்_மொழிபெயர்ப்பு ? இருக்கும்_மொழிபெயர்ப்பு : மூலுரை"
                    />
                  </v-card-text>
                </v-card>
              </v-list-item>
              <v-divider class="mb-2"/>
              <mozhiyakkam-parinduraikal
               :parinduraikal="பரிந்துரைகள்"
               :vendiyamozhi="வேண்டியமொழி"
               :mulurai='மொழியாக்கம்(தேர்ந்தேடுக்கப்பட்டது, மூல்மொழி, true)'
               :irukkummozhiyakkam="மொழியாக்கம்(தேர்ந்தேடுக்கப்பட்டது, வேண்டியமொழி)"
               @parindurai="parinduraiyu"
               @nikku="parindurainikku"
              />
            </span>
            <div v-show="!தேர்ந்தேடுக்கப்பட்டது" class="text-center py-12" :key="1">
              <v-img
               :src="require('../../assets/வளையல்_வண்டி.svg')"
               max-height="300"
               contain
               class="ma-10"
              ></v-img>
              <h2>ஆரம்புகிறதற்கு மொழியாக்கத்துக்காக ஒரு வாக்கியத்தை தேர்ந்தேடுங்கள்</h2>
            </div>
          </transition-group>
        </v-col>
      </v-row>
      <div v-show="!உரைப்பட்டியல்.length" class="text-center" :key="1">
        <v-img
         :src="require('../../assets/கிணறு.svg')"
         max-height="300"
         contain
        ></v-img>
        <h2>எந்த முடிவும் கிடைக்கவில்லை</h2>
        <v-btn
          outlined
          color="amber"
          class="mt-4"
          @click="நிலை='எல்லாம்'"
        >
          எல்லாம் வாக்கயிங்களை காமி
        </v-btn>
      </div>
    </transition-group>
  </v-container>
</template>

<script>
import { நிரல்மொழிகள், விதிகள் } from 'lassi-ilakkanankal'

import uraikku from '../../ennikkai/ennikkai'
import { எண்ணுரு } from '../../nuchabal/nuchabal'
import { மொழி_மேலாண்மை } from '../../plugins/vuetify'
import mozhiyakkamPattiyal from './மொழியாக்கம்-பட்டியல்'
import mozhiyakkamParinduraikal from './மொழியாக்கம்-பரிந்துரைகள்'


export default {
  name: "மொழியாக்கம்",
  components: { mozhiyakkamPattiyal, mozhiyakkamParinduraikal },
  data: function () {
    return {
      நிரல்மொழிகள்,
      திட்டம்: 'வலைப்பக்கம்',
      மூல்மொழி: 'தமிழ்',
      வேண்டியமொழி: this.$i18n.locale === 'தமிழ்' ? 'français': this.$i18n.locale,
      நிலை: 'எல்லாம்',
      நிலைகள்: ['எல்லாம்', 'காலியானது', 'மொழிப்பெயர்க்கப்பட்டது'],
      தேர்ந்தேடுக்கப்பட்டது: null,
      பரிந்துரைகள்: [],
      மொழிபெயர்ப்பை_காமி: false
    }
  },
  computed: {
    சாபிகள்: function(){
      if (this.திட்டம் === 'வலைப்பக்கம்') return மொழி_மேலாண்மை.சாபிகள்
      return விதிகள்(this.திட்டம்)
    },
    மொழிகள்: () => மொழி_மேலாண்மை.மொழிகள்,
    இருக்கும்_மொழிபெயர்ப்பு: function() {
      return this.மொழியாக்கம்(this.தேர்ந்தேடுக்கப்பட்டது, this.வேண்டியமொழி)
    },
    மூலுரை: function() {
      return this.மொழியாக்கம்(this.தேர்ந்தேடுக்கப்பட்டது, this.மூல்மொழி)
    },
    உரைப்பட்டியல்: function () {
      const வலைப்பக்கம் = this.திட்டம் === 'வலைப்பக்கம்'
      const பட்டியல் = this.காண்கசாபிகள்(this.நிலை).map((சாபி) => {
        return {
          சாபி,
          மூல்மொழி: this.மூல்மொழி,
          வேண்டியமொழி: this.வேண்டியமொழி,
          மூலுரை: வலைப்பக்கம் ? this.மொழியாக்கம்(சாபி, this.மூல்மொழி, true) : சாபி,
          மொழியாக்கம்: this.மொழியாக்கம்(சாபி, this.வேண்டியமொழி)
          }
        }
      )
      console.log(பட்டியல்)
      return பட்டியல்
    },
    மூல்_கோப்பு: function() {
      return process.env.VUE_APP_MUL_KOPPU
    }
  },
  watch: {
    மூல்மொழி: function(புதுசு, பழசு){
      if (புதுசு === this.வேண்டியமொழி) this.வேண்டியமொழி = பழசு
      this.பரிந்துரைகள்_பெறு()
    },
    வேண்டியமொழி: function(புதுசு, பழசு){
      if (புதுசு === this.மூல்மொழி) this.மூல்மொழி = பழசு
      this.பரிந்துரைகள்_பெறு()
    },
    தேர்ந்தேடுக்கப்பட்டது: function(){
      this.பரிந்துரைகள் = []
      this.பரிந்துரைகள்_பெறு()
    }
  },
  methods: {
    உரைக்கு: function (எண்) {
      return uraikku(எண், எண்ணுரு(this.$i18n.locale))
    },
    காண்கசாபிகள்: function(நிலை) {
      switch (நிலை) {
        case 'எல்லாம்':
          return this.சாபிகள்;
        case 'காலியானது':
          return this.சாபிகள்.filter(சாபி => !this.மொழியாக்கம்(சாபி, this.வேண்டியமொழி))
        case 'மொழிப்பெயர்க்கப்பட்டது':
          return this.சாபிகள்.filter(சாபி => this.மொழியாக்கம்(சாபி, this.வேண்டியமொழி))
        default:
          return [];
      }
    },
    மொழியாக்கம்: function (சாபி, மொழி, தனிப்பட்டது=false) {
      var உரை = மொழி_மேலாண்மை.உரை(சாபி, மொழி)
      if (தனிப்பட்டது) {
        return உரை || மொழி_மேலாண்மை.உரை(சாபி, மொழி_மேலாண்மை.இயல்புநிலை)
      } else {
        return உரை || ''
      }
    },
    நிரைவு: (மொழி) => மொழி_மேலாண்மை.மேம்பாடு[மொழி],

    பரிந்துரைகள்_பெறு() {
      if (!this.தேர்ந்தேடுக்கப்பட்டது) return
      this.$கணக்கு.தத.பரிந்துரைகளை_பெறு(
        this.தேர்ந்தேடுக்கப்பட்டது, this.வேண்டியமொழி, 'வலைப்பக்கம்'
      ).then(பரிந்துரைகள் => this.பரிந்துரைகள் = பரிந்துரைகள்)
    },

    terndedu: function (சாபி) {
      this.தேர்ந்தேடுக்கப்பட்டது = சாபி
    },

    parinduraiyu: function(பரிந்துரை) {
      const மூலுரை = this.மொழியாக்கம்(this.தேர்ந்தேடுக்கப்பட்டது, this.மூல்மொழி, true)
      console.log('ici', this.தேர்ந்தேடுக்கப்பட்டது, பரிந்துரை, மூலுரை, this.மூல்மொழி, this.வேண்டியமொழி, 'வலைப்பக்கம்')
      this.$கணக்கு.தத.மொழிபெயர்ப்பை_பரிந்துரையு(
        this.தேர்ந்தேடுக்கப்பட்டது, பரிந்துரை, மூலுரை, this.மூல்மொழி, this.வேண்டியமொழி, 'வலைப்பக்கம்'
      )
    },

    parindurainikku: function(குறி) {
      this.$கணக்கு.தத.பரிந்துரையைநீக்கு(
        குறி, this.வேண்டியமொழி, 'வலைப்பக்கம்'
      )
    }
  },
  mounted() {
    this.$கணக்கு.on('தத தயார்', this.பரிந்துரைகள்_பெறு.bind(this))
    this.$கணக்கு.on('தரவுத்தளம் மாற்றம்', (தகவல்கள்)=>{
      console.log('ici', தகவல்கள்)
      if (தகவல்கள்.தரவுத்தளம் === 'பரிந்துரை' && தகவல்கள்.திட்டம் === 'வலைப்பக்கம்' && தகவல்கள்.மொழி === this.வேண்டியமொழி) {

        this.பரிந்துரைகள்_பெறு()
      }
    })

    if (this.$கணக்கு.தத && this.$கணக்கு.தத.தயார்) {
      this.பரிந்துரைகள்_பெறு()
    }
  }

}
</script>

<style>

</style>
