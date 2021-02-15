<template>
  <v-list style="max-height: 70vh" class="overflow-y-auto">
    <v-list-item-group v-model="தேர்ந்தேடுக்கப்பட்டது" color="amber darken-1">
      <template v-for="(உரை, இ) in uraipattiyal">
        <v-list-item :key="உரை.சாபி" :value="உரை.சாபி"
         :dir="வலதிலிருந்து(உரை.மூல்மொழி) ? 'rtl': 'ltr'"
        >
          <v-list-item-content>
            {{உரை.மூலுரை.slice(0, 50) + (உரை.மூலுரை.length > 50 ? "..." : '')}}
            <v-list-item-subtitle>{{உரை.சாபி}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon  v-if="உரை.மொழியாக்கம்" color="amber">mdi-check-bold</v-icon>
          </v-list-item-action>

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
