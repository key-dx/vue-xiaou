<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="$router.push('goods/add')"
        >添加</el-button
      >
    </el-row>
    <el-table
      :data="goodsData"
      style="width: 100%"
      stripe
      border
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <img v-if="item.row.img" :src="item.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="item">
          <el-tag type="primary" v-show="item.row.isnew == 1">是</el-tag>
          <el-tag type="primary" disabled v-show="item.row.isnew == 0"
            >否</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="item">
          <el-tag type="primary" v-show="item.row.ishot == 1">是</el-tag>
          <el-tag type="primary" disabled v-show="item.row.ishot == 0"
            >否</el-tag
          >
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
            @click="$router.push('/goods/' + item.row.id)"
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
      goodsData: [],
      total: 2,
      size:4,
      currentPage: 1
    };
  },
  methods: {
    getPage(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      this.axios
        .get("/api/goodslist", { size: this.size, page: this.currentPage })
        .then(res => {
          if (res.data.code == 200) {
            this.goodsData = res.data.list;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    changePage(currentPage) {
      this.getPage(currentPage);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除商品管理数据
          this.axios.post("/api/goodsdelete", { id }).then(res => {
            if (res.data.code == 200) {
              this.goodsData = res.data.list;
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
    this.axios.get("/api/goodscount").then(res => {
      if (res.data.code == 200) {
        this.total = res.data.list[0].total;
      }
    });

    // 页面挂载完成 获取数据
    this.getPage();

    // 页面挂载完成 获取数据
    // this.axios.get("/api/goodslist", { istree: 1 }).then(res => {
    //   if (res.data.code == 200) {
    //     this.goodsData = res.data.list;
    //   }
    // });
  }
};
</script>

<style scoped>
.el-row {
  margin: 20px 0;
}
.cell img {
  width: 100px;
}
.el-pagination {
  margin-top: 20px;
  float: right;
}
</style>
