<template>
  <v-subheader>
    <v-row class="d-flex justify-center mt-2">
      <v-col cols="4">
        <v-text-field
         v-model="மின்னஞ்சல்"
         placeholder='உங்கள் மின்னஞ்சல்'
         outlined dense
         color="amber darken-2"
         @blur="மின்னஞ்சல்_சேமி()"
        >
          <v-icon
            slot="prepend"
          >
            mdi-email
          </v-icon>
        </v-text-field>
      </v-col>
    </v-row>

  </v-subheader>
</template>

<script>
export default {
  name: 'மின்னஞ்சல்',
  props: ['tuvakkaminnancal'],
  data: function () {
    return {
      மின்னஞ்சல்: this.tuvakkaminnancal
    }
  },
  watch: {
    tuvakkaminnancal: function() {
      this.மின்னஞ்சல் = this.tuvakkaminnancal
    }
  },
  methods: {
    மின்னஞ்சல்_சேமி: function() {
      const மின்னஞ்சல் = this.மின்னஞ்சல்.trim()
      if (மின்னஞ்சல் && மின்னஞ்சல் !== this.tuvakkaminnancal) {
        this.$கணக்கு.தத.பயனாளர்_மின்னஞ்சல் = மின்னஞ்சல்
      }
    }
  }
}
</script>

<style>

</style>
