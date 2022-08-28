<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">TransactionId</th>
        <th scope="col">Amount</th>
        <th scope="col">Date</th>
      </tr>
    </thead>
    <tbody id="db_tab" v-for="(row, ind) in rows">
        <tr key={ind}>
          <td>{{row.transactionId}}</td>
          <td>{{row.amount}}</td>
          <td>{{row.date}}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import store from "@/store"
export default {
  name: "Table",
  computed: {
    ...mapGetters({
      db: 'getTrans',
      offset: 'getOffset',
      page: 'getPage'
    }),
    rows() {
      const {db, offset, page} = this
      return db.filter((el, index) => ((index >= offset) && (index < offset + page)))
    }
  },
  watch: {
    db() {
      store.commit('resetOffset')}
  }
}
</script>
