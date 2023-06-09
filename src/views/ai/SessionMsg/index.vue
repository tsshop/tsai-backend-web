<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="qq-query"
    >
      <el-form-item label="" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="logId">
        <el-input
          v-model="queryParams.logId"
          placeholder="请输入用户Id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="templateId">
        <el-input
          v-model="queryParams.templateId"
          placeholder="请输入模板id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="isFromUser">
        <!-- <el-input
          v-model="queryParams.isFromUser"
          placeholder="请输入是否用户发送"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->
        <el-select placeholder="消息类型" v-model="queryParams.isFromUser" clearable>
          <el-option label="用户发送" :value="0"></el-option>
          <el-option label="Ai回复" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="daterangeSendTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="更新时间">
        <el-date-picker
          v-model="daterangeUpdateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="评价" prop="score">
        <el-input
          v-model="queryParams.score"
          placeholder="请输入评价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['ai:SessionMsg:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['ai:SessionMsg:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['ai:SessionMsg:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['ai:SessionMsg:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="SessionMsgList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" width="120"/>
      <el-table-column label="用户Id" align="center" prop="logId" width="120"/>
      <el-table-column label="模板id" align="center" prop="templateId" width="120"/>
      <el-table-column label="是否用户发送" align="center" prop="isFromUser" width="140">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isFromUser == 1?'primary':'success'">
            {{scope.row.isFromUser == 1?'用户发送':'小助手回复'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="消息内容" align="left" prop="content" show-overflow-tooltip/>
      <el-table-column
        label="发送时间"
        align="center"
        prop="sendTime"
        width="180"
        
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.sendTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="评价" align="center" prop="score" /> -->
      <!-- <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"

      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['ai:SessionMsg:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['ai:SessionMsg:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改会话聊天记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户Id" prop="logId">
          <el-input v-model="form.logId" placeholder="请输入用户Id" />
        </el-form-item>
        <el-form-item label="模板id" prop="templateId">
          <el-input v-model="form.templateId" placeholder="请输入模板id" />
        </el-form-item>
        <el-form-item label="是否用户发送" prop="isFromUser">
          <el-input
            v-model="form.isFromUser"
            placeholder="请输入是否用户发送"
          />
        </el-form-item>
        <el-form-item label="消息内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="发送时间" prop="sendTime">
          <el-date-picker
            clearable
            v-model="form.sendTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发送时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评价" prop="score">
          <el-input v-model="form.score" placeholder="请输入评价" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listSessionMsg,
  getSessionMsg,
  delSessionMsg,
  addSessionMsg,
  updateSessionMsg,
} from "@/api/ai/SessionMsg";

export default {
  name: "SessionMsg",
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
      // 会话聊天记录表格数据
      SessionMsgList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 评价时间范围
      daterangeSendTime: [],
      // 评价时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        logId: null,
        templateId: null,
        isFromUser: null,
        content: null,
        sendTime: null,
        updateTime: null,
        score: null,
        orderByColumn: "id",
        isAsc: "desc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        logId: [{ required: true, message: "用户Id不能为空", trigger: "blur" }],
        templateId: [
          { required: true, message: "模板id不能为空", trigger: "blur" },
        ],
        isFromUser: [
          { required: true, message: "是否用户发送不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "消息内容不能为空", trigger: "blur" },
        ],
        sendTime: [
          { required: true, message: "发送时间不能为空", trigger: "blur" },
        ],
        score: [{ required: true, message: "评价不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询会话聊天记录列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeSendTime && "" != this.daterangeSendTime) {
        this.queryParams.params["beginSendTime"] = this.daterangeSendTime[0];
        this.queryParams.params["endSendTime"] = this.daterangeSendTime[1];
      }
      if (null != this.daterangeUpdateTime && "" != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] =
          this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      listSessionMsg(this.queryParams).then((response) => {
        this.SessionMsgList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        logId: null,
        templateId: null,
        isFromUser: null,
        content: null,
        sendTime: null,
        updateTime: null,
        score: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeSendTime = [];
      this.daterangeUpdateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加会话聊天记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getSessionMsg(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改会话聊天记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateSessionMsg(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSessionMsg(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除会话聊天记录编号为"' + ids + '"的数据项？')
        .then(function () {
          return delSessionMsg(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "ai/SessionMsg/export",
        {
          ...this.queryParams,
        },
        `SessionMsg_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
