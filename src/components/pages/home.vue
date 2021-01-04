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
        text: "常用英雄"
      },
      tooltip: {},
      xAxis: {
        data: ["诺手", "鳄鱼", "乌鸦", "奥恩", "俄洛伊", "石头人"]
      },
      yAxis: {},
      series: [
        {
          name: "场次",
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
