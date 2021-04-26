<template>
  <div class="home">
    <div class="title">当前考试列表</div>
    <exam-item
      v-for="item in list"
      :key="item.paperId"
      :paper="item"
    ></exam-item>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

import examItem from "./examItem.vue";
export default {
  name: "ExamHome",
  components: { examItem },
  data() {
    return {
      list: [],
    };
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
        this.list = data.list;
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
</style>