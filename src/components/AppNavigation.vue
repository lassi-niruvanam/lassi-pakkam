<template>
  <v-app-bar
    app
    color="white"
    elevate-on-scroll
  >
    <router-link :to='encodeURI("/அறிமுகம்")'>
      <div class="d-flex align-center">
        <v-img
          alt="Lassi Logo"
          class="shrink me-2"
          contain
          src="../assets/logo.svg"
          transition="scale-transition"
          width="100"
        />
      </div>
    </router-link>

    <v-tabs
      v-model="தற்பொழுது_தாவல்"
      :left="true"
      color="brown"
    >
      <v-tabs-slider color="brown"></v-tabs-slider>

        <v-tab
          v-for="தாவல் in தாவல்கள்"
          :to="encodeURI('/'+தாவல்)"
          :key="தாவல்"
          :ripple="false"
          class="font-weight-black"
        >
          <h3>{{ $t('தாவல்.' + தாவல்) }}</h3>
        </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y offset-x
      min-width="225"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" color="amber accent-4">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list class="overflow-y-auto" style="max-height: 400px">
        <v-list-item
          v-for="(மொ, இ) in மொழி_மேலாண்மை.மொழிகள்"
          :key="இ"
          @click="மொழிமாற்றம்(மொ)"
        >
          <v-list-item-action>
            <v-icon v-if="மொ === மொழி" color="amber accent-4">mdi-check-bold</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ மொ }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon v-if="மொழி_மேலாண்மை.மேம்பாடு[மொ] === 1" color="amber accent-4">mdi-check-circle</v-icon>
            <v-progress-circular v-else
              :value="மொழி_மேலாண்மை.மேம்பாடு[மொ] * 100"
              size="20"
              rotate="270"
              color="amber accent-4"
            ></v-progress-circular>
          </v-list-item-action>
        </v-list-item>
        <v-footer
          absolute
          color="white"
        >
          <v-list-item :ripple="false"
           href="https://github.com/lassi-samaaj/lassi-pakkam/blob/master/src/trads.json"
           rel=”noopener”
           target="_blank"
          >
            <v-list-item-action>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t('மொழி.மேலும்') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-footer>
      </v-list>
    </v-menu>

    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y offset-x
      min-width="225"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>
      <v-list class="overflow-y-auto" style="max-height: 400px">
        <v-list-item
          v-for="(தலைப்பு, இ) in Object.keys(உதவி)"
          :key="இ"
          :href="உதவி[தலைப்பு]['இணைப்பு']"
          rel=”noopener”
          target="_blank"
        >
          <v-list-item-action>
            <v-icon color="amber accent-4">{{ உதவி[தலைப்பு]['படம்'] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(`பிடித்திருக்கு.${தலைப்பு}.பெயர்`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      icon
      href="https://github.com/lassi-samaaj"
      rel=”noopener”
      target="_blank"
    >
      <v-icon>mdi-git</v-icon>
    </v-btn>
    <!--
    <router-link :to="encodeURI('/கணக்கு')">
      <v-btn icon>
        <v-icon v-if="நிலை === 'வெளியேறிக்கப்பட்டுள்ளது'">
          mdi-account-circle-outline
        </v-icon>
        <v-badge v-else
          :value="true"
          bordered dot
          bottom overlap
          transition="slide-x-transition"
          :color="இணையம்? 'green': 'red'"
        >
          <v-avatar color="amber darken-1" size="30">
            <span class="white--text">ஜூ</span>
          </v-avatar>
        </v-badge>
      </v-btn>
    </router-link>
  -->

  </v-app-bar>
</template>

<script>
import { மொழி_மேலாண்மை } from '../plugins/vuetify'
import { வலதிலிருந்து } from '../nuchabal/nuchabal'
import mixin from '../mixins/நிகழ்வுகவனிப்பவாளர்'

export default {
  name: 'AppNavigation',
  mixins: [mixin],
  data: () => ({
    தற்பொழுது_தாவல்: 'அறிமுகம்',
    மொழி_மேலாண்மை,
    உதவி: {
      "வணக்கம்": {
        "இணைப்பு": "mailto:julien.malard@mail.mcgill.ca",
        'படம்': 'mdi-emoticon-happy-outline'
      },
      "வேலை":{
        "இணைப்பு": "/தொடர்பு",
        'படம்': 'mdi-xml'
      }
    },
    தாவல்கள்: [
      'அறிமுகம்', 'கேள்விகள்', 'மேம்பாடு',
      // 'பங்களி',
      'பதிவிறக்கங்கள்', 'தொடர்பு'
    ],
    நிலை: null,
    இணையம்: false
  }),
  computed: {
    மொழி: function () {
      return this.$i18n.locale
    }
  },
  methods: {
    மொழிமாற்றம்: function (மொழி) {
      this.$i18n.fallbackLocale = [this.$i18n.locale, 'தமிழ்']
      this.$vuetify.lang.current = மொழி
      this.$i18n.locale = மொழி
      this.$vuetify.rtl = வலதிலிருந்து(மொழி)
      this.$cookies.set('மொழி', மொழி)
      this.$cookies.set('மொழி௨', JSON.stringify(this.$i18n.fallbackLocale))
    }
  },
  mounted: function() {
    this.கவனி(this.$கணக்கு, 'நிலை மாற்றம்', (நிலை) => {this.நிலை = நிலை})
    this.நிலை = this.$கணக்கு.நிலை

    this.கவனி(this.$கணக்கு, 'இணையம் மாற்றம்', (இணையம்) => {this.இணையம் = இணையம்})
    this.இணையம் = this.$கணக்கு.இணையம்
  }
}
</script>

<style scoped>
</style>
