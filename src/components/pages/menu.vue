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
    <el-table :data="menuData" style="width: 100%" stripe border>
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
          <el-button type="primary" @click="edit(item)">编辑</el-button>
          <el-button type="danger" @click="del(item.$index)">删除</el-button>
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
  data(){
    return {
      menuData:[]
    }
  },
  methods: {
    edit(n) {
      console.log(n);
    },
    del(n) {
      this.menuData.splice(n, 1);
    }
  },
  mounted() {
    axios.get("/api/menulist").then(res => {
      if(res.data.code){
        this.menuData = res.data.list
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
