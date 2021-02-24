<template>
    <v-container fluid>
      <v-img
       :src="require('../../assets/ஆட்டுக்கல்.svg')"
       max-height="250"
       contain
      ></v-img>
      <h1 class="display-1 font-weight-bold py-10">
        நாங்கள் லஸ்ஸிக்கு மேலே தொடர்ந்து வேலை செய்கிறோம்
      </h1>
      <v-tabs vertical fixed color="amber accent-4" class="mt-3">
        <v-tab v-for="முறை in muraigal" :key="முறை.பெயர்">
          <v-icon left>
            {{ முறை.action }}
          </v-icon>
          {{ முறை.பெயர் }}
          <v-spacer/>
        </v-tab>

        <v-tab-item  v-for="முறை in muraigal" :key="முறை.பெயர்">
          <v-card flat height="70vh" style="overflow: auto" class="bl-3">
            <v-card-title class="display-2 font-weight-bold mb-3 justify-center">{{ முறை.தலைப்பு }}</v-card-title>
            <v-card-text>

              <div class="text-center">
                <p>Test test test</p>
                <p>Test test test</p>
                <router-link :to="encodeURI('/பங்களி/வலைப்பக்கம்')">
                  <v-btn
                    color="orange"
                    target="_blank"
                    class="mb-5 text-center"
                    outlined
                  >
                    {{ $t('பங்களி.பங்களி') }}
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </router-link>
              </div>

              <div v-for="i in முறை.items" :key="i.தலைப்பு">
                <h1 class="mb-3"> {{ i.தலைப்பு }} </h1>
                <p>Test test test</p>
                <p>Test test test</p>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

    </v-container>
</template>
<script>
export default {
    name: 'அறிமுகம்',
    data: () => ({
      muraigal0: {
        'இலக்கணங்கள்': {
          'இணைப்பு': 'https://github.com/lassi-samaaj/lassi-ilakkanangal/tree/master/மூலம்/லஸ்ஸியிலக்கணங்கள்/இலக்கணங்கள்/',
        },
        'வலைப் பக்கம்': {
          'இணைப்பு': 'https://github.com/lassi-samaaj/lassi-pakkam/edit/master/src/trads.json'
        }
      },
      muraigal: [
        {
          action: 'mdi-abugida-devanagari',
          பெயர்: 'மொழிகள்',
          தலைப்பு: 'புது மொழியாக்கங்களை எப்படி சேர்க்கவும்',
          items: [
            {
              தலைப்பு: 'உயர்த்தர, உண்மையான தமிழில் எழுது வேண்டும், தாங்கிலம் வேண்டாம்',
            },
            {
              தலைப்பு: 'நேரடி மொழிபெயர்ப்பு செய்ய வேண்டாம்',
            },
            {
              தலைப்பு: 'ஏற்கனவே உபயோகத்தில் உள்ள நிரல்மொழிகளை ஈர்க்கப்பட வேண்டும்',
            },
          ]
        },
        {
          action: 'mdi-xml',
          பெயர்: 'நிரலாக்கமொழிகள்',
          தலைப்பு: 'புது நிரல்மொழிகளை எப்படி சேர்க்கவும்',
          items: [
            {
              தலைப்பு: 'நிரல்மொழியின் இலக்கணம்',
            }
          ]
        },
        {
          action: 'mdi-application',
          பெயர்: 'வலைப் பக்கம்',
          தலைப்பு: 'இந்த வலைப் பக்கத்தை உங்கள் பிடித்த மொழியில் மொழிபெயர்ப்புங்கள்',
          items: [
            {
              தலைப்பு: 'உங்களுக்கு வேண்டிய மொழி கிடைக்கவில்லையா?',
            },
            {
              தலைப்பு: 'மார்கடௌன் என்று வடிவூட்டம்',
            },
            {
              தலைப்பு: 'இணைப்புகளின் மொழியாக்கம்',
            },
          ]
        },
      ]
    }),
};
</script>
<style scoped>
</style>
