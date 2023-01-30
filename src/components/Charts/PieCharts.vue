<template>
  <div class="myChart" ref="chartdiv" :style="containerSize"></div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default {
  name: 'ChartView',
  data() {
    return {}
  },
  props: {
    containerSize: {
      type: Object,
      required: true
    }
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);


    let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          name: 'Series',
          categoryField: "company",
          valueField: 'value',
          // startAngle: -180,
          // endAngle: 0
          radius: am5.percent(60),
          innerRadius: am5.percent(80),
          maxTooltipDistance: 0
        })
    );


    let data = [
      {
        company: 'Alpha',
        value: 1200
      },
      {
        company: 'Bravo',
        value: 800
      },
      {
        company: 'Charlie',
        value: 500
      },
      {
        company: 'Delta',
        value: 100
      },
      {
        company: 'Easy',
        value: 50
      },
    ];

    let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "company",
          alignLabels: false,
          // startAngle: -180,
          // endAngle: 0
          legendLabelText: "[{fill}]{category}{/}",
          legendValueText: "[bold {fill}]{value}[/]",
        })
    );
    series.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {
      centerY: am5.percent(50),
      y: am5.percent(50),
      layout: root.verticalLayout
    }));

    legend.data.setAll(series.dataItems)

    series.slices.template.setAll({
      strokeOpacity: 0.5,
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
      // tooltipText: ''
    })

    series.slices.template.states.create('active', {
      shiftRadius: 20,
      stroke: am5.color(0xffffff),
      strokeWidth: 5
    })

    series.labels.template.setAll({
      // fill: am5.color(0xffffff),
      text: "{category}",
      radius: 10,
      // inside: true,
      // textType: 'circular'
    })

    //
    // let label = chart.seriesContainer.children.push(am5.Label.new(root, {
    //   textAlign: 'center',
    //   centerY: am5.p100,
    //   centerX: am5.p50,
    //   text: '',
    //   fontSize: 30
    // }))
    //
    // // let currentSlice;
    // series.slices.template.on('active', (active, slice) => {
    //   // if(currentSlice && currentSlice !== slice && active) {
    //   //   currentSlice.set('active', false)
    //   // }
    //   console.log(slice)
    //   let color = slice.get('fill');
    //
    //   label.setAll({
    //     fill: color,
    //     text: "1200"
    //   })
    //
    //   // currentSlice = slice
    // })

    series.labels.template.set("visible", false)
    series.ticks.template.set("visible", false)





    series.appear(1000);
    chart.appear(1000, 100);

    this.root = root;

  },
  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
</script>
