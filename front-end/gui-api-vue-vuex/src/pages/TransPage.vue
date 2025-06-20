<template>
  <v-app>

    <v-app-bar app>
      <NavBar />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="left"
      app
      width="240"
      permanent
    >
      <v-list density="compact">
        <v-list-item
          v-for="(command, index) in transactionCommands"
          :key="index"
          density="compact"
          @click="() => {
            store.commit('openTrans');
            store.commit('setCommand', command);
          }"
        >
          {{ command }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex" app>
      <TransTable />
    </v-main>

    <TransDialog />

  </v-app> 
</template>

<script setup>
import { ref } from 'vue'
import NavBar from "@/components/NavBar.vue"
import TransTable from "@/components/TransTable.vue"
import TransDialog from "@/components/TransDialog.vue"
import store from '../store'
const drawer = ref(true)

const transactionCommands = [
  'Add Transaction',
  'Get Transaction',
  'Get Transaction by Filter',
  'Update Transaction',
  'Delete Transaction'
]
</script>
