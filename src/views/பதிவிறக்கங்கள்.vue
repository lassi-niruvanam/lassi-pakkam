<template>
  <v-container fluid class="mt-10 text-center">
    <v-img
     :src="require('../assets/மாமரம்.svg')"
     max-height="250"
     contain
    ></v-img>
    <h1 class="display-1 font-weight-bold mb-3">
      பதிவிறக்கங்கள்
    </h1>
    <h2 color="red--text">உங்கள் வேலையுக்காக லஸ்ஸி பெறுங்கள்</h2>
    <v-card class="my-7 px-5 mx-auto" max-width="1200">
      <v-row>
        <v-col cols="3">
          <v-autocomplete
            :items="வகை_சாத்தியங்கள்"
            label="வகை"
            v-model="வகைகள்"
            cache-items chips multiple deletable-chips
            small-chips clearable
            outlined
            dense
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-autocomplete
            :items="நிலை_சாத்தியங்கள்"
            label="நிலை"
            v-model="நிலைகள்"
            cache-items chips multiple deletable-chips
            small-chips clearable
            outlined
            dense
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-autocomplete
            :items="நிரல்மொழி_சாத்தியங்கள்"
            label="நிரல்மொழி"
            v-model="நிரல்மொழிகள்"
            cache-items chips multiple deletable-chips
            small-chips clearable
            outlined
            dense
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="தேடல்"
            hide-details outlined dense
            prepend-icon="mdi-magnify"
            single-line clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      flat tile
    >
      <transition-group name="fade" mode="out-in" class="d-flex flex-wrap justify-center">
        <div v-show="!தேர்ந்தேடுக்கப்பட்டன.length" class="text-center" :key="0">
          <v-img
           :src="require('../assets/கிணறு.svg')"
           max-height="300"
           contain
          ></v-img>
          <h2>எந்த முடிவும் கிடைக்கவில்லை</h2>
        </div>
        <v-card
          v-for="பதிவிறக்கம் in தேர்ந்தேடுக்கப்பட்டன"
          :key="பதிவிறக்கம்.பெயர்"
          class="mx-4 my-5 px-3 py-5 justify-start text-start" min-height="500px" width="325px"
        >
          <v-img
            :src="பதிவிறக்கம்.படம் || require('../assets/lassi.svg')"
            height="100px"
            contain
          ></v-img>

          <v-card-title>{{ பதிவிறக்கம்.பெயர் }}
            <v-spacer/>
            <v-btn v-if="பதிவிறக்கம்.கிட்"
              :href="பதிவிறக்கம்.கிட்"
              icon
              rel=”noopener”
              target="_blank">
              <v-icon>mdi-git</v-icon>
            </v-btn>
            <v-btn v-if="பதிவிறக்கம்.ஆவணங்கள்"
              :href="பதிவிறக்கம்.ஆவணங்கள்"
              icon
              rel=”noopener”
              target="_blank">
              <v-icon>mdi-file-document-multiple-outline</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider/>
          <v-card-subtitle>{{ பதிவிறக்கம்.தகவல்கள் }}</v-card-subtitle>
          <v-card-text>
            <v-chip v-if="பதிவிறக்கம்.வகை"
             outlined label small class="ma-1"
             @click="வகைகள்=[பதிவிறக்கம்.வகை]"
            >
             <v-icon left small>
              {{ வகை_படவுரு(பதிவிறக்கம்.வகை) }}
             </v-icon>
             {{ பதிவிறக்கம்.வகை }}
            </v-chip>

            <v-chip v-if="பதிவிறக்கம்.நிலை"
             outlined label small class="ma-1"
             @click="நிலைகள்=[பதிவிறக்கம்.நிலை]"
            >
             <v-icon left small>
               {{ மேம்பாடு_படவுரு(பதிவிறக்கம்.நிலை) }}
             </v-icon>
             {{ பதிவிறக்கம்.நிலை }}
           </v-chip>

            <v-chip
             v-for="நி in பதிவிறக்கம்.நிரல்மொழி" :key="நி"
             outlined label small class="ma-1"
             @click="நிரல்மொழிகள்=[நி]"
            >
             <v-icon left small>
              {{ நிரல்மொழி_படவுரு(நி) }}
             </v-icon>
             {{ நி }}
           </v-chip>

            <div v-if="பதிவிறக்கம்.பதிவிறக்கம்" class="mt-2">
              பதிவிறக்கம்
              <v-divider/>
              <div v-for="ப in பதிவிறக்கம்.பதிவிறக்கம்" :key="ப">
                <v-chip label class="ms-5 my-2 px-2">
                  {{ ப }}
                  <v-btn icon small>
                    <v-icon small>mdi-content-copy</v-icon>
                  </v-btn>
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>

      </transition-group>
    </v-card>
  </v-container>
</template>

