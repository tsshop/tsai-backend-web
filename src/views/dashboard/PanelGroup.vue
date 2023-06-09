<template>
  <el-row :gutter="10" class="panel-group">
    <el-col :lg="6" :md="12" :sm="24" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <!-- <i class="el-icon-user-solid card-panel-icon" /> -->
          <img src="@/assets/ai/v1.png" class="v-image" style="width:40px;" alt="" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户总数</div>
          <count-to
            :start-val="0"
            :end-val="info.userNum"
            :duration="1000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :md="12" :sm="24" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <!-- <i class="el-icon-office-building card-panel-icon" /> -->
          <img src="@/assets/ai/v2.png" class="v-image" alt="" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">VIP用户数量</div>
          <count-to
            :start-val="0"
            :end-val="info.vipUserNum"
            :duration="1000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :md="12" :sm="24" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <!-- <i class="el-icon-s-custom card-panel-icon" /> -->
          <img src="@/assets/ai/v3.png" class="v-image" alt=""  style="width:44px"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">购买次数用户数量</div>
          <count-to
            :start-val="0"
            :end-val="info.numberUserNum"
            :duration="1000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :md="12" :sm="24" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <!-- <i class="el-icon-user card-panel-icon" /> -->
          <img src="@/assets/ai/v4.png" class="v-image" alt="" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">邀请用户数量</div>
          <count-to
            :start-val="0"
            :end-val="info.inviterUserNum"
            :duration="1000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    CountTo,
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 10px;
    // width: 25%;
  }

  .card-panel {
    border-radius: 10px;
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .v-image{
        transform: scale(1.2);
      }
      // .card-panel-icon-wrapper {
      //   color: #fff;
      // }

      // .icon-people {
      //   background: #40c9c6;
      // }

      // .icon-message {
      //   background: #36a3f7;
      // }

      // .icon-money {
      //   background: #f4516c;
      // }

      // .icon-shopping {
      //   background: #34bfa3;
      // }

      // .icon-five {
      //   background: #d4267c;
      // }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }
    .icon-five {
      color: #d4267c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;
      margin-left: 20px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  // .card-panel-description {
  //   display: none;

  // }

  // .card-panel-icon-wrapper {
  //   float: none !important;
  //   width: 100%;
  //   height: 100%;
  //   margin: 0 !important;

  //   .svg-icon {
  //     display: block;
  //     margin: 14px auto !important;
  //     float: none !important;
  //   }
  // }
}
.v-image {
  width: 50px;
  height: auto;
  transition: all 0.3s;
}
</style>
