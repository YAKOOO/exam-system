<template lang="html">
  <div class="exam-notice">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>考试须知</h2>
    </div>
    <div class="text">
      <p>一、考试为在线考试，有时间限制</p>
      <p>二、考试期间不得离开考试页面，否则离开两次将自动交卷</p>
      <p>三、考试请独立思考，不得与他人交流</p>
      <p>四、若还没开考，请耐心等待</p>
    </div>
  <el-button type="primary" round
    @click="startExam">立即开始</el-button>
  </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    startExam() {
      const {paperId} = this.$route.params
      this.$router.push(`/student/exam/${paperId}`)
    }
  }
};
</script>

<style lang="css">
.exam-notice {
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
