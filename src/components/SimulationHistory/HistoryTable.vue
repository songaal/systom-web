<template>
  <b-table hover responsive :fields="fields" :items="items">
    <template v-if="fieldType === 'backtestHistoryFields'" slot="action" slot-scope="items">
      <b-badge class="action" :variant="items.item.action === 'Buy' ? 'danger' : 'primary'">{{items.item.action === 'Buy' ? '매도' : '매수'}}</b-badge>
    </template>
    <template v-if="fieldType === 'backtestHistoryFields'" slot="amount" slot-scope="items">
      <b-span :class="items.item.action === 'Buy' ? 'text-danger' : 'text-primary'">{{items.item.amount}}</b-span>
    </template>
  </b-table>
</template>

<script>

export default {
  props: ['items', 'fieldType'],
  data () {
    return {
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
          sortable: true,
          class: 'text-center'
        }
      }
    }
  },
  created () {
    if (this.fieldType === 'lastTopHistoryFields') {
      this.fields = this.lastTopHistoryFields
    } else if (this.fieldType === 'backtestHistoryFields') {
      this.fields = this.backtestHistory
    }
  }
}
</script>
<style>
table th,
table td {
    white-space: pre;
}
.action {
  font-size: 12pt
}
</style>
