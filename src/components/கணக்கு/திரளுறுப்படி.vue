<template>
  <v-list-item>
    <v-badge
      :bordered="!இணைந்துகொண்டிருக்கிறது"
      :dot="!இணைந்துகொண்டிருக்கிறது && நிலை !== 'idle'"
      :avatar="நிலை === 'idle'"
      :color="நிறம்"
      :icon="நிலை === 'idle' ? 'mdi-timer-sand' : undefined"

      bottom offset-x="27" offset-y="17"
      transition="slide-x-transition"
    >
      <template v-slot:badge v-if="இணைந்துகொண்டிருக்கிறது">
        <v-progress-circular size="10" width="2" indeterminate color="warning"></v-progress-circular>
      </template>
      <v-list-item-avatar color="amber">
        <span class="white--text">{{ uruppadi.கூடபணியாளர்பெயர் }}</span>
      </v-list-item-avatar>
    </v-badge>
    <v-list-item-content>
      {{ uruppadi.கூடபணியாளர்பெயர் === '?' ? 'தெரியாதவர்' : uruppadi.கூடபணியாளர்பெயர் }}
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon color="error" @click="$emit('nikku')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'திரளுறுப்படி',
  props: ['uruppadi'],
  computed: {
    நிலை: function() {
      return this.uruppadi.நிலை
    },
    இணைந்துகொண்டிருக்கிறது: function() {
      return ['connecting', 'synchronizing', 'negotiating'].includes(this.நிலை)
    },
    நிறம்: function() {
      switch (this.நிலை) {
        case 'idle':
          return 'yellow'
        case 'connected':
          return 'green'
        case 'disconnected':
          return 'error'
        default:
          return 'white'
      }
    }
  }
}
</script>

<style>

</style>
