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
      <el-form-item label="" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="简介" prop="blurb">
        <el-input
          v-model="queryParams.blurb"
          placeholder="请输入简介"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="说明" prop="illustrate">
        <el-input
          v-model="queryParams.illustrate"
          placeholder="请输入说明"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="示例" prop="example">
        <el-input
          v-model="queryParams.example"
          placeholder="请输入示例"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="是否启用" prop="isUse">
        <el-input
          v-model="queryParams.isUse"
          placeholder="请输入是否启用"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="typeId">
        <el-select
          placeholder="模板分类"
          v-model="queryParams.typeId"
          clearable
        >
          <el-option
            v-for="(item, index) in templateTypeList"
            :label="item.name"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="isUse">
        <el-select placeholder="是否启用" v-model="queryParams.isUse" clearable>
          <el-option label="已启用" :value="1"></el-option>
          <el-option label="未启用" :value="0"></el-option>
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
      </el-form-item>
      <el-form-item label="评价" prop="score">
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['ai:Template:add']"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['ai:Template:edit']"
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
          v-hasPermi="['ai:Template:remove']"
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
          v-hasPermi="['ai:Template:export']"
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
      :data="TemplateList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" width="100" />
      <el-table-column
        label="模板名称"
        align="center"
        prop="name"
        width="300"
      />
      <el-table-column
        label="所属分类"
        align="center"
        prop="type"
        width="120"
      />
      <el-table-column
        label="模板简介"
        align="center"
        prop="blurb"
        show-overflow-tooltip=""
      />
      <!-- <el-table-column label="说明" align="center" prop="illustrate" /> -->
      <!-- <el-table-column label="示例" align="center" prop="example" /> -->
      <el-table-column label="是否启用" align="center" prop="isUse" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isUse == 1 ? 'success' : 'info'">
            {{ scope.row.isUse == 1 ? "已启用" : "未启用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="好评"
        align="center"
        prop="goodScore"
        width="100"
      />
      <el-table-column
        label="差评"
        align="center"
        prop="badScore"
        width="100"
      />
      <!-- <el-table-column label="内容" align="center" prop="content" /> -->
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
      <!-- <el-table-column label="评价" align="center" prop="score" /> -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="220"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['ai:Template:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="
              updateKeyOne(scope.row, 'isUse', scope.row.isUse == 1 ? 0 : 1)
            "
            v-hasPermi="['ai:Template:edit']"
          >
            <span
              :style="{ color: scope.row.isUse == 1 ? '#FD7747' : '#00CB8A' }"
              >{{ scope.row.isUse == 1 ? "禁用" : "启用" }}</span
            >
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="
              updateKeyOne(scope.row, 'isIndex', scope.row.isIndex == 1 ? 0 : 1)
            "
            v-hasPermi="['ai:Template:edit']"
          >
            <span
              :style="{ color: scope.row.isIndex == 1 ? '#FD7747' : '#00CB8A' }"
              >{{ scope.row.isIndex == 1 ? "取消推荐" : "首页推荐" }}</span
            >
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['ai:Template:remove']"
            >删除</el-button
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

    <!-- 添加或修改模板对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入模板名称" />
        </el-form-item>

        <el-form-item label="模板分类" prop="typeId">
          <!-- <el-input v-model="form.typeId" placeholder="请输入名称" /> -->
          <el-select placeholder="模板分类" v-model="form.typeId" clearable>
            <el-option
              v-for="(item, index) in templateTypeList"
              :label="item.name"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板简介" prop="blurb">
          <el-input v-model="form.blurb" placeholder="请输入模板简介" />
        </el-form-item>
        <el-form-item label="助手提示" prop="illustrate">
          <el-input v-model="form.illustrate" placeholder="请输入助手提示" />
        </el-form-item>
        <el-form-item label="输入框提示" prop="example">
          <el-input v-model="form.example" placeholder="请输入输入框提示" />
        </el-form-item>

        <el-form-item label="模板内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            placeholder="请输入模板内容 占位符是 $$$$"
          />
        </el-form-item>
        <el-form-item label="是否启用" prop="isUse">
          <el-radio-group v-model="form.isUse">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首页推荐" prop="isIndex">
          <el-radio-group v-model="form.isIndex">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="评价" prop="score">
          <el-input v-model="form.score" placeholder="请输入评价" />
        </el-form-item> -->
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
  listTemplate,
  getTemplate,
  delTemplate,
  addTemplate,
  updateTemplate,
} from "@/api/ai/Template";
import { listTemplateType } from "@/api/ai/TemplateType";

export default {
  name: "Template",
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
      // 模板表格数据
      TemplateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 评价时间范围
      daterangeCreateTime: [],
      // 评价时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        blurb: null,
        illustrate: null,
        example: null,
        isUse: null,
        content: null,
        createTime: null,
        updateTime: null,
        score: null,
        typeId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        blurb: [{ required: true, message: "简介不能为空", trigger: "blur" }],
        illustrate: [
          { required: true, message: "说明不能为空", trigger: "blur" },
        ],
        example: [{ required: true, message: "示例不能为空", trigger: "blur" }],
        isUse: [
          { required: true, message: "是否启用不能为空", trigger: "blur" },
        ],
        isIndex: [
          { required: true, message: "是否启用不能为空", trigger: "blur" },
        ],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        // score: [{ required: true, message: "评价不能为空", trigger: "blur" }],
      },
      templateTypeList: [],
    };
  },
  created() {
    this.getList();
    this.getTemplateTypeList();
  },
  methods: {
    getTemplateTypeList() {
      let query = {
        pageNum: 1,
        pageSize: 100,
      };
      listTemplateType(query).then((response) => {
        this.templateTypeList = response.rows;
      });
    },
    /** 查询模板列表 */
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
      listTemplate(this.queryParams).then((response) => {
        this.TemplateList = response.rows;
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
        blurb: null,
        illustrate: null,
        example: null,
        isUse: 1,
        content: null,
        createTime: null,
        updateTime: null,
        score: null,
        isIndex: true,
        typeId: null,
        orderByColumn: "id",
        isAsc: "desc",
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
      this.title = "添加模板";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getTemplate(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改模板";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateTemplate(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTemplate(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // 修改
    updateKeyOne(row, key, value) {
      let form = {
        id: row.id,
        [key]: value,
      };
      updateTemplate(form).then((response) => {
        this.$modal.msgSuccess("修改成功");
        this.getList();
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除模板编号为"' + ids + '"的数据项？')
        .then(function () {
          return delTemplate(ids);
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
        "ai/Template/export",
        {
          ...this.queryParams,
        },
        `Template_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
