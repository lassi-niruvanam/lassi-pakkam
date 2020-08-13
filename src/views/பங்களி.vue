<template>
    <v-container fluid class="mt-10">
      <v-row>
        <v-col cols="12">
          <v-row
            justify="center"
          >
            <v-card
              width="350"
              class="ma-10 pa-6"
              v-for="(murai, index) in Object.keys(muraigal)" :key="index"
            >
              <v-card-title class="headline">{{ $t(`பங்களி.${murai}.பெயர்`) }}</v-card-title>
              <v-divider :inset="inset"></v-divider>

              <v-card-text class="text--primary">
                <div>{{ $t(`பங்களி.${murai}.தகவல்`) }}</div>
              </v-card-text>

              <v-card-actions>
                <!-- <router-link :to="murai.இணைப்பு"> -->
                  <v-btn
                    color="orange"
                    :href="muraigal[murai].இணைப்பு"
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
        </v-col>
      </v-row>

    </v-container>
</template>
<script>
export default {
    name: 'அறிமுகம்',
    data: () => ({
      muraigal: {
        'இலக்கணங்கள்': {
          'இணைப்பு': 'https://github.com/lassi-samaaj/lassi-ilakkanangal/tree/master/மூலம்/லஸ்ஸியிலக்கணங்கள்/இலக்கணங்கள்/',
        },
        'வலைப் பக்கம்': {
          'இணைப்பு': 'https://github.com/lassi-samaaj/lassi-pakkam/edit/master/src/trads.json'
        }
      }
    }),
};
</script>
<style scoped>
</style>
