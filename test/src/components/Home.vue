<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 40px;">
      <el-col :span="6">
        <el-card>
          <div style="color: #409eff;">用户总数 </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold;">
            100
          </div>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card>
          <div style="color: #409eff;">用户总数 </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold;">
            100
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div style="color: #409eff;">用户总数 </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold;">
            100
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <div style="color: #409eff;">用户总数 </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold;">
            100
          </div>
        </el-card>
      </el-col>

    </el-row>


    <el-row>
      <el-col :span="12">
        <div id="main" style="height: 500px; width: 500px"></div>
      </el-col>

      <el-col :span="12">
        <div id="pieMain" style="height: 500px; width: 500px"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from "echarts";
import request from "../utils/request";
export default {
  name: "Home",
  data() {
    return {
      jidu: [],
      pieData: [],
    };
  },
  created() {},
  mounted() {
    //页面元素渲染之后再触发，例如div这些元素

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
      title: {
        text: "Gradient Stacked Area Chart",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["q1"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: this.jidu,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "q1",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [140, 232, 101, 264],
        },
      ],
    };

    option && myChart.setOption(option);

    var pieDom = document.getElementById("pieMain");
      var pieChart = echarts.init(pieDom);
    var pieOption;

    pieOption = {
      backgroundColor: "#2c343c",
      title: {
        text: "季度注册人数",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc",
        },
      },
      tooltip: {
        trigger: "item",
      },
      visualMap: {
        show: false,
        min: 0,
        max: 50,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [],
          //  [
          //   { name: "Direct", value: 335 },
          //   { name: "Email", value: 310 },
          //   { name: "Union Ads", value: 274 },
          //   { name: "Video Ads", value: 235 },
          //   { name: "Search Engine", value: 400 },
          // ].sort(function (a, b) {
          //   return a.value - b.value;
          // })
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    };

    request.get("/echart/members").then((res) => {
      debugger;
   
      pieOption.series[0].data = res.data.sort(function (a, b) {
        debugger;
        return a.value - b.value;
      });
      pieOption && pieChart.setOption(pieOption);
    });
  

    // pieOption && pieChart.setOption(pieOption);
  },
  methods: {},
};
</script>
<style></style>
