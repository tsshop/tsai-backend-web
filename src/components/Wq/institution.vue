<template>
  <span>
    <el-tag v-for="(item, index) in get_list()" type="success" style="margin-right:10px;" :key="index">{{
      item
    }}</el-tag>
  </span>
</template>

<script>
export default {
  name: "institution",
  props: {
    institution: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    get_list() {
      if (!this.institution) return [];
      return String(this.institution).split(",");
    },
  },
};
</script>

<style>
</style>