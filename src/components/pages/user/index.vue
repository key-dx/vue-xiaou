<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="$router.push('user/add')"
        >添加</el-button
      >
    </el-row>
    <el-table :data="userData" style="width: 100%" stripe border>
      <el-table-column prop="id" label="管理员编号"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="username" label="管理员名称"></el-table-column>
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
            @click="$router.push('/user/' + item.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(item.row.uid)">删除</el-button>
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
import axios from "axios";
export default {
  data() {
    return {
      userData: [],
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
          axios.post("/api/userdelete", { uid: uid }).then(res => {
            if (res.data.code == 200) {
              if (res.data.list != null) {
                this.userData = res.data.list;
              } else {
                this.userData = [];
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
      axios
        .get("/api/userlist?size=" + this.size + "&&page=" + this.currentPage)
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.list != null) {
              this.userData = res.data.list;
            }
          }
        });
    },
    changePage(currentPage) {
      this.getPage(currentPage);
    }
  },
  mounted() {
    axios.get("/api/usercount").then(res => {
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
</style>
