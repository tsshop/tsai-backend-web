<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >

      <div class="form-right">
        <h3 class="title">
          <!-- <span class="hello">Hello! </span> -->
          <span class="welcome">欢迎登录AI小助手后台</span>
        </h3>
        <p class="title-small">Welcome to explore Ao AI assistant System backend</p>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="账号"
          >
            <svg-icon
              slot="prefix"
              icon-class="user"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaOnOff">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
        <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            class="login-button"
            style=""
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right" v-if="register">
            <router-link class="link-type" :to="'/register'"
              >立即注册</router-link
            >
          </div>
        </el-form-item>
      </div>
      <div class="form-left">
        <img src="../assets/images/formBg.png" alt="" />
      </div>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2022 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        // username: "admin",
        // password: "admin123",
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff =
          res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              if (this.captchaOnOff) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 40px auto 16px auto;
  text-align: center;
  font-size: 32px;

  .hello {
    color: #f2823f;
  }
  .welcome {
    color: #333;
  }
}
.title-small {
  text-align: center;
  color: #999999;
  font-size: 12px;
  margin-bottom: 68px;
}
.login-form {
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  .form-left {
    width: 450px;
    height: 490px;
    overflow: hidden;
    border-radius:0 15px  15px 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .form-right {
    width: 450px;
    padding: 30px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
  }
  .el-input {
    height: 38px;
    input {
      height: 40px;
      border-radius: 20px;
      padding-left: 40px;
      color: #666;
      background-color: #fafafa;
    }
  }
  .el-form-item--medium .el-form-item__content {
    line-height: 40px;
    width: 70%;
  }
  .el-form-item {
    margin-bottom: 22px;
    display: flex;
    justify-content: center;
  }
  .el-input__inner:focus {
    outline: none;
    border-color: #f2823f;
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 13px;
  }
}
.login-form::after {
  content: "";
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  position: absolute;
  width: 80%;
  height: 80px;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}
.login-form::before {
  content: "";
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  position: absolute;
  width: 90%;
  height: 60px;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  overflow: hidden;
  border-radius: 5px;
  img {
    cursor: pointer;
    // vertical-align: middle;
    transform: scale(1.07);
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}

.login-form {
  .login-button {
    width: 100%;
    height: 40px;
    background-color: #FD7B47;
    border-color: #FD7B47;
    border-radius: 20px;
  }
  .el-button--primary:hover {
    background: #FD7B47;
    border-color: #FD7B47;
    color: #ffffff;
  }
}

@media screen and (max-width: 768px) {
  .login-form {
    background: #fff;
    margin: 5px;
    width: 358px;
    .form-left {
      width: 0;
    }
    .form-right {
      width: 90%;
      padding: 1px;
      .title {
        font-size: 26px;
        margin-top: 60px;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  body {
    .login-form {
      background: #fff;
      .form-left {
        width: 0;
      }
    }
  }
}
</style>
