<template>
  <div>
    <el-table v-loading="loading" :data="WqStudentCourseLogList" size="mini">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="id" align="center" prop="id" width="80" /> -->
      <el-table-column
        label="上课时间"
        align="center"
        prop="courseStartTime"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.courseStartTime, "{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下课时间"
        align="center"
        prop="courseEndTime"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.courseEndTime, "{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程名称" align="center" prop="courseName" />

      <el-table-column label="消课时长" align="center" prop="deductDuration" />
      <el-table-column label="剩余时长" align="center" prop="residueDuration" />
      <el-table-column label="老师姓名" align="center" prop="teacherName" />

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport(scope.row)"
            v-hasPermi="['wq:WqStudentCourseLog:export']"
            >导出</el-button
          >
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
import {
  listWqStudentCourseLog,
  getWqStudentCourseLog,
  delWqStudentCourseLog,
  addWqStudentCourseLog,
  updateWqStudentCourseLog,
} from "@/api/wq/WqStudentCourseLog";

export default {
  props: {
    userId: {
      type: [String, Number],
      default: "",
    },
  },
  name: "log",
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
      // 学生上课日志表格数据
      WqStudentCourseLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 下课时间时间范围
      daterangeCreateTime: [],
      // 下课时间时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        studentId: null,
        institutionId: null,
        teacherId: null,
        studentName: null,
        teacherName: null,
        courseName: null,
        courseState: null,
        deductDuration: null,
        residueDuration: null,
        courseStartTime: null,
        courseEndTime: null,
        createTime: null,
        updateTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        studentId: [
          { required: true, message: "学生 id不能为空", trigger: "blur" },
        ],
        institutionId: [
          { required: true, message: "机构 id不能为空", trigger: "blur" },
        ],
        teacherId: [
          { required: true, message: "老师 id不能为空", trigger: "blur" },
        ],
        studentName: [
          { required: true, message: "学生姓名不能为空", trigger: "blur" },
        ],
        teacherName: [
          { required: true, message: "老师姓名不能为空", trigger: "blur" },
        ],
        courseName: [
          { required: true, message: "课程名称不能为空", trigger: "blur" },
        ],
        courseState: [
          { required: true, message: "上课状态不能为空", trigger: "blur" },
        ],
        deductDuration: [
          {
            required: true,
            message: "消课时长(小时)不能为空",
            trigger: "blur",
          },
        ],
        residueDuration: [
          {
            required: true,
            message: "剩余时长(小时)不能为空",
            trigger: "blur",
          },
        ],
        courseStartTime: [
          { required: true, message: "上课时间不能为空", trigger: "blur" },
        ],
        courseEndTime: [
          { required: true, message: "下课时间不能为空", trigger: "blur" },
        ],
      },
      status: {
        "": "",
        null: "",
        0: "已到",
        1: "迟到",
        2: "请假",
        3: "缺课",
        4: "已接走",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询学生上课日志列表 */
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
      listWqStudentCourseLog(this.queryParams).then((response) => {
        this.WqStudentCourseLogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    handleExport(row) {
      this.download(
        "wq/WqStudentCourseLog/export",
        {
          ...this.queryParams,
          id: row.id,
        },
        `WqStudentCourseLog_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
