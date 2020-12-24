<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    router
  >
    <!-- <el-submenu index="/menu">
      <template v-for="(item, index) in menuData">
        <template slot="title" v-if="item.type == 1">
          <div :key="index">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </div>
        </template>
        <template v-else>
          <el-menu-item :key="index" :index="item.address">{{
            item.title
          }}</el-menu-item>
        </template>
      </template>
    </el-submenu> -->
     <el-submenu index="/menu">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/menu">菜单管理</el-menu-item>
      <el-menu-item index="/user">角色管理</el-menu-item>
      <el-menu-item index="">管理员管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span>商城管理</span>
      </template>
      <el-menu-item index="">商品信息</el-menu-item>
      <el-menu-item index="">商品管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>

import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["menuData"])
  },
  data() {
    return {
      defaultActive: ""
    };
  },
  mounted() {
    this.defaultActive = this.$route.meta.selected;
  },
  watch: {
    $route(newVal) {
      this.defaultActive = newVal.meta.selected;
    }
  }
};
</script>

<style>
li {
  width: 210px;
}
</style>
