<template>

  <b-card>
    <div v-if="wideType === 'half'">
      <b-row class="mb-2">
        <b-col class="text-left">
          <span class="text-nowrap main-text">{{title}}</span>
        </b-col>
        <b-col class="text-right">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" :name="name" :id="`${name}-chartFrame`" checked  @change="() => {chartType = 'chart'}">
            <label class="form-check-label" :for="`${name}-chartFrame`">차트</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" :name="name" :id="`${name}-dataFrame`" @change="() => {chartType = 'data'}">
            <label class="form-check-label" :for="`${name}-dataFrame`">데이터</label>
          </div>
        </b-col>
      </b-row>
      <b-row :ref="`${name}-chartFrame`">
        <b-col>
          <div id="chartdiv" style='width: 100%; height: 200px;' ref='barChart' />
        </b-col>
      </b-row>


      <div :ref="`${name}-dataFrame`" class="d-none" style='width: 100%; height: 200px;'>
        <b-row v-on:mouseover="showHighlight"
               v-on:mouseout="hideHighlight"
               v-for="(data, index) in dataProvider"
               :key="data.key"
               v-if="index < 6"
        >
          <b-col v-if="type === 'pct'"
                 class="text-left text-nowrap sub-text border-bottom border-light">2018.{{data.date}}</b-col>
          <b-col v-if="type === 'pct'"
                 class="text-right text-nowrap sub-text border-bottom border-light">{{data.pct}} %</b-col>

          <b-col v-if="type === 'price'"
                 class="text-left text-nowrap sub-text border-bottom border-light">2018.{{data.date}}</b-col>
          <b-col v-if="type === 'price'"
                 class="text-right text-nowrap sub-text border-bottom border-light">{{data.price}} {{currency || 'USDT'}}</b-col>
        </b-row>
      </div>
    </div>


    <div v-if="wideType === 'full'">
      <b-row>
        <b-col class="text-left">
          <span class="text-nowrap main-text">{{title}}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col col xs="12" sm="12" md="8" lg="8" cols="12">
          <div id="chartdiv" style='width: 100%; height: 200px;' ref='barChart' />
        </b-col>
        <b-col col xs="12" sm="12" md="4" lg="4" cols="12" class="mt-3">
          <b-row v-on:mouseover="showHighlight"
                 v-on:mouseout="hideHighlight"
                 v-for="(data, index) in dataProvider"
                 :key="data.key"
                 v-if="index < 6"
                 class="pl-3 pr-3"
          >
            <b-col v-if="type === 'pct'"
                   class="text-left text-nowrap sub-text border-bottom border-light">2018.{{data.date}}</b-col>
            <b-col v-if="type === 'pct'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.pct}} %</b-col>

            <b-col v-if="type === 'price'"
                   class="text-left text-nowrap sub-text border-bottom border-light">2018.{{data.date}}</b-col>
            <b-col v-if="type === 'price'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.price}} {{currency || 'USDT'}}</b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

  </b-card>
</template>

<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'
import utils from '../../Utils'

export default {
  name: 'BarChart',
  components: {},
  props: ['type', 'dataProvider', 'title', 'wideType', 'name', 'currency'],
  data () {
    return {
      chartType: 'chart',
      chart: null,
      chartConfig: {
        hideCredits: true,
        path: '/libs/amcharts/',
        pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
        type: 'serial',
        theme: 'light',
        marginRight: 0,
        marginLeft: 45,
        autoMarginOffset: 0,
        valueAxes: [ {
          id: 'v1',
          axisAlpha: 0,
          position: 'left',
          ignoreAxisWidth: true,
          minimum: 0
        } ],
        balloon: {
          borderThickness: 1,
          shadowAlpha: 0
        },
        graphs: [ {
          alphaField: 'alpha',
          balloonText: null,
          fillAlphas: 1,
          title: '수익률',
          type: 'column',
          valueField: null,
          dashLengthField: 'dashLengthColumn'
        }],
        categoryField: 'date',
        dataProvider: []
      }
    }
  },
  computed: {},
  watch: {
    chartType () {
      if (this.wideType === 'half') {
        if (this.chartType === 'chart') {
          this.$refs[`${this.name}-dataFrame`].classList.add('d-none')
          this.$refs[`${this.name}-chartFrame`].classList.remove('d-none')
        } else if (this.chartType === 'data') {
          this.$refs[`${this.name}-chartFrame`].classList.add('d-none')
          this.$refs[`${this.name}-dataFrame`].classList.remove('d-none')
        }
      }
    }
  },
  methods: {
    showHighlight (e) {
      if (e.path[0].classList.contains('col')) {
        e.path[1].classList.add('bg-light')
      }
    },
    hideHighlight (e) {
      e.path[1].classList.remove('bg-light')
    }
  },
  beforeCreate () {},
  created () {
    this.chartConfig.dataProvider = this.dataProvider
  },
  beforeMount () {},
  mounted () {
    if (this.type === 'pct') {
      this.chartConfig.valueAxes[0]['maximum'] = this.maximum
      let balloonText = `<span>[[category]] 월 [[title]]:<br /><span style='font-size:20px;'>[[value]] %</span></span>`
      this.chartConfig.graphs[0]['balloonText'] = balloonText
      this.chartConfig.graphs[0]['valueField'] = 'pct'
      this.chartConfig.marginLeft = 30
    } else if (this.type === 'price') {
      let balloonText = `<span style='font-size:12px;'>[[category]] 월 [[title]]:<br /><span style='font-size:20px;'>[[value]] ${this.currency || 'USDT'}</span></span>`
      this.chartConfig.graphs[0]['balloonText'] = balloonText
      this.chartConfig.graphs[0]['valueField'] = 'price'
      this.chartConfig.marginLeft = 50
    }
    this.chartConfig.graphs[0]['title'] = this.title
    this.chart = AmCharts.makeChart(this.$refs.barChart, this.chartConfig)
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.main-text {
  color: #3C3C3C;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.3px;
}
.sub-text {
  font-size: 1.1em;
  line-height: 30px;
}
</style>
