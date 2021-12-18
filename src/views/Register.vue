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
      <el-divider direction="horizontal"></el-divider>

      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="registerForm.username"
          placeholder="请输入用户名"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="请输入密码"
          size="normal"
          type="password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          v-model="registerForm.checkPass"
          placeholder="请再次输入密码"
          size="normal"
          auto-complete="off"
          type="password"
          style="magin-right: 5px"
        ></el-input>
      </el-form-item>
      <el-form-item class="footer">
        <el-button type="primary" @click="register" style="width: 72%"
          >提交</el-button
        >
        <el-button @click="resetForm('form')" style="width: 25%"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 我尼玛真服了 默认自带的规则就认pass和checkPass其他名不好使
// prop 引入的规则名字要跟变量名字一样 不然规则函数得不到值
import { nanoid } from "nanoid";
export default {
  name: "Register",
  data() {
    // 检查密码框的规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    // 密码核实框的规则
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 注册提交
    register() {
      this.$refs.form.validate((valid) => {
        if (valid) {
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
                // 注册后跳转
                this.$router.replace("/Home");
              }
            })

            .catch((err) => {
              this.$message({
                showClose: true,
                message: "注册失败",
                type: "error",
              });
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  display: block;
  float: left;
  margin: 10px auto 30px auto;
  text-align: left;
}
.el-divider {
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