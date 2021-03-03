<template>
  <v-card outlined>
    <v-row>
      <v-col>
        <div style="display: flex; justify-content: center;">
          <v-avatar v-if="பயனாளர்_படம்" size="150">
            <v-img :src="பயனாளர்_படம்" :label="பயனாளர்_அடையாளம்"></v-img>
          </v-avatar>
          <v-avatar v-else
           @drop.prevent="onPickFile" @dragover.prevent
           size="150"
           style="margin-top:-85px; background-color: white; border: 5px dashed grey"
          >
            <v-btn icon x-large @click="onPickFile">
              <v-icon>mdi-camera-outline</v-icon>
            </v-btn>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            />
          </v-avatar>
        </div>

        <h1 style="text-align: center;">
          <v-menu
           offset-y
           :close-on-content-click="false"
           transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <payanalarpeyarpetti :peyarkal="peyarkal"/>
          </v-menu>

          {{ payanalarpeyar || பயனாளர்_அடையாளம்}}
          <span v-show="payanalarpeyar && பயனாளர்_அடையாளம் !== payanalarpeyar" style="color: grey">
            [{{ பயனாளர்_அடையாளம் }}]
          </span>
        </h1>
        <minnancal :tuvakkaminnancal="பயனாளர்_மின்னஞ்சல்"/>

        <v-tabs
          v-model="பதாகை"
          color="amber darken-2"
          align-with-title
        >
          <v-tab :key="0">கணக்கு</v-tab>
          <v-tab :key="1">திரள்</v-tab>
          <v-tab :key="2" v-if="melalar_urimai">உரிமைகள்</v-tab>
          <v-spacer/>
          <v-switch
           v-model="இணையம்"
           label="இணையம்"
           color="amber darken-2"
           class="mx-3"
           dense
          />
        </v-tabs>

        <v-tabs-items v-model="பதாகை" class="mx-5">
          <v-tab-item :key="0">
            <v-row v-if="nilai==='உள்நுழைக்கப்பட்டுள்ளது'" class="ma-2">
              <v-col cols="12">
                <h3>உங்கள் மொழியாக்கம் உரிமைகள்</h3>
                <span v-if="melalar_urimai">
                  <v-chip
                   label
                   color="amber lighten-5"
                  >
                   நீங்கள் மேலாளர் இருந்ததால் உங்களுக்கு எல்லா மொழிகளுக்காக உரிமை உள்ளது.
                  </v-chip>
                </span>
                <span v-else>
                  <v-chip
                   v-if="!உரிமைக்கப்பட்ட_மொழிகள்.length"
                   label
                   color="amber lighten-5"
                  >
                    உரிமைக்கப்பட்ட மொழி ஒன்றும் இல்லை
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="amber lighten-3"
                  >
                    +
                  </v-chip>
                  <v-chip
                    v-for="மொழி in உரிமைக்கப்பட்ட_மொழிகள்"
                    :key="மொழி"
                    class="ma-2"
                    color="amber lighten-4"
                    close
                  >
                    {{ மொழி }}
                  </v-chip>
                </span>
              </v-col>
              <v-col cols="12">
                <h3>உங்கள் சாதனங்கள்
                  <v-menu
                   offset-x
                   :close-on-content-click="false"
                   transition="slide-x-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <sadanamserukapetti/>
                  </v-menu>
                </h3>
                <v-list two-line>
                  <sadanamurupadi
                   v-for="சாதனம் in sadanankal" :key="சாதனம்.deviceId"
                   :sadanam="சாதனம்"
                  />
                </v-list>
              </v-col>
            </v-row>

            <v-row v-else class="ma-2">
              <v-col cols="12">
                <h3>உங்கள் கணக்குக்கு உள்ளனுமதி தேவையானது</h3>
                <p>உங்களால் மொழியாக்கம் செய்ய ஆரம்ப முடியும், ஆனால் அனுமதி கிடைக்கும் வரை
                  உங்கள் பங்களிப்புகள் வெறு பயனாளர்களுக்கு காணப்படாது.
                </p>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-card
                      class="mx-auto"
                      max-width="250"
                      flat
                    >
                      <v-img
                       :src="require('../../assets/உன்றா-பூட்டப்பட்ட-ஆவணம்.svg')"
                       contain max-height="100"
                       class="mx-4 mt-4"
                      />
                      <v-card-title class="justify-center">
                        <v-btn outlined color="amber" @click="அனுமதிவாங்கு()">
                          அனுமதி வாங்கு <v-icon>mdi-email</v-icon>
                        </v-btn>
                      </v-card-title>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card
                      class="mx-auto"
                      max-width="250"
                      flat
                    >
                      <v-img
                       :src="require('../../assets/உன்றா-ரகசிய-குறியீடு.svg')"
                       contain max-height="100"
                       class="mx-4 mt-4"
                      />
                      <v-card-title class="justify-center">
                        <v-text-field
                         v-model="அழைப்பு"
                         label="அழைப்பு உள்ளிடு"
                         outlined dense hide-details
                         color="amber darken-2"
                         append-outer-icon="mdi-check"
                         @click:append-outer="உள்ளிடு()"
                        >
                        </v-text-field>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item :key="1">

            <v-col v-if="Object.keys(இணைப்புகள்).length">
              <v-img
               :src="require('../../assets/உன்றா-உலகம்.svg')"
               max-height="150"
               contain
               class="ma-10"
              ></v-img>
              <h3>திரள் இணைப்புகள்</h3>
              <v-list>
                <tiraluruppadi
                 v-for="[இ, ஈ] of Object.entries(இணைப்புகள்)"
                 :key="இ"
                 :uruppadi="ஈ"
                 @nikku="இணைப்பை_நீக்கு(இ)"
                />
              </v-list>
            </v-col>
            <v-col v-else>
              <div class="text-center">
                <v-img
                 :src="require('../../assets/உறியடி.svg')"
                 max-height="200"
                 contain
                 class="my-3"
                ></v-img>
                <h2>இப்பொழுது வரை எந்த இணைப்பையும் கண்டுப்பிடிக்க முடியவில்லை</h2>
              </div>
            </v-col>
          </v-tab-item>

          <v-tab-item :key="2" v-if="melalar_urimai">
            <v-img
             :src="require('../../assets/உன்றா-பூட்டப்பட்ட-ஆவணம்.svg')"
             max-height="150"
             contain
             class="ma-10"
            ></v-img>
            <v-col>
              <h3>உங்கள் அழைப்புகள்
                <v-btn icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </h3>
              <v-list two-line>
                <v-list-item v-for="x in [1,2,3]" :key="x">
                  <v-list-item-avatar>
                    <v-img
                     :src="require(x===1? '../../assets/உன்றா-காகிதம்.svg': '../../assets/உன்றா-கணினி-கைபேசி.svg')"
                     max-height="30"
                     contain
                     class="ma-10"
                    ></v-img>
                </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>நீலமான் காகித சாபி பெயர்...</v-list-item-title>

                    <v-list-item-subtitle v-text="x===1? 'காகித சாபி': 'சாதனம்'"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon color="error">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col>
              <h3>கூட்டுபணியாளர்கள்
                <v-btn icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </h3>
              <v-list two-line>
                <v-list-item v-for="x in [1,2,3]" :key="x">
                  <v-list-item-avatar>
                    <v-img
                     :src="require(x===1? '../../assets/உன்றா-காகிதம்.svg': '../../assets/உன்றா-கணினி-கைபேசி.svg')"
                     max-height="30"
                     contain
                     class="ma-10"
                    ></v-img>
                </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>நீலமான் காகித சாபி பெயர்...</v-list-item-title>

                    <v-list-item-subtitle v-text="x===1? 'காகித சாபி': 'சாதனம்'"></v-list-item-subtitle>
                  </v-list-item-content>
                  <div>
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-list-item>
              </v-list>
            </v-col>
          </v-tab-item>

        </v-tabs-items>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import payanalarpeyarpetti from '../../components/கணக்கு/பயனாளர்பெயர்பெட்டி'
