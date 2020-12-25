<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="$router.push('menu/add')"
        >添加</el-button
      >
    </el-row>
    <el-table
      :data="menuData"
      style="width: 100%"
      stripe
      border
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="80"> </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180">
        <template slot-scope="item">
          <el-tag type="primary" v-if="item.row.type == 1">目录</el-tag>
          <el-tag type="success" v-else>菜单</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="item">
          <i v-if="item.row.icon" :class="item.row.icon">
            {{ item.row.icon }}</i
          >
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
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
            @click="$router.push('/menu/' + item.row.id )"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
// import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    // ...mapState(["menuData"])
  },
  data() {
    return {
      menuData: []
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
          // 删除菜单数据
          axios.post("/api/menudelete", { id }).then(res => {
            if (res.data.code == 200) {
              this.menuData = res.data.list;
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
    axios.get("/api/menulist?istree=1").then(res => {
      if (res.data.code == 200) {
        this.menuData = res.data.list;
      }
    });
  }
};
</script>

<style scoped>
.el-row {
  margin: 20px 0;
}
</style>
