<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{ tip }}页面</el-breadcrumb-item>
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
        <el-select
          v-model="form.pid"
          placeholder="请选择菜单级别"
          @change="selchange"
        >
          <el-option label="顶级" :value="0"></el-option>
          <el-option
            v-for="menuitem of menuArr"
            :key="menuitem.id"
            :label="menuitem.title"
            :value="menuitem.id"
          ></el-option>
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
        <el-button type="primary" @click="addMenu('form')">提交</el-button>
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
        title: "",
        pid: 0,
        type: 1,
        icon: "",
        url: "",
        status: 1
      },
      menuArr: [],
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择菜单层级", trigger: "change" }]
      }
    };
  },
  methods: {
    selchange() {
      console.log();
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    // ...mapMutations(["setMenuData"]),
    addMenu(form) {
      let url = "/api/menuadd";
      if (this.$route.params.id) {
        url = "/api/menuedit";
        this.form.id = this.$route.params.id;
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios.post(url, this.form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/menu");
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
        .get("/api/menuinfo", { id: this.$route.params.id })
        .then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list;
          }
        });
    }
    this.axios.get("/api/menulist", { pid: 0 }).then(res => {
      this.menuArr = res.data.list;
    });
  }
};
</script>
<style></style>
