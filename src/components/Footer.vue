<template>

  <v-footer app padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ uraikku(new Date().getFullYear()) }} — <strong>{{ $t('லஸ்ஸி') }}</strong>
    </v-col>
  </v-footer>

</template>

<script>
import uraikku from '../ennikkai/ennikkai'
import { எண்ணுரு } from '../nuchabal/nuchabal'

export default {
  name: 'Footer',
  methods: {
    uraikku: function (en) {
      return uraikku(en, எண்ணுரு(this.$i18n.locale))
    }
  },
  data: () => ({
  })
};
</script>
