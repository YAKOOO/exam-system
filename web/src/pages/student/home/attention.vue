<template>
  <div class="attention">
    <div class="content">
      <p class="title">您好，{{ this.userName }}同学</p>
      <p class="text">
        您需要完成<span class="num"> {{ paperList.length }} </span>场考试，
        目前已经完成 <span class="num"> {{ count }} </span>场考试。
      </p>
      <p class="text">继续加油哦！</p>
    </div>
    <img class="right" src="@/assets/images/attentionRight.png" />
    <el-button class="btn">继续考试</el-button>
  </div>
</template>

<script>
export default {
  name: "Attention",
  data() {
    return {
      userName: localStorage.username,
      count: 0,
    };
  },
  props: {
    paperList: Array,
  },
  watch: {
    paperList: {
      handler(newVal, oldVal) {
        newVal.forEach((item) => {
          if (item.status) {
            this.count++;
          }
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.attention {
  width: 45%;
  background: #1a67dd;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.right {
  width: 150px;
  height: 120px;
  margin: 60px 10px 0 200px;
}

.content {
  margin-left: 20px;
  margin-top: 30px;
}

.title {
  color: white;
}

.text {
  color: white;
}

.num {
  color: #daaf6b;
  font-size: 18px;
  font-weight: blod;
}

.btn {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>