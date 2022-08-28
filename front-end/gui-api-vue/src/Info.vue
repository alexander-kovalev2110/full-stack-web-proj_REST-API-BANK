<template>
    <br/><br/>
    <h5><i>CustomerId:</i> <b>{{customerId}}</b></h5>
    <h5><i>Message:</i> <b> {{message}}</b></h5>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Info",
  computed: {
    ...mapGetters({
      customerId: 'getCustomer',
      message: 'getMessage'
    }),
  }
}
</script>
