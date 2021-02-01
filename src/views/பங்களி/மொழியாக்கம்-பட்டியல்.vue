<template>
  <v-list style="max-height: 70vh" class="overflow-y-auto">
    <v-list-item-group v-model="தேர்ந்தேடுக்கப்பட்டது" color="amber lighten-2">
      <template v-for="(உரை, இ) in uraipattiyal">
        <v-list-item
         class="mb-2 py-2" :key="உரை.சாபி" :value="உரை.சாபி"
        >
          <v-row>
            <v-col cols="6" :dir="வலதிலிருந்து(உரை.மூல்மொழி) ? 'rtl': 'ltr'">
              <v-card
               height="100" class="overflow-y-auto px-2"
               outlined
              >{{உரை.மூலுரை}}</v-card>
            </v-col>
            <v-col cols="6" :dir="வலதிலிருந்து(உரை.வேண்டியமொழி) ? 'rtl': 'ltr'">
              <v-card
               height="100" class="overflow-y-auto px-2"
               outlined
              >{{உரை.மொழியாக்கம்}}</v-card>
            </v-col>
            <v-col cols="12"><v-list-item-subtitle>{{உரை.சாபி}}</v-list-item-subtitle></v-col>
          </v-row>
        </v-list-item>
        <v-divider :key="இ"/>

      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { வலதிலிருந்து } from '../../nuchabal/nuchabal'

export default {
  name: 'மொழியாக்கம்பட்டியல்',
  props: ['uraipattiyal'],
  data: function () {
    return {
      தேர்ந்தேடுக்கப்பட்டது: null
    }
  },
  watch: {
    தேர்ந்தேடுக்கப்பட்டது: function () {
      this.$emit('terndedu', this.தேர்ந்தேடுக்கப்பட்டது)
    }
  },
  methods: {
    வலதிலிருந்து
  }
}
</script>

<style>

</style>
