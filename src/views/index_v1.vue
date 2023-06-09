<template>
  <div class="dashboard-editor-container">
    <refresh-line @refresh="refreshData"></refresh-line>

    <div class="">
      <panel-group
        :info="info1"
        @handleSetLineChartData="handleSetLineChartData"
      />

      <el-row :gutter="10">
        <el-col :lg="14" :md="24" :sm="24">
          <div
            style="
              background: #fff;
              padding: 10px;
              margin-bottom: 10px;
              border-radius: 10px;
            "
          >
            <div class="flex flex-x-b flex-y-center line-bar">
              <div class="line-bar-title">用户增长趋势</div>
              <tabs @change="change1" />
            </div>
            <line-chart :chart-data="lineChartData1" />
          </div>
        </el-col>
        <el-col :lg="10" :md="24" :sm="24">
          <div
            style="
              background: #fff;
              padding: 10px;
              margin-bottom: 10px;
              border-radius: 10px;
              height: 410px;
            "
          >
          <div class="flex flex-x-b flex-y-center line-bar">
              <div class="line-bar-title">用户占比</div>
             
            </div>
            <PieChart :pieData="pieData" />
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :lg="8">
          <div
            style="
              padding: 0 10px;
              background: #fff;
              border-radius: 10px;
              padding-top: 10px;
            "
          >
            <div class="flex flex-x-b flex-y-center line-bar">
              <div class="line-bar-title">收益总额</div>
            </div>
            <PanelMoneyVue :info="info2" />
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="16">
          <div
            style="
              padding: 0 10px;
              background: #fff;
              border-radius: 10px;
              margin-bottom: 10px;
              padding-top: 10px;
            "
          >
            <div class="flex flex-x-b flex-y-center line-bar">
              <div class="line-bar-title">收益趋势</div>
              <tabs @change="change2" />
            </div>
            <line-chart :chart-data="lineChartData2" />
          </div>
        </el-col>
      </el-row>

      <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->
      <!-- <allicons></allicons> -->
    </div>
  </div>
</template>

<script>
import PanelGroup from "./dashboard/PanelGroup";
import LineChart from "./dashboard/LineChart";
// import RaddarChart from "./dashboard/RaddarChart";
import PieChart from "./dashboard/PieChart";
// import BarChart from "./dashboard/BarChart";
import allicons from "@/views/components/icons/index";
import tabs from "./dashboard/tabs.vue";

