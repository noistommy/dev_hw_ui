<template>
  <div class="test-view">
    <div class="test-wrapper">
<!--      <table class="hw-table">-->
<!--        <caption>Button Test</caption>-->
<!--        <thead>-->
<!--          <tr>-->
<!--            <th></th>-->
<!--            <th><button class="button test_1">TEST</button></th>-->
<!--            <th><button class="button se-button">SEMANTIC</button></th>-->
<!--            <th><button class="button el-button">ELEMENT</button></th>-->
<!--          </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--          <tr>-->
<!--            <td>-->
<!--              Display-->
<!--            </td>-->
<!--            <td>inline-flex</td>-->
<!--            <td>inline-block</td>-->
<!--            <td>inline-block</td>-->
<!--          </tr>-->
<!--        </tbody>-->
<!--      </table>-->
    </div>
  </div>
</template>

<script>

    export default {
        name: 'document-view',
        data () {
            return {
                rangeDate: {
                    start: null,
                    end: null
                },
                selectedData: {
                    option: '',
                    value: '',
                    index: 0
                },
                selectedIndex: -1,
                selectedMember: [],
                timeList:[],
                memberList: [],
                searchedList: [],
                optionClass: ['profile', 'thumb'],
                //context menu
                isShowDialog: false,
                dialogData: {
                    id: ''
                },
                positioning: '',
                dialogStyle: {},
                dialog: '',
            }
        },
        created() {
            this.getTimeList();

            this.findOption();
        },
        methods: {
            setDateData (value) {
                this.rangeDate[value.type] = value.date;
                // if(value.type === 'start') {
                //     this.rangeDate.end = value.date;
                // }
            },
            selectDate (data) {
                console.log(data)
            },
            stateDD(visible) {
                console.log("click",visible);
            },
            selectMember(payload) {
                this.selectedIndex = payload.i;
                this.selectedMember = payload.value;
            },
            selectItem (value) {
                this.selectedData = value;
            },
            getSearchData (value) {
                alert(value);
            },
            getTimeList () {
                let times = [];
                for(let i=0; i<12; i++) {
                    times.push({value:i,option: (i<10)?`0${i}:00`:`${i}:00`});
                    times.push({value:i+0.5,option: (i<10)?`0${i}:30`:`${i}:30`})
                }
                this.timeList = times
            },
            findOption (keyword) {
                let filtered = [];
                this.memberList.forEach(el => {
                    if(el.attributes.name.indexOf(keyword) > -1) {

                        filtered.push(el);
                    }
                });
                this.searchedList = filtered;
            },
            closeDialog () {
                this.dialog = '';
                this.dialogData.id = '';
                this.isShowDialog = false;
            },
            showDialog ({id, position}) {
                if(this.dialog) {
                    this.closeDialog();
                    return;
                }

                this.dialogData.id = id;
                this.positioning = position;
                let pos = event.target.getBoundingClientRect();
                this.dialogStyle = {
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    height: pos.height
                };

                this.isShowDialog = true;
                this.dialog = 'HwContextMenu'

            },
        }
    }
</script>

<style lang="scss">
table {
  border:0;
  padding: 0;
  border-spacing: 0;
  border-collapse:collapse;
  th, td{
    padding: 20px;
  }
}

.hw-table {
  width: 100%;
  border-color: #e4e4e4;
  caption {
    font-size: 1.2em;
    margin: 4px 0 8px;
    &.left {text-align: left;}
    &.right {text-align: right;}
  }
  thead {
    border-top: 2px solid #6f6f6f;
    border-bottom: 1px solid #909090;
  }
  th, td {
    border-right: 1px solid #e4e4e4;
    &:last-child {
      border: 0;
    }
  }
  tbody tr {
    border-bottom: 1px solid #e4e4e4;
    td:first-child {
      background-color: #f9fafc;
    }
  }
  &.primary {
    border-color: #2985db;
    background-color: #fff;
  }
}
    .button.test_1 {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      color: #333;
      padding: 0.4em 1.2em;
      font-size: 1rem;
      transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
      user-select: none;
      white-space: nowrap;
      cursor: pointer;
      box-sizing: border-box;
      background: #ebebeb;
    }
    .se-button {
      font-size: 1rem;
      cursor: pointer;
      display: inline-block;
      min-height: 1em;
      outline: 0;
      border: none;
      vertical-align: baseline;
      background: #e0e1e2 none;
      color: rgba(0,0,0,.6);
      font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
      margin: 0 0.25em 0 0;
      padding: 0.78571429em 1.5em 0.78571429em;
      text-transform: none;
      text-shadow: none;
      font-weight: 700;
      line-height: 1em;
      font-style: normal;
      text-align: center;
      text-decoration: none;
      border-radius: 0.28571429rem;
      box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 #22242626 inset;
      user-select: none;
      transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
      will-change: '';
      -webkit-tap-highlight-color: transparent;
    }
    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }

</style>