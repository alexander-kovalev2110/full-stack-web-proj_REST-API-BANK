<template>
  <form class='form-horizontal'>
    <br/>
    <h4>{{serv.title}}</h4>
    <Inp :inpData="serv.input1" />
    <div v-if="serv.input2 !== undefined">
      <Inp :inpData="serv.input2" />
    </div>
    <Butt :button="serv.button"
         :index="index" />
  </form>
</template>

<script>
import serv_data from './services/serv_data'
import Inp from "@/Inp"
import Butt from "@/Butt"
import { mapGetters } from "vuex"
export default {
  name: "Form",
  computed: {
    ...mapGetters({
      index : 'getIndex'
    }),
    serv() {                 // Data for form generation
      return serv_data[this.index]
    }
  },
  components: { Inp, Butt }
}
</script>
