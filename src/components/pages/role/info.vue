<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色{{ tip }}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          :data="menuArr"
          :props="{ label: 'title' }"
          show-checkbox
          node-key="id"
          ref="tree"
          check-strictly
          :default-expanded-keys="dck"
          :default-checked-keys="dck"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="角色地址">
        <el-button type="primary" @click="addrole('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tip: "添加",
      form: {
        rolename: "",
        menus: "",
        status: 1
      },
      // 默认选中树形控件
      dck: [],
      menuArr: [],
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addrole(form) {
      let url = "/api/roleadd";
      if (this.$route.params.id) {
        url = "/api/roleedit";
        this.form.id = this.$route.params.id;
      }
      // 树形控件
      this.form.menus = this.$refs.tree.getCheckedKeys()
        ? this.$refs.tree.getCheckedKeys().join(",")
        : "";
      this.$refs[form].validate(valid => {
        if (valid) {
          axios.post(url, this.form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/role");
            }
          });
        }
      });
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "修改";
      axios.get("/api/roleinfo?id=" + this.$route.params.id).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.dck = this.form.menus
            ? this.form.menus.split(",").map(ele => {
                return parseInt(ele);
              })
            : [];
        }
      });
    }
    axios.get("/api/menulist?istree=1").then(res => {
      if (res.data.code == 200) {
        this.menuArr = res.data.list;
      }
    });
  }
};
</script>
<style></style>
