<template>
  <div class="flex flex-y-center">
    <div
      class="tabs-item shou"
      @click="change(4)"
      :class="type == '4' ? 'color' : ''"
    >
      今日
    </div>
    <div
      class="tabs-item shou"
      @click="change(3)"
      :class="type == '3' ? 'color' : ''"
    >
      本周
    </div>
    <div
      class="tabs-item shou"
      @click="change(2)"
      :class="type == '2' ? 'color' : ''"
    >
      本月
    </div>
    <div
      class="tabs-item shou"
      @click="change(1, 1)"
      :class="type2 == 1 && type == '1' ? 'color' : ''"
    >
      本年
    </div>

    <div
      class="tabs-item shou"
      @click="change(1, 2)"
      :class="type2 == 2 && type == '1' ? 'color' : ''"
    >
      去年
    </div>

    <div
      class="flex flex-x-y ml-10 shou"
      style="position: relative; overflow: hidden"
    >
      <!-- <div @click="changeLastYear()" class="change-year-btn bgColor">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div style="padding: 0 10px">{{ year }}年</div>
      <div @click="changeNextYear()" class="change-year-btn bgColor">
        <i class="el-icon-arrow-right"></i>
      </div> -->
      <div>
        <div
          style="font-size: 14px"
          class="self-box"
          :class="value1 ? 'color' : ''"
          :style="!value1 ? 'color:#999999;' : ''"
        >
          {{
            value1
              ? parseTime(value1[0], "{y}-{m}-{d}") +
                "~" +
                parseTime(value1[1], "{y}-{m}-{d}")
              : "自定义范围"
          }}
        </div>
      </div>
      <el-date-picker
        class="opacity-date"
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="dateChange"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      type: 1, //1 年 2本月 3本周 4今日
      startTime: "",
      endTime: "",
      year: "",
      nYear: "",
      value1: null,
      type2: 1, //1年 2去年
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let year = new Date().getFullYear();
      this.year = year;
      this.nYear = year;
      this.startTime = `${year}-01-01 00:00:00`;
      this.endTime = `${year}-12-31 23:59:59`;

      this.change1();
    },
    change(type, type2 = 1) {
      this.value1 = null;
      this.type = type;
      if (type == 1) {
        this.type2 = type2;
        if (type2 == 1) {
          this.startTime = `${this.nYear}-01-01 00:00:00`;
          this.endTime = `${this.nYear}-12-31 23:59:59`;
        }
        if (type2 == 2) {
          this.startTime = `${this.nYear - 1}-01-01 00:00:00`;
          this.endTime = `${this.nYear - 1}-12-31 23:59:59`;
        }

        this.change1();
        return;
      }

      this.change1();
    },
    dateChange(e) {
      if (e) {
        this.type = 5;
        this.startTime = `${e[0]} 00:00:00`;
        this.endTime = `${e[1]} 23:59:59`;
        this.change1();
      }
    },
    change1() {
      this.$emit("change", {
        type: this.type,
        startTime: this.startTime,
        endTime: this.endTime,
      });
    },
    changeNextYear() {
      this.type = 1;
      this.year++;
      this.startTime = `${this.year}-01-01 00:00:00`;
      this.endTime = `${this.year}-12-31 23:59:59`;
      this.change1();
    },
    changeLastYear() {
      this.type = 1;
      this.year--;
      this.startTime = `${this.year}-01-01 00:00:00`;
      this.endTime = `${this.year}-12-31 23:59:59`;
      this.change1();
    },
  },
};
</script>

<style>
.change-year-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tabs-item {
  font-size: 14px;
  padding: 0 10px;
}
.opacity-date {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer !important;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.self-box{
  border: 1px solid #f4f4f4;
  padding:6px;
  border-radius: 6px;
  cursor: pointer;
}
</style>