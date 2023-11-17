<template>
  <v-list-item
    @click="() => மொழிகளை_தேர்ந்தெடுக்கொள்ளு(kuriyitu)"
  >
    <template #prepend>
      <v-icon
        v-if="terntetuttappattatu"
        color="primary"
      >
        mdi-check-bold
      </v-icon>
    </template>

    <template #title>
      {{ மொழி_பெயர் || kuriyitu }}
    </template>

    <template #append>
      <v-icon
        v-if="முன்னேற்றம் === 1"
        color="primary"
      >
        mdi-check-circle
      </v-icon>
      <v-progress-circular
        v-else
        :model-value="முன்னேற்றம் * 100"
        size="20"
        color="primary"
      ></v-progress-circular>
    </template>
  </v-list-item>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import { கிளிமூக்கை_பயன்படுத்து , மொழிகளைப்_பயன்படுத்து} from "@lassi-js/kilimukku-vue";

const சொத்துகள் = defineProps<{kuriyitu: string; terntetuttappattatu: boolean}>();


const { மொழி_முன்னேற்றத்தை_பயன்படுத்து, கிடைக்கும்_மொழிகளை_பயன்படுத்து } = கிளிமூக்கை_பயன்படுத்து();
const {மொழியின்_பெயர், } = கிடைக்கும்_மொழிகளை_பயன்படுத்து({});
const {மொழிகளை_தேர்ந்தெடுக்கொள்ளு} =மொழிகளைப்_பயன்படுத்து()
const { மொழி_முன்னேற்றம் } = மொழி_முன்னேற்றத்தை_பயன்படுத்து({மொழி: சொத்துகள்.kuriyitu})

const முன்னேற்றம் = computed(()=>{
  const மொத்தம் = மொழி_முன்னேற்றம்.value?.மொத்தம் || 0
  return (மொழி_முன்னேற்றம்.value?.அங்கீகரிக்கப்பட்டவை || 0)/ மொத்தம்
})


const மொழி_பெயர் = மொழியின்_பெயர்(சொத்துகள்.kuriyitu);

</script>
