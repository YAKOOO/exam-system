<template>
  <div class="home">
    <div class="title">首页</div>
    <div
      class="choose"
      v-for="item in choose"
      :key="item.key"
      @click="toPush(item.key)"
    >
      <choose-item>
        <template #icon>
          <img :src="item.icon" alt="" />
        </template>
        <template #title>
          <p>{{ item.title }}</p>
        </template>
        <template #des>
          <p>{{ item.des }}</p>
        </template>
      </choose-item>
    </div>
    <p class="watermark">Made by MUYIJIA</p>
  </div>
</template>

<script>
import ChooseItem from "./components/chooseItem.vue";
export default {
  name: "Home",
  components: {
    ChooseItem,
  },
  data() {
    return {
      choose: [
        {
          key: "class",
          icon: require("@/assets/images/class.png"),
          title: "创建班级",
          des: "Create Class",
        },
        {
          key: "paper",
          icon: require("@/assets/images/paper.png"),
          title: "创建试卷",
          des: "Create Paper",
        },
        // {
        //   key: "student",
        //   icon: require("@/assets/images/student.png"),
        //   title: "学生管理",
        //   des: "Manage Student",
        // },
        {
          key: "question",
          icon: require("@/assets/images/question.png"),
          title: "创建试题",
          des: "Create question",
        },
      ],
    };
  },
  mounted() {
    console.log(12212);
  },
  methods: {
    toPush(key) {
      this.$router.push(`/teacher/${key}`);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-left: 20px;
}

.watermark {
  color: #9195b3;
  position: fixed;
  bottom: 10px;
  font-size: 14px;
}
</style>