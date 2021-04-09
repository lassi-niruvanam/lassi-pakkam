<template>
  <v-list-item-avatar color="amber darken-1" class="mb-auto">
    <v-img v-if="padam" :src="padam" contain></v-img>
    <span v-else-if="peyar" class="white--text">{{peyar.slice(0, 2)}}</span>
  </v-list-item-avatar>
</template>

<script>
export default {
  name: 'பயனாளர்-படம்',
  props: ['peyar', 'padam']
}
</script>

<style>

</style>
