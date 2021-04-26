<template>
  <div class="paper">
    <div class="form">
      <p class="tip">填写试卷相关信息</p>
      <el-form label-width="120px" :model="formdata" :rules="rules" ref="paper">
        <el-form-item label="试卷名称:" prop="paperName">
          <el-input v-model="formdata.paperName"></el-input>
        </el-form-item>
        <el-form-item label="总分数:" prop="score">
          <el-slider :max="Number(150)" v-model="formdata.score"></el-slider>
        </el-form-item>
        <el-form-item label="总时长:" prop="time">
          <el-input v-model="formdata.time"></el-input>
        </el-form-item>
        <el-form-item label="有效时间：" prop="effect">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="试卷描述:" prop="paperExplain">
          <el-input v-model="formdata.paperExplain" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="submit" type="primary" round>提交</el-button>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

export default {
  name: "Paper",
  data() {
    const checkEffect = (rule, value, callback) => {
      if (value === []) {
        callback(new Error("请选择试卷有效时间"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        paperName: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
        score: [{ required: true, message: "请输入总分数", trigger: "blur" }],
        time: [{ required: true, message: "请输入总时长", trigger: "blur" }],
        effect: [{ required: true, validator: checkEffect, trigger: "blur" }],
        paperExplain: [{ required: true, message: "请输入试卷介绍", trigger: "blur" }]
      },
      formdata: {},
      time: [],
    };
  },
  watch: {
    time: {
      handler(val, oldVal) {
        if (!val) {
          return;
        } else {
          this.formdata.startTime = new Date(val[0]).getTime() / 1000;
          this.formdata.endTime = new Date(val[1]).getTime() / 1000;
        }
        console.log(val);
      },
    },
  },
  methods: {
    submit() {
      this.$refs.paper.validate((valid) => {
        if(valid) {
          this.createPaper()
        }
      })
    },

    async createPaper() {
      this.formdata['creator'] = localStorage.id;
      this.formdata['creatorName'] = localStorage.username;
      const { data } = await httpServer(
        {
          url: '/exam/create'
        },this.formdata
      )
      if(data.respCode === 200) {
        this.$router.push('/teacher/home')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.paper {
  display: flex;
  justify-content: center;
}

.tip {
  color: #5890ff;
  font-size: 25px;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: center;
}
.form {
  width: 520px;
  margin-top: 30px;
  margin-left: 30px;
  padding: 30px 80px 30px 80px;
  border-radius: 20px;
  background-color: white;
  text-align: center;
}
</style>