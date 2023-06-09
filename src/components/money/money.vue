<template>
  <div>
    <el-dialog title="充值" :visible.sync="show" width="70%" append-to-body>
      <div></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="show = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "money",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    open(row) {
      this.show = true;
    },

    submitForm() {
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

<style>
.flex-x-end {
  justify-content: space-between;
}
.shou {
  cursor: pointer;
  color: red;
}
</style>