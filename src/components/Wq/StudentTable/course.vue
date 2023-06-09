<template>
  <div>
    <el-table v-loading="loading" :data="WqCourseOrderList" size="mini">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="订单id" align="center" prop="id" width="100" />
      <el-table-column
        label="课程名称"
        align="center"
        prop="coursePackageName"
      />

      <!-- <el-table-column
        label="课程套餐id"
        align="center"
        prop="coursePackageId"
      /> -->

      <el-table-column label="支付金额" align="center" prop="orderAmount" width="120"/>

      <el-table-column label="时长(分钟)" align="center" prop="courseHour" width="120"/>

      <el-table-column
        label="购买时间"
        align="center"
        prop="createTime"
        width="140"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d} {h}-{i}") }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listWqCourseOrder } from "@/api/wq/WqCourseOrder";

export default {
  name: "course",
  props: {
    userId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 课程订单表格数据
      WqCourseOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 经办人id时间范围
      daterangeCreateTime: [],
      // 经办人id时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        orderNumber: null,
        studentId: null,
        studentName: null,
        coursePackageId: null,
        courseHour: null,
        endTime: null,
        orderStatus: 1,
        orderAmount: null,
        createTime: null,
        updateTime: null,
        responsiblePersonId: null,
      },

      orderStatusText: ["待支付", "已支付", "退款中", "已退款"],
      orderStatusColor: ["info", "success", "warning", "danger"],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询课程订单列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && "" != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] =
          this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      if (null != this.daterangeUpdateTime && "" != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] =
          this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      this.queryParams.studentId = this.userId;
      listWqCourseOrder(this.queryParams).then((response) => {
        this.WqCourseOrderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
  },
};
</script>
