<template>
  <div class="exam-card">
    <div class="card-header">
      <div class="time f-l">
        <i class="el-icon-time"></i>
        <span v-cloak>{{ hour }}:{{ min }}:{{ sec }}</span>
      </div>
      <div class="answer-card f-l m-l-20" @click="dialogVisible = true">
        <i class="el-icon-date"></i>
        <span>答题卡</span>
      </div>
      <div class="submit-paper f-r">
        <el-button type="primary" round @click="submitPaper">交卷</el-button>
      </div>
    </div>
    <div class="card-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>第{{ nowKey + 1 }}题（{{ getType(nowType) }}）</span>
          <el-button
            style="float: left; padding: 3px 0; margin-right: 5px"
            type="text"
            @click="beforeQuestion"
            :disabled="beforeFlag"
            >上一题</el-button
          >
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="nextQuestion"
            :disabled="nextFlag"
            >下一题</el-button
          >

          <!-- 单选 -->
          <div class="q-single" v-show="nowType == 2">
            <div class="question">
              {{ questions[nowKey].title }}
            </div>
            <div class="answer">
              <div
                class="answer-item"
                v-for="(item, index) in JSON.parse(
                  String(questions[nowKey].option)
                )"
                :key="index"
              >
                <el-radio v-model="answerList[nowKey].answer" :label="index">{{
                  item
                }}</el-radio>
              </div>
            </div>
          </div>

          <!-- 多选 -->
          <div class="q-multiple" v-show="nowType == 3">
            <div class="question">
              {{ questions[nowKey].title }}
            </div>
            <div class="answer">
              <div
                class="answer-item"
                v-for="(item, index) in JSON.parse(
                  String(questions[nowKey].option)
                )"
                :key="index"
              >
                <el-checkbox
                  v-model="answerList[nowKey].answer[index]"
                  :label="index"
                  >{{ item }}</el-checkbox
                >
              </div>
            </div>
          </div>
          <!-- 判断 -->
          <div class="q-true-or-false" v-show="nowType == 4">
            <div class="question">
              {{ questions[nowKey].title }}
            </div>
            <div class="answer">
              <div class="answer-item">
                <el-radio v-model="answerList[nowKey].answer" label="0"
                  >正确</el-radio
                >
              </div>
              <div class="answer-item">
                <el-radio v-model="answerList[nowKey].answer" label="1"
                  >错误</el-radio
                >
              </div>
            </div>
          </div>

          <!-- 填空 -->
          <div class="q-fill-in" v-show="nowType == 1">
            <div class="question">
              {{ questions[nowKey].title }}
            </div>
            <div class="answer">
              <div class="answer-item">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入答案"
                  v-model="answerList[nowKey].answer"
                >
                </el-input>
              </div>
            </div>
          </div>
          <!-- 简答 -->
          <div class="q-short-answer" v-show="nowType == 5">
            <div class="question">
              {{ questions[nowKey].title }}
            </div>
            <div class="answer">
              <div class="answer-item">
                <el-input
                  type="textarea"
                  :rows="15"
                  placeholder="请输入答案"
                  v-model="answerList[nowKey].answer"
                >
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog title="答题卡" :visible.sync="dialogVisible" width="50%">
      <el-button
        v-for="(item, index) in questions"
        :key="index"
        type="primary"
        class="stu-answer-item"
        @click="clickAnswerCard(index)"
        >{{ index + 1 }}</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import { Message,MessageBox  } from 'element-ui';

import httpServer from "@/components/httpServer/httpServer.js";

