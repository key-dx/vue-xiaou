<template>
  <div class="login">
    <el-form :model="userinfo" status-icon :rules="rules" ref="userinfo">
      <h1>用户登录</h1>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="userinfo.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="userinfo.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      userinfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.userinfo.validate(valid => {
        if (valid) {
          this.axios.post("/api/userlogin", this.userinfo).then(res => {
            if (res.data.code == 200) {
              // localStorage.setItem("username", this.userinfo.username);
              // store
              this.$store.dispatch("setUserinfoSync", res.data.list);
              this.$router.push("/");
            } else {
              this.$message(res.data.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-image: url("/static/images/loginbg.jpg");
  background-size: 100% 100%;
}
.el-form {
  width: 500px;
  background-color: #fff;
  margin: 300px auto;
  padding: 20px;
  border-radius: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.el-button {
  width: 100%;
}
</style>
