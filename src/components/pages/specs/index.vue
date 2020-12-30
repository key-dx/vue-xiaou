<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品规格列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="$router.push('specs/add')"
        >添加</el-button
      >
    </el-row>
    <el-table :data="specsData" style="width: 100%" stripe border>
      <el-table-column prop="id" label="商品规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="商品规格名称"></el-table-column>
      <el-table-column prop="attrs" label="商品规格属性">
        <template slot-scope="item">
          <el-tag
            v-for="attr of item.row.attrs"
            type="primary"
            v-show="attr"
            :key="attr"
          >
            {{ attr }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag type="primary" v-show="item.row.status == 1">启用</el-tag>
          <el-tag type="primary" disabled v-show="item.row.status == 0">
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button
            type="primary"
            @click="$router.push('/specs/' + item.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      specsData: [],
      total: 2,
      size: 2,
      currentPage: 1
    };
  },
  methods: {
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除菜单数据
          this.axios.post("/api/specsdelete", { uid: uid }).then(res => {
            if (res.data.code == 200) {
              if (res.data.list != null) {
                this.specsData = res.data.list;
              } else {
                this.specsData = [];
              }
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
    },
    getPage(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      this.axios
        .get("/api/specslist", { size: this.size, page: this.currentPage })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.list != null) {
              this.specsData = res.data.list;
              // this.specsData.map(ele => {
              //   return (ele.attrs = ele.attrs.join(","));
              // });
            }
          }
        });
    },
    changePage(currentPage) {
      this.getPage(currentPage);
    }
  },
  mounted() {
    this.axios.get("/api/specscount").then(res => {
      if (res.data.code == 200) {
        this.total = res.data.list[0].total;
      }
    });

    // 页面挂载完成 获取数据
    this.getPage();
  }
};
</script>

<style scoped>
.el-row {
  margin: 20px 0;
}
.el-pagination {
  margin-top: 20px;
  float: right;
}
.el-tag {
  margin-right: 10px;
}
</style>
