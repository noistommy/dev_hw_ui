<template lang="pug">
  .toast-view
    .contents-detail-view
      .contents-section
        .section-title Table
          .type-wrapper
            .type-title 기본 스타일
            .type-desc
            .type-preview
              table.ga-table
                caption {{caption}}
                colgroup
                  col(v-for="(col, i) in columnInfo", :key="i", :width="col.width")
                thead
                  tr
                    th(v-for="(col, i) in columnInfo", :key="i") {{col.header}}
                tbody
                  tr(v-for="(row, idx) in rowData", :key="idx")
                    td(v-for="data in columnInfo", :key="data.header", :class="[`align-${data.align}`]") {{row[data.header]}}
          .type-wrapper
            .type-title 스타일 1
            .type-desc
            .type-preview
              table.ga-table
                colgroup
                  col(v-for="(col, i) in columnInfo", :key="i", :width="col.width")
                thead
                  tr
                    th(v-for="(col, i) in columnInfo", :key="i") {{col.header}}
                tbody
                  tr(v-for="(row, idx) in rowData1", :key="idx")
                    td(v-for="data in columnInfo", :key="data.header", :class="[`align-${data.align}`]")
                      template(v-if="data.type ==='button'")
                        .hw-button.primary.linked(@click="onClick(row[data.header].link)") {{row[data.header].value}}
                      template(v-else-if="data.type ==='icon'")
                        span.icon.large.linked(@click="onClick(row[data.header].link)")
                          i.fal.fa-trash
                      template(v-else) {{row[data.header]}}

</template>

<script>
export default {
  name: 'ga-table',
  data () {
    return {
      caption: 'Standard Table',
      columnInfo : [
        {width: '', header: 'column1', type: 'text', align: 'center'},
        {width: '50%', header: 'column2', type: 'button', align: 'center'},
        {width: '', header: 'column3', type: 'icon', align: 'center'},
      ],
      rowData: [
        {column1: 'row1-value1',  column2: `row1-value2`,column3: 'row1-value3'},
        {column1: 'row2-value1',  column2: 'row2-value2',column3: 'row2-value3'}
      ],
      rowData1: [
        {column1: 'row1-value1',  column2: {value:`row1-value2`, button: '확인', link: '/'}, column3: 'row1-value3'}
      ]
    }
  },
  methods: {
    onClick(link) {
      window.location.href = link
    }
  }
}
</script>

<style scoped lang="scss">
table {
  border:0;
  padding: 0;
  border-spacing: 0;
  border-collapse:collapse;
  th, td{
    padding: 15px;
  }
}

.ga-table {
  width: 100%;
  border-color: #e5e5e5;
  caption {
    font-size: 1.2em;
    margin: 4px 0 8px;
    &.left {text-align: left;}
    &.right {text-align: right;}
  }
  thead {
    border-top: 1px solid #999999;
    border-bottom: 1px solid #e5e5e5;
    background-color: #f9fafc;
  }
  th, td {
    border-right: 1px solid #e5e5e5;
    &:last-child {
      border: 0;
    }
    &.align-left {text-align: left;}
    &.align-center {text-align: center;}
    &.align-right {text-align: right;}
    .linked {
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      font-size: 1.2em;
    }
  }
  tbody tr {
    border-bottom: 1px solid #e5e5e5;
  }
  &.primary {
    border-color: #2985db;
    background-color: #fff;
  }
}
</style>