<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }"
        >商品规格列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>商品规格{{ tip }}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="商品规格名称" prop="specsname">
        <el-input v-model="form.specsname"></el-input>
      </el-form-item>

      <el-form-item
        class="shuxing"
        v-for="(item, index) in itemArr"
        :key="index"
        label="商品规格属性"
      >
        <el-input v-model="item.value"></el-input>
        <el-button v-if="index == 0" @click="addAttr">添加属性</el-button>
        <el-button type="danger" @click="delAttr(index)" v-else>删除</el-button>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemArr: [{ value: "" }],
      tip: "添加",
      form: {
        specsname: "",
        attrs: "",
        status: 1
      },
      rules: {
        specsname: [
          { required: true, message: "请输入商品规格名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addAttr() {
      if (this.itemArr.length < 6) {
        this.itemArr.push({ value: "" });
      } else {
        this.$message("别加了,累死我了");
      }
    },
    delAttr(i) {
      this.itemArr.splice(i, 1);
    },
    add(form) {
      let url = "/api/specsadd";
      if (this.$route.params.id) {
        url = "/api/specsedit";
        this.form.id = this.$route.params.id;
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          let str = this.itemArr.map(ele => {
            return ele.value;
          });
          str = str.join(",");
          this.form.attrs = str;
          console.log(this.form);
          this.axios.post(url, this.form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/specs");
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
        .get("/api/specsinfo", { id: this.$route.params.id })
        .then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list[0];
           
            console.log(this.form.attrs);
            this.itemArr = [];
            for (let i = 0; i < this.form.attrs.length; i++) {
              this.itemArr.push({ value: this.form.attrs[i] });
            }
          }
        });
    }
  }
};
</script>
<style>
.shuxing {
  position: relative;
}
.shuxing .el-button {
  width: 98px;
  position: absolute;
  right: -110px;
}
</style>
