<template>
  <v-app-bar
    app
    color="white"
    elevate-on-scroll
  >
    <div class="d-flex align-center">
      <v-img
        alt="Lassi Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo.png"
        transition="scale-transition"
        width="150"
      />
    </div>

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

    <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        color="brown"
      >
    </v-text-field>

    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y offset-x
      min-width="225"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list>
      <v-list-item
        v-for="(item, i) in மொழிகள்"
        :key="i"
        @click="mozhimattram(item)"
      >
        <v-list-item-action>
          <v-icon v-if="mozhi === item">mdi-check</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item :ripple="false"  @click.stop="dialog = true">
        <v-list-item-action>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('மொழி.மேலும்') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-menu>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn
      icon
      href="https://github.com/lassi-samaaj/lassi-ilakkanangal"
      target="_blank"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {
    name: 'AppNavigation',
    data: () => ({
      tab: 'அறிமுகம்',
      மொழிகள்: [
        'தமிழ்', 'français', 'ਪੰਜਾਬੀ', 'Kaqchikel', "Tz'utujil", "Kanyen'ké:ha", 'پنجابی'
      ],
      items: [
        'அறிமுகம்', 'கேள்விகள்', 'மேம்பாடு', 'பங்களி', 'பதிவிறக்கங்கள்'
      ],
    }),
    methods: {
      mozhimattram: function (மொழி) {
        this.$vuetify.lang.current = மொழி
        this.$i18n.locale = மொழி
        this.$cookies.set('மொழி', மொழி)
      }
    }

};
</script>

<style scoped>
</style>
