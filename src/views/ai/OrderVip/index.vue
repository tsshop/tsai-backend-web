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
      <!-- <el-form-item label="时长" prop="time">
        <el-input
          v-model="queryParams.time"
          placeholder="请输入时长"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="总金额" prop="totalAmt">
        <el-input
          v-model="queryParams.totalAmt"
          placeholder="请输入总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付金额" prop="payAmt">
        <el-input
          v-model="queryParams.payAmt"
          placeholder="请输入支付金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="payNo">
        <el-input
          v-model="queryParams.payNo"
          placeholder="请输入下单单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="ip地址" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入ip地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="退款金额" prop="refundAmt">
        <el-input
          v-model="queryParams.refundAmt"
          placeholder="请输入退款金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="refundAmt">
        <!-- <el-input
          v-model="queryParams.refundAmt"
          placeholder="订单状态"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->

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
          start-placeholder="c"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="是否已删除 " prop="isDel">
        <el-input
          v-model="queryParams.isDel"
          placeholder="请输入是否已删除 "
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
          v-hasPermi="['ai:OrderVip:add']"
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
          v-hasPermi="['ai:OrderVip:edit']"
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
          v-hasPermi="['ai:OrderVip:remove']"
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
          v-hasPermi="['ai:OrderVip:export']"
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
      :data="OrderVipList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单ID" align="center" prop="id" width="80" />
      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="用户ID" align="center" prop="userId" width="100"/>
      <el-table-column label="总金额" align="center" prop="totalAmt" width="100"/>
      <el-table-column
        label="时长(天)"
        align="center"
        prop="time"
        width="100"
      />
      <el-table-column label="支付金额" align="center" prop="payAmt" width="100"/>
      <el-table-column label="订单状态" align="center" prop="orderStatus" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="['', 'info', 'success', 'warning'][scope.row.orderStatus]"
          >
            {{ ["", "未付款", "已付款", "已退款"][scope.row.orderStatus] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单单号" align="center" prop="payNo" />
      <!-- <el-table-column label="ip地址" align="center" prop="ip" /> -->
      <el-table-column label="备注" align="center" prop="remark" />
      <!-- <el-table-column label="退款金额" align="center" prop="refundAmt" /> -->
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
            v-hasPermi="['ai:OrderVip:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['ai:OrderVip:remove']"
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

    <!-- 添加或修改VIP订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="时长" prop="time">
          <el-input v-model="form.time" placeholder="请输入时长" />
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
        <el-form-item label="是否已删除 " prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入是否已删除 " />
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
  listOrderVip,
  getOrderVip,
  delOrderVip,
  addOrderVip,
  updateOrderVip,
} from "@/api/ai/OrderVip";

export default {
  name: "OrderVip",
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
      // VIP订单表格数据
      OrderVipList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否已删除 时间范围
      daterangeCreateTime: [],
      // 是否已删除 时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        orderNo: null,
        userId: null,
        time: null,
        totalAmt: null,
        payAmt: null,
        orderStatus: null,
        payNo: null,
        ip: null,
        refundAmt: null,
        createTime: null,
        updateTime: null,
        isDel: null,
        orderByColumn: "id",
        isAsc: "desc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderNo: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" },
        ],
        time: [{ required: true, message: "时长不能为空", trigger: "blur" }],
        totalAmt: [
          { required: true, message: "总金额不能为空", trigger: "blur" },
        ],
        payAmt: [
          { required: true, message: "支付金额不能为空", trigger: "blur" },
        ],
        orderStatus: [
          {
            required: true,
            message: "0:未支付 1:已支付  -1:已取消不能为空",
            trigger: "blur",
          },
        ],
        payNo: [
          { required: true, message: "下单单号不能为空", trigger: "blur" },
        ],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        refundAmt: [
          { required: true, message: "退款金额不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询VIP订单列表 */
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
      listOrderVip(this.queryParams).then((response) => {
        this.OrderVipList = response.rows;
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
        time: null,
        totalAmt: null,
        payAmt: null,
        orderStatus: 0,
        payNo: null,
        remark: null,
        ip: null,
        refundAmt: null,
        createTime: null,
        updateTime: null,
        isDel: null,
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
      this.title = "添加VIP订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getOrderVip(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改VIP订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateOrderVip(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrderVip(this.form).then((response) => {
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
        .confirm('是否确认删除VIP订单编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrderVip(ids);
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
        "ai/OrderVip/export",
        {
          ...this.queryParams,
        },
        `OrderVip_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
