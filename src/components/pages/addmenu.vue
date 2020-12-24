<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="菜单级别" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择菜单级别">
          <el-option label="顶级" value="1"></el-option>
          <el-option label="二级" value="2"></el-option>
          <el-option label="三级" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-show="form.type == 1">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-show="form.type == 2">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="菜单地址">
        <el-button type="primary" @click="addMenu">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["menuData"])
  },
  data() {
    return {
      form: {
        title: "",
        pid: "",
        type: 1,
        icon: "",
        url: "",
        status: 1
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择活动区域", trigger: "change" }]
      }
    };
  },
  methods: {
    ...mapMutations(["setMenuData"]),
    addMenu() {
      this.form.id = this.menuData.length + 1;
      axios.post("/api/menuadd", this.form).then(res => {
        if (res.data.code == 200) {
          this.$router.push("/menu");
        }
      });
    }
  }
};
</script>
<style></style>
