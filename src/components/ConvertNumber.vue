<template>
  <div class="convert-number">
    <div class="contents-detail-view">
      <div class="contents-section">
        <div class="section-title">Type</div>
        <div class="type-wrapper">
          <div class="type-title">기본</div>
          <div class="type-preview">
            <div class="hw-grid divide-2">
              <div class="column">
                <div class="hw-input">
                  <input type="text" class="hw-input" v-model="source" :style="{textAlign: 'right'}">
                </div>
              </div>
              <div class="column">
                <div class="result" :style="{fontSize: '1.2em', fontWeight: 'bold'}">결과: {{ source | convertNumber }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">단위 사용 </div>
          <div class="type-preview">
            <div class="hw-grid divide-2">
              <div class="column">
                <div class="hw-input">
                  <input type="text" class="hw-input" v-model="source" :style="{textAlign: 'right'}">
                </div>
              </div>
              <div class="column">
                <div class="result" :style="{fontSize: '1.2em', fontWeight: 'bold'}">결과: {{ source | convertNumber('원')}}</div>
                <div class="result" :style="{fontSize: '1.2em', fontWeight: 'bold'}">결과: {{ source | convertNumber('$')}}</div>
                <div class="result" :style="{fontSize: '1.2em', fontWeight: 'bold'}">결과: {{ source | convertNumber('개')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>




export default {
  name: 'ConvertNumber',
  data () {
    return {
      source: '',
      srcArray: [],
      result: ''
    }
  },
}
</script>