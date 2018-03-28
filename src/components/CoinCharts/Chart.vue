<template>
  <b-card>
    <lineChart :data="data"></lineChart>
  </b-card>
</template>

<script>
import lineChart from './LineChart'

export default {
  name: 'coinChart',
  props: ['data'],
  components: {
    lineChart
  }
}
</script>
