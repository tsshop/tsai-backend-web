<template>
  <div>
    <el-dialog
      title="学员详情"
      :visible.sync="show"
      width="900px"
      append-to-body
    >
      <div style="padding: 0 10px 40px 10px; line-height: 24px" v-if="row">
        <!-- 学员信息 -->
        <div class="flex flex-y-center">
          <image-preview
            width="60px"
            height="60px"
            style="border-radius: 50%"
            :src="row.headPortrait"
          />
          <div class="ml-30">
            <div>{{ row.name }}</div>
            <div style="color: #999999">
              {{ parseTime(row.createTime, "{y}-{m}-{d}") }}
            </div>
          </div>
        </div>
        <div class="flex mt-30">
          <div class="">微信号：{{ row.wechatNum }}</div>
          
        </div>
         <div class="flex mt-30">
          <div class="" >
            所属机构：<institution :institution="row.wqInstitutionName" />
          </div>
        </div>
        <!-- 学员信息 -->
        <!-- 联系人 -->
        <div class="flex flex-wrap mt-20">
          <span class="color">联系人信息</span>
          <span>（{{ info.num }}位联系人）</span>
        </div>

        <div
          v-if="info.num > 0"
          class="mt-20 flex flex-wrap"
          style="width: 600px"
        >
          <div
            v-for="(item, index) in info.wqFamilyMemberList"
            :key="index"
            class="w-50"
          >
            <span>{{ item.name }}：</span>
            <span>{{ item.phone }}</span>
            <span v-if="item.memberRole == 1">（常用联系人）</span>
          </div>
        </div>

        <!-- 联系人 -->

        <!-- 数据 -->
        <div class="mt-20" v-if="show" style="min-height: 300px">
          <el-tabs v-model="activeTabs">
            <el-tab-pane label="已购课程" name="first">
              <course :userId="userId"></course>
            </el-tab-pane>
            <el-tab-pane label="上课记录" name="second">
              <log :userId="userId"></log>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 数据 -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import course from "./StudentTable/course.vue";
import log from "./StudentTable/log.vue";
import institution from "./institution.vue";
export default {
  name: "status-detail",
  components: {
    course,
    log,
    institution,
  },
  data() {
    return {
      row: null,
      show: false,
      activeTabs: "first",
      userId: "",
      info: {
        num: 0,
        wqFamilyMemberList: [],
      },
    };
  },
  mounted() {},
  methods: {
    open(row) {
      //   this.request({
      //     url: "/index/dataStatistics",
      //     method: "POST",
      //     data: {
      //       type: 5,
      //       endTime: "2023-12-31 23:59:59",
      //       startTime: "2023-01-01 00:00:00",
      //     },
      //   });
      this.row = row;
      this.userId = row.id;
      this.get_info();
      this.show = true;
    },
    get_info() {
      this.request({
        url: `/wq/WqStudent/getFamilyInfo/${this.userId}`,
      }).then((res) => {
        if (res.code != 200) return;
        this.info = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>