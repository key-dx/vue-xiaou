<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/seck' }">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动{{ tip }}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="150px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="活动期限">
        <div class="block">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="一级分类">
        <el-select
          v-model="form.first_cateid"
          placeholder="请选择一级分类"
          @change="changeFirst"
        >
          <el-option
            v-for="(item, index) of cateArr"
            :key="index"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="form.second_cateid"
          placeholder="请选择二级分类"
          @change="changegoods"
        >
          <el-option
            v-for="(item, index) of catesonArr"
            :key="index"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品">
        <el-select v-model="form.goodsid" placeholder="请选择商品">
          <el-option
            v-for="(item, index) of goodsArr"
            :key="index"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
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
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ]
      },
      pickerOptions: {
        shortcuts: []
      },
      value2: [],
      // 分类
      cateArr: [],
      catesonArr: [],
      goodsArr: []
    };
  },
  methods: {
    changeFirst(n) {
      this.form.second_cateid = null;
      this.axios.get("/api/catelist", { pid: n }).then(res => {
        this.catesonArr = res.data.list;
      });
    },
    changegoods(n) {
      this.form.goodsid = null;
      this.axios
        .get("/api/goodslist", { fid: this.form.first_cateid, sid: n })
        .then(res => {
          this.goodsArr = res.data.list;
        });
    },
    add(form) {
      let url = "/api/seckadd";
      if (this.$route.params.id) {
        url = "/api/seckedit";
        this.form.id = this.$route.params.id;
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          this.form.begintime = this.value2[0];
          this.form.endtime = this.value2[1];
          this.axios.post(url, this.form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/seck");
            }
          });
        }
      });
    }
  },
  mounted() {
    this.axios.get("/api/catelist", { pid: 0 }).then(res => {
      this.cateArr = res.data.list;
    });
    if (this.$route.params.id) {
      this.tip = "修改";
      this.axios
        .get("/api/seckinfo", { id: this.$route.params.id })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.list);
            this.form = res.data.list;
            this.value2.push(Number(this.form.begintime));
            this.value2.push(Number(this.form.endtime));
            let a = this.form.second_cateid;
            let c = this.form.goodsid;
            this.changeFirst(this.form.first_cateid);
            this.form.second_cateid = a;
            this.changegoods(this.form.second_cateid);
            this.form.goodsid = Number(c);
          }
        });
    }
  }
};
</script>
<style></style>
