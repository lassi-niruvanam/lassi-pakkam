<template>
    <v-list-item>
        <template #prepend>
            <span class="me-2">
                <v-icon v-if="மொழி_நிறைவு === 1" color="amber accent-4">mdi-check-circle</v-icon>
                <v-progress-circular v-else
                    :model-value="மொழி_நிறைவு * 100"
                    size="20"
                    color="primary"
                ></v-progress-circular>
            </span>

        </template>
        <template #title>{{ மொழி_பெயர் }}</template>
    </v-list-item>
</template>
<script setup lang="ts">
import { லஸ்ஸியை_பயன்படுத்து } from '@/plugins/லஸ்ஸி';
import { கிளிமூக்கை_பயன்படுத்து } from '@lassi-js/kilimukku-vue';

const props = defineProps<{நிரல்மொழி: string, மொழி: string}>();

const { கிடைக்கும்_மொழிகளை_பயன்படுத்து } = கிளிமூக்கை_பயன்படுத்து();
const {மொழியின்_பெயர், } = கிடைக்கும்_மொழிகளை_பயன்படுத்து({});

const மொழி_பெயர் = மொழியின்_பெயர்(props.மொழி)

const { நிறைவு } = லஸ்ஸியை_பயன்படுத்து();

const மொழி_நிறைவு = நிறைவு({
    நிரல்மொழி: props.நிரல்மொழி,
    மொழி: props.மொழி
})
</script>