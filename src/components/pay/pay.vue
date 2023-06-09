<template>
  <div>
    <el-dialog
      title="支付方式"
      :visible.sync="show"
      width="1000px"
      append-to-body
    >
      <div class="flex flex-x-end">
        <el-button
          v-if="row && row.isOfficial == 1"
          type="primary"
          @click="add"
          icon="el-icon-plus"
          size="mini"
          >添加</el-button
        >
      </div>
      <div style="margin-top: 10px">
        <el-table :data="list" v-loading="loading">
          <el-table-column label="账号姓名" width="160">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入账号姓名"
                type="text"
                v-model="scope.row.payName"
              />
            </template>
          </el-table-column>
          <el-table-column label="账号">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入账号"
                type="number"
                v-model="scope.row.payValue"
              />
            </template>
          </el-table-column>
          <el-table-column label="账号类型" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.payType">
                <el-option label="支付宝" :value="1"></el-option>
                <el-option label="微信" :value="2"></el-option>
                <el-option label="银行卡" :value="3"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="付款码/支行" width="200">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.payType == 3"
                placeholder="请输入支行名称"
                v-model="scope.row.payKey"
              />
              <image-upload
                :isShowTip="false"
                v-else
                :limit="1"
                v-model="scope.row.payKey"
              />
            </template>
            <!-- style="width:30px;height:30px;" -->
          </el-table-column>
          <el-table-column
            v-if="row && row.isOfficial == 1"
            label="操作"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <i class="el-icon-delete shou" @click="del(scope.$index)"></i> -->
              <el-button type="primary" @click="save(scope.row)" size="mini"
                >保存</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="show = false">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { listPayment, addPayment, updatePayment } from "@/api/au/payment.js";
export default {
  name: "pay",
  data() {
    return {
      show: false,
      row: null, //父级列表数据
      loading: false,
      list: [],
    };
  },
  methods: {
    open(row) {
      this.show = true;
      this.row = row;
      this.get_detail();
    },
    get_detail() {
      this.loading = true;
      listPayment({
        userId: this.row.id,
      })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.list = res.rows || [];
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    add() {
      this.list.push({
        payValue: "",
        payName: "",
        payType: 1,
        payKey: "",
      });
    },
    save(row) {
      if (!row.id) {
        //修改
        this.add_new(row);
      } else {
        //新增
        this.update_one(row);
      }
    },
    add_new(row) {
      this.loading = true;
      addPayment({
        ...row,
        userId: this.row.id,
      })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    update_one(row) {
      this.loading = true;
      updatePayment({
        ...row,
      })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    submitForm() {
      this.show = false;
      return;
      if (true) {
        let that = this;
        this.$confirm("确定充值？")
          .then(() => {
            that
              .request({
                url: "/au/turnOrder/prodSplit",
                method: "post",
                data: {},
              })
              .then(() => {
                this.show = false;

                that.$message({
                  message: "充值成功",
                  type: "success",
                });
              });
          })

          .catch(() => {});

        return;
      }
      this.$message("充值必须大于0");
    },
  },
};
</script>

<style  scoped>
.flex-x-end {
  justify-content: flex-end;
}
.shou {
  cursor: pointer;
  color: red;
}
.flex {
  display: flex;
}
</style>