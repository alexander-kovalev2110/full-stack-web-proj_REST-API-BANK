<template>
  <!-- <v-card> -->
    <v-app>

      <v-app-bar>
        <NavBar />
      </v-app-bar>

      <v-navigation-drawer
              v-model="drawer"
              location="left"
      >
        <v-list v-for="(com, index) in commands" :key="index">
          <v-list-item  @click="store.commit('openTransDialog'), 
                                store.commit('setCommand', com)"
          >{{ com }}</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex" style="min-height: 300px;">
        <TransTable />
      </v-main>

    </v-app> 
  <!-- </v-card> -->

  <TransDialog />
</template>

<script setup>
import NavBar from "@/components/NavBar.vue"
import TransTable from "@/components/TransTable.vue"
import TransDialog from "@/components/TransDialog.vue"
import store from '../store'
const drawer = true

const commands = [
                    'Add Transaction',
                    'Get Transaction',
                    'Get Transaction by Filter',
                    'Update Transaction',
                    'Delete Transaction'
                  ]
</script>
