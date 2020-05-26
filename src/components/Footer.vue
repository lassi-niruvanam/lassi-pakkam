<template>

  <v-footer app padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ uraikku(new Date().getFullYear()) }} — <strong>லஸ்ஸி</strong>
    </v-col>
  </v-footer>

</template>

<script>
import uraikku from '../ennikkai/ennikkai'

export default {
  name: 'Footer',
  methods: {
    uraikku: function (en) {
      console.log(en)
      return uraikku(en, this.$i18n.locale)
    }
  },
  data: () => ({
  })
};
</script>
