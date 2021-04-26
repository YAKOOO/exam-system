<template>
  <div class="wrapper">
    <p class="title">成绩统计</p>
    <div id="myChart"></div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";
export default {
  name: "CountScore",
  data() {
    return {
      scoreList: [],
      nameList: [],
      paperIdList: [],
      averageList: [],
    };
  },

  watch: {
    paperList: {
      handler(newVal, oldVal) {
        this.paperList = newVal;
        this.getScore();
        this.getAverage();
        this.drawLine();
      },
    },
  },

  props: {
    paperList: Array,
  },

  // created() {
  //   this.getScore();
  //   this.getAverage();
  // },

  mounted() {
    this.getScore();
    this.getAverage();
    this.drawLine();
  },

  methods: {
    getScore() {
      this.paperList.forEach((item) => {
        if (item.status) {
          this.scoreList.push(item.score);

          this.nameList.push(item.paperName);
          this.paperIdList.push(item.paperId);
        }
      });
    },
    // initAverage() {
    //   this.paperIdList.forEach(item => {
    //     console.log(item);
    //     this.average[item] = []
    //   })
    //   console.log(this.average);
    // },

    // 获取成绩列表  并计算其平均成绩
    async getAverage() {
      const { data } = await httpServer(
        {
          url: "/paper/getAverage",
        },
        this.paperIdList
      );
      if (data.respCode === 200) {
        const { list } = data;
        this.paperIdList.forEach((item) => {
          let num = 0;
          list[item].forEach((count) => {
            num += count;
          });
          this.averageList.push(num / list[item].length);
        });
      }
      this.drawLine();
    },

    drawLine() {
      this.chartLine = this.$echarts.init(document.getElementById("myChart"));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: ["平均成绩", "学生成绩"],
        },
        color: ["#cbd1de", "#3b7de1"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: this.nameList,
          name: "试卷名称", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#cdd2de",
            fontSize: 16,
            padding: [0, 0, 0, 20],
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#cdd2de",
            },
          },
        },
        yAxis: {
          name: "成绩",
          nameTextStyle: {
            color: "#cdd2de",
            fontSize: 16,
            padding: [0, 0, 10, 0],
          },
          axisLine: {
            lineStyle: {
              color: "#cdd2de",
            },
          },
          type: "value",
        },
        series: [
          {
            name: "平均成绩",
            data: this.averageList,
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#cbd1de",
              },
            },
            smooth: true,
          },
          {
            name: "学生成绩",
            data: this.scoreList,
            type: "line",
            lineStyle: {
              normal: {
                color: "#3b7de1",
              },
            },
            smooth: true,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 44%;
  height: 500px;
  background: white;
  padding-left: 20px;
  padding-top: 20px;
  margin-top: 25px;
  border-radius: 10px;
  box-shadow: -6px -5px 3px #edeef3;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #5c6692;
  letter-spacing: 2px;
}

#myChart {
  width: 90%;
  height: 75%;
  margin-top: 40px;
}
</style>