<template>
  <div class="form-group">
    <label class="col-sm-4 control-label">{{inpData.lbl}}</label>
    <div class="col-sm-6">
      <input class="col-sm-6 form-control"
             :type="inpData.type"
             :id="inpData.id"
             :placeholder="inpData.text"
             :step="inpData.step"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Inp",
  props: {
    inpData: Object
  },
}
</script>
