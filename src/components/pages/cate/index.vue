<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="$router.push('cate/add')"
        >添加</el-button
      >
    </el-row>
    <el-table
      :data="cateData"
      style="width: 100%"
      stripe
      border
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="商品分类名称" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <img v-if="item.row.img" :src="item.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag type="primary" v-show="item.row.status == 1">启用</el-tag>
          <el-tag type="primary" disabled v-show="item.row.status == 0"
            >禁用</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button
            type="primary"
            @click="$router.push('/cate/' + item.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateData: []
    };
  },
  methods: {
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除商品分类数据
          this.axios.post("/api/catedelete", { id }).then(res => {
            if (res.data.code == 200) {
              this.cateData = res.data.list;
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    // 页面挂载完成 获取数据
    this.axios.get("/api/catelist", { istree: 1 }).then(res => {
      if (res.data.code == 200) {
        this.cateData = res.data.list;
      }
    });
  }
};
</script>

<style scoped>
.el-row {
  margin: 20px 0;
}
.cell img {
  width: 200px;
}
</style>