import sadanamurupadi from '../../components/கணக்கு/சாதனமுருப்படி'
import sadanamserukapetti from '../../components/கணக்கு/சாதனம்சேருகப்பெட்டி'
import minnancal from '../../components/கணக்கு/மின்னஞ்சல்'
import tiraluruppadi from '../../components/கணக்கு/திரளுறுப்படி'
import mixin from '../../mixins/நிகழ்வுகவனிப்பவாளர்'

export default {
  name: 'கணக்குயமைப்புகள்',
  components: {payanalarpeyarpetti, sadanamurupadi, sadanamserukapetti, minnancal, tiraluruppadi},
  props: ['peyarkal', 'melalar_urimai', 'sadanankal', 'payanalarpeyar', 'nilai'],
  mixins: [mixin],
  data: function () {
    return {
      பதாகை: 0,
      இணையம்: false,
      பயனாளர்_அடையாளம்: undefined,
      பயனாளர்_படம்: undefined,
      பயனாளர்_மின்னஞ்சல்: undefined,
      உரிமைக்கப்பட்ட_மொழிகள்: [],
      அழைப்பு: '',
      இணைப்புகள்: {}
    }
  },
  watch: {
    இணையம்: function(மதிப்பு) {
      this.$கணக்கு.இணையம் = மதிப்பு
    }
  },
  mounted: function() {
    this.கவனி(this.$கணக்கு, ['பயனாளர் மாற்றம்', 'அங்கீகாரம் தயார்'], () => {
      this.பயனாளர்_அடையாளம் = this.$கணக்கு.பயனாளர்_அடையாளம்
    })
    this.பயனாளர்_அடையாளம் = this.$கணக்கு.பயனாளர்_அடையாளம்

    this.கவனி(this.$கணக்கு, 'இணையம் மாற்றம்', () => {
      this.இணையம் = this.$கணக்கு.இணையம்
    })
    this.இணையம் = this.$கணக்கு.இணையம்

    const இணைப்புகளை_படி = function(திரள்_இணைப்புகள்) {
       console.log(திரள்_இணைப்புகள்)
       return Object.fromEntries(
         Object.keys(திரள்_இணைப்புகள்).map(இ=>{
           return [இ, {
             நிலை: திரள்_இணைப்புகள்[இ].அங்கீகாரம்_இணைப்பு.machine.state.value,
             கூடபணியாளர்பெயர்: திரள்_இணைப்புகள்[இ].அங்கீகாரம்_இணைப்பு.peerName
           }]
         })
       )
     }
    this.கவனி(this.$கணக்கு, ['திரளிணைப்பு மாற்றம்'], () => {
      this.இணைப்புகள் = இணைப்புகளை_படி(this.$கணக்கு.திரள்_இணைப்புகள்)
      console.log('ici, இணைப்புகள்', this.இணைப்புகள்)
    })
    this.இணைப்புகள் = இணைப்புகளை_படி(this.$கணக்கு.திரள்_இணைப்புகள்)
    console.log('ici2', this.$கணக்கு.திரள்_இணைப்புகள்)

    this.கவனி(this.$கணக்கு, 'தரவுத்தளம் மாற்றம்', (தகவல்கள்) => {
      switch (தகவல்கள்.தரவுத்தளம்) {
        case "பயனாளர்":
          this.பயனாளர்_படம் = this.$கணக்கு.தத.பயனாளர்_படம்
          this.பயனாளர்_மின்னஞ்சல் = this.$கணக்கு.தத.பயனாளர்_மின்னஞ்சல்
          break;
        }
    })

    this.கவனி(this.$கணக்கு, 'குழு மாற்றம்', () => {
      this.உரிமைக்கப்பட்ட_மொழிகள் = this.$கணக்கு.உரிமைக்கப்பட்ட_மொழிகள்
    })
  },
  methods: {
    உள்ளிடு: function () {
      if (!this.அழைப்பு) return
      console.log(this.அழைப்பு)
    },
    அனுமதிவாங்கு: function() {
      console.log(this.அனுமதிவாங்கு)
    },
    இணைப்பை_நீக்கு: function(இ) {
      this.$கணக்கு.திரளிணைப்பை_நீக்கு(இ)
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style>

</style>
