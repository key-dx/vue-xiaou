<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }"
        >管理员列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>管理员{{ tip }}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="form.roleid" placeholder="请选择">
          <el-option
            v-for="item in roleArr"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
        <span v-if="this.$route.params.id">不填写密码为不修改密码</span>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="管理员地址">
        <el-button type="primary" @click="adduser('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: "添加",
      form: {
        username: "",
        roleid: "",
        status: 1,
        password: ""
      },
      // 默认选中树形控件
      dck: [],
      roleArr: [],
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ],
        roleid: [{ required: true, message: "请选择所属角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    adduser(form) {
      let url = "/api/useradd";
      if (this.$route.params.id) {
        url = "/api/useredit";
        this.form.uid = this.$route.params.id;
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios.post(url, this.form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/user");
            }
          });
        }
      });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "修改";
      this.axios
        .get("/api/userinfo", { uid: this.$route.params.id })
        .then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list;
            this.form.password = "";
          }
        });
    }
    this.axios.get("/api/rolelist").then(res => {
      if (res.data.code == 200) {
        this.roleArr = res.data.list;
      }
    });
  }
};
</script>
<style></style>
