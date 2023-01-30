<template lang="pug">
  div.date-picker-view
    .contents-detail-view
      hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
        span(@click="setContents(tab.key)") {{tab.name}}
      .contents-section
        template(v-if="showInfo")
          components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
        template(v-else)
          .section-title Types
          .type-wrapper(v-for="(type, index) in contentList", :key="index")
            .type-title {{type.title}}
            .type-desc {{type.description}}
            .type-msg.panel(v-if="type.message", :class="`panel-${type.message.type}`")
              .panel-body {{type.message.text}}
            .type-preview(:style="previewSize")
              .hw-table-wrapper
                hw-data-table(v-bind="type.option")
          .type-wrapper
            .type-title Slot (Table Body)
            .type-desc
            .type-preview(:style="previewSize")
              hw-data-table(:columns="columnsData", :rows="rowsData", :use-check-box="true", :select-type="`single`")
                .hw-table-body(slot="tBody")
                  hw-data-table-row.custom-table-rows( v-for="(row, index) in rowsData", :key="row.id", :columns="columnsData", ref="hw-data-table-row",
                    :rowData="row" :index="index" :selectType="`single`", :row-height="46"
                    :isShowCheckBox="true", :isSelectedAll="false", @row-selected="onSingleSelect", @select-item="setKeyFunc")



</template>

