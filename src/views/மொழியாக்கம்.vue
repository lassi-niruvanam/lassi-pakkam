<template>
  <v-container class="mt-10">
    <v-card
      class="mx-auto pa-5"
      max-width="1500"
      outlined
    >
      <v-toolbar class="mb-5" flat>
        <v-col cols="6">
          <v-col cols="2">
            <v-autocomplete
              :items="langues"
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
          </v-col>
          <v-col cols="2">
            <v-autocomplete
              :items="langues"
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
        </v-col>
      </v-toolbar>
      <v-divider/>
      <v-row>
        <v-col cols="6">
          <v-toolbar class="mb-5" flat>
            <v-row>
              <v-col cols=4 class="pl-0">
                <v-autocomplete
                  :items="['எல்லாம்', 'பரிந்துரை', 'உருதிப்படுத்தப்பட்டது']"
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
                  :label="'மொழியாக்க மொழி'"
                  v-model="mul_mozhi"
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
             v-for="(clef, i) in clefs"
             :key="i"
             outlined
             min-height="150"
             class="ma-5"
            >
            <v-card-title>
              <v-icon>mdi-check-bold</v-icon>
              {{ texte( clef, mul_mozhi ) }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle>{{ clef }}</v-card-subtitle>
            </v-card>
          </v-card>
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { மொழி_மேலாண்மை } from '../plugins/vuetify'

export default {
  name: "மொழியாக்கம்",
  computed: {
    clefs: () => ['a', 'b','c'],
    langues: () => மொழி_மேலாண்மை.மொழிகள்
  },
  methods: {
    texte: function (clef, langue) {
      console.log('ici')
      console.log(மொழி_மேலாண்மை.மொழிகள்)
      return மொழி_மேலாண்மை.உரை(clef, langue)
    }
  },
  data: () => ({
    mul_mozhi: 'தமிழ்'
  })

}
</script>

<style>

</style>
