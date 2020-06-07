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
              v-for="(something, index) in somethingsArray" :key="index"
            >
              <v-card-title class="headline">{{ something.பெயர் }}</v-card-title>
              <v-divider :inset="inset"></v-divider>

              <v-card-text class="text--primary">
                <div>{{ something.தகவல்கள் }}</div>
              </v-card-text>

          <v-card-actions>
            <router-link :to="something.இணைப்பு">
              <v-btn
                color="orange"
                outlined
              >
                {{ $t('பங்களி.பங்களி') }}
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </router-link>
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
      somethingsArray: [
        {
          'பெயர்': 'இலக்கணங்கள்',
          'தகவல்கள்': 'புது கணினி அல்லது மநிதர் மொழிகளை லஸ்ஸி குறிப்புக்கு சேருங்கள்.',
          'இணைப்பு': '/மேம்பாடு/'
        },
        {
          'பெயர்': 'வலைப் பக்கம்',
          'தகவல்கள்': 'இந்த வலைப் பக்கத்தை மொழிபெயர்ப்பு செய்யுங்கள்.',
          'இணைப்பு': '/மொழியாக்கம்/'
        }
      ],
    }),
};
</script>
<style scoped>
</style>
