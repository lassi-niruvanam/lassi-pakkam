<template>
  <v-row
   class="px-5"
   @click="terndedu(clef)"
  >
    <v-col cols="12">
      <v-divider/>
      <v-row>
        <v-col cols="6">
          <v-card class="pa-2"
           outlined
          >
            <p>{{mul_urai}}</p>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card flat>
            <v-text-field
             v-model="urai"
             color="amber"
             outlined
             hide-details
            >
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
               :disabled="!mattrapattadu"
               icon
               @click="nikku()"
              >
                <v-icon>mdi-undo</v-icon>
              </v-btn>
              <v-btn
               icon
               @click="nagaledu()"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
              <v-btn
               :disabled="!mattrapattadu"
               icon
               @click="parinduraiyu()"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-slide-y-transition>
      <v-col v-if="terndedukkappattadu" cols="12">

        <v-tabs color="amber">
          <v-tab :ripple="false">பரிந்துரைகள் (2)</v-tab>
          <v-tab :ripple="false">மொழியாக்க நினைவகம்</v-tab>
          <v-tab-item>

            <v-card flat v-for="i in [1,2]" :key="i">
              <v-divider/>
              <v-row>
                <v-col cols="12">
                  <v-icon>mdi-account</v-icon>
                  ஆ-ம ஜூலீஎன்
                  <span>17-12-2020</span>

                  <v-btn icon>
                    <v-icon>mdi-comment</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं संगणक की भाषाएं
                </v-col>
                <v-col cols="12">

                  <v-btn icon>
                    <v-icon>mdi-check</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
          <v-tab-item></v-tab-item>
        </v-tabs>

      </v-col>
    </v-slide-y-transition>
  </v-row>
</template>

<script>

export default {
  name: "mozhiyakkamporul",
  props: ['clef', 'mozhiyakka_mozhi', 'mul_mozhi', 'mul_urai', 'mul_mozhiyakkam', 'terndedukkappattadu'],
  data: function () {
    return {
      urai: this.mul_mozhiyakkam,
      pona_urai: this.mul_mozhiyakkam,
      parinduraikal: []
    }
  },
  methods: {
    terndedu: function () {
      this.$emit('terndedu', this.clef)
    },
    parinduraiyu: function () {
      this.pona_urai = this.urai
      this.$emit('parinduraiyu', { சாபி: this.clef, உரை: this.urai.trim() } )
    },
    nagaledu: function () {
      this.urai = this.mul_urai
    },
    nikku: function () {
      this.urai = this.mul_mozhiyakkam
    }
  },
  computed: {
    mattrapattadu: function() {
      return this.pona_urai.trim() !== this.urai.trim()
    }
  },
  watch: {
    mul_mozhiyakkam: function() {
      this.urai = this.mul_mozhiyakkam
    }
  }
}
</script>

<style>

</style>
