<template>
  <v-container class="mt-10">
    <v-card
      class="mx-auto pa-5"
      max-width="1500"
      outlined
    >
      <v-toolbar class="mb-5" flat>
        <v-img
          tile class="ma-2" width="35"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg">
        </v-img>
        <v-list-item-title class="display-1 mb-1">{{ $route.params.niralmozhi }}</v-list-item-title>
        <v-autocomplete
          :items="langues"
          v-model="niral_mozhi"
          :label="'மூல் மொழி'"
          class="mx-5"
          cache-items
          hide-no-data
          outlined
          dense
          color="amber accent-4"
          item-color="amber accent-4"
          hide-details
        ></v-autocomplete>
        <v-autocomplete
          :items="langues"
          v-model="niral_mozhi"
          :label="'மொழியாக்க மொழி'"
          class="mx-5"
          cache-items
          hide-no-data
          outlined
          dense
          color="amber accent-4"
          item-color="amber accent-4"
          hide-details
        ></v-autocomplete>
      </v-toolbar>
      <v-divider/>
      <v-row>
        <v-col cols="6">
          <v-toolbar class="mb-5" flat>
            <v-row>
              <v-col cols=4 class="pl-0">
                <v-autocomplete
                  :items="['எல்லாம்', 'பரிந்துரை', 'உருதிப்படுத்தப்பட்டது']"
                  v-model="niral_mozhi"
                  :label="'நிலை'"
                  class="mx-5"
                  cache-items
                  hide-no-data
                  outlined
                  dense
                  color="amber accent-4"
                  item-color="amber accent-4"
                  hide-details
                ></v-autocomplete>
              </v-col>
              <v-col cols=4 class="pl-0">
                <v-autocomplete
                  :items="langues"
                  v-model="niral_mozhi"
                  :label="'மொழியாக்க மொழி'"
                  class="mx-5"
                  cache-items
                  hide-no-data
                  outlined
                  dense
                  color="amber accent-4"
                  item-color="amber accent-4"
                  hide-details
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-card
           class="overflow-y-auto"
           flat
           max-height="400"
          >
            <v-card
             v-for="(règle, i) in règles"
             :key="i"
             outlined
             min-height="150"
             class="ma-5"
            >
            <v-card-title>
              <v-icon>mdi-check-bold</v-icon>
              {{ règle }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle>{{ règle }}</v-card-subtitle>
            </v-card>
          </v-card>
        </v-col>
        <v-col cols="6">def</v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { obt_langues } from '../nuchabal/nuchabal'
import lassi from '../lassi/lassi'

export default {
  name: 'நிரல்மொழி',
  computed: {
    langues: () => {return obt_langues()},
    règles: function () {
      const langage = this.$route.params.niralmozhi

      return lassi.infos[langage]["grammaire"]
    },
    trads: () => {

    }
  },
  data: function() {
    return {
    }
  }
}
</script>

<style>

</style>
