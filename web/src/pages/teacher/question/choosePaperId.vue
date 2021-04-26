<template>
  <div class="question">
    <div class="form">
      <p class="tip">请选择对应试卷</p>
      <div>
        <el-form label-width="120px">
          <el-form-item label="选择对应试卷:" prop="paperId">
            <el-select v-model="paperId" placeholder="请选择">
              <el-option
                v-for="item in paperData"
                :key="item.paperId"
                :label="item.paperName"
                :value="item.paperId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <p v-if="warnStatus" class="warn">请选择对应试卷</p>
        </el-form>
        <el-button @click="submit" type="primary" round>确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

export default {
  name: "ChoosePaperId",
  data() {
    return {
      paperData: [],
      paperId: "",
      warnStatus: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    submit() {
      if (!this.paperId) {
        this.warnStatus = true;
      } else {
        this.warnStatus = false;
        this.$router.push(`/teacher/quesManage/${this.paperId}`);
      }
    },
    async getList(params) {
      const { data } = await httpServer(
        {
          url: "/exam/infoList",
        },
        params
      );
      this.paperData = data.list;
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 520px;
  margin-top: 30px;
  margin-left: 30px;
  padding: 30px 80px 30px 80px;
  border-radius: 20px;
  background-color: white;
  text-align: center;
}

.tip {
  color: #5890ff;
  font-size: 25px;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: center;
}

.question {
  display: flex;
  justify-content: center;
}

.warn {
  font-size: 16px;
  color: #dd001b;
}
</style>