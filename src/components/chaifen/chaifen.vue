<template>
  <div>
    <el-dialog title="订单拆分" :visible.sync="show" width="70%" append-to-body>
      <div>
        <div class="flex flex-x-end flex-x-end" style="display: flex">
          <div>订单拆分后总价：{{ priceAll }}</div>
          <el-button type="primary" @click="add">添加</el-button>
        </div>
        <div style="margin-top: 10px">
          <el-table :data="list">
            <el-table-column
              label="商品名称"
              align="left"
              prop="prodName"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="价格">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入价格"
                  type="number"
                  v-model="scope.row.price"
                />
              </template>
            </el-table-column>
            <el-table-column label="删除" width="80" align="center">
              <template slot-scope="scope">
                <i class="el-icon-delete shou" @click="del(scope.$index)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="show = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "chaifen",
  data() {
    return {
      list: [
        {
          price: "",
          pic: "",
          name: "",
        },
      ],
      priceAll: 0,
      show: false,
      row: null,
    };
  },
  methods: {
    open(row) {
      //   alert(JSON.stringify(row));
      this.show = true;
      this.row = row;
      console.log("row", row);
      //   actualTotal
      this.priceAll = Number(this.xs(Number(row.actualTotal) * 1.045, 2));
      this.list = [
        {
          price: "",
          prodName: this.row.prodName,
        },
      ];
      console.log(this.priceAll);
    },
    del(index) {
      //   alert(index);
      this.list.splice(index, 1);
    },
    add() {
      let price = "";
      let arr_list = this.list.filter((val) => val.price > 0);

      if (arr_list.length == this.list.length) {
        let all = this.list
          .map((val) => Number(this.xs(val.price,2))*100)
          .reduce((a, b) => a + b);
        if (all < this.priceAll*100) {
          price = this.xs((this.priceAll*100 - all)/100, 2);
        }
      }
      this.list.push({
        price,
        prodName: this.row.prodName,
      });
    },
    submitForm() {
      let length = this.list.filter((val) => val.price > 0).length;
      // console.log(
      //   "总和:",
      //   this.xs(
      //     this.list.map((val) => Number(val.price)).reduce((a, b) => a + b),
      //     2
      //   )
      // );
      // return ;

      if (length > 0 && length == this.list.length) {
        let that = this;
        this.$confirm("确认拆分？")
          .then(() => {
            console.log(" this.request", that.request);
            that
              .request({
                url: "/au/turnOrder/prodSplit",
                method: "post",
                data: {
                  orderId: that.row.orderId,
                  amtList: that.list.map((val) => val.price),
                },
              })
              .then(() => {
                that.$emit("refresh");
                this.show = false;

                that.$message({
                  message: "拆分成功",
                  type: "success",
                });
              });
          })

          .catch(() => {});

        return;
      }
      this.$message("价格必须大于0");
    },
  },
};
</script>

<style>
.flex-x-end {
  justify-content: space-between;
}
.shou {
  cursor: pointer;
  color: red;
}
</style>