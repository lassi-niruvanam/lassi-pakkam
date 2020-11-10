<template>
  <v-app-bar
    app
    color="white"
    elevate-on-scroll
  >
    <router-link to="/அறிமுகம்">
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
      v-model="tab"
      :left="true"
      color="brown"
    >
      <v-tabs-slider color="brown"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :to="'/'+item"
          :key="item"
          :ripple="false"
          class="font-weight-black"
        >
          {{ $t('தாவல்.' + item) }}
        </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <!-- <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        color="brown"
      >
    </v-text-field> -->

    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y offset-x
      min-width="225"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon color="amber accent-4">mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list class="overflow-y-auto" style="max-height: 400px">
        <v-list-item
          v-for="(item, i) in மொழி_மேலாண்மை.மொழிகள்"
          :key="i"
          @click="mozhimattram(item)"
        >
          <v-list-item-action>
            <v-icon v-if="mozhi === item" color="amber accent-4">mdi-check-bold</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon v-if="மொழி_மேலாண்மை.மேம்பாடு[item] === 1" color="amber accent-4">mdi-check-circle</v-icon>
            <v-progress-circular v-else
              :value="மொழி_மேலாண்மை.மேம்பாடு[item] * 100"
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
          target="_blank">
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
          v-for="(item, i) in Object.keys(உதவி)"
          :key="i"
          :href="உதவி[item]['இணைப்பு']"
          target="_blank"
        >
          <v-list-item-action>
            <v-icon color="amber accent-4">{{ உதவி[item]['படம்'] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(`பிடித்திருக்கு.${item}.பெயர்`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      icon
      href="https://github.com/lassi-samaaj/lassi-ilakkanangal"
      target="_blank"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>

    <!-- <router-link to="/sign-in">
      <v-btn icon>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </router-link> -->

  </v-app-bar>
</template>

<script>
import { மொழி_மேலாண்மை } from '../plugins/vuetify'
import { வலதிலிருந்து } from '../nuchabal/nuchabal'

export default {
    name: 'AppNavigation',
    data: () => ({
      tab: 'அறிமுகம்',
      மொழி_மேலாண்மை: மொழி_மேலாண்மை,
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
      items: [
        'அறிமுகம்', 'கேள்விகள்', 'மேம்பாடு', 'பங்களி', 'தொடர்பு'
      ],
    }),
    computed: {
      mozhi: function () {
        return this.$i18n.locale
      }
    },
    methods: {
      mozhimattram: function (மொழி) {
        this.$i18n.fallbackLocale = [this.$i18n.locale, 'தமிழ்']
        this.$vuetify.lang.current = மொழி
        this.$i18n.locale = மொழி
        this.$vuetify.rtl = வலதிலிருந்து(மொழி)
        this.$cookies.set('மொழி', மொழி)
        this.$cookies.set('மொழி௨', JSON.stringify(this.$i18n.fallbackLocale))
        console.log(this.$cookies.get('மொழி௨'))
      }
    }

};
</script>

<style scoped>
</style>
