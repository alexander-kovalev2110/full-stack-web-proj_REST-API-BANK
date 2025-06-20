<template>
  <v-toolbar class="d-flex" color="primary">  
    <v-toolbar-title>REST-API-BANK</v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="text-h6">{{ customerId ? `Customer ${customerId}` : '' }}</div>
    
    <v-spacer></v-spacer>

    <v-btn color="white" prepend-icon="mdi-login" variant="outlined" class="me-2"
      @click="() => store.commit('openAuthor', 'GET')">Login</v-btn>

    <v-btn color="white" prepend-icon="mdi-account-plus" variant="outlined" class="me-6"
      @click="() => store.commit('openAuthor', 'POST')">Signup</v-btn>
  </v-toolbar>

  <AuthorDialog/>
</template>

<script setup>
import { computed } from 'vue'
import store from '@/store'
import AuthorDialog from "@/components/AuthorDialog.vue"

const customerId = computed(() => store.state.customerMod.customerId)
</script>
