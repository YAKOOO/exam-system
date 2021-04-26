<template>
  <div class="wrapper">
    <div class="title">{{ paper.paperName }}</div>
    <div class="exp">{{ paper.paperExplain }}</div>
    <div class="exp">
      总时长: <span class="num"> {{ paper.time }} </span>
    </div>
    <div class="exp">
      有效期至:
      <span class="num">{{
        dayjs(paper.endTime * 1000).format("YYYY-MM-DD HH:mm:ss")
      }}</span>
    </div>
    <div class="btn">
      <el-button 
        type="primary" round
        @click="toPaper()">开始考试</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamItem",
  props: {
    paper: Object,
  },
  methods: {
    toPaper() {
      this.$router.push('/student/homepage/' + this.paper.paperId)
    }
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 16%;
  height: 150px;
  display: inline-block;
  margin-top: 30px;
  margin-right: 20px;
  background: white;
  border-radius: 20px;
  padding: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #5c6692;
}

.exp {
  margin-top: 10px;
  color: #adadad;
  font-size: 14px;
}

.num {
  margin-top: 10px;
  color: #cb4b16;
  font-size: 16px;
}

.btn {
  margin-left: 60%;
  margin-top: 5px;
}
</style>