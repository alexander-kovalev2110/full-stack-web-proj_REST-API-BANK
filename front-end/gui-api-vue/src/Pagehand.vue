<template>
  <div class="row">

    <!-- Go to next/previous page - Buttons: "Previous"/"Next" -->
    <div class="col-sm-6">
      <ul class="pager" >
        <li><a @click="$store.commit('previousPage')">&#9650;&nbsp;&nbsp; Previous</a></li>
        <li><a @click="$store.commit('nextPage')">&#9660;&nbsp;&nbsp; Next</a></li>
      </ul>
    </div>

    <!-- Page size setting - Radio buttons -->
    <div class="col-sm-6" >
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="rad1"
               @change="$store.commit('setPage', PAGE1)" :checked="page === PAGE1" />
        <label class="form-check-label" for="rad1">&nbsp; Page=5</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="rad2"
               @change="$store.commit('setPage', PAGE2)" :checked="page === PAGE2" />
        <label class="form-check-label" for="rad2">&nbsp; Page=10</label>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PAGE1, PAGE2 } from './services/serv_data'
export default {
  name: "Pagehand",
  data() {
    return {
      PAGE1: PAGE1,
      PAGE2: PAGE2,
    }
  },
  computed: {
    ...mapGetters({
      page: 'getPage'
    })
  }
}
</script>
