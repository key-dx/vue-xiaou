<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }"
        >商品管理列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>商品管理{{ tip }}页面</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 40px;"></div>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      style=" width: 800px"
    >
      <el-form-item label="一级分类" prop="first_cateid">
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
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
          <el-option
            v-for="(item, index) of catesonArr"
            :key="index"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="form.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
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
      <el-form-item label="商品规格">
        <el-select
          v-model="form.specsid"
          placeholder="请选择商品规格"
          @change="changespecs"
        >
          <el-option
            v-for="(item, index) of specsArr"
            :key="index"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性">
        <el-select
          v-model="form.specsattr"
          placeholder="请选择规格属性"
          multiple
        >
          <el-option
            v-for="(item, index) of specssonArr"
            :key="index"
            :label="item"
            :value="item"
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
      <el-form-item label="是否新品">
        <el-radio-group v-model="form.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-radio-group v-model="form.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品描述">
        <div id="desc"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      tip: "添加",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入商品管理名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 9 个字符", trigger: "blur" }
        ],
        first_cateid: [
          { required: true, message: "请选择商品管理层级", trigger: "change" }
        ],
        second_cateid: [
          { required: true, message: "请选择商品管理层级", trigger: "change" }
        ]
      },
      // 图片
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      imgArr: [],
      //editor
      editor: null,
      // 分类
      cateArr: [],
      catesonArr: [],
      specsArr: [],
      specssonArr: []
    };
  },
  methods: {
    changeFirst(n) {
      this.form.second_cateid = "";
      this.axios.get("/api/catelist", { pid: n }).then(res => {
        this.catesonArr = res.data.list;
      });
    },
    changespecs(n) {
      this.form.specsattr = "";
      this.axios.get("/api/specsinfo", { id: n }).then(res => {
        this.specssonArr = res.data.list[0].attrs;
      });
    },
    changeimg(file) {
      this.form.img = file.raw;
    },
    add(form) {
      let url = "/api/goodsadd";
      if (this.$route.params.id) {
        url = "/api/goodsedit";
        this.form.id = this.$route.params.id;
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          let data = new FormData();
          this.form.description = this.editor.txt.html();
          for (let i in this.form) {
            data.append(i, this.form[i]);
          }
          this.axios.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/goods");
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
    this.editor = new E("#desc");
    this.editor.config.uploadImgShowBase64 = true;
    this.editor.create();
    this.axios.get("/api/catelist", { pid: 0 }).then(res => {
      this.cateArr = res.data.list;
    });
    this.axios.get("/api/specslist", { pid: 0 }).then(res => {
      this.specsArr = res.data.list;
    });
    if (this.$route.params.id) {
      this.tip = "修改";
      this.axios
        .get("/api/goodsinfo", { id: this.$route.params.id })
        .then(res => {
          if (res.data.code == 200) {
            this.form = res.data.list;
            this.imgArr = this.form.img ? [{ url: this.form.img }] : [];
            this.form.specsattr = this.form.specsattr
              ? this.form.specsattr.split(",")
              : [];
            let a = this.form.second_cateid;
            let b = this.form.specsattr;
            this.editor.txt.html(this.form.description);
            this.changeFirst(this.form.first_cateid);
            this.changespecs(this.form.specsid);
            this.form.second_cateid = a;
            this.form.specsattr = b;
          }
        });
    }
  }
};
</script>
<style></style>
