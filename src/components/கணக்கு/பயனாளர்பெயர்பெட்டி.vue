<template>
  <v-card max-width="500">
    <v-card-title>
      சர்வதேச பெயர்கள் உள்ளிடுங்கள்
    </v-card-title>
    <v-card-subtitle>
      பயனாளர் அடையாளம் மாற்ற முடியாது என்றாலும், பெயர் மொழியாக்கம் உள்ளிடலாம்.
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-list-item>

      <v-list-item-content>
        <v-row>
          <v-col cols="4">
            <v-select
              label="மொழி" color="amber"
              v-model="புதுபெயர்மொழி"
              outlined dense hide-details offset-x
              :items="இருக்கும்_மொழிகள்.filter((மொழி)=>{return !Object.keys(peyarkal).includes(மொழி)})"
            ></v-select>
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="புதுபெயர்"
              label="உங்கள் பெயர்" color="amber"
              :dir="வலதிலிருந்து(புதுபெயர்மொழி) ? 'rtl': 'ltr'"
              outlined dense hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn
         icon color="success"
         :disabled="!புதுபெயர்மொழி || !புதுபெயர்"
         @click="seru(புதுபெயர்மொழி, புதுபெயர்)"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider/>
    <v-list style="max-height: 300px" class="overflow-y-auto">

      <payanalarpeyar
       v-for="(பெயர், மொழி) in peyarkal"
       :key="மொழி"
       :tuvakkampeyar="பெயர்"
       :tuvakkammozhi="மொழி"
       @semi="mattram"
       @nikku="nikku"
      >
      </payanalarpeyar>

    </v-list>
  </v-card>
</template>

<script>
import { வலதிலிருந்து, obt_langues } from '../../nuchabal/nuchabal'
import payanalarpeyar from './பயனாளர்பெயர்'

export default {
  name: 'பயனாளர்பெயர்பெட்டி',
  components: { payanalarpeyar },
  props: ['peyarkal'],
  data: function () {
    return {
      புதுபெயர்மொழி: '',
      புதுபெயர்: ''
    }
  },
  computed: {
    இருக்கும்_மொழிகள்: () => {return obt_langues()}
  },
  methods: {
    seru (மொழி, பெயர்) {
      this.புதுபெயர்மொழி = this.புதுபெயர் = ''
      this.$கணக்கு.அடையாளம்.பயனாளர்_பெயர்_சேரு(மொழி, பெயர்)
    },
    mattram (மொழி, பெயர்) {
      this.$கணக்கு.அடையாளம்.பயனாளர்_பெயர்_சேரு(மொழி, பெயர்)
    },
    nikku(மொழி) {
      this.$கணக்கு.அடையாளம்.பயனாளர்_பெயர்_நீக்கு(மொழி)
    },
    வலதிலிருந்து: function(langue) {
      return வலதிலிருந்து(langue)
    }
  }
}
</script>

<style>

</style>
