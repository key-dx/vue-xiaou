<template>
  <el-container class="page">
    <el-header>
      <h1>
        <span class="left">
          小U商城后台管理系统
        </span>
        <div class="right">
          <span>
            欢迎 :
            {{ $store.state.userinfo ? $store.state.userinfo.username : "" }}
          </span>
          <span @click="logout">
            退出
          </span>
        </div>
      </h1>
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
import store from "../../store";
import myNav from "../views/nav";
export default {
  components: {
    myNav
  },
  methods: {
    logout() {
      store.state.userinfo = null;
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background-color: #3f454b;
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
.left {
  float: left;
}
.right {
  float: right;
}

span {
  cursor: pointer;
}
</style>
