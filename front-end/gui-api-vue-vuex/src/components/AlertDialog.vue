<template>
  <v-snackbar
    v-model="store.state.alertMod.alertOpen"
    timeout="6000"
    location="bottom left" 
    color="error"
    elevation="8"
    style="margin-left: 16px; margin-bottom: 16px"
  >
    {{ store.state.alertMod.errMessage }}
    <template #actions>
      <v-btn icon @click="store.commit('closeAlert')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import store from '@/store'
</script>
