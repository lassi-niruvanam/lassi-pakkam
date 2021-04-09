<template>

  <v-footer app padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ உரைக்கு(new Date().getFullYear()) }} — <strong>{{ $t('லஸ்ஸி') }} </strong>
      <!-- <router-link :to='encodeURI("/விதிமுறைகள்")' style="color: #000000">
        விதிமுறைகள்
      </router-link> -->
    </v-col>
  </v-footer>

</template>

<script>
import uraikku from '../ennikkai/ennikkai'
import { எண்ணுரு } from '../nuchabal/nuchabal'

export default {
  name: 'Footer',
  methods: {
    உரைக்கு: function (எண்) {
      return uraikku(எண், எண்ணுரு(this.$i18n.locale))
    }
  },
  data: () => ({
  })
};
</script>
