<template>
  <v-row
    justify="center"
  >
    <h1>{{ முழு_தலைப்ப }}</h1>
    <v-card
      width="350"
      class="ma-10 pa-6"
      v-for="(murai, index) in Object.keys(muraigal)" :key="index"
    >
      <v-card-title>{{ $t(`பங்களி.${murai}.பெயர்`) }}</v-card-title>
      <v-divider :inset="inset"></v-divider>

      <v-card-text class="text--primary">
        <div>{{ $t(`பங்களி.${murai}.தகவல்`) }}</div>
      </v-card-text>

      <v-card-actions>
        <!-- <router-link :to="murai.இணைப்பு"> -->
          <v-btn
            color="orange"
            :href="muraigal[murai].இணைப்பு"
            rel=”noopener”
            target="_blank"
            outlined
          >
            {{ $t('பங்களி.பங்களி') }}
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        <!-- </router-link> -->
      </v-card-actions>
    </v-card>
  </v-row>
</template>
<script>
export default {
    name: 'மனிதர்மொழிகள்',
    data: () => ({
    }),
};
</script>
<style scoped>
</style>
