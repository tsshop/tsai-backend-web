<template>
  <div ref="aaa" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
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
      default: "360px",
    },
    pieData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    pieData() {
      this.setOptions();
    },
  },
  data() {
    return {
      chart: null,
    };
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
      console.log("this.$el", this.$el);
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions();
    },
    setOptions() {
      let that = this;
      this.chart.setOption({
        tooltip: {
          // trigger: "item",
        },
     
        legend: {
          orient: "right",
          right: 20,
          bottom: "center",
          formatter: function (name, e) {
            let item = {};
            that.pieData.some(val=>{
              if(val[name]){
                item = val;
                return true;
              }
              return false;
            })
            // console.log(name, e);
            let spaceStr = ' ';
            if(name == '购买次数用户'){
              spaceStr = '  ';
            }
            if(name == '普通用户'){
              spaceStr = '         ';
            }
            if(name == 'VIP用户'){
              spaceStr = '          ';
            }
            return name + spaceStr +`${item.value || 0}`;
          },
        },
        label: {
          show: true,
          formatter(param) {
            // correct the percentage

            let allNum = that.pieData
              .map((val) => Number(val.value))
              .reduce((v1, v2) => v1 + v2, 0);

            return `${((param.data.value / allNum) * 100).toFixed(1)}%`;
          },
        },
        color: ["#FD7747", "#00CB8A", "#00A9DA"],
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: true,
            label: {
              show: true,
              // position: "center",
            },

            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            // data: [
            //   { value: 1048, name: "Search Engine" },
            //   { value: 735, name: "Direct" },
            //   { value: 580, name: "Email" },
            //   { value: 484, name: "Union Ads" },
            //   { value: 300, name: "Video Ads" },
            // ],
            data: this.pieData,
          },
        ],
      });
    },
  },
};
</script>
