<template>
  <v-sheet
    elevation="12"
    class="pa-12 mx-auto mb-10" width="1200"
  >
    <v-row class="text-center">
      <v-col cols="6">
          <v-row>
            <v-col cols="4">
              <v-select
                :items="நிரல்மொழிகள்"
                v-model="நிரல்மொழி"
                :label="$t('அறிமுகம்.உதாரணம்.நிரல்_மொழி')"
                hide-no-data
                variant="outlined"
                density="compact"
                color="secondary"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="நிரல்மொழியின்_மொழிகள்"
                v-model="உள்_மொழி"
                :label="$t('அறிமுகம்.உதாரணம்.மூல்_மொழி')"
                hide-no-data
                variant="outlined"
                density="compact"
                hide-details
                color="secondary"
              > 
                <template #item="{ item, props }">
                  <mozhiPattiyalUrupadi v-bind="props" :நிரல்மொழி="நிரல்மொழி" :மொழி="item.value" />
                </template>
                <template #selection="{ item }">
                  {{ nuchabäl.rubiChabäl({runuk: item.value }) }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="உள்_நிரல்_எண்ணுரு"
                :items="எண்ணுரு_முறைமை_உருப்படிகள்"
                :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
                hide-no-data
                variant="outlined"
                density="compact"
                hide-details
              ></v-select>
            </v-col>
          </v-row>
      </v-col>
      <v-col cols="6">
          <v-row>
            <v-col cols="2">
              <v-btn icon="mdi-swap-horizontal" variant="flat" size="small" @click="()=>மொழிகளை_பறிமாறு()"/>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="நிரல்மொழியின்_மொழிகள்"
                v-model="வெள்_மொழி"
                :label="$t('அறிமுகம்.உதாரணம்.வேண்டிய_மொழி')"
                hide-no-data
                variant="outlined"
                density="compact"
                hide-details
                color="secondary"
              >
                <template v-slot:item="{ item, props }">
                  <mozhiPattiyalUrupadi v-bind="props" :நிரல்மொழி="நிரல்மொழி" :மொழி="item.value" />
                </template>
                <template #selection="{ item }">
                  {{ nuchabäl.rubiChabäl({runuk: item.value }) }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="எண்ணுரு_முறைமை_உருப்படிகள்"
                v-model="வெள்_நிரல்_எண்ணுரு"
                :label="$t('அறிமுகம்.உதாரணம்.எண்ணுரு')"
                hide-no-data
                variant="outlined"
                density="compact"
                hide-details
                color="secondary"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-dialog v-model="இனங்காட்டி_பெட்டி">
                <template #activator="{props}">
                  <v-btn v-bind="props" icon="mdi-xml" size="small" variant="outlined" />
                </template>
                <v-card :width="mdAndUp ? 500 : 300" class="mx-auto">
                  <v-card-item>
                    <v-card-title>
                      இனங்காட்டிகள்
                    </v-card-title>
                  </v-card-item>
                  <v-divider />
                  <v-card-text style="overflow-y: auto;">
                    <v-list>
                      <v-list-item v-for="இ in இனங்காட்டிகள்" :key="இ">
                        <v-row>
                          <v-col cols="6">
                            <v-text-field variant="outlined" density="compact">{{ இ[உள்_மொழி] }}</v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field variant="outlined" density="compact" @update:model-value="இ => இனங்காட்டியை_சேமி(இ)">{{ இ[வெள்_மொழி] }}</v-text-field>
                          </v-col>
                        </v-row>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
    <v-row v-if="லஸ்ஸி_தயாரானது" class="text-center mt-0">
      <v-col cols="6">
        <v-textarea
          v-model="உதாரணம்_உரை"
          v-bind:class="[உள்_உரை_எழுத்து_திசை_வகை]"
          :disabled="!உதாரணம்_உரை_தயாரானது"
          :loading="!உதாரணம்_உரை_தயாரானது"
          :no-resize="true"
          :label="$t('அறிமுகம்.உதாரணம்.உள்ளீடு')"
          :dir="உள்_உரை_வலதிலிருந்து ? 'rtl': 'ltr'"
          rows="10"
          flat
          variant="outlined"
          color="secondary"
        >
        </v-textarea>
      </v-col>
      <v-col cols="6">
        <v-textarea
          v-model="மொழியாக்கம்"
          v-bind:class="[வெள்_உரை_எழுத்து_திசை_வகை]"
          :disabled="!வெள்_உரை_தயார்"
          :loading="!வெள்_உரை_தயார்"
          :no-resize="true"
          :label="$t('அறிமுகம்.உதாரணம்.வெளியீடு')"
          :dir="வெள்_உரை_வலதிலிருந்து ? 'rtl': 'ltr'"
          rows="10"
          flat
          variant="outlined"
          color="secondary"
        >
        </v-textarea>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-if="லஸ்ஸி_கிடையாது" cols="12">
        <v-card flat class="text-center py-6">
          <v-img
           src="@/assets/ஐஸ்_வண்டி.svg"
           max-height="250"
           contain
          ></v-img>
          <h2>{{ $t('அறிமுகம்.உதாரணம்.லஸ்ஸி_கிடையாது') }}</h2>
          <p>{{ $t('அறிமுகம்.உதாரணம்.லஸ்ஸி_கிடையாது_துணை') }}</p>
        </v-card>
      </v-col>
      <v-col v-else cols="12">
        <v-card flat class="text-center py-6">
          <v-img
           src="@/assets/தென்னை_மரம்.svg"
           max-height="250"
           contain
          ></v-img>
          <h2>{{ $t('அறிமுகம்.உதாரணம்.லஸ்ஸியை_ஏற்றுகிறது') }}</h2>
        </v-card>
        <v-progress-circular
          size="50"
          indeterminate
          width="5"
          color="primary"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import mozhiPattiyalUrupadi from "./மொழி-பட்டியல்-உருப்படி.vue"
import { 
  Nuchabäl
} from 'nuchabal'
import { எண்ணிக்கை } from 'ennikkai'
import { ref, computed, watchEffect } from 'vue'
import { லஸ்ஸியை_பயன்படுத்து } from "@/plugins/லஸ்ஸி"
import {useI18n} from 'vue-i18n'
import _இனங்காட்டிகள் from './இனங்காட்டிகள்.json'
import { useDisplay } from "vuetify"
const மூல்_இனங்காட்டிகள் = _இனங்காட்டிகள் as { [மொழி: string]: string; }[] 
// https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/

const {t, locale} = useI18n();

const nuchabäl = new Nuchabäl({});
const எ = new எண்ணிக்கை({})

const { mdAndUp } = useDisplay()

// இனங்காட்டிகள்
const இனங்காட்டி_பெட்டி = ref(false);

// லஸ்ஸியின் தகவல்கள்
const { லஸ்ஸி_தயாரானது, மூல்_எண்ணுரு, லஸ்ஸி_கிடையாது, நிரல்மொழியாக்கம், மொழிகள், மூல்_மொழி, நிரல்மொழிகள் } = லஸ்ஸியை_பயன்படுத்து()
const உதாரணங்கள்: {[நிரல்மொழி: string]: string} = {
          'python': `class Circle(object):
    pi = 3.141592653
    def __init__(self, radius):
        self.radius = radius
    def circumference(self):
        return 2 * self.pi * self.radius
    def area(self):
        return self.pi * self.radius ** 2

radii = range(5)
circles = [Circle(radius=r) for r in radii]

for c in circles:
  print(c.circumference(), c.area())
  `,
          'javascript': `class Circle {
    constructor(radius) {
        this.radius = radius;
    }
  }
  `,
          'json': `{
    "list": [1,2,3.4],
    "number": 1e5,
    "nested": {
        "bool": true,
        "None": null,
        "another list": ["a", "b", "c"]
      }
  }`,
      }
const உதாரண_மூல்_குறியீடு = computed(()=>{
  return உதாரணங்கள்[நிரல்மொழி.value]
})
    
// விருப்பங்கள்
const நிரல்மொழி = ref("python");
const உள்_மொழி = ref("த");
const வெள்_மொழி = ref("en");

const நிரல்மொழியின்_மொழிகள் = மொழிகள்({நிரல்மொழி});
const நிரல்மொழியின்_மூல்மொழி = மூல்_மொழி({நிரல்மொழி});
watchEffect(()=>{
  if (நிரல்மொழியின்_மூல்மொழி.value) வெள்_மொழி.value = நிரல்மொழியின்_மூல்மொழி.value
  உள்_மொழி.value = நிரல்மொழியின்_மொழிகள்.value.includes(locale.value) ? locale.value : நிரல்மொழியின்_மொழிகள்.value[நிரல்மொழியின்_மொழிகள்.value.length - 1]
})
const மொழிகளை_பறிமாறு = () => {
  const உள்_மொழி_முன்பு = உள்_மொழி.value
  உள்_மொழி.value = வெள்_மொழி.value
  வெள்_மொழி.value = உள்_மொழி_முன்பு
  
  const உள்_எண்ணுரு_முன்பு = உள்_நிரல்_எண்ணுரு.value
  உள்_நிரல்_எண்ணுரு.value = வெள்_நிரல்_எண்ணுரு.value
  வெள்_நிரல்_எண்ணுரு.value = உள்_எண்ணுரு_முன்பு
}

const உள்_நிரல்_எண்ணுரு = ref("");
const வெள்_நிரல்_எண்ணுரு = ref("");
const நிரல்மொழி_மூல்_எண்ணுரு = மூல்_எண்ணுரு({நிரல்மொழி});

const எண்ணுரு_முறைமை_உருப்படிகள் = computed(()=>{
  return [
    {title: t('அறிமுகம்.உதாரணம்.தனிப்பட்ட'), value: ""},
    ...எ.முறைமைகள்.map(இ => ({title: இ, value :இ}))
  ]
})

const உரை = computed(()=>{
  return உதாரணம்_உரை.value
})

// லஸ்ஸி
const இனங்காட்டிகள் = ref<{ [மொழி: string]: string }[]>(மூல்_இனங்காட்டிகள்)
const {
  மொழியாக்கம்: உதாரணம்_உரை, பிழை: உள்_உரை_பிழை, தயாரானது: உதாரணம்_உரை_தயாரானது
} = நிரல்மொழியாக்கம்({
  உள்_மொழி: நிரல்மொழியின்_மூல்மொழி,
  வெள்_மொழி: உள்_மொழி,
  உரை: உதாரண_மூல்_குறியீடு,
  நிரல்மொழி,
  உள்_நிரல்_எண்ணுரு: நிரல்மொழி_மூல்_எண்ணுரு,
  வெள்_நிரல்_எண்ணுரு: உள்_நிரல்_எண்ணுரு,
  இனங்காட்டிகள்
})
const { மொழியாக்கம், பிழை, தயாரானது: வெள்_உரை_தயார் } = நிரல்மொழியாக்கம்({
  உள்_மொழி,
  வெள்_மொழி,
  உரை,
  நிரல்மொழி,
  உள்_நிரல்_எண்ணுரு,
  வெள்_நிரல்_எண்ணுரு,
  இனங்காட்டிகள்
})

// வேறு கருவிகள்
const வலதிலிருந்து = (மொழி: string): boolean => {
  const திசை = nuchabäl.rucholanemTzibanem({runuk: மொழி})
  return திசை === '←↓';
}
const எழுத்து_திசை_வகை = (மொழி: string) => {
  const திசை = nuchabäl.rucholanemTzibanem({runuk: மொழி})
  switch (திசை) {
    case '↓←':
      return 'vertical-rl'
    case '↓→':
      return 'vertical-lr'
  }
}
const உள்_உரை_வலதிலிருந்து = ref(false);
const உள்_உரை_எழுத்து_திசை_வகை = ref<'vertical-rl'|'vertical-lr'>();
watchEffect(()=>{
  if (உதாரணம்_உரை_தயாரானது.value) {
    உள்_உரை_வலதிலிருந்து.value = வலதிலிருந்து(உள்_மொழி.value)
    உள்_உரை_எழுத்து_திசை_வகை.value = எழுத்து_திசை_வகை(உள்_மொழி.value)
  }
})
const வெள்_உரை_வலதிலிருந்து = ref(false);
const வெள்_உரை_எழுத்து_திசை_வகை = ref<'vertical-rl'|'vertical-lr'>();
watchEffect(()=>{
  if (வெள்_உரை_தயார்.value) {
    வெள்_உரை_வலதிலிருந்து.value = வலதிலிருந்து(வெள்_மொழி.value);
    வெள்_உரை_எழுத்து_திசை_வகை.value = எழுத்து_திசை_வகை(வெள்_மொழி.value);
  }
})

// இனங்காட்டிகள்
const இனங்காட்டியை_சேமி = (இ: string) => {
  console.log(இ)
}

</script>

<style>
.vertical-rl textarea {
  writing-mode: vertical-rl
}

.vertical-lr textarea {
  writing-mode: vertical-lr
}
</style>