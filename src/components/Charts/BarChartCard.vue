<template>

  <b-card :no-body="noBorder" :class="{'barchart-card-border': noBorder}">
    <div v-if="wideType === 'half'">
      <b-row class="mb-2">
        <b-col class="text-left">
          <span class="text-nowrap main-text">{{title}}</span>
        </b-col>
        <b-col class="text-right">
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   :name="name"
                   :id="`${name}-chartFrame`"
                   checked
                   @change="() => {chartType = 'chart'}">
            <label class="form-check-label"
                   :for="`${name}-chartFrame`">
              차트
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   :name="name"
                   :id="`${name}-dataFrame`"
                   @change="() => {chartType = 'data'}">
            <label class="form-check-label"
                   :for="`${name}-dataFrame`">
              데이터
            </label>
          </div>
        </b-col>
      </b-row>
      <b-row :ref="`${name}-chartFrame`">
        <b-col>
          <div style='width: 100%; height: 200px;'
               ref="barChart-half" />
        </b-col>
      </b-row>


      <div :ref="`${name}-dataFrame`"
           class="d-none"
           style='width: 100%; height: 200px;'>
        <b-row v-on:mouseover="showHighlight"
               v-on:mouseout="hideHighlight"
               v-for="(data, index) in reverseData"
               :key="data.key"
               v-if="index < 6"
        >
          <b-col v-if="type === 'pct'"
                 class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
          <b-col v-if="type === 'pct'"
                 class="text-right text-nowrap sub-text border-bottom border-light">{{data.pct}} %</b-col>

          <b-col v-if="type === 'price'"
                 class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
          <b-col v-if="type === 'price'"
                 class="text-right text-nowrap sub-text border-bottom border-light">{{data.formatPrice}} {{currency || 'USDT'}}</b-col>
        </b-row>
      </div>
    </div>

    <div v-if="wideType === 'dual'" v-on:resize="wideTypeChange">
      <b-row>
        <b-col class="text-left">
          <span class="text-nowrap main-text">{{title}}</span>
        </b-col>
        <b-col class="text-right d-md-none">
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   :name="name"
                   :id="`${name}-chartFrame`"
                   checked
                   @change="() => {chartType = 'chart'}">
            <label class="form-check-label"
                   :for="`${name}-chartFrame`">
              차트
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   :name="name"
                   :id="`${name}-dataFrame`"
                   @change="() => {chartType = 'data'}">
            <label class="form-check-label"
                   :for="`${name}-dataFrame`">
              데이터
            </label>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col col xs="12" sm="12" md="8" lg="8" cols="12"
               :ref="`${name}-chartFrame`">
          <div style='width: 100%; height: 200px;'
               ref="barChart-dual" />
        </b-col>
        <b-col col xs="12" sm="12" md="4" lg="4" cols="12"
               class="mt-3 d-sm-down-none">
          <b-row v-on:mouseover="showHighlight"
                 v-on:mouseout="hideHighlight"
                 v-for="(data, index) in reverseData"
                 :key="data.key"
                 v-if="index < 6"
                 class="pl-3 pr-3"
          >
            <b-col v-if="type === 'pct'"
                   class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
            <b-col v-if="type === 'pct'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.pct}} %</b-col>

            <b-col v-if="type === 'price'"
                   class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
            <b-col v-if="type === 'price'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.formatPrice}} {{currency || 'USDT'}}</b-col>
          </b-row>
        </b-col>
        <b-col col xs="12" sm="12"
               md="4" lg="4" cols="12"
               class="mt-3 d-md-none d-none"
               :ref="`${name}-dataFrame`">
          <b-row v-on:mouseover="showHighlight"
                 v-on:mouseout="hideHighlight"
                 v-for="(data, index) in reverseData"
                 :key="data.key"
                 v-if="index < 6"
                 class="pl-3 pr-3"
          >
            <b-col v-if="type === 'pct'"
                   class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
            <b-col v-if="type === 'pct'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.pct}} %</b-col>

            <b-col v-if="type === 'price'"
                   class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
            <b-col v-if="type === 'price'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.formatPrice}} {{currency || 'USDT'}}</b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>



    <div v-if="wideType === 'twin'">
      <b-row>
        <b-col class="text-left">
          <span class="text-nowrap main-text">{{title}}</span>
        </b-col>
      </b-row>
      <b-row>
        11
        <div style='width: 100%; height: 200px;'
             ref="barChart-twin" />
        <b-col col xs="12" sm="12" md="8" lg="8" cols="12">

        </b-col>
        <b-col col xs="12" sm="12" md="4" lg="4" cols="12" class="mt-3">
          <b-row v-on:mouseover="showHighlight"
                 v-on:mouseout="hideHighlight"
                 v-for="(data, index) in reverseData"
                 :key="data.key"
                 v-if="index < 6"
                 class="pl-3 pr-3"
          >
            <b-col v-if="type === 'pct'"
                   class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
            <b-col v-if="type === 'pct'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.pct}} %</b-col>

            <b-col v-if="type === 'price'"
                   class="text-left text-nowrap sub-text border-bottom border-light">{{data.date}}</b-col>
            <b-col v-if="type === 'price'"
                   class="text-right text-nowrap sub-text border-bottom border-light">{{data.formatPrice}} {{currency || 'USDT'}}</b-col>
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
  name: 'BarChartCard',
  components: {},
  props: ['type', 'dataProvider', 'title', 'wideType', 'name', 'currency', 'noBorder'],
  data () {
    return {
      windowWidth: window.innerWidth,
      chartType: 'chart',
      chart: null,
      reverseData: [],
      chartConfig: {
        hideCredits: true,
        path: '/libs/amcharts/',
        pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
        type: 'serial',
        theme: 'light',
        // marginRight: 0,
        marginRight: 0,
        // marginLeft: 45,
        /*
        marginLeft: 저 아래에 100으로 셋팅함.,
        */
        // autoMarginOffset: 0,
        valueAxes: [ {
          id: 'v1',
          axisAlpha: 0,
          position: 'left',
          ignoreAxisWidth: true
        } ],
        balloon: {
          borderThickness: 1,
          shadowAlpha: 0
        },
        graphs: [ {
          colorField: 'color',
          lineAlpha: 0,
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
    windowWidth () {
      if (this.chartType !== 'chart' && this.windowWidth >= 768) {
        this.chartType = 'chart'
      } else {
        this.$el.querySelectorAll(`[name=${this.name}]`).forEach((el, index) => {
          if (index % 2 === 0) {
            el.checked = true
          }
        })
      }
    },
    chartType () {
      if (this.wideType === 'half' || this.wideType === 'dual') {
        if (this.chartType === 'chart') {
          this.$refs[`${this.name}-dataFrame`].classList.add('d-none')
          this.$refs[`${this.name}-chartFrame`].classList.remove('d-none')
          this.chart.validateSize()
        } else if (this.chartType === 'data') {
          this.$refs[`${this.name}-chartFrame`].classList.add('d-none')
          this.$refs[`${this.name}-dataFrame`].classList.remove('d-none')
        }
      }
    },
    dataProvider () {
      this.setData()
    }
  },
  methods: {
    setData () {
      let data = []
      if (this.dataProvider === undefined || this.dataProvider === null) {
        return false
      } else {
        data = this.dataProvider
      }
      this.chartConfig.dataProvider = data.map(o => {
        let y = o.date.substring(2, 4)
        let m = o.date.substring(4, 6)
        let pct = 0
        if (o.length !== undefined && o.length !== null) {
          pct = o.returnPct.toFixed(o.length)
        } else {
          pct = (o.returnPct !== undefined && o.returnPct !== null) ? o.returnPct.toFixed(1) : o.returnPct
        }
        return {
          date: y + '.' + m,
          pct: pct,
          price: o.price,
          formatPrice: o.price !== undefined && o.price !== null ? utils.comma(o.price) : 0,
          color: this.type === 'pct' ? (Number(o.returnPct) < 0 ? '#FF0000' : '#20a8d8') : '#20a8d8',
          lineColor: this.type === 'pct' ? (Number(o.returnPct) < 0 ? '#FF0000' : '#20a8d8') : '#20a8d8'
        }
      }).reverse().filter((o, i) => {
        return i < 6
      }).reverse()
      let reverseData = Object.assign([], this.chartConfig.dataProvider)
      this.reverseData = reverseData
      this.randChart()
    },
    // handleWindowResize (event) {
    //   this.windowWidth = event.currentTarget.innerWidth
    // },
    showHighlight (e) {
      if (e.path[0].classList.contains('col')) {
        e.path[1].classList.add('bg-light')
      }
    },
    hideHighlight (e) {
      e.path[1].classList.remove('bg-light')
    },
    newChart (target) {
      if (this.chart !== null) {
        this.chart.clear()
        this.chart = null
      }
      return AmCharts.makeChart(target, this.chartConfig)
    },
    wideTypeChange (e) {
      console.log('wideTypeChange', e)
    },
    randChart () {
      if (this.type === 'pct') {
        this.chartConfig.valueAxes[0]['maximum'] = this.maximum
        let balloonText = `<span>[[category]] 월 <br /><span style='font-size:18px;'>[[value]] %</span></span>`
        this.chartConfig.graphs[0]['balloonText'] = balloonText
        this.chartConfig.graphs[0]['valueField'] = 'pct'
        this.chartConfig.marginLeft = 30
      } else if (this.type === 'price') {
        let balloonText = `<span style='font-size:12px;'>[[category]] 월 <br /><span style='font-size:18px;'>[[value]] ${this.currency || 'USDT'}</span></span>`
        this.chartConfig.graphs[0]['balloonText'] = balloonText
        this.chartConfig.graphs[0]['valueField'] = 'price'
        this.chartConfig.marginLeft = 100
      }
      this.chartConfig.graphs[0]['title'] = this.title
      this.chart = this.newChart(this.$refs[`barChart-${this.wideType}`])
      // window.addEventListener('resize', this.handleWindowResize)
    }
  },
  beforeCreate () {},
  created () {
    this.setData()
  },
  beforeMount () {},
  mounted () {
    this.randChart()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {
    // window.removeEventListener('resize', this.handleWindowResize)
  },
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
.barchart-card-border {
  border: 0px;
}
</style>
