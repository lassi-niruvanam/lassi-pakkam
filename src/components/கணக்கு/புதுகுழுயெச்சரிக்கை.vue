<template>
  <v-alert
   type="warning"
   text
   outlined
   max-width="900"
   class="mx-auto my-10"
   prominent
   border="left">
    <h3 class="headline">
      புது மொழியாக்கக் குழு
    </h3>
    <v-row align="center">
      <v-col class="grow">
        புது குழு உருவாக்கப்பட்டுள்ளது:
        <span style="color:#FF6F00; border: 1px solid #FF6F00; border-radius: 4px; padding: 0px 5px; background-color: #FFE082">{{ pudu_kuzhu }}</span>
        <br/>
        அதை `.env.local` என்று கோப்பில் `VUE_APP_KUZHU_SAGOYAMAI` என்று சூழல் மாறியால் நகலேடுக்கவும்.
        <strong>நீர்கள் இந்த வலைப் பக்கத்தை வடிவமைப்பாளர் இல்லை என்றால், இது ஒரு பிழைத் தானே.
        <a
         href="https://github.com/lassi-samaaj/lassi-pakkam/issues/new"
         rel=”noopener”
         style="color:#FF6F00;"
         target="_blank"
        >எங்களுக்கு சொல்லவும்.</a>
        </strong>
      </v-col>
      <v-col class="shrink">
        <v-btn outlined color="amber darken-3" @click="நகலேடு(pudu_kuzhu)">
          <v-icon>mdi-copy</v-icon>
          நகலேடு
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'புதுகுழுயெச்சரிக்கை',
  props: ['pudu_kuzhu'],
  methods: {
    async நகலேடு (உரை) {
      if (!navigator.clipboard) return
      await navigator.clipboard.writeText(உரை);
    }
  }
}
</script>

<style>

</style>
