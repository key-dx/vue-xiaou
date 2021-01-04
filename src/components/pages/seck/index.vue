<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button type="primary" @click="$router.push('seck/add')"
        >添加</el-button
      >
    </el-row>
    <el-table :data="seckData" style="width: 100%" stripe border>
      <el-table-column prop="id" label="活动编号"></el-table-column>
      <el-table-column prop="begintime" label="开始时间">
        <template slot-scope="item">
          <el-tag>{{ item.row.begintime | formatTime }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="结束时间">
        <template slot-scope="item">
          <el-tag>{{ item.row.begintime | formatTime  }}</el-tag>
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
            @click="$router.push('/seck/' + item.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      seckData: []
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
          this.axios.post("/api/seckdelete", { id: id }).then(res => {
            if (res.data.code == 200) {
              if (res.data.list != null) {
                this.seckData = res.data.list;
              } else {
                this.seckData = [];
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
    }
  },
  filters: {
    formatTime: function(time) {
      console.log(time);
      let start = moment(Number(time)).format("YYYY-MM-DD hh:mm:ss");
      return start;
    }
  },

  mounted() {
    // 页面挂载完成 获取数据
    this.axios.get("/api/secklist").then(res => {
      if (res.data.code == 200) {
        if (res.data.list != null) {
          this.seckData = res.data.list;
        }
      }
    });
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
