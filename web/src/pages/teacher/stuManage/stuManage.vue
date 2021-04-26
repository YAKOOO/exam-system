<template>
  <div class="wrapper">
    <div class="table">
      <div class="top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/teacher/paperManage' }"
            >首页</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="search">
        <el-input
          clearable
          v-model="name"
          placeholder="请输入学生姓名进行搜索"
        ></el-input>
        <el-button @click="query" type="primary" round>查询</el-button>
      </div>
      <el-table :data="formData">
        <el-table-column label="学生学号" prop="sno"></el-table-column>
        <el-table-column label="学生名称" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="show(scope.row)" type="text" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>      </el-table>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

export default {
  name: "StuManage",
  data() {
    return {
      formData: [],
      name: "",
    };
  },
  mounted() {
    const classId = this.$route.params.classId;
    this.getList(classId);
    console.log(classId);
  },
  methods: {
    query() {
      
    },
    show() {},

    async getList(id) {
      const { data } = await httpServer(
        {
          url: "/class/getStudent",
        },
        { classId: id }
      );
      if (data.respCode === 200) {
        this.formData = data.list;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.top {
  width: 96%;
  float: left;
  background: white;
  margin-bottom: 20px;
  padding: 10px 20px;
}
.search {
  width: 96%;
  float: left;
  background: white;
  margin-bottom: 20px;
  padding: 10px 20px;
}
.table {
  width: 96%;
  margin-top: 20px;
  border-radius: 20px;
}

.form {
  width: 330px;
  border-radius: 20px;
  background-color: white;
  text-align: center;
}

/deep/ .el-input {
  width: 300px;
}

/deep/ .el-dropdown {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}

/deep/ .el-breadcrumb {
  font-size: 15px;
  line-height: 2;
}
</style>