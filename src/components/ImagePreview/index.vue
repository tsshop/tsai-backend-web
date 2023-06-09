<template>
  <el-image
    v-if="showType == 1 && realSrc"
    :src="`${realSrc}`"
    fit="cover"
    :style="`width:${realWidth};height:${realHeight};margin-top:4px;`"
    :preview-src-list="realSrcList"
  >
    <div slot="error" class="image-slot">
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
  <div
    v-else-if="showType == 2 && realSrc"
    style="display: inline-block; margin-top: 2px"
  >
    <el-image
      v-for="(item, index) in realSrcList"
      :src="item"
      :key="index"
      fit="cover"
      :style="`width:${realWidth};height:${realHeight};margin-right:10px;`"
      :preview-src-list="realSrcList"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
  <div v-else :style="`width:${realWidth};height:${realHeight};`"></div>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  name: "ImagePreview",
  props: {
    src: {
      type: [String, Object],
      // required: true,
    },
    width: {
      type: [Number, String],
      default: "",
    },
    height: {
      type: [Number, String],
      default: "",
    },
    showType: {
      type: [String, Number],
      default: 1, //1 单张  2 多张
    },
  },
  computed: {
    realSrc() {
      if (!this.src) return "";
      let real_src = this.src;
      // let real_src = this.src.split(",")[0];
      if (isExternal(real_src)) {
        return real_src;
      }
      // console.log("real_src", real_src);
      return real_src;
      return process.env.VUE_APP_BASE_API + real_src;
    },
    realSrcList() {
      if (!this.src) return [];
      if (this.showType == 1) {
        return [this.realSrc];
      }
      let real_src_list = this.src.split(",");
      let srcList = [];
      real_src_list.forEach((item) => {
        if (isExternal(item)) {
          return srcList.push(item);
        }
        return srcList.push(process.env.VUE_APP_BASE_API + item);
      });
      return srcList;
    },
    realWidth() {
      return typeof this.width == "string" ? this.width : `${this.width}px`;
    },
    realHeight() {
      return typeof this.height == "string" ? this.height : `${this.height}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-image {
  border-radius: 5px;
  background-color: #ebeef5;
  box-shadow: 0 0 5px 1px #ccc;
  ::v-deep .el-image__inner {
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
  ::v-deep .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 30px;
  }
}
</style>
