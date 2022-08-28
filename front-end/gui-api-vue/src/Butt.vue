<template>
  <div class="form-group">
    <div class="col-sm-offset-4 col-sm-4">
      <button type="button" class="btn btn-default"
              @click="$store.dispatch('fetchData', index)">{{button}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "But",
  props: {
    button: String,
    index: Number
  }
}
</script>
