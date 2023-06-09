<template>
  <div>
    <div class="refresh-box flex flex-x-end">
      <div
        alt="点击刷新"
        @click="refresh"
        class="flex flex-y-center refresh-box-content shou"
      >
        <div class="refresh-time">更新时间 {{ time }}</div>
        <i v-if="!loading" class="el-icon-refresh"></i>
        <i v-else class="el-icon-loading"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "refresh-line",
  data() {
    return {
      time: "",
      loading: false,
    };
  },
  created() {
    this.time = this.parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");
  },
  methods: {
    refresh() {
      if (this.loading) return;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.time = this.parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");
      this.$emit("refresh");
    },
  },
};
</script>

<style>
.refresh-box {
  /* position: fixed; */
  /* bottom: 20px; */
  /* right: 0; */
}
.refresh-box-content {
  /* background: rgba(255, 255, 255, 0.7); */
  height: 30px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.06); */
  padding: 0 20px;
  /* border-radius: 40px 0 0 40px; */
  cursor: pointer;
  user-select: none;
}
.refresh-time {
  font-size: 14px;
  color: #666666;
  margin-right: 10px;
}
</style>