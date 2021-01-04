<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }"
        >会员列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>会员修改页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
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
      <el-form-item label="会员地址">
        <el-button type="primary" @click="addmember('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        nickname: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addmember(form) {
      let url = "/api/memberadd";
      if (this.$route.params.id) {
        url = "/api/memberedit";
        this.form.uid = this.$route.params.id;
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios.post(url, this.form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/member");
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
        .get("/api/memberinfo", { uid: this.$route.params.id })
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
