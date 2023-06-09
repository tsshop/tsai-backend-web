<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否启用" prop="isUse">
        <el-input
          v-model="queryParams.isUse"
          placeholder="请输入是否启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker
          v-model="daterangeUpdateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['ai:StorageConfig:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['ai:StorageConfig:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['ai:StorageConfig:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['ai:StorageConfig:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <!-- <el-table
      v-loading="loading"
      :data="StorageConfigList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="是否启用" align="center" prop="isUse" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="配置" align="center" prop="config" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
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
            v-hasPermi="['ai:StorageConfig:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['ai:StorageConfig:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column> 
    </el-table>-->

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        v-for="(item, index) in StorageConfigList"
        :key="index"
        :name="String(index)"
      ></el-tab-pane>
    </el-tabs>

    <!-- 表单 -->
    <div style="display: flex; justify-content: center;margin-top:50px;">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="140px"
        style="width: 600px"
      >
        <!-- <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item> -->
        <el-form-item label="是否启用" prop="isUse">
          <!-- <el-input v-model="form.isUse" placeholder="请输入是否启用" /> -->
          <el-radio-group v-model="form.isUse">
            <el-radio :label="false">不启用</el-radio>
            <el-radio :label="true">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="formPropsList">
          <el-form-item
            :label="key"
            :prop="key"
            v-for="(v, key, index) in formPropsList"
            :key="index"
          >
            <el-input v-model="formPropsList[key]" :placeholder="key" />
          </el-form-item>
        </div>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <!-- <el-form-item label="配置" prop="config">
          <el-input
            v-model="form.config"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item> -->
        <div class="flex flex-x-end">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-form>
    </div>
    <!-- 表单 -->

    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改存储配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listStorageConfig,
  getStorageConfig,
  delStorageConfig,
  addStorageConfig,
  updateStorageConfig,
} from "@/api/ai/StorageConfig";

export default {
  name: "StorageConfig",
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
      // 存储配置表格数据
      StorageConfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 配置时间范围
      daterangeCreateTime: [],
      // 配置时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        type: null,
        isUse: null,
        remark: null,
        config: null,
        createTime: null,
        updateTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // id: [{ required: true, message: "id不能为空", trigger: "blur" }],
        // name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        // type: [{ required: true, message: "类型不能为空", trigger: "change" }],
        // isUse: [
        //   { required: true, message: "是否启用不能为空", trigger: "blur" },
        // ],
        // remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        // config: [{ required: true, message: "配置不能为空", trigger: "blur" }],
      },
      tabIndex: 0,
      formPropsList: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询存储配置列表 */
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
      listStorageConfig(this.queryParams).then((response) => {
        this.StorageConfigList = response.rows;
        this.total = response.total;
        this.loading = false;
        this.refreshRules();
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
        type: null,
        isUse: null,
        remark: null,
        config: null,
        createTime: null,
        updateTime: null,
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
      this.title = "添加存储配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getStorageConfig(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改存储配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.formPropsList) {
            this.form.config = "";
          } else {
            this.form.config = JSON.stringify(this.formPropsList);
          }

          if (this.form.id != null) {
            updateStorageConfig(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStorageConfig(this.form).then((response) => {
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
        .confirm('是否确认删除存储配置编号为"' + ids + '"的数据项？')
        .then(function () {
          return delStorageConfig(ids);
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
        "ai/StorageConfig/export",
        {
          ...this.queryParams,
        },
        `StorageConfig_${new Date().getTime()}.xlsx`
      );
    },
    handleClick(e) {
      this.refreshRules();
    },
    refreshRules() {
      let row = this.StorageConfigList[Number(this.tabIndex)];
      if (row) {
        this.form = JSON.parse(JSON.stringify(row));
      } else {
        return;
      }
      if (row.type == "LOCAL_STORAGE") {
        this.formPropsList = null;
        //本地
        this.rules = {
          isUse: [
            { required: true, message: "启用状态不能为空", trigger: "change" },
          ],
        };
      } else {
        this.rules = {
          isUse: [
            { required: true, message: "启用状态不能为空", trigger: "change" },
          ],
        };
        if (row.config) {
          this.formPropsList = JSON.parse(row.config) || {};
          for (let key in this.formPropsList) {
            this.rules[key] = [
              {
                required: true,
                trigger: "blur",
                validator: (rule, value, callback) => {
                  if (!this.formPropsList[key]) {
                    callback(new Error(`${key}不能为空`));
                  } else {
                    callback();
                  }
                },
              },
            ];
          }
        } else {
          this.formPropsList = null;
        }
      }
    },
  },
};
</script>
