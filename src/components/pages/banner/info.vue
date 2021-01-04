<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }"
        >轮播图列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>轮播图{{ tip }}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="form.title"></el-input>
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
        <el-button type="primary" @click="addbanner('form')">提交</el-button>
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
        img: "",
        status: 1
      },
      bannerArr: [],
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 1, max: 9, message: "长度在 1 到 9 个字符", trigger: "blur" }
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
    addbanner(form) {
      let url = "/api/banneradd";
      if (this.$route.params.id) {
        url = "/api/banneredit";
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
              this.$router.push("/banner");
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
        .get("/api/bannerinfo", { id: this.$route.params.id })
        .then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list;
            this.imgArr = this.form.img ? [{ url: this.form.img }] : [];
          }
        });
    }
    this.axios.get("/api/bannerlist").then(res => {
      this.bannerArr = res.data.list;
    });
  }
};
</script>
<style></style>
