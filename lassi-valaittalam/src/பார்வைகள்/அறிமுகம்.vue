<template>
  <v-container fluid class="mt-10">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="@/assets/லஸ்ஸி.svg"
          class="my-3"
          height="250"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t('அறிமுகம்.தலைப்பு') }}
        </h1>
        <v-card flat class="mx-auto" max-width="380">
          <p class="subheading font-weight-regular">
            {{ $t('அறிமுகம்.துணைத்தலைப்பு') }}
          </p>
        </v-card>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t('அறிமுகம்.எதற்கு') }}
        </h2>

        <v-card flat class="mx-auto" max-width="550">
          <p class="subheading font-weight-regular">
            {{ $t('அறிமுகம்.எதற்கு_பதில்') }}
          </p>
        </v-card>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t('அறிமுகம்.எப்படி') }}
        </h2>

        <v-card flat class="mx-auto" max-width="550">
          <p class="subheading font-weight-regular">
            {{ $t('அறிமுகம்.எப்படி_பதில்') }}
          </p>
        </v-card>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          {{ $t('அறிமுகம்.செயலில்') }}
        </h2>

        <v-card flat class="mx-auto" max-width="550">
          <p class="subheading font-weight-regular">
            {{ $t('அறிமுகம்.செயலில்_விவரம்') }}
          </p>
        </v-card>
      </v-col>

      <lassi-udaranam/>

    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import lassiUdaranam from '@/components/லஸ்ஸி-உதாரணம்.vue';

</script>

<style>
::selection {
  background: #FFECB3;
  color: #000;
  text-shadow: none;
}

</style>