<script>
import InformationView from './InformationView'
import HwDataTableRow from "../packages/HwDataTable/HwDataTableRow";
const TABLE_COLUMNS = [
  { name: "그룹 이름", rowKey: "name", width: 450, sortable: true, align: 'left' },
  { name: "소유자", rowKey: "owner", width: 135 },
  { name: "멤버", rowKey: "member", width: 55 },
  { name: "사용 용량", rowKey: "capacity", width: 105, sortable: true },
  { name: "생성일", rowKey: "created_at", width: 89 },
]
const TABLE_ROWS = [
  {
    id: Math.random(),
    name: "돌핀팀 Only",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "영업 관리",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "하이웍스 개발팀",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "돌핀팀 Only",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "돌핀팀 Only",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "영업 관리",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "aaa 하이웍스 개발팀",
    owner: "Aeter(이호준)",
    member: 13,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "돌핀팀 Only",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "돌핀팀 Only",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 800,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "영업 관리",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "하이웍스 개발팀",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때긴 그룹 이름일때",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  },
  {
    id: Math.random(),
    name: "돌핀팀 Only",
    owner: "Peter(이호준)",
    member: 14,
    capacity: 900,
    created_at: "20-01-02"
  }
]
export default {
  name: 'hw-data-table-view',
  components: {HwDataTableRow},
  data () {
    return {
      usage: "<hw-data-table :columns='columns' :rows='rows' ></hw-data-table>",
      columnsData: [...TABLE_COLUMNS],
      rowsData: [...TABLE_ROWS],
      contentList: [
        {
          title: '기본 :: 목록 타입',
          description: '기본 목록',
          source: "<hw-data-table :columns='columns' :rows='rows'></hw-data-table>",
          option: {
            columns: TABLE_COLUMNS.slice(),
            rows: TABLE_ROWS.slice()
          }
        },
        {
          title: '기본 : 테이블 타입',
          description: '기본 목록 ',
          source: "<hw-data-table :columns='columns' :rows='rows'></hw-data-table>",
          option: {
            columns: TABLE_COLUMNS.slice(),
            rows: TABLE_ROWS.slice(),
            type: 'table'
          }
        },
        {
          title: '선택 타입 :: single',
          description: 'none(기본), single: 단일 선택',
          option: {
            selectType: 'single',
            columns: TABLE_COLUMNS.slice(),
            rows: TABLE_ROWS.slice()
          },
          source: "<hw-data-table :columns='columns' :rows='rows' :selectType='none' ></hw-data-table>",
        },
        {
          title: '선택 타입 :: multiple',
          description: 'none(기본), single: 다중 선택',
          option: {
            selectType: 'multiple',
            columns: TABLE_COLUMNS.slice(),
            rows: TABLE_ROWS.slice()
          },
          source: "<hw-data-table :columns='columns' :rows='rows' :selectType='multiple' ></hw-data-table>"
        },
        {
          title: '체크박스-단일선택',
          description: 'false(기본): 사용 안함, true: 사용함.',
          option: {
            useCheckBox: true,
            selectType: 'single',
            columns: TABLE_COLUMNS.slice(),
            rows: TABLE_ROWS.slice()
          },
          source: "<hw-data-table :columns='columns' :rows='rows' :useCheckBox='true' :selectType='single' ></hw-data-table>",
          message: {
            type: 'lightblue',
            text: ':: selectType 속성이 \'none\'인 경우 체크박스 UI를 생성하지 않습니다.'
          }
        },
        {
          title: '체크박스-다중선택',
          description: 'false(기본): 사용 안함, true: 사용함.',
          option: {
            useCheckBox: true,
            selectType: 'multiple',
            columns: TABLE_COLUMNS.slice(),
            rows: TABLE_ROWS.slice()
          },
          source: "<hw-data-table :columns='columns' :rows='rows' :useCheckBox='true' :selectType='multiple' ></hw-data-table>",
          message: {
            type: 'lightblue',
            text: ':: selectType 속성이 \'none\'인 경우 체크박스 UI를 생성하지 않습니다.'
          }
        },
        {
          title: 'clickKey',
          description: '클릭이벤트를 갖는 컬럼을 지정하기 위해 rows 데이터에 해당하는 키 이름 중 하나를 지정합니다.',
          option: {
            useCheckBox: false,
            selectType: 'multiple',
            clickKey: 'name',
            columns: TABLE_COLUMNS.slice(),
            rows: TABLE_ROWS.slice()
          },
          source: "<hw-data-table :columns='columns' :rows='rows' :useCheckBox='false' :selectType='multiple' :clickKey='name' ></hw-data-table>"
        },
      ],
      propsData: [
        {name: 'columns', type:'Array', default:'[]', desc: '테이블 기능을 위한 사용자 입력 데이터, 테이블의 N번째 컬럼의 기능동작은 columns[N-1] 번째 정의 내용에 따라 동작한다.' },
        {name: 'column.fluidKey', type:'String', default:'', desc: '테이블의 남은 가로 영역을 모두 차지하는 컬럼으로 지정할 키 이름' },
        {name: 'column.clickKey', type:'String', default:'', desc: '테이블 행의 텍스트를 클릭시 클릭이벤트를 발생시킬 키 이름' },
        {name: 'column.name', type:'String', default:'', desc: '테이블 헤드의 컬럼에 표시할 이름' },
        {name: 'column.rowKey', type:'String', default:'', desc: '테이블 헤드와 연결되는 테이블 행 데이터의 키 이름' },
        {name: 'column.width', type:'String', default:'0', desc: '테이블 N번째 컬럼의 가로 길이' },
        {name: 'column.sortable', type:'Boolean', default:'false', desc: '테이블 헤드의 해당 컬럼에 정렬 기능 추가 여부' },
        {name: 'column.align', type:'String', default:'left', desc: '테이블 N번째 컬럼의 텍스트 수평 정렬 [left | center | right]' },
        {name: 'rows', type:'Array', default:'[]', desc: '테이블의 행을 표시하기 위한 실제 데이터 인스턴스' },
        {name: 'selectType', type: 'String', default:'none', desc: '테이블 아이템 선택 방식 [none | single | multiple]'},
        {name: 'useCheckBox', type: 'Boolean', default: 'false', desc: '테이블 아이템 선택 체크박스 UI 사용 여부'},
        {name: 'tableClass', type: 'String', default: '', desc: '테이블 스타일 커스터마이징을 위한 클래스'},
        {name: 'tableHeadClass', type: 'String', default: '', desc: '테이블 헤드 스타일 커스터마이징을 위한 클래스'},
        {name: 'tableHeadItemClass', type: 'String', default: '', desc: '테이블 헤드 아이템 스타일 커스터마이징을 위한 클래스'},
        {name: 'tableBodyClass', type: 'String', default: '', desc: '테이블 바디 스타일 커스터마이징을 위한 클래스'},
        {name: 'tableRowClass', type: 'String', default: '', desc: '테이블 로우 스타일 커스터마이징을 위한 클래스'},
        {name: 'tableRowItemClass', type: 'String', default: '', desc: '테이블 로우 아이템 스타일 커스터마이징을 위한 클래스'},
        {name: 'selectedItemClass', type: 'String', default: 'item-selected', desc: '선택된 테이블 로우를 표시하기 위한 클래스'},
      ],
      methodData: [
        {name: 'sortRows()', return: '', desc: '가장 마지막으로 정렬한 기준으로 rows 데이터를 재정렬합니다.'},
        {name: 'getSelectedRows()', return: 'Array', desc: '선택한 테이블 행들이 가진 데이터를 배열에 모아 반환합니다.'},
        {name: 'setSelection(bool: Boolean)', return: '', desc: '테이블의 전체 선택 상태를 주어진 파라미터로 설정합니다. selectType이 multiple인 상태에서만 동작합니다.'}
      ],
      eventData: [
        {name: 'row-selected', type: 'Object', desc: '테이블 행 클릭시 해당 데이터 반환.'},
        {name: 'not-selectable', type: 'Null', desc: '테이블 행 선택옵션이 None인 상태에서 선택된 행을 반환받으려 하는 경우.'},
        {name: 'not-selected', type: 'Null', desc: '테이블 행 선택옵션이 Single인 상태에서 행을 선택하지 않았는데 선택된 행을 반환받으려 하는 경우.'},
        {name: 'not-exist', type: 'Null', desc: '테이블 행 데이터 인스턴스가 존재하지 않는 상태에서 정렬 기능을 이용하려 하는 경우.'},
      ],
      previewSize: {
        width: '100%',
        height: '450px'
      },
      selectedRows: "",
      tabList: [
        {name:'Types', key: 'type'},
        {name:'Information', key: 'info'}
      ],
      showInfo: false
    }
  },
  methods: {
    toggleCode (evt) {
      let classArr = evt.target.nextSibling.classList.value;
      if(classArr.indexOf('show') > -1) {
        evt.target.nextSibling.classList.remove('show')
      } else {
        evt.target.nextSibling.classList.add('show')
      }
    },
    getSelectedRows(){
      this.selectedRows = JSON.stringify(this.$refs['hw-data-table'].getSelectedRows())
    },
    onSingleSelect(payload){
      if(this.selectType === 'none') return;
      const row = payload.row;
      if( this.lastSelectedRow && this.lastSelectedRow !== row && row.isSelected) {
        this.lastSelectedRow.isSelected = false
      }
      this.lastSelectedRow = row;
    },
    setContents(type) {
      if (type === 'info') {
        this.showInfo = true;
        this.infoComp = InformationView
      } else {
        this.showInfo = false;
        this.infoComp = null;
      }
    },
    setKeyFunc(payload) {
      console.log(payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.contents-detail-view {
  max-width: 100%
}
.range-wrapper {
  display: flex;
}
.hw-table-wrapper {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
.control-button{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 40px;
}
.hw-table .hw-table-body .hw-table-row {
  &.custom-table-rows {
    /*background-color: #ebebeb;*/
  }
}

</style>
