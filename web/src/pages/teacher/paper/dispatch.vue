<template>
  <div>
    <el-form>
      <el-form-item label="班级代号:" prop="paperId">
        <el-select
          v-model="classId"
          filterable
          placeholder="请选择"
          @change="classChange"
        >
          <el-option
            v-for="item in classData"
            :key="item.classId"
            :label="item.classId"
            :value="item.classId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="students.length" label="当前选择学生:">
        <el-checkbox-group v-model="stuList">
          <el-checkbox
            v-for="item in students"
            :label="item.sno"
            :key="item.sno"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button @click="submit" type="primary" round>提交</el-button>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

export default {
  name: "Disptch",
  data() {
    return {
      classData: [],
      classId: "",
      checkAll: false,
      indeterminate: true,
      students: [],
      stuList: [],
    };
  },
  props: {
    paperId: Number,
  },

  watch: {
    stuList: {
      handler(newVal, oldVal) {
        console.log(newVal);
      },
    },
  },
  mounted() {
    this.getList();
    console.log(this.paperId);
  },

  methods: {
    classChange() {
      this.getStu();
    },

    submit() {
      this.conStu();
    },

    async getList() {
      const { data } = await httpServer({
        url: "/class/getList",
      });
      if (data.respCode == 200) {
        this.classData = data.list;
      }
    },

    async getStu() {
      const params = {
        classId: this.classId,
      };
      const { data } = await httpServer(
        {
          url: "/class/getStudent",
        },
        params
      );
      if (data.respCode == 200) {
        this.students = data.list;
      }
    },

    async conStu() {
      const params = {
        stuList: this.stuList,
        paperId: this.paperId,
      };
      console.log(params);
      const { data } = await httpServer(
        {
          url: "/exam/connectStu",
        },
        params
      );
      if (data.respCode === 200) {
        this.$emit("success", true);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>