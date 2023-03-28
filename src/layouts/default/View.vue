<template>
  <div>
    <default-bar />
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
</script>
