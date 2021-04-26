<template>
  <div class="wrapper">
    <el-progress type="circle" :percentage="percent"></el-progress>
  </div>
</template>

<script>
export default {
  name: "ScoreData",
  props: {
    paperList: Array,
  },
  data() {
    return {
      percent: 0
    }
  },
  watch: {
    paperList: {
      handler(newVal, oldVal) {
        let count = 0;
        newVal.forEach((item) => {
          if (item.status) {
            count++;
          }
        });
        this.percent = Number((count / newVal.length * 100).toFixed(2))
      },
    },
  },
  mounted() {
    this.paperList.forEach((element) => {});
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  background: white;
  width: 25%;
  height: 200px;
  margin-top: 20px;
  margin-left: 100px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}
</style>