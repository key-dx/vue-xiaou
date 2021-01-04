<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="memberData" style="width: 100%" stripe border>
      <el-table-column prop="id" label="会员编号"> </el-table-column>
      uid,nickname,phone,password,status
      <el-table-column prop="nickname" label="会员昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
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
            @click="$router.push('/member/' + item.row.uid)"
            >编辑</el-button
          >
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
      memberData: [],
      total: 2,
      size: 2,
      currentPage: 1
    };
  },
  methods: {
    getPage(currentPage) {
      if (currentPage) {
        this.currentPage = currentPage;
      }
      this.axios
        .get("/api/memberlist", { size: this.size, page: this.currentPage })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.list != null) {
              this.memberData = res.data.list;
            }
          }
        });
    },
    changePage(currentPage) {
      this.getPage(currentPage);
    }
  },
  mounted() {
    this.axios.get("/api/membercount").then(res => {
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
.el-breadcrumb {
  margin: 20px 0;
}
.el-pagination {
  margin-top: 20px;
  float: right;
}
</style>
