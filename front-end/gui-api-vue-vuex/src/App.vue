<template>
  <router-view />
  <AlertDialog />
</template>

<script setup>
import AlertDialog from "@/components/AlertDialog.vue"
</script>
<style>
html, body {
  overflow: hidden !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>