export default {
  name: "ExamCard",
  data() {
    return {
      paper: {},
      questions: [],
      nowKey: 0,
      nowType: "",
      // 判断题答案
      radio: 0,
      // 填空题答案
      textarea: "",
      checked: [],
      answerList: [],
      beforeFlag: true,
      nextFlag: false,
      dialogVisible: false,
      onblurTime: 0,
      timer: 0,
      hour: 0,
      min: 0,
      sec: 0,
    };
  },
  // computed: {
  //   answerList: () => {
  //     [
  //       {
  //         qid: this.questions[0].qid,
  //         answer: "",
  //       },
  //     ];
  //   },
  // },
  watch: {
    questions: {
      handler(newVal, oldVal) {
        this.nowType = newVal[this.nowKey].type;
      },
    },
    nowKey: {
      handler(newVal, oldVal) {
        this.nowType = this.questions[newVal].type;

        // 判断上一题 下一题按钮是否可按
        this.nextFlag =
          this.nowKey + 1 === this.questions.length ? true : false;
        this.beforeFlag = this.nowKey === 0 ? true : false;
      },
    },
  },

  created() {
    this.getPapers();
  },

  methods: {
    submitPaper() {
      console.log(this.answerList);
    },
    getType(type) {
      switch (type) {
        case 1: //填空
          return "填空题";
          break;
        case 5: //简答
          return "简答题";
          break;
        case 6: //程序
          return "程序题";
          break;
        case 2: //选择
          return "单选题";
          break;
        case 4: //判断
          return "判断题";
          break;
        case 3: //多选
          return "多选题";
          break;
      }
    },
    nextQuestion() {
      this.nowKey++;

      // this.answerList[this.nowKey] = {
      //   answer: "",
      //   qid: this.questions[this.nowKey].qid,
      // };
      // console.log(this.answerList);
    },
    beforeQuestion() {
      this.nowKey--;
    },

    // 对答案对象的初始化  都以 nowKey 决定当前是哪个题目
    initAnswer() {
      this.questions.forEach((item) => {
        if (
          item.type == 1 ||
          item.type == 5 ||
          item.type == 6 ||
          item.type == 2 ||
          item.type == 4
        ) {
          this.answerList.push({
            answer: "",
            qid: item.qid,
          });
        } else {
          this.answerList.push({
            answer: [""],
            qid: item.qid,
          });
        }
      });
      console.log(this.answerList);
    },

    // 初始化考试试卷
    initExam() {
      let that = this;
      // 是否点击其他
      window.onblur = function () {
        console.log(233213123123);
        that.onblurTime++;
        if (that.onblurTime == 2) {
          that.submitPaper();
          MessageBox("你已交卷", "提示", {
            confirmButtonText: "确定",
            type: "error",
          });
        } else {
          MessageBox(
            "考试期间不能离开此页面哦~这一次只是提醒，下次离开就会直接交卷了哦",
            "提示",
            {
              confirmButtonText: "确定",
              type: "error",
            }
          );
        }
      };
      const initTime = new Date().getTime() + this.paper.time * 60 * 1000;
      this.timer = window.setInterval(() => {

        let timeLast = initTime - new Date().getTime()

        let hour = parseInt(timeLast / (1000 * 60 * 60));
        let min = parseInt((timeLast % (1000 * 60 * 60)) / (1000 * 60));
        let sec = parseInt(
          ((timeLast % (1000 * 60 * 60)) % (1000 * 60)) / 1000
        );
        this.hour = hour < 10 ? "0" + hour : hour;
        this.min = min < 10 ? "0" + min : min;
        this.sec = sec < 10 ? "0" + sec : sec;

        if (this.hour == 0 && this.min == 0 && this.sec == 0) {
          window.clearInterval(this.timer);
          this.submitPaper();
        }
      }, 1000);

      this.questionId = parseInt(this.$route.params.questionId) + 1; //当前题号
      this.currentQuestion = this.questionList[this.nowKey];

      this.questionType = parseInt(this.currentQuestion.questionType);

      if (typeof this.currentQuestion.answer != "undefined") {
        this.setAnswer(this.questionType, this.currentQuestion.answer);
      }
      if (this.questionType == 3) {
        for (let i = 0; i < this.currentQuestion.choice.length; i++) {
          this.checked.push(false);
        }
      }
    },

    clickAnswerCard(index) {
      this.nowKey = index;
      this.dialogVisible = false;
    },

    async getPapers() {
      const { data } = await httpServer(
        {
          url: "/paper/query",
        },
        {
          paperId: this.$route.params.paperId,
        }
      );
      if (data.respCode === 200) {
        this.paper = data.list[0];
        this.questions = data.list[0].questions;
        this.initAnswer();
        this.initExam();
      }
    },
  },
};
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none;
}
.card-header {
  padding: 10px;
  font-size: 20px;
  margin-top: 30px;
}
.answer-card {
  cursor: pointer;
}
.time,
.answer-card {
  margin-top: 10px;
}
.answer-item {
  padding: 10px;
}
.question {
  padding: 10px 0;
  margin-left: 20px;
}
.card-content {
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
}

.card-content .box-card {
  min-height: 500px;
}

.el-button.stu-answer-item {
  margin: 10px;
  width: 60px;
  height: 60px;
}
</style>