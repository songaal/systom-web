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
  props: ['items', 'fieldType', 'title'],
  data () {
    return {
      fields: {},
      lastTopHistoryFields: {
        version: {
          label: '버전',
          sortable: true,
          class: 'text-center'
        },
        exchange: {
          label: '거래소',
          sortable: true,
          class: 'text-center'
        },
        symbol: {
          label: '심볼',
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
        revenue: {
          label: '수익',
          sortable: true,
          class: 'text-center'
        },
        symbol: {
          label: '심볼',
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
</style>
