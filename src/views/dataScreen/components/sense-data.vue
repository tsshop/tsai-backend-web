<template>
  <div class="" @mouseleave="$emit('close')">
    <myTitle title="检测数据"></myTitle>
    <!-- 用户信息 -->
    <div class="user-info flex flex-x-b mt20" style="width: 400px">
      <userInfoItem label="检测人姓名：">{{ info.userName }}</userInfoItem>
      <userInfoItem label="检测人年龄：" :isAge="!!info.age">{{
        info.age
      }}</userInfoItem>
    </div>
    <img
      src="../../../assets/images/scrrentImages/line-02.png"
      style="width: 500px; height: 3px; margin: 10px auto"
      alt=""
    />
    <div v-for="(item, i) in healthList" :key="i">
      <health-data-item :info="item" @show="show(item, i)"></health-data-item>
    </div>
  </div>
</template>

<script>
import myTitle from "./my-title.vue";
import userInfoItem from "./user-info-item.vue";
import healthDataItem from "./health-data-item.vue";
import bloodPressure from "../../../assets/images/scrrentImages/blood-pressure.png";
import palpitation from "../../../assets/images/scrrentImages/palpitation.png";
import oxygen from "../../../assets/images/scrrentImages/oxygen .png";
import bloodSugar from "../../../assets/images/scrrentImages/blood-sugar.png";
import uricAcid from "../../../assets/images/scrrentImages/uric-acid.png";
import cholesterol from "../../../assets/images/scrrentImages/cholesterol.png";
import { initData } from '../utils'
export default {
  name: "SzHealthyBackendWebSenseData",
  components: { myTitle, userInfoItem, healthDataItem },
  props: {
    info: {
      type: Object,
      default: {},
    },
  },
  computed: {
    healthList() {
      const {
        szDetectionBloodPressure,
        szDetectionEcg,
        szDetectionBloodOxygen,
        szDetectionBloodSugar,
        szDetectionUricAcid,
        szDetectionCholesterol,
        age,
        sex
      } = this.info;
      return [
        {
          title: "血压数据",
          imageUrl: bloodPressure,
          value: initData(szDetectionBloodPressure,'value','','血压'),
          unit:  initData(szDetectionBloodPressure,'unit','mmHg'),
          updateTime: initData(szDetectionBloodPressure,'time'),
          historyList: initData(szDetectionBloodPressure,'historyList','mmHg','血压'),
        },
        {
          title: "心电数据",
          imageUrl: palpitation,
          value: initData(szDetectionEcg,'value'),
          unit: initData(szDetectionEcg,'unit','bpm'),
          updateTime: initData(szDetectionEcg,'time'),
          historyList: initData(szDetectionEcg,'historyList','bpm','心率'),
        },
        {
          title: "血氧数据",
          imageUrl: oxygen,
          value: initData(szDetectionBloodOxygen,'value','','血氧'),
          unit: initData(szDetectionBloodOxygen,'unit','%'),
          updateTime: initData(szDetectionBloodOxygen,'time'),
          historyList: initData(szDetectionBloodOxygen,'historyList','%','血氧'),
        },
        {
          title: "血糖数据",
          imageUrl: bloodSugar,
          value: initData(szDetectionBloodSugar,'value'),
          unit: initData(szDetectionBloodSugar,'unit','mmol/L'),
          updateTime: initData(szDetectionBloodSugar,'time'),
          historyList: initData(szDetectionBloodSugar,'historyList','mmol/L','血糖'),
        },
        {
          title: "尿酸数据",
          imageUrl: uricAcid,
          value: initData(szDetectionUricAcid,'value'),
          unit: initData(szDetectionUricAcid,'unit','umol/L'),
          updateTime:initData(szDetectionUricAcid,'time'),
          historyList: initData(szDetectionUricAcid,'historyList','umol/L','尿酸',age,sex),
        },
        {
          title: "胆固醇数据",
          imageUrl: cholesterol,
          value: initData(szDetectionCholesterol,'value'),
          unit: initData(szDetectionCholesterol,'unit','mmol/L'),
          updateTime:initData(szDetectionCholesterol,'time'),
          historyList: initData(szDetectionCholesterol,'historyList','mmol/L','胆固醇'),
        },
      ];
    },
  },
  mounted() {},

  methods: {
    getTop(index) {
      return index * 90 + 100;
    },
    show(item, i) {
      this.$emit("show", {
        list: item.historyList,
        top: this.getTop(i),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>