<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cate' }"
        >商品分类列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>商品分类{{ tip }}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="商品分类名称" prop="catename">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>
      <el-form-item label="商品分类级别" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择商品分类级别">
          <el-option label="顶级" :value="0"></el-option>
          <el-option
            v-for="cateitem of cateArr"
            :key="cateitem.id"
            :label="cateitem.catename"
            :value="cateitem.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="changeimg"
          :file-list="imgArr"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addcate('form')">提交</el-button>
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
        pid: 0,
        catename: "",
        img: "",
        status: 1
      },
      cateArr: [],
      rules: {
        catename: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ],
        pid: [
          { required: true, message: "请选择商品分类层级", trigger: "change" }
        ]
      },
      imgArr: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    changeimg(file) {
      this.form.img = file.raw;
    },
    addcate(form) {
      let url = "/api/cateadd";
      if (this.$route.params.id) {
        url = "/api/cateedit";
        this.form.id = this.$route.params.id;
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          let data = new FormData();
          for (let i in this.form) {
            data.append(i, this.form[i]);
          }
          this.axios.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/cate");
            }
          });
        }
      });
    },
    handleRemove(file) {
      this.imgArr = [];
      this.form.img = "";
    },
    handlePictureCardPreview(file, b) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "修改";
      this.axios
        .get("/api/cateinfo", { id: this.$route.params.id })
        .then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list;
            this.imgArr = this.form.img ? [{ url: this.form.img }] : [];
          }
        });
    }
    this.axios.get("/api/catelist", { pid: 0 }).then(res => {
      this.cateArr = res.data.list;
    });
  }
};
</script>
<style></style>
