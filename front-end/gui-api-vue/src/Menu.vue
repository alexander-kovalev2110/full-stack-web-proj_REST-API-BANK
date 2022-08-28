<template>
    <ul class="nav justify-content-end">
      <div v-for="(row, index) in menu">
        <li key={index}>
          <a class="nav-link" :class="menuClass(index)"
             @click="$store.commit('setIndex', index)" >{{row.title}}</a>
        </li>
      </div>
    </ul>
</template>

<script>
import serv_data from './services/serv_data'
import { mapGetters } from 'vuex'
export default {
  name: "Menu",
  data() {
    return {
      menu: serv_data
    }
  },
  computed: {
    ...mapGetters({
      customerId : 'getCustomer'
    })
  },
  methods: {
    menuClass(index) {
       return (
           ((index < 2) || (this.customerId)) ? "act" : "disact"
       )
    }
  }
}
</script>

<style>
  .act {
    font-weight: bold;
    pointer-events: auto;
  }
  .disact {
    font-weight: normal;
    pointer-events: none;
  }
</style>