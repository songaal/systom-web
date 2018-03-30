<template>
  <b-card>
    <div>
      <h5>{{title}}</h5>
      <br />
      <b-table striped hover responsive :fields="fields" :items="items"></b-table>
    </div>
  </b-card>
</template>

<script>

export default {
  props: ['items', 'fields', 'title'],
  data () {
    return {
    }
  }
}
</script>
<style>
table th,
table td {
    white-space: pre;
}
</style>
