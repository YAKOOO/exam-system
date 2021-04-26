<template>
  <div class="question">
    <div class="form">
      <p class="tip">请选择相应班级</p>
      <div>
        <el-form label-width="120px">
          <el-form-item label="班级代号:" prop="paperId">
            <el-select v-model="classId" placeholder="请选择">
              <el-option
                v-for="item in classData"
                :key="item.classId"
                :label="item.classId"
                :value="item.classId"
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
  name: "ChooseClassId",
  data() {
    return {
      classId: "",
      warnStatus: false,
      classData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    submit() {
      if (!this.classId) {
        this.warnStatus = true;
      } else {
        this.warnStatus = false;
        this.$router.push(`/teacher/stuManage/${this.classId}`);
      }
    },
    async getList() {
      const { data } = await httpServer(
        {
          url: "/class/getList",
        }
      );
      if(data.respCode == 200 ) {
        this.classData = data.list
      }
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