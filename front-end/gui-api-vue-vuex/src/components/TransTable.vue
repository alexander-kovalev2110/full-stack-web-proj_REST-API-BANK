<template>
  <div>
    <v-table density="compact">
      <colgroup>
        <col style="width: 20%;">
        <col style="width: 20%;">
        <col style="width: 60%;">
      </colgroup>

      <thead>
        <tr>
          <th class="text-left"><b>TransactionId</b></th>
          <th class="text-left"><b>Amount</b></th>
          <th class="text-left"><b>Date</b></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in tabAr" :key="index">
          <td>{{ item.transactionId }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-divider class="my-2"/>

    <v-row class="mt-4 ml-4" align="center">
      <v-btn
        variant="outlined"
        color="primary"
        :disabled="previousDisabled"
        @click="() => store.commit('previousPage')"
        prepend-icon="mdi-chevron-left"
      >
        Previous
      </v-btn>

      <v-btn
        variant="outlined"
        color="primary"
        :disabled="nextDisabled"
        @click="() => store.commit('nextPage')"
        prepend-icon="mdi-chevron-right"
        class="ml-2"
      >
        Next
      </v-btn>
    </v-row>
  </div>    
</template>

<script setup>
import store from '@/store'
import { computed } from 'vue'

const tabAr = computed(() => store.state.transMod.tabAr)
const previousDisabled = computed(() => store.state.transMod.previousDisabled)
const nextDisabled = computed(() => store.state.transMod.nextDisabled)
</script>
  