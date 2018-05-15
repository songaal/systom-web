<template>
  <div>
    <b-card no-body :class="variant" class="text-white">
      <b-card-body class="pb-0">
        <div class="text-muted small text-uppercase font-weight-bold">수익률</div>
        <!-- <h4 class="mb-0">23.5%</h4> -->
        <!-- <p>평균이동 에이전트</p> -->
        <h4 class="text-value">23.5%</h4>
        <p>JB 에이전트 | XRP/BTC</p>
      </b-card-body>
      <SparkLine class="chart-wrapper px-3"
                 :height="options.height"
                 :labels="options.labels"
                 :datasets="datasets"
      />
    </b-card>
  </div>
</template>
<script>
import SparkLine from '../Charts/SparkLine'

export default {
  name: 'SummaryRevenueCard',
  props: ['variant', 'options', 'datasets', 'revenue'],
  components: {
    SparkLine
  }
}
</script>
<style>
  .chart-wrapper {
    height: 80px;
  }
</style>
