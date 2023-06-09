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
          placeholder="请输入订单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="" prop="payNo">
        <el-input
          v-model="queryParams.payNo"
          placeholder="请输入下单单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="refundAmt">
        <el-select
          placeholder="订单状态"
          v-model="queryParams.orderStatus"
          clearable
        >
          <el-option label="未支付" :value="1"></el-option>
          <el-option label="已支付" :value="2"></el-option>
          <!-- <el-option label="已退款" :value="3"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="refundAmt">
        <el-select placeholder="来源类型" v-model="queryParams.type" clearable>
          <el-option label="条数套餐" :value="1"></el-option>
          <el-option label="新人注册" :value="2"></el-option>
          <el-option label="邀请好友" :value="3"></el-option>
        </el-select>
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

      <!-- <el-form-item label="来源用户id" prop="sourceUserId">
        <el-input
          v-model="queryParams.sourceUserId"
          placeholder="请输入来源用户id"
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
      <!--    <el-col :span="1.5">
      <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['ai:OrderNumber:add']"
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
          v-hasPermi="['ai:OrderNumber:edit']"
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
          v-hasPermi="['ai:OrderNumber:remove']"
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
          v-hasPermi="['ai:OrderNumber:export']"
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
      :data="OrderNumberList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单ID" align="center" prop="id" width="100" />
      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column
        label="用户ID"
        align="center"
        prop="userId"
        width="100"
      />
      <el-table-column
        label="总次数"
        align="center"
        prop="allNumber"
        width="100"
      />
      <el-table-column
        label="剩余次数"
        align="center"
        prop="residueNumber"
        width="100"
      />
      <el-table-column
        label="总金额"
        align="center"
        prop="totalAmt"
        width="100"
      />
      <!-- <el-table-column
        label="支付金额"
        align="center"
        prop="payAmt"
        width="100"
      /> -->
      <el-table-column
        label="订单状态"
        align="center"
        prop="orderStatus"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag
            :type="['', 'info', 'success', 'warning'][scope.row.orderStatus]"
          >
            {{ ["", "未付款", "已付款", "已退款"][scope.row.orderStatus] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="来源类型" align="center" prop="type" width="100">
        <template slot-scope="scope">
          <el-tag :type="['', 'warning', 'info', 'primary'][scope.row.type]">
            {{ ["", "条数套餐", "新人注册", "邀请好友"][scope.row.type] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单单号" align="center" prop="payNo" />
      <!-- <el-table-column label="ip地址" align="center" prop="ip" /> -->
      <!-- <el-table-column label="退款金额" align="center" prop="refundAmt" /> -->
      <!-- <el-table-column
        label="有效截止时间"
        align="center"
        prop="validEndTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.validEndTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
        label="创建时间/下单时间"
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
      <!-- <el-table-column label="是否已删除 " align="center" prop="isDel" /> -->
      <!-- <el-table-column label="来源用户id" align="center" prop="sourceUserId" /> -->
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
            v-hasPermi="['ai:OrderNumber:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['ai:OrderNumber:remove']"
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

    <!-- 添加或修改使用次数订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalAmt">
          <el-input v-model="form.totalAmt" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="支付金额" prop="payAmt">
          <el-input v-model="form.payAmt" placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="下单单号" prop="payNo">
          <el-input v-model="form.payNo" placeholder="请输入下单单号" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="ip地址" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入ip地址" />
        </el-form-item>
        <el-form-item label="退款金额" prop="refundAmt">
          <el-input v-model="form.refundAmt" placeholder="请输入退款金额" />
        </el-form-item>
        <el-form-item label="有效截止时间" prop="validEndTime">
          <el-date-picker
            clearable
            v-model="form.validEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择有效截止时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否已删除 " prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入是否已删除 " />
        </el-form-item>
        <el-form-item label="来源用户id" prop="sourceUserId">
          <el-input
            v-model="form.sourceUserId"
            placeholder="请输入来源用户id"
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
import {
  listOrderNumber,
  getOrderNumber,
  delOrderNumber,
  addOrderNumber,
  updateOrderNumber,
} from "@/api/ai/OrderNumber";

export default {
  name: "OrderNumber",
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
      // 使用次数订单表格数据
      OrderNumberList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 来源用户id时间范围
      daterangeCreateTime: [],
      // 来源用户id时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        orderNo: null,
        userId: null,
        allNumber: null,
        residueNumber: null,
        totalAmt: null,
        payAmt: null,
        orderStatus: null,
        type: null,
        payNo: null,
        remark: null,
        ip: null,
        refundAmt: null,
        validEndTime: null,
        createTime: null,
        updateTime: null,
        isDel: null,
        sourceUserId: null,
        orderByColumn: "id",
        isAsc: "desc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询使用次数订单列表 */
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
      listOrderNumber(this.queryParams).then((response) => {
        this.OrderNumberList = response.rows;
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
        orderNo: null,
        userId: null,
        allNumber: null,
        residueNumber: null,
        totalAmt: null,
        payAmt: null,
        orderStatus: 0,
        type: null,
        payNo: null,
        remark: null,
        ip: null,
        refundAmt: null,
        validEndTime: null,
        createTime: null,
        updateTime: null,
        isDel: null,
        sourceUserId: null,
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
      this.title = "添加使用次数订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getOrderNumber(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改使用次数订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateOrderNumber(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrderNumber(this.form).then((response) => {
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
        .confirm('是否确认删除使用次数订单编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrderNumber(ids);
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
        "ai/OrderNumber/export",
        {
          ...this.queryParams,
        },
        `OrderNumber_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
