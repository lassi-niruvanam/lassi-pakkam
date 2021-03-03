<template>
  <v-container fluid>

    <pudukuzhuyeccarikkai v-if="புது_குழு" :pudu_kuzhu="புது_குழு"/>

    <v-card
      class="mx-auto my-14 pa-10"
      flat
      max-width="1000"
    >

      <ullidu v-if="நிலை === 'வெளியேறிக்கப்பட்டுள்ளது'"></ullidu>
      <span v-else-if="நிலை === 'ஏற்றுகொண்டிருக்கு'" class="text-center">
        <v-img
         :src="require('../../assets/தென்னை_மரம்.svg')"
         max-height="250"
         contain
        ></v-img>
        <h2>
          <v-progress-circular indeterminate color="amber" class="mx-2"></v-progress-circular>
          உங்கள் கணக்கை ஏற்றுகொண்டு இருக்கிறோம்...
        </h2>
      </span>
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
import mixin from '../../mixins/நிகழ்வுகவனிப்பவாளர்'

export default {
  name: 'கணக்கு',
  components: {ullidu, kanakkuyamaippukal, pudukuzhuyeccarikkai},
  mixins: [mixin],
  data: function () {
    return {
      உள்நுழையப்பட்டது: false,
      மேலாளர்_உரிமை: false,
      நிலை: null,
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
  methods: {
    பயனாளர்_பெயர்களை_பெறு: async function() {
      const பெயர்கள் = await this.$கணக்கு.தத.பயனாளர்_பெயர்களை_பெறு()
      this.பயனாளர்பெயர்கள் = பெயர்கள்
    }
  },
  mounted: function() {
    this.கவனி(this.$கணக்கு, 'நிலை மாற்றம்', (நிலை) => {this.நிலை = நிலை})
    this.நிலை = this.$கணக்கு.நிலை

    this.கவனி(this.$கணக்கு, 'புது குழு', (வேர்) => {this.புது_குழு = வேர்})
    this.புது_குழு = this.$கணக்கு.புது_குழு

    this.கவனி(this.$கணக்கு, ['குழு மாற்றம்', 'நிலை மாற்றம்'], () => {
      this.மேலாளர்_உரிமை = this.$கணக்கு.மேலாளர்_உரிமை
      this.சாதனங்கள் = this.$கணக்கு.சாதனங்கள்
    })
    this.மேலாளர்_உரிமை = this.$கணக்கு.மேலாளர்_உரிமை
    this.சாதனங்கள் = this.$கணக்கு.சாதனங்கள்

    this.கவனி(this.$கணக்கு, ['தத மாற்றம்'], (தகவல்கள்) => {
      switch (தகவல்கள்.பெயர்) {
        case "பயனாளர்பெயர்கள்":
          this.பயனாளர்_பெயர்களை_பெறு()
          break;
      }
    })
    this.கவனி(this.$கணக்கு, 'தத தயார்', () => this.பயனாளர்_பெயர்களை_பெறு())
    if (this.$கணக்கு.தத) this.பயனாளர்_பெயர்களை_பெறு()
  }
}
</script>
<style scoped>
</style>
