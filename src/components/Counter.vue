<template>
  <div class="counter-view">
    <div class="contents-detail-view">
      <div class="contents-section">
        <div class="section-title">Types</div>
        <div class="type-wrapper">
          <div class="type-title">기본 카운터</div>
          <div class="type-desc"></div>
          <div class="type-preview">
            <FECounter @left="clickResult" @right="clickResult" />
            <div>결과값: {{result}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FECounter from '@/packages/FECounter/FECounter';
export default {
  name: 'CounterView',
  components: {FECounter},
  data() {
    return {
      result: 0

    }
  },
  methods: {
    clickResult(index) {
      this.result = index
    }
  }
}
</script>

