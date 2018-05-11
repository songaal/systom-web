<template>
  <div>
    <datatable v-bind="$data">
    </datatable>
  </div>
  <!-- <b-table id="customTable" class="display" style="width:100%" :fields="fields" :items="items">
    <template v-if="fieldType === 'backtestHistoryFields' || fieldType === 'liveTradeHistory'" slot="action" slot-scope="items">
      <b-badge class="action" :variant="items.item.action === 'Buy' ?  'primary':'danger'">{{items.item.action === 'Buy' ? '매도' : '매수'}}</b-badge>
    </template>
    <template v-if="fieldType === 'backtestHistoryFields' || fieldType === 'liveTradeHistory'" slot="amount" slot-scope="items">
      <span :class="items.item.action === 'Buy' ? 'text-primary' : 'text-danger'">{{items.item.amount}}</span>
    </template>
  </b-table> -->
</template>

<script>
import mockData from './_mockData'

export default {
  props: ['items', 'fieldType'],
  data () {
    return {
      columns: [
        { title: 'User ID', field: 'uid', sortable: true },
        { title: 'Username', field: 'name' },
        { title: 'Age', field: 'age', sortable: true },
        { title: 'Email', field: 'email' },
        { title: 'Country', field: 'country' }
      ],
      data: [],
      total: 0,
      query: {},
      fields: {},
      lastTopHistoryFields: {
        testTime: {
          label: '테스트시간',
          sortable: true,
          class: 'text-center'
        },
        // version: {
        //   label: '버전',
        //   sortable: true,
        //   class: 'text-center'
        // },
        exchange: {
          label: '거래소',
          sortable: true,
          class: 'text-center'
        },
        revenue: {
          label: '수익',
          sortable: true,
          class: 'text-center'
        },
        startTime: {
          label: '시작',
          sortable: true,
          class: 'text-center'
        },
        endTime: {
          label: '종료',
          sortable: true,
          class: 'text-center'
        }
      },
      backtestHistory: {
        action: {
          label: '주문',
          sortable: true,
          class: 'text-center'
        },
        orderTime: {
          label: '시간',
          sortable: true,
          class: 'text-center'
        },
        symbol: {
          label: '심볼',
          sortable: true,
          class: 'text-center'
        },
        orderType: {
          label: '주문타입',
          sortable: true,
          class: 'text-center'
        },
        price: {
          label: '거래가격',
          sortable: true,
          class: 'text-center'
        },
        amount: {
          label: '수량',
          sortable: true,
          class: 'text-center'
        },
        sum: {
          label: '합계',
          sortable: true,
          class: 'text-center'
        },
        revenue: {
          label: '수익',
          sortable: true,
          class: 'text-center'
        },
        description: {
          label: '설명',
          sortable: false,
          class: 'text-center'
        }
      },
      liveTradeHistory: {
        action: {
          label: '주문',
          sortable: true,
          class: 'text-center'
        },
        orderTime: {
          label: '시간',
          sortable: true,
          class: 'text-center'
        },
        symbol: {
          label: '심볼',
          sortable: true,
          class: 'text-center'
        },
        orderType: {
          label: '주문타입',
          sortable: true,
          class: 'text-center'
        },
        price: {
          label: '거래가격',
          sortable: true,
          class: 'text-center'
        },
        amount: {
          label: '수량',
          sortable: true,
          class: 'text-center'
        },
        sum: {
          label: '합계',
          sortable: true,
          class: 'text-center'
        },
        revenue: {
          label: '수익',
          sortable: true,
          class: 'text-center'
        },
        description: {
          label: '설명',
          sortable: false,
          class: 'text-center'
        }
      }
    }
  },
  watch: {
    query: {
      handler (query) {
        mockData(query).then(({ rows, total }) => {
          this.data = rows
          this.total = total
        })
      },
      deep: true
    }
  },
  created () {
    if (this.fieldType === 'lastTopHistoryFields') {
      this.fields = this.lastTopHistoryFields
    } else if (this.fieldType === 'backtestHistoryFields') {
      this.fields = this.backtestHistory
    } else if (this.fieldType === 'liveTradeHistory') {
      this.fields = this.liveTradeHistory
    }
  }
}
</script>
<style>
.action {
  font-size: 12pt
}
</style>
