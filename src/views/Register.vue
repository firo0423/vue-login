<template>
  <div>
    <!-- register -->
    <!-- 表单合适需要添加 :rules="rules" rules就是数据里面的规则 同时还要在item下加prop绑定对应规则-->
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="form"
      class="loginContainer"
    >
      <h3 class="loginTitle">注册</h3>
      <router-link to="/" class="backtext">返回登录页面</router-link>
      <el-divider direction="horizontal" ></el-divider>
      
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="registerForm.username"
          placeholder="请输入用户名"
          auto-complete="false"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="请输入密码"
          size="normal"
          type="password"
          auto-complete="false"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input
          v-model="registerForm.password2"
          placeholder="请再次输入密码"
          size="normal"
          auto-complete="false"
          type="text"
          style="magin-right: 5px"
        ></el-input>
      </el-form-item>
      
      <el-button
        type="primary"
        size="default"
        style="width: 100%"
        @click="register"
        >注册</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        password2: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    verify() {
      if (this.registerForm.password !== this.registerForm.password2) {
        this.$message({
          showClose: true,
          message: "两次密码不一致",
          type: "error",
        });
        return;
      }
    },
    register() {
      this.verify();
      this.$axios
        .post(this.HOST + "/api/register", {
          id: nanoid(),
          username: this.registerForm.username,
          password: this.registerForm.password,
        })
        .then((result) => {
          console.log(result.data.msg);
          if (result.data.status == 0) {
            this.$message({
              showClose: true,
              message: "该用户已经存在",
              type: "error",
            });
          } else {
            this.$message({
              showClose: true,
              message: "注册成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px;
  background-color: #fff;
  border: 2px solid #e0e0e0;
  box-shadow: 0 0 20px #e0e0e0;
}
.loginTitle {
  display:block;
  float: left;
  margin: 10px auto 30px auto;
  text-align: left;
}
.el-divider{
  margin-top: 50px;
}
.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}

.backtext {
  display: block;
  float: right;
  text-decoration: none;
  color: black;
  margin: 10px auto 30px auto;
  text-align: left;
  transition: all 0.2s;
}
</style>