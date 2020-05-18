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
          {{ item }}
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

    <v-btn icon>
      <v-icon>mdi-earth</v-icon>
    </v-btn>

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

  </v-app-bar>
</template>

<script>
export default {
    name: 'AppNavigation',
    data: () => ({
      tab: 'அறிமுகம்',
      items: [
        'அறிமுகம்', 'கேள்விகள்', 'பங்களி'
      ],
    }),

};
</script>

<style scoped>
</style>
