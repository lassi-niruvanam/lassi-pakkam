<template>
  <v-container class="mt-10">
    <v-row>
      <v-toolbar class="mb-7">
        <v-col cols="5">
          <v-row>
            <v-col cols="6">
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
            <v-col cols="6">
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
          </v-row>
        </v-col>
        <v-col cols="7">
          <v-row>
            <v-col cols="6">
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
          </v-row>
        </v-col>
      </v-toolbar>
    </v-row>
    <v-divider class="mb-2"/>
    <transition-group name="fade" mode="out-in">
      <v-row v-show="உரைப்பட்டியல்.length" :key="0">
        <v-col cols="5">
          <v-card outlined>
            <mozhiyakkam-pattiyal
             :uraipattiyal="உரைப்பட்டியல்"
             @terndedu="terndedu"
            />
          </v-card>
        </v-col>
        <v-col cols="7">
          <transition-group name="fade" mode="out-in">
            <span v-if="தேர்ந்தேடுக்கப்பட்டது" :key="0">
              <v-list-item v-if="மொழியாக்கம்(தேர்ந்தேடுக்கப்பட்டது, மூல்மொழி)" class="my-2">
                <v-card flat width="100%">
                  <v-card-subtitle class="px-0">இருக்கும் மொழிபெயர்ப்பு</v-card-subtitle>
                  <v-card-text class="pa-0">
                    <v-text-field
                     v-if="மொழியாக்கம்(தேர்ந்தேடுக்கப்பட்டது, வேண்டியமொழி)"
                     outlined no-resize readonly
                     append-outer-icon="mdi-content-copy"
                     @click:append-outer="copy()"
                     :value="மொழியாக்கம்(தேர்ந்தேடுக்கப்பட்டது, வேண்டியமொழி)"
                    >

                    </v-text-field>
                  </v-card-text>
                  <v-divider/>
                </v-card>
              </v-list-item>

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
      மூல்மொழி: 'தமிழ்',
      வேண்டியமொழி: this.$i18n.locale === 'தமிழ்' ? 'français': this.$i18n.locale,
      நிலை: 'எல்லாம்',
      நிலைகள்: ['எல்லாம்', 'காலியானது', 'மொழிப்பெயர்க்கப்பட்டது'],
      தேர்ந்தேடுக்கப்பட்டது: null,
      பரிந்துரைகள்: []
    }
  },
  computed: {
    சாபிகள்: () => மொழி_மேலாண்மை.சாபிகள்,
    மொழிகள்: () => மொழி_மேலாண்மை.மொழிகள்,
    உரைப்பட்டியல்: function () {
      return this.காண்கசாபிகள்(this.நிலை).map((சாபி) => {
        return {
          சாபி,
          மூல்மொழி: this.மூல்மொழி,
          வேண்டியமொழி: this.வேண்டியமொழி,
          மூலுரை: this.மொழியாக்கம்(சாபி, this.மூல்மொழி, true),
          மொழியாக்கம்: this.மொழியாக்கம்(சாபி, this.வேண்டியமொழி)
        }
      }
    )
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
      this.$கணக்கு.தத.பரிந்துரைகள்_பெறு(
        'வலைப்பக்கம்', this.தேர்ந்தேடுக்கப்பட்டது, this.வேண்டியமொழி
      ).then(பரிந்துரைகள் => this.பரிந்துரைகள் = பரிந்துரைகள்)
    },

    terndedu: function (சாபி) {
      this.தேர்ந்தேடுக்கப்பட்டது = சாபி
    },

    parinduraiyu: function(பரிந்துரை) {
      const மூலுரை = this.மொழியாக்கம்(this.தேர்ந்தேடுக்கப்பட்டது, this.மூல்மொழி, true)
      this.$கணக்கு.தத.பரிந்துரையு(
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
