<template>
  <v-list-item>

    <v-list-item-content>
      <v-row>
        <v-col cols="4">
          <v-select
            color="amber"
            outlined dense hide-details
            v-model="மொழி"
            :items="இருக்கும்_மொழிகள்"
          ></v-select>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="பெயர்"
            color="amber"
            outlined dense hide-details
            :dir="வலதிலிருந்து(மொழி) ? 'rtl': 'ltr'"
            @blur="சேமி()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon color="error">
        <v-icon @click="நீக்கு()">mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { வலதிலிருந்து, obt_langues } from '../../nuchabal/nuchabal'

export default {
  name: 'பயனாளர்பெயர்',
  props: ['tuvakkammozhi', 'tuvakkampeyar'],
  data: function () {
    return {
      மொழி: '',
      பெயர்: ''
    }
  },
  computed: {
    இருக்கும்_மொழிகள்: () => {return obt_langues()}
  },
  methods: {
    சேமி: function() {
      if (this.மொழி === this.tuvakkammozhi && this.பெயர் === this.tuvakkampeyar) return
      if (this.மொழி !== this.tuvakkammozhi) this.$emit('nikku', this.மொழி)
      if (this.பெயர் === '') {
        this.நீக்கு()
      } else {
        this.$emit('semi', this.மொழி, this.பெயர்)
      }
    },
    நீக்கு: function() {
      this.$emit('nikku', this.மொழி)
    },
    வலதிலிருந்து: function(langue) {
      return வலதிலிருந்து(langue)
    }
  },
  mounted: function() {
    this.மொழி = this.tuvakkammozhi
    this.பெயர் = this.tuvakkampeyar
  }
}
</script>

<style>

</style>
