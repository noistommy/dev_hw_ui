<template>
  <div class="contents-view">
    <div class="chart-view">
      <XYCharts :container-size="container" />
    </div>
    <div class="chart-view">
      <PieCharts  :container-size="container_s" />
    </div>
    <div class="chart-view">
      <GaugeCharts  :container-size="container_s" />
    </div>
  </div>
</template>

<script>
import XYCharts from "./XYCharts";
import PieCharts from "./PieCharts";
import GaugeCharts from "./GaugeCharts";

export default {
  name: 'ChartsView',
  components: {
    XYCharts,
    PieCharts,
    GaugeCharts
  },
  data () {
    return {
      container: {
        width: '1024px',
        height: '500px'
      },
      container_s: {
        width: '600px',
        height: '500px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-view {
  height: 100%;
}
.chart-view {
  width: 1024px;
  height: 500px;

  margin-bottom: 30px;
  &> div {
    background-color: #f2f2f2;
  }
}
</style>