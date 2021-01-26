<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img
       :src="require(sadanam.type === 'other' ? '../../assets/உன்றா-காகிதம்.svg': '../../assets/உன்றா-கணினி-கைபேசி.svg')"
       max-height="30"
       contain
       class="ma-10"
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ sadanam.deviceId.slice(0, 20) }}...
      </v-list-item-title>
      <v-list-item-subtitle v-if="$கணக்கு.பயனாளர்.device.keys.name === sadanam.deviceId">
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
</template>

<script>

export default {
  name: 'சாதனமுருப்படி',
  props: ['sadanam']
}
</script>

<style>

</style>
