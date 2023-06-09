<template>
  <div style="padding: 10px">
    <div class="flex flex-wrap flex-x-b">
      <div class="p-money-box">
        <div class="flex flex-y-center">
          <img src="@/assets/ai/s2.png" class="i-image" alt="" />
          <div class="ml-10">
            <div class="m-text">总收益</div>
            <div class="flex flex-y-end mt-8">
              <div class="m-number">{{ info.allProfit }}</div>
              <div class="m-unit">(元)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-money-box">
        <div class="flex flex-y-center">
          <img src="@/assets/ai/s1.png" class="i-image" alt="" />
          <div class="ml-10">
            <div class="m-text">VIP收益</div>
            <div class="flex flex-y-end mt-8">
              <div class="m-number">{{ info.vipProfit }}</div>
              <div class="m-unit">(元)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-money-box">
        <div class="flex flex-y-center">
          <img src="@/assets/ai/s3.png" class="i-image" alt="" />
          <div class="ml-10">
            <div class="m-text">购买次数收益</div>
            <div class="flex flex-y-end mt-8">
              <div class="m-number">{{ info.numberProfit }}</div>
              <div class="m-unit">(元)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  naem: "panelMoney",
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.p-money-box {
  /* background: #dcf3fd; */
  border-radius: 10px;
  width: calc(50% - 5px);
  margin-bottom: 10px;
  height: 155px;
  padding-left: 30px;
  padding-top: 40px;
  cursor: pointer;
  border: 1px solid #f4f4f4;

  transition: all 0.4s;
}
.p-money-box:hover {
  transform: scale(1.04);
  padding-left: 60px;
  /* font-weight: 600; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
}

.m-text {
  color: #666666;
  font-size: 18px;
}
.m-number {
  color: #333333;
  font-size: 26px;
  line-height: 26px;
  font-weight: bold;
}
.m-unit {
  color: #333333;
  font-size: 14px;
  margin-left: 6px;
  line-height: 22px;
}
.i-image {
  width: 60px;
  height: 60px;
}
.mt-8 {
  margin-top: 4px;
}
</style>