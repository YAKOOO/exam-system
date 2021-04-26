<template>
  <div class="home">
    <div class="title">首页</div>
    <div class="top">
      <attention :paperList="paperList"></attention>
      <process :paperList="paperList"></process>
    </div>
    <div class="bottom">
      <count-score :paperList="paperList"></count-score>
      <calender></calender>
    </div>
  </div>
</template>

<script>
import attention from "./attention";
import CountScore from "./countScore";
import Process from "./process.vue";

import httpServer from "@/components/httpServer/httpServer.js";
import Calender from './calender.vue';

export default {
  name: "Home",
  data() {
    return {
      paperList: [],
    };
  },

  components: {
    attention,
    CountScore,
    Process,
    Calender,
  },
  mounted() {
    this.getPapers();
  },

  methods: {
    async getPapers() {
      const { data } = await httpServer({
        url: "/paper/getAll",
      });
      if (data.respCode === 200) {
        this.paperList = data.list;
        console.log(this.paperList);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-left: 40px;
}

.title {
  margin-top: 60px;
  font-size: 18px;
  font-weight: 600;
  color: #5c6692;
  letter-spacing: 2px;
}

.top {
  display: flex;
}

.bottom {
  display: flex;
}
</style>