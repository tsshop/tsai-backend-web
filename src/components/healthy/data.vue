<template>
  <div>
    <!-- 添加或修改用户对话框 -->
    <el-dialog
      :before-close="before_close"
      :title="get_title()"
      :visible.sync="show"
      width="90%"
      append-to-body
    >
      <div style=" min-height: 800px" v-if="show">
        <el-tabs :lazy="true" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="血氧" name="detectionBloodOxygen">
            <detectionBloodOxygen
              v-if="load_obj['detectionBloodOxygen']"
              :userId="userId"
            ></detectionBloodOxygen>
          </el-tab-pane>

          <el-tab-pane label="血压" name="detectionBloodPressure">
            <detectionBloodPressure
              v-if="load_obj['detectionBloodPressure']"
              :userId="userId"
            ></detectionBloodPressure>
          </el-tab-pane>

          <el-tab-pane label="血糖" name="detectionBloodSugar">
            <detectionBloodSugar
              v-if="load_obj['detectionBloodSugar']"
              :userId="userId"
            ></detectionBloodSugar>
          </el-tab-pane>

          <el-tab-pane label="体脂体重" name="detectionBodyFat">
            <detectionBodyFat
              v-if="load_obj['detectionBodyFat']"
              :userId="userId"
            ></detectionBodyFat>
          </el-tab-pane>

          <el-tab-pane label="胆固醇" name="detectionCholesterol">
            <detectionCholesterol
              v-if="load_obj['detectionCholesterol']"
              :userId="userId"
            ></detectionCholesterol>
          </el-tab-pane>

          <el-tab-pane label="心电" name="detectionEcg">
            <detectionEcg
              v-if="load_obj['detectionEcg']"
              :userId="userId"
            ></detectionEcg>
          </el-tab-pane>

          <el-tab-pane label="体温" name="detectionTemperature">
            <detectionTemperature
              v-if="load_obj['detectionTemperature']"
              :userId="userId"
            ></detectionTemperature>
          </el-tab-pane>

          <el-tab-pane label="睡眠" name="sleep">
            <sleep
              v-if="load_obj['sleep']"
              :userId="userId"
            ></sleep>
          </el-tab-pane>



          <el-tab-pane label="尿酸" name="detectionUricAcid">
            <detectionUricAcid
              v-if="load_obj['detectionUricAcid']"
              :userId="userId"
            ></detectionUricAcid>
          </el-tab-pane>


           <!-- <el-tab-pane label="防跌倒" name="fall">
            <fall
              v-if="load_obj['fall']"
              :userId="userId"
            ></fall>
          </el-tab-pane> -->


        </el-tabs>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
// import detectionBloodFat from "@/views/healthy/detectionBloodFat/index";//尿酸
import detectionBloodOxygen from "@/views/healthy/detectionBloodOxygen/index"; //血氧
import detectionBloodPressure from "@/views/healthy/detectionBloodPressure/index"; //血压
import detectionBodyFat from "@/views/healthy/detectionBodyFat/index"; //体脂体重
import detectionBloodSugar from "@/views/healthy/detectionBloodSugar/index"; //血糖
import detectionCholesterol from "@/views/healthy/detectionCholesterol/index"; //胆固醇
import detectionEcg from "@/views/healthy/detectionEcg/index"; //心电
import detectionTemperature from "@/views/healthy/detectionTemperature/index"; //体温
import detectionUricAcid from "@/views/healthy/detectionUricAcid/index"; //尿酸
import fall from "@/views/healthy/fall/index"; //防跌倒
import sleep from "@/views/healthy/sleep/index"; //睡眠
// import detectionUrinalysis from "@/views/healthy/detectionUrinalysis/index";//

export default {
  name: "healthyDate",
  components: {
    detectionBloodOxygen,
    // detectionBloodFat,
    detectionBloodPressure,
    detectionBodyFat,
    detectionBloodSugar,
    detectionCholesterol,
    detectionEcg,
    detectionTemperature,
    detectionUricAcid,
    fall,
    sleep
    // detectionUrinalysis,
  },
  props: {},
  data() {
    return {
      show: false,
      userId: "",
      activeName: "detectionBloodOxygen",
      load_obj: {},
      row:null,
    };
  },
  methods: {
    open(row) {
      if (row) {
        this.row = row;
        this.load_obj["detectionBloodOxygen"] = true;
        this.activeName = 'detectionBloodOxygen';
        this.userId = row.id;
        this.show = true;
      }
    },
    handleClick(e) {
      console.log(e.index);
      console.log(e.paneName);
      this.load_obj[e.paneName] = true;
    },
    before_close() {
      this.show = false;
      this.load_obj = {};
      this.userId = "";
    },
    get_title(){
        if(this.row && this.row.fullName){
            return `检测报告 (${this.row.fullName} ${this.row.idCard})`;
        }
        return '检测报告';
    }
  },
};
</script>

<style>
.el-dialog__body {
  padding: 10px 30px 30px 30px;
}
</style>