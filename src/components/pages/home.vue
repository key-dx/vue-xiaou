<template>
  <div>
    <div id="box"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    var echarts = require("echarts");
    var myChart = echarts.init(document.getElementById("box"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "近一周访问人数"
      },
      tooltip: {},
      xAxis: {
        data: ["3.2", "3.3", "3.4", "3.5", "3.6", "3.7"]
      },
      yAxis: {},
      series: [
        {
          name: "人数",
          type: "bar",
          data: [456, 220, 136, 30, 50, 300]
        }
      ]
    });
  }
};
</script>

<style scoped>
#box {
  width: 90%;
  height: 400px;
}
</style>
