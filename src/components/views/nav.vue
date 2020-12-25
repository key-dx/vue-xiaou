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
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span>首页</span>
    </el-menu-item>
    <el-submenu
      v-for="menuitem of menuArr"
      :key="menuitem.id"
      :index="menuitem.icon"
    >
      <template slot="title">
        <i :class="menuitem.icon"></i>
        <span>{{ menuitem.title }}</span>
      </template>
      <el-menu-item
        v-for="menuchild of menuitem.children"
        :key="menuchild.id"
        :index="menuchild.url"
        >{{ menuchild.title }}</el-menu-item
      >
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
      menuArr: [],
      defaultActive: ""
    };
  },
  mounted() {
    this.axios({
      url: "/api/menulist",
      params: { istree: 1 }
    }).then(res => {
      this.menuArr = res.data.list;
    });
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
