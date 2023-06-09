<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      class="qq-query"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="" prop="deleted">
        <!-- <el-input
          v-model="queryParams.deleted"
          placeholder="请输入封禁状态：0：正常，1：封禁(不允许登录)"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->
        <el-select
          placeholder="账户状态"
          v-model="queryParams.deleted"
          clearable
        >
          <el-option label="正常" :value="0"></el-option>
          <el-option label="封禁" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="inviterId">
        <el-input
          v-model="queryParams.inviterId"
          placeholder="请输入邀请人id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="创建时间始"
          end-placeholder="创建时间末"
        ></el-date-picker>
      </el-form-item>

      <!-- <el-form-item label="微信oppenId" prop="openId">
        <el-input
          v-model="queryParams.openId"
          placeholder="请输入微信oppenId"
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
          v-hasPermi="['ai:User:add']"
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
          v-hasPermi="['ai:User:edit']"
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
          v-hasPermi="['ai:User:remove']"
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
          v-hasPermi="['ai:User:export']"
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
      :data="UserList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户ID" align="center" prop="id" width="80" />
      <el-table-column label="昵称" align="center" prop="name" width="120" />
      <el-table-column label="头像" align="center" prop="avatarUrl" width="120">
        <template slot-scope="scope">
          <ImagePreview
            width="50px"
            height="50px"
            :src="get_avatar(scope.row.avatarUrl)"
          />
          <!--  <img
            :src="get_avatar(scope.row.avatarUrl)"
            alt=""
            style="width: 50px; height: 50px"
          /> -->
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="性别：0：未知 1-男，2：女"
        align="center"
        prop="gender"
      /> -->
      <el-table-column label="手机号" align="center" prop="phone" width="120" />
      <!-- <el-table-column label="密码" align="center" prop="password" />
      <el-table-column label="明文密码" align="center" prop="visiblePassword" /> -->
      <el-table-column
        label="账户状态"
        align="center"
        prop="deleted"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.deleted == 1 ? 'danger' : 'success'">
            {{ scope.row.deleted == 1 ? "封禁" : "正常" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="微信oppenId"
        align="center"
        prop="openId"
        width="240"
      />
      <el-table-column
        label="邀请人id"
        align="center"
        prop="inviterId"
        width="80"
      />
      <el-table-column label="备注" align="center" prop="remark" />
      <!-- <el-table-column
        label="vip结束时间"
        align="center"
        prop="vipEndTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.vipEndTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.updateTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="100"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['ai:User:edit']"
            >修改</el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['ai:User:remove']"
            >删除</el-button
          > -->
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

    <!-- 添加或修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="头像" prop="avatarUrl">
          <!-- <el-input v-model="form.avatarUrl" placeholder="请输入头像" /> -->
          <!-- <img
            :src="get_avatar(form.avatarUrl)"
            alt=""
            style="width: 50px; height: 50px"
          /> -->
          <ImagePreview
            width="100px"
            height="100px"
            :src="get_avatar(form.avatarUrl)"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input disabled v-model="form.name" placeholder="请输入昵称" />
        </el-form-item>
        <!-- <el-form-item label="性别：0：未知 1-男，2：女" prop="gender">
          <el-input
            v-model="form.gender"
            placeholder="请输入性别：0：未知 1-男，2：女"
          />
        </el-form-item> -->
        <el-form-item label="手机号" prop="phone">
          <el-input disabled v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <!-- <el-form-item label="vip结束时间" prop="vipEndTime">
          <el-date-picker
            clearable
            v-model="form.vipEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择vip结束时间"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="oppenId" prop="openId">
          <el-input
            disabled
            v-model="form.openId"
            placeholder="请输入微信oppenId"
          />
        </el-form-item>
        <el-form-item label="分享人" prop="inviterId">
          <el-input
            disabled
            v-model="form.inviterId"
            placeholder="请输入分享人"
          />
        </el-form-item>

        <el-form-item label="账户状态" prop="deleted">
          <!-- <el-input
            v-model="form.deleted"
            placeholder="请输入封禁状态：0：正常，1：封禁(不允许登录)"
          /> -->
          <el-radio-group v-model="form.deleted">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">封禁</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
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
import { listUser, getUser, delUser, addUser, updateUser } from "@/api/ai/User";
import avatar1 from "@/assets/ai/avatar1.jpg";
import avatar2 from "@/assets/ai/avatar2.jpg";
import avatar3 from "@/assets/ai/avatar3.jpg";
import avatar4 from "@/assets/ai/avatar4.jpg";
import avatar5 from "@/assets/ai/avatar5.jpg";
export default {
  name: "User",
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
      // 用户表格数据
      UserList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 分享人时间范围
      daterangeCreateTime: [],
      // 分享人时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        avatarUrl: null,
        gender: null,
        phone: null,
        password: null,
        visiblePassword: null,
        deleted: null,
        vipEndTime: null,
        createTime: null,
        updateTime: null,
        openId: null,
        inviterId: null,
        orderByColumn: "id",
        isAsc: "asc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        // avatarUrl: [
        //   { required: true, message: "头像不能为空", trigger: "blur" },
        // ],
        // phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        // password: [
        //   { required: true, message: "密码不能为空", trigger: "blur" },
        // ],
        // deleted: [
        //   {
        //     required: true,
        //     message: "封禁状态：0：正常，1：封禁(不允许登录)不能为空",
        //     trigger: "blur",
        //   },
        // ],
        // remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        // openId: [
        //   { required: true, message: "微信oppenId不能为空", trigger: "blur" },
        // ],
        // inviterId: [
        //   { required: true, message: "分享人不能为空", trigger: "blur" },
        // ],
      },
    };
  },
  created() {
    this.getList();
  

  },
  methods: {
    get_avatar(avatar) {
      switch (avatar) {
        case "../../static/ai/avatar1.jpg":
          return avatar1;
        case "../../static/ai/avatar2.jpg":
          return avatar2;
        case "../../static/ai/avatar3.jpg":
          return avatar3;
        case "../../static/ai/avatar4.jpg":
          return avatar4;
        case "../../static/ai/avatar5.jpg":
          return avatar5;
          return "";
      }
    },
    /** 查询用户列表 */
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
      listUser(this.queryParams).then((response) => {
        this.UserList = response.rows;
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
        name: null,
        avatarUrl: null,
        gender: null,
        phone: null,
        password: null,
        visiblePassword: null,
        deleted: null,
        remark: null,
        vipEndTime: null,
        createTime: null,
        updateTime: null,
        openId: null,
        inviterId: null,
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
      this.daterangeCreateTime = [];
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
      this.title = "添加用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getUser(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
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
        .confirm('是否确认删除用户编号为"' + ids + '"的数据项？')
        .then(function () {
          return delUser(ids);
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
        "ai/User/export",
        {
          ...this.queryParams,
        },
        `User_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
