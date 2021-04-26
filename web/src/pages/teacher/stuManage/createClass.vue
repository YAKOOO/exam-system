<template>
  <div class="wrapper">
    <div class="form">
      <p class="tip">填写班级相关信息</p>
      <el-form
        label-width="120px"
        :model="formdata"
        :rules="rules"
        ref="classForm"
      >
        <el-form-item label="班级代号:" prop="classId">
          <el-input v-model="formdata.classId"></el-input>
        </el-form-item>
        <el-form-item label="管理人:" prop="id">
          <el-input v-model="formdata.id"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="submit" type="primary" round>提交</el-button>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

export default {
  name: "CreateClass",
  data() {
    return {
      formdata: {},
      rules: {
        classId: [
          { required: true, message: "请输入班级代号", trigger: "blur" },
        ],
        id: [{ required: true, message: "请输入管理者id", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.classForm.validate((valid) => {
        if (valid) {
          this.createClass();
        }
      });
    },
    async createClass() {
      const { data } = await httpServer(
        {
          url: "/class/create",
        },
        this.formdata
      );
      if(data.respCode == 200) {
        this.$router.push(`/teacher/stuManage/${this.formdata.classId}`)
      }
    },
  },
};
</script>

<style>
.wrapper {
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