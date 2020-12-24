<template>
  <el-container class="page">
    <el-header>
      <h1>XX后台管理系统</h1>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <my-nav></my-nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import myNav from "../views/nav";
export default {
  components: {
    myNav
  },
  methods: {
  }
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background-color: #3F454B;
  color: #eee;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #fff;
}
</style>
