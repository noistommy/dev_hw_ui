<template>
  <div class="myChart" ref="chartdiv" :style="containerSize"></div>

</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default {
  name: 'XYChart',
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

    // root.dateFormatter.setAll({
    //   dateFormat: "yyyy-MM-dd",
    //   dateFields: ["valueX"]
    // });

    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "ZoomX",
          pinchZoomX: true,
          maxTooltipDistance: 0
          // layout: root.verticalLayout
        })
    );

    let data = [
      {
        date: new Date('2022-04-01').getTime(),
        category: "Alpha",
        value1: 1400,
        value2: 1589
      },
      {
        date: new Date('2022-04-02').getTime(),
        category: "Bravo",
        value1: 1200,
        value2: 1600
      },
      {
        date: new Date('2022-04-03').getTime(),
        category: "Charlie",
        value1: 1250,
        value2: 1450
      },
      {
        date: new Date('2022-04-04').getTime(),
        category: "Delta",
        value1: 1050,
        value2: 1230
      },
      {
        date: new Date('2022-04-05').getTime(),
        category: "Easy",
        value1: 1000,
        value2: 1300
      },
      {
        date: new Date('2022-04-06').getTime(),
        category: "Foxtrot",
        value1: 1200,
        value2: 1400
      },
      {
        date: new Date('2022-04-07').getTime(),
        category: "Golf",
        value1: 1150,
        value2: 1230
      }
    ];
    // Create Y-axis
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
          tooltip: am5.Tooltip.new(root, {})
        })
    );
    // Create X-Axis

    // let xAxis = chart.xAxes.push(
    //     am5xy.CategoryAxis.new(root, {
    //       renderer: am5xy.AxisRendererX.new(root, {}),
    //       categoryField: "category"
    //     })
    // );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        // maxDeviation: 0.2,
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    xAxis.data.setAll(data);

    let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value1",
          valueXField: "date",
          categoryXField: "category"
        })
    );
    series1.data.setAll(data);

    let series2 = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          minBulletDistance: 10,
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value2",
          valueXField: "date",
          categoryXField: "category",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "vertical",
            labelText: "[bold]VALUE[/]\n {valueY}EA"
          })
        })
    );
    series2.data.setAll(data);

    // Add legend
    // let legend = chart.children.push(am5.Legend.new(root, {}));
    // legend.data.setAll(chart.series.values);

    // Add cursor
   chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // cursor.lineY.set("visible", false);

    series2.bullets.push(function() {
      let circle = am5.Circle.new(root, {
        radius: 6,
        fill: series2.get("fill"),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2,
        shadowColor: series2.get("fill"),
        shadowBlur: 20,
        shadowOffsetX: 15,
        shadowOffsetY: 15,
        shadowOpacity: 0.8
      });

      return am5.Bullet.new(root, {
        sprite: circle
      });
    });



    series1.columns.template.setAll({
      cornerRadiusTL: 15, cornerRadiusTR: 15, width: 30,
      // shadowColor: am5.color(0x000000),
      // shadowBlur: 20,
      // shadowOffsetX: 4,
      // shadowOffsetY: 4
    });

    series2.strokes.template.setAll({
      strokeWidth: 2,
      shadowColor: series2.get('stroke'),
      shadowBlur: 20,
      shadowOffsetX: 15,
      shadowOffsetY: 15,
      shadowOpacity: 0.8
    })
    series1.columns.template.adapters.add('fill', function(fill, target) {
      return chart.get('colors').getIndex(series1.columns.indexOf(target));
    });

    series1.columns.template.adapters.add('stroke', function(fill, target) {
      return chart.get('colors').getIndex(series1.columns.indexOf(target));
    });

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