import PanelMoneyVue from "./dashboard/PanelMoney.vue";
import RefreshLine from "./dashboard/refresh-line.vue";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "Index",
  components: {
    PanelGroup,
    LineChart,
    // RaddarChart,
    PieChart,
    // BarChart,
    allicons,
    tabs,
    PanelMoneyVue,
    RefreshLine,
  },
  data() {
    return {
      lineChartData1: {},
      lineChartData2: {},
      info1: {
        parentNumber: 0,
        teacherNumber: 0,
        wqInstitutionNumber: 0,
        wqStudentNumber: 0,
        wqUserNumber: 0,
      },
      info2: {
        classHourSum: 0,
        classNum: 0,
        newStudentNum: 0,
        profitSum: 0,
      },
      pieData: [],
    };
  },
  created() {
    this.get_info();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    refreshData() {
      this.get_info();
      this.change1(this.change1_info);
      this.change2(this.change2_info);
    },

    get_info() {
      this.request({
        url: "/index/num",
      }).then((res) => {
        if (res.code != 200) return;
        this.info1 = res.data;
      });
      this.request({
        url: "/index/profit",
      }).then((res) => {
        if (res.code != 200) return;
        this.info2 = res.data;
      });

      this.request({
        url: "/index/userProportion",
      }).then((res) => {
        console.log(res);
        if (res.code != 200) return;

        let get_name = (key) => {
          switch (key) {
            case "allUserNum":
              return "xx";
            case "vipUserNum":
              return "VIP用户";
            case "ordinaryUserNum":
              return "普通用户";
            case "numberUserNum":
              return "购买次数用户";
          }
        };
        this.pieData = Object.keys(res.data).filter(val=>val!='allUserNum').map((val) => {
          return {
            value: res.data[val],
            name: get_name(val),
            [get_name(val)]:res.data[val],
          };
        });
        console.log(this.pieData);
      });
    },
    change1(e) {
      this.change1_info = e;
      this.request({
        url: "/index/userDataStatistics",
        method: "post",
        data: this.change1_info,
      }).then((res) => {
        if (res.code != 200) return;
        this.setLine1(res.data, this.change1_info);
      });
    },
    change2(e) {
      this.change2_info = e;
      this.request({
        url: "/index/profitDataStatistics",
        method: "post",
        data: this.change2_info,
      }).then((res) => {
        if (res.code != 200) return;
        this.setLine2(res.data, this.change2_info);
      });
    },

    filterUnit(data, query) {
      let strArr = ["", "月", "日", "周", "时"];
      if (query.type == 3) {
        return ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      }
      let str1 = "";
      let str2 = "";
      if (query.type == 1) {
        str2 = "月";
      }
      if (query.type == 2) {
        str1 = new Date().getMonth() + 1 + "-";
      }
      if (query.type == 4) {
        str2 = "时";
      }
      if (query.type == 5) {
        // console.log('this.commafy(val)',this.commafy(val));
        data = data.map((val) => {
          val = String(val);
          return `${val.substr(0, 4)}-${val.substr(4, 2)}-${val.substr(6, 2)}`;
        });
      }

      // let month = new Date().getMonth() + 1;
      return data.map((val) => {
        return `${str1}${val}${str2}`;
      });
    },

    setLine1(data, query) {
      this.lineChartData1 = {
        xAxis: {
          data: this.filterUnit(data.unitNum, query),
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: query.type == 5 ? 40 : 20,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          // axisTick: {
          //   show: false,
          // },
          // show:false,
          // axisLine: {
          //   show: false,
          // },
        },
        legend: {
          data: ["用户"],
        },
        series: [
          {
            name: "机构",
            itemStyle: {
              normal: {
                color: "#FD7747",
                lineStyle: {
                  color: "#FD7747",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: data.userNumber,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            areaStyle: {
              // shadowColor: "rgba(253,119,71, 0.01)",
              // shadowBlur: 20,
              opacity: 0.3,
            },
            // smooth: false,
          },
        ],
      };
    },
    setLine2(data, query) {
      this.lineChartData2 = {
        xAxis: {
          data: this.filterUnit(data.unitNum, query),
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: query.type == 5 ? 40 : 20,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: ["vip收益", "购买次数收益"],
        },
        series: [
          {
            name: "vip收益",
            itemStyle: {
              normal: {
                color: "#FD7747",
                lineStyle: {
                  color: "#FD7747",
                  width: 2,
                },
              },
            },
            type: "line",
            data: data.vipProfit,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            // smooth: false,
          },
          {
            name: "购买次数收益",
            itemStyle: {
              normal: {
                color: "#3DC6D6",
                lineStyle: {
                  color: "#3DC6D6",
                  width: 2,
                },
              },
            },
            type: "line",
            data: data.numberProfit,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            // smooth: false,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scope>
.dashboard-editor-container {
  padding: 0 10px 10px 10px;
  background-color: #f8f8f8;
  position: relative;
  padding-bottom: 0;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.line-bar {
  height: 40px;
  font-size: 16px;
  color: #333333;
  padding: 0 20px;
}
.line-bar-title {
  position: relative;
}
.line-bar-title::before {
  position: absolute;
  content: "";
  width: 4px;
  height: 20px;
  background: #fd7747;
  border-radius: 4px;
  top: 50%;
  transform: translateY(-50%);
  left: -10px;
}
</style>
