<template>
    <v-table density="compact" fixed-header>
        <thead>
            <th class="text-left"><b>TransactionId</b></th>
            <th class="text-left"><b>Amount</b></th>
            <th class="text-left"><b>Date</b></th>
        </thead>
        <tbody>
            <tr v-for="(item, index) in $store.state.transMod.transactions" :key="index">
                <td>{{item.transactionId}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.date}}</td>
            </tr>
        </tbody>
    </v-table>

</template>
  
<script setup>
// import store from '@/store'
// const tabAr = store.state.transMod.transactions

// console.log(tabAr)
</script>
  