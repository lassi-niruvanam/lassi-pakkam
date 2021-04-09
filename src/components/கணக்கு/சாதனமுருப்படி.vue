<template>
  <span>
    <v-list-item>
      <v-list-item-avatar>
        <v-img
         :src="require('../../assets/உன்றா-கணினி-கைபேசி.svg')"
         max-height="30"
         contain
         class="ma-10"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ sadanam.deviceName }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="இந்த_சாதனம்">
          <v-icon small color="success">mdi-check</v-icon>
          இந்த சாதானம்
        </v-list-item-subtitle>
        <v-list-item-subtitle v-else v-text="sadanam.type === 'other' ? 'காகித சாபி': 'சாதனம்'"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon color="error">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider/>
  </span>
</template>

<script>

export default {
  name: 'சாதனமுருப்படி',
  props: ['sadanam'],
  computed: {
    இந்த_சாதனம்: function() {
      return this.$கணக்கு.சாதனம்.deviceName === this.sadanam.deviceName
    }
  }
}
</script>

<style>

</style>