<script>
export default {
    name: 'பதிவிறக்கங்கள்',
    data: () => ({
      பதிவிறக்கங்கள்: [
        {
          பெயர்: 'லஸ்ஸி பைத்தான்',
          தகவல்கள்: 'லஸ்ஸியின் மூல் செயல்படுத்தல். நீர்கள் லஸ்ஸியை பயன்படுத்த விரம்பினால், இதே உங்களுக்கு தேவையானது.',
          வகை: 'செயல்படுத்தல்',
          பதிவிறக்கம்: ['poetry add lassi'], நிலை: 'மேம்பாட்டில்', நிரல்மொழி: ['பைத்தான்'],
          கிட்: 'https://github.com/lassi-samaaj/Lassi',
          ஆவணங்கள்: 'https://லஸ்ஸி.இந்தியா',
          படம்: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
        },
        {
          பெயர்: 'லஸ்ஸி யாவாக்கிறீட்டு',
          தகவல்கள்: 'லஸ்ஸியின் அதே செயல்படுத்தல், ஆனால் யாவாக்கிறீட்டில்.',
          வகை: 'செயல்படுத்தல்',
          பதிவிறக்கம்: ['yarn add lassi-js'], நிலை: 'திட்டமிடப்பட்டுள்ளது', நிரல்மொழி: ['யாவாக்கிறீட்டு'],
          படம்: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png'
        },
        {
          பெயர்: 'லஸ்ஸி இலக்கணங்கள்', வகை: 'சட்டகம்',
          தகவல்கள்: 'லஸ்ஸி சட்டகத்தின் விவரக்குறிப்புகள். லஸ்ஸி மேம்பாடாளர்களுக்கு மட்டுமே இந்த மென்பொருள் சுவாரஸ்யமானதாகும்.',
          நிலை: 'மேம்பாட்டில்',
          நிரல்மொழி: ['பைத்தான்', 'யாவாக்கிறீட்டு'],
          பதிவிறக்கம்: ['poetry add lassi-ilakkanankal', 'yarn add lassi-ilakkanankal'],
          கிட்: 'https://github.com/lassi-samaaj/lassi-ilakkanangal',
        },
        {
          பெயர்: 'வெப் பாக் உட்சேருகி', நிலை: 'திட்டமிடப்பட்டுள்ளது', வகை: 'உட்சேருகி',
          படம்: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Webpack.svg/2880px-Webpack.svg.png'
        },
        {
          பெயர்: 'பைச்சார்ம் உட்சேருகி', நிலை: 'திட்டமிடப்பட்டுள்ளது', வகை: 'உட்சேருகி',
          கிட்: 'https://github.com/lassi-samaaj/pycharm-utceruki',
          படம்: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/PyCharm_Logo.svg/langfr-1920px-PyCharm_Logo.svg.png'
        },
        {
          பெயர்: 'ஆத்தாம் உட்சேருகி', நிலை: 'திட்டமிடப்பட்டுள்ளது', வகை: 'உட்சேருகி',
          படம்: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Atom_icon.svg/2880px-Atom_icon.svg.png'
        }
      ],
      நிலை_சாத்தியங்கள்: ['நிலையானது', 'மேம்பாட்டில்', 'திட்டமிடப்பட்டுள்ளது'],
      வகைகள்: [],
      நிலைகள்: [],
      நிரல்மொழிகள்: [],
      தேடல்: null
  }),
  computed: {
    வகை_சாத்தியங்கள்: function() {
      return [...new Set(this.பதிவிறக்கங்கள்.map(இ=>இ.வகை).filter(இ=>இ))]
    },
    நிரல்மொழி_சாத்தியங்கள்: function() {
      return [...new Set([].concat.apply([], this.பதிவிறக்கங்கள்.filter(இ=>இ.நிரல்மொழி).map(இ=>இ.நிரல்மொழி)))]
    },
    தேர்ந்தேடுக்கப்பட்டன: function() {
      return this.பதிவிறக்கங்கள்.filter(
        இ=>(!this.வகைகள்.length || this.வகைகள்.includes(இ.வகை))
      ).filter(
        இ=>(!this.நிலைகள்.length || this.நிலைகள்.includes(இ.நிலை))
      ).filter(
        இ=>(!this.நிரல்மொழிகள்.length || (இ.நிரல்மொழி && இ.நிரல்மொழி.some(ஈ=>this.நிரல்மொழிகள்.includes(ஈ))))
      ).filter(
        இ=>(!this.தேடல் || !this.தேடல்.trim() || (இ.பெயர் && இ.பெயர்.includes(this.தேடல்.trim())) || (இ.தகவல்கள் && இ.தகவல்கள்.includes(this.தேடல்.trim())))
      )
    }
  },
  methods: {
    வகை_படவுரு: function(வகை) {
      switch (வகை) {
        case 'உட்சேருகி':
          return 'mdi-connection'
        case 'செயல்படுத்தல்':
          return 'mdi-cogs'
        case 'சட்டகம்':
          return 'mdi-database-outline'
        default:
          return ''
      }
    },
    மேம்பாடு_படவுரு: function(நிலை) {
      switch (நிலை) {
        case 'நிலையானது':
          return 'mdi-check-circle'
        case 'மேம்பாட்டில்':
          return 'mdi-sprout'
        case 'திட்டமிடப்பட்டுள்ளது':
          return 'mdi-seed-outline'
        default:
          return;
      }
    },
    நிரல்மொழி_படவுரு: function(நிரல்மொழி) {
      switch (நிரல்மொழி) {
        case 'பைத்தான்':
          return 'mdi-language-python'
        case 'யாவாக்கிறீட்டு':
          return 'mdi-language-javascript'
        case 'யாவா':
          return 'mdi-language-java'
        default:
          return 'mdi-xml'
      }
    }
  }
};
</script>
<style scoped>
</style>
