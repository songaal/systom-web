<template>
  <div class="-nested-dsp-row-comp">
    <span v-if="row.action === 'BOT'" class="text-danger">{{row.price}}</span>
    <span v-if="row.action === 'SLD'" class="text-success">{{row.price}}</span>
  </div>
</template>
<script>
export default {
  props: ['row', 'nested']
}
</script>
<style>
</style>
