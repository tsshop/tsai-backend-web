<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 50px">
      <el-form
        v-if="form.id"
        ref="form"
        :model="form"
        label-width="100px"
        style="width: 600px"
      >
        <el-form-item label="网站logo" prop="icon">
          <image-upload v-model="form.icon" :limit="1"></image-upload>
        </el-form-item>

        <el-form-item label="网站标题" prop="icon">
          <el-input placeholder="请输入网站标题" v-model="form.name" />
        </el-form-item>

        <div class="flex flex-x-end">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        icon: "",
        name: "",
        id: "",
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.request({
        url: "/ai/Config/getProjectConfig",
        headers: {
          isToken: false,
          configKey: "background",
        },
      }).then((res) => {
        if (res.data) {
          this.form.id = res.data.id;
          if (res.data.configValue) {
            let info = JSON.parse(res.data.configValue);
            this.form.icon = info.icon || "";
            this.form.name = info.name || "";
          }
        }
      });
    },
    submitForm() {
      this.request({
        url: "/ai/Config",
        method: "put",
        data: {
          id: this.form.id,
          configKey: this.form.configKey,
          configValue: JSON.stringify({
            icon: this.form.icon,
            name: this.form.name,
          }),
        },
      }).then((res) => {
        this.$modal.msgSuccess("修改成功");
        this.$store.commit('SET_SYSTEMINFO',{
            appName:this.form.name,
            appIcon:this.form.icon,
        })
      });
    },
  },
};
</script>
