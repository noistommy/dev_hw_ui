<template>
  <div class="myChart gauge" ref="chartdiv" :style="containerSize"></div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
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
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        radius: am5.percent(70),
        innerRadius: am5.percent(40),
        startAngle: -90,
        endAngle: 270,
      })
    );

    let data = [
      {
        category: 'Alpha',
        value: 80,
        full: 100,
        columnSettings: {
          fill: chart.get('colors').getIndex(0)
        }
      },
      {
        category: 'Bravo',
        value: 60,
        full: 100,
        columnSettings: {
          fill: chart.get('colors').getIndex(1)
        }
      },
      {
        category: 'Charlie',
        value: 70,
        full: 100,
        columnSettings: {
          fill: chart.get('colors').getIndex(2)
        }
      },
    ];

    let xRenderer = am5radar.AxisRendererCircular.new(root, {});

    xRenderer.labels.template.setAll({
      radius: 10
    });

    xRenderer.grid.template.setAll({
      forceHidden: true
    });

    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20
    });

    yRenderer.grid.template.setAll({
      forceHidden: true
    });

    let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer
    }));

    yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 18,
      templateField: "columnSettings",
      // visible: false
    });


    yAxis.data.setAll(data);

    let series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "full",
      categoryYField: "category",
      // fill: am5.color(0xffffff),
      fill: root.interfaceColors.get("alternativeBackground")
      // legendLabelText: "[{fill}]{category}{/}",
      // legendValueText: "[bold {fill}]{value}[/]",
    }));

    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
    });

    series1.data.setAll(data);

    let series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "value",
      categoryYField: "category"
    }));

    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "[bold]{category}[/]: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings"
    });

    series2.data.setAll(data);

    // Add legend
    // let legend = chart.children.push(am5.Legend.new(root, {
    //   centerY: am5.percent(50),
    //   y: am5.percent(50),
    //   layout: root.verticalLayout
    // }));
    //
    // legend.data.setAll(series.dataItems)
    //
    // series.slices.template.setAll({
    //   strokeOpacity: 0.5,
    //   stroke: am5.color(0xffffff),
    //   strokeWidth: 2,
    //   // tooltipText: ''
    // })
    //
    // series.slices.template.states.create('active', {
    //   shiftRadius: 20,
    //   stroke: am5.color(0xffffff),
    //   strokeWidth: 5
    // })
    //
    // series.labels.template.setAll({
    //   // fill: am5.color(0xffffff),
    //   text: "{category}",
    //   radius: 10,
    //   // inside: true,
    //   // textType: 'circular'
    // })
    //
    // series.labels.template.set("visible", false)
    // series.ticks.template.set("visible", false)





    series1.appear(1000);
    series2.appear(1000);
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
