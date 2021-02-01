<template>
  <v-container fluid>

    <pudukuzhuyeccarikkai v-if="புது_குழு" pudu_kuzhu="புது_குழு"/>

    <v-card
      class="mx-auto my-14 pa-10"
      flat
      max-width="1000"
    >

      <ullidu v-if="நிலை === 'வெளியேறிக்கப்பட்டுள்ளது'"></ullidu>
      <kanakkuyamaippukal v-else
       :peyarkal="பயனாளர்பெயர்கள்"
       :melalar_urimai="மேலாளர்_உரிமை"
       :sadanankal="சாதனங்கள்"
       :payanalarpeyar="பயனாளர்_பெயர்"
       :nilai="நிலை"
      ></kanakkuyamaippukal>

    </v-card>

  </v-container>
</template>

<script>
import pudukuzhuyeccarikkai from '../../components/கணக்கு/புதுகுழுயெச்சரிக்கை'
import ullidu from './உள்ளிடு'
import kanakkuyamaippukal from './கணக்குயமைப்புகள்'

export default {
  name: 'கணக்கு',
  components: {ullidu, kanakkuyamaippukal, pudukuzhuyeccarikkai},
  data: function () {
    return {
      உள்நுழையப்பட்டது: false,
      இணையம்: true,
      மேலாளர்_உரிமை: false,
      நிலை: 'வெளியேறிக்கப்பட்டுள்ளது',
      புது_குழு: '',
      பயனாளர்பெயர்கள்: {},
      சாதனங்கள்: [],
      இணைப்புகள்: []
    }
  },
  computed: {
    பயனாளர்_பெயர்: function() {
      return this.பயனாளர்பெயர்கள்[this.$i18n.locale]
    }
  },
  watch: {
    இணையம்: function(மதி) {
      if (மதி) {
        // this.$அடையாளம்.இணையு()
      } else {
        // this.$அடையாளம்.வெளியேறி()
      }
    }
  },
  mounted: function() {

    for (let இ of ['பயனாளர் மாற்றம்', 'குழு மாற்றம்']) {
      this.$கணக்கு.on(இ, () => {this.நிலை = this.$கணக்கு.நிலை})
    }
    this.நிலை = this.$கணக்கு.நிலை

    this.$கணக்கு.on('புது குழு', () => {this.புது_குழு = this.$கணக்கு.புது_குழு})
    this.புது_குழு = this.$கணக்கு.புது_குழு

    this.$கணக்கு.on('குழு மாற்றம்', () => {
      this.மேலாளர்_உரிமை = this.$கணக்கு.மேலாளர்_உரிமை
      this.சாதனங்கள் = this.$கணக்கு.சாதனங்கள்
    })
    this.மேலாளர்_உரிமை = this.$கணக்கு.மேலாளர்_உரிமை
    this.சாதனங்கள் = this.$கணக்கு.சாதனங்கள்

    this.$கணக்கு.on('தரவுத்தளம் மாற்றம்', (தகவல்கள்) => {
      console.log('தரவுத்தளம் மாற்றம்', தகவல்கள்)
      switch (தகவல்கள்.தரவுத்தளம்) {
        case "பயனாளர்பெயர்கள்":
          console.log('பெயர் தரவுத்தளம்', this.பயனாளர்பெயர்கள்)
          this.பயனாளர்பெயர்கள் = this.$கணக்கு.தத.பயனாளர்_பெயர்கள்
          console.log(this.பயனாளர்பெயர்கள்)
          break;
      }
    })
    if (this.$கணக்கு.தத && this.$கணக்கு.தத.தயார்) this.பயனாளர்பெயர்கள் = this.$கணக்கு.தத.பயனாளர்_பெயர்கள்
  }
}
</script>
<style scoped>
</style>
