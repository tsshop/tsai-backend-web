<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import  * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      // this.setOptions(this.chartData);
    },
    setOptions(val) {
      if (Object.keys(val).length == 0) return;

      this.chart.setOption(val);
      // this.chart.setOption({
      //   xAxis: {
      //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //     boundaryGap: false,
      //     axisTick: {
      //       show: false,
      //     },
      //   },
      //   grid: {
      //     left: 10,
      //     right: 10,
      //     bottom: 20,
      //     top: 30,
      //     containLabel: true,
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "cross",
      //     },
      //     padding: [5, 10],
      //   },
      //   yAxis: {
      //     axisTick: {
      //       show: false,
      //     },
      //   },
      //   legend: {
      //     data: ["机构", "教师", "家长", "学员"],
      //   },
      //   series: [
      //     {
      //       name: "机构",
      //       itemStyle: {
      //         normal: {
      //           color: "#709DFA",
      //           lineStyle: {
      //             color: "#709DFA",
      //             width: 2,
      //           },
      //         },
      //       },
      //       smooth: true,
      //       type: "line",
      //       data: expectedData,
      //       animationDuration: 2800,
      //       animationEasing: "cubicInOut",
      //     },
      //     {
      //       name: "教师",
      //       smooth: true,
      //       type: "line",
      //       itemStyle: {
      //         normal: {
      //           color: "#F7C533",
      //           lineStyle: {
      //             color: "#F7C533",
      //             width: 2,
      //           },
      //           areaStyle: {
      //             color: "#f3f8ff",
      //           },
      //         },
      //       },
      //       data: actualData,
      //       animationDuration: 2800,
      //       animationEasing: "quadraticOut",
      //     },
      //     {
      //       name: "家长",
      //       smooth: true,
      //       type: "line",
      //       itemStyle: {
      //         normal: {
      //           color: "#EB7B61",
      //           lineStyle: {
      //             color: "#EB7B61",
      //             width: 2,
      //           },
      //           areaStyle: {
      //             color: "#f3f8ff",
      //           },
      //         },
      //       },
      //       data: actualData,
      //       animationDuration: 2800,
      //       animationEasing: "quadraticOut",
      //     },
      //     {
      //       name: "学员",
      //       smooth: true,
      //       type: "line",
      //       itemStyle: {
      //         normal: {
      //           color: "#6FDDB1",
      //           lineStyle: {
      //             color: "#6FDDB1",
      //             width: 2,
      //           },
      //           areaStyle: {
      //             color: "#f3f8ff",
      //           },
      //         },
      //       },
      //       data: actualData,
      //       animationDuration: 2800,
      //       animationEasing: "quadraticOut",
      //     },
      //   ],
      // });
    },
  },
};
</script>
