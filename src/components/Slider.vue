<template>
  <div id="SliderView">
    <!--        <div class="where-is-click" :style="{width: `${clickPos.x}px`, height: `${clickPos.y}px`}"></div>-->
    <div class="contents-detail-view">
      <div class="contents-section">
        <div class="section-title">Type</div>
        <div class="type-wrapper" v-for="item in contentsList" :key="item.id">
          <div class="type-title"> {{item.title}}</div>
          <div class="type-desc">{{item.description}}</div>
          <div class="type-preview" v-for="(el, index) in item.option" :key="`option-${item.id}-${index}`">
            <hw-slider v-model="el.modelValue" v-bind="el.props" @update="setResult" />
          </div>
        </div>

        <div class="type-wrapper">
          <div class="type-title"> 입력값 적용 설정 </div>
          <div class="type-desc">
            <div class="hw-input inline">
              <input type="number" @input="setInputValue" class="hw-input" />
            </div>
            <div class="type-error danger-color" v-if="errorMsg">
              {{errorMsg}}
            </div>
          </div>
          <div class="type-preview">
            <hw-slider v-model="initInput" @update="setInitInput" @error="setError"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HwSlider from '@/packages/HwSlider/HwSlider';

export default {
  // components: {HwSlider},
  name: 'HwSliderView',
  data () {
    return {
      initInput: 0,
      maxValue: 100,
      errorMsg: null,
      contentsList:[
        {
          title: 'Standard',
          description: '기본 옵션',
          option: [
            {modelValue: 45, props: {},}
          ],
        }, {
          id: 1,
          title: '초기값 설정',
          description: '',
          option: [
            {modelValue: 35, props: {},}
          ],
        }, {
          id: 2,
          title: '사용자 범위 설정',
          description: '',
          option: [
            {modelValue: 30, props: {maxValue: 60}}
          ],
        }, {
          id: 3,
          title: '범위 표시 설정',
          description: '라벨만 표시 | 결과값만 표시 | 전부 표시',
          option: [
            {modelValue: 35, props: {showLabel: true},},
            {modelValue: 45, props: {showValue: true},},
            {modelValue: 55, props: {showValue: true, showLabel: true},},
          ],
        }, {
          id: 4,
          title: '툴팁 사용 설정',
          description: '',
          option: [
            {modelValue: 0, props: {showTooltip: true}}
          ],
        },{
          id: 5,
          title: '사용자 단위 설정',
          description: '',
          option: [
            {modelValue: 0, props: {maxValue: 12, unitText: '시', showValue: true, showLabel: true,showStep: true, stepSize: 1}},
            {modelValue: 25, props: {maxValue: 60, unitText: '분', showValue: true, showLabel: true}},
            {modelValue: 30, props: {maxValue: 60,unitText: '초', showValue: true, showLabel: true}}
          ],
        }, {
          id: 6,
          title: '비활성 설정',
          description: '',
          option: [
            {modelValue: 0, props: {disabled: true}}
          ],
        },{
          id: 7,
          title: '스텝 설정',
          description: '',
          option: [
            {modelValue: 10, props: {showStep: true, stepSize: 10}},
            {modelValue: 10, props: {showStep: true,stepSize: 20}},
            {modelValue: 10, props: {showStep: true,stepSize: 25}}
          ],
        },
      ]
    }
  },
  methods: {
    setValue(payload) {
      this.contentsList = payload.value
    },
    setInitInput(payload) {
      this.initInput = payload.value
    },
    setInputValue(e) {
      this.errorMsg = null;
      this.initInput = parseInt(e.target.value)
    },
    setResult(payload) {
      console.log(payload)
    },
    setError (payload) {
      this.errorMsg = payload.message;
    }
  }
}
</script>
