<template>
  <v-app>
    <app-navigation></app-navigation>
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppNavigation from './components/AppNavigation';
import AppFooter from './components/Footer';

export default {
  name: 'App',

  components: {
    AppNavigation, AppFooter
  },

  data: () => ({

  }),
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
