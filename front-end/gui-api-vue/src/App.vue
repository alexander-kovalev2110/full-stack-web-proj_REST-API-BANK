<template>
  <div class="row">
    <div class="column" id="wc1">
      <Menu />
    </div>
    <div class="column" id="wc2">
      <Form />
      <Info />
    </div>
    <div class="column" id="wc3">
      <Table />
      <Pagehand />
    </div>
  </div>
</template>

<script>
import Menu from "@/Menu"
import Form from "@/Form"
import Table from "@/Table"
import Pagehand from "@/Pagehand"
import Info from "@/Info"
export default {
  name: "App",
  components: {Info, Menu, Form, Table, Pagehand }
}
</script>
