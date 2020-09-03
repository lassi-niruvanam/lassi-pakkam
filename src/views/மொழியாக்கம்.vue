<template>
  <v-container class="mt-10">
    <v-card
      class="mx-auto pa-5"
      max-width="1500"
      outlined
    >
      <v-toolbar class="mb-5" flat>
        <v-col cols="6">
          <v-col cols="4" class="px-0">
            <v-autocomplete
              v-model="mul_mozhi"
              :items="langues"
              :label="'மூல் மொழி'"
              cache-items
              hide-no-data
              outlined
              dense
              color="amber accent-4"
              item-color="amber accent-4"
              hide-details
            >
              <template v-slot:item="{ item }">
                <v-list-item-avatar>
                  <v-icon v-if="niraivu(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                  <v-progress-circular v-else
                    :value="niraivu(item) * 100"
                    size="20"
                    rotate="270"
                    color="amber accent-4"
                  ></v-progress-circular>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-col>
        <v-col cols="6">
          <v-col cols="4" class="px-0">
            <v-autocomplete
              v-model="mozhiyakka_mozhi"
              :items="langues"
              :label="'மொழியாக்க மொழி'"
              cache-items
              hide-no-data
              outlined
              dense
              color="amber accent-4"
              item-color="amber accent-4"
              hide-details
            >
              <template v-slot:item="{ item }">
                <v-list-item-avatar>
                  <v-icon v-if="niraivu(item) === 1" color="amber accent-4">mdi-check-circle</v-icon>
                  <v-progress-circular v-else
                    :value="niraivu(item) * 100"
                    size="20"
                    rotate="270"
                    color="amber accent-4"
                  ></v-progress-circular>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-col>
      </v-toolbar>
      <v-divider/>
      <v-row>
        <v-col cols="12">
          <v-card
           class="overflow-y-auto"
           flat
           max-height="400"
          >
            <v-row
             v-for="(clef, i) in clefs"
             :key="i"
             class="px-5"
            >
              <v-col cols="6">
                <v-card
                 outlined
                 color="white"
                 min-height="150"
                >
                  <v-textarea
                   :value="texte( clef, mul_mozhi )"
                   color="amber"
                   readonly
                   :hint="texte( clef, 'தமிழ்' )"
                   outlined no-resize
                  >
                  </v-textarea>
                  <v-card-subtitle>{{ clef }}</v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card
                 outlined
                 color="white"
                 min-height="150"
                >
                  <v-textarea
                   :value="texte( clef, mozhiyakka_mozhi )"
                   :append-icon="texte( clef, mozhiyakka_mozhi ) ? 'mdi-check': null"
                   color="amber"
                   outlined no-resize
                   hide-details
                  >
                  </v-textarea>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon><v-icon>mdi-undo</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-content-copy</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-check</v-icon></v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { மொழி_மேலாண்மை } from '../plugins/vuetify'

export default {
  name: "மொழியாக்கம்",
  computed: {
    clefs: () => மொழி_மேலாண்மை.சாபிகள்(),
    langues: () => மொழி_மேலாண்மை.மொழிகள்
  },
  methods: {
    texte: function (clef, langue) {
      return மொழி_மேலாண்மை.உரை(clef, langue) || மொழி_மேலாண்மை.உரை(clef, மொழி_மேலாண்மை.இயல்புநிலை)
    },
    niraivu: (item) => மொழி_மேலாண்மை.மேம்பாடு[item]
  },
  data: () => ({
    mul_mozhi: 'தமிழ்',
    mozhiyakka_mozhi: 'français'
  })

}
</script>

<style>

</style>
