<template>
  <div class="wrapper">
    <el-dialog :title="!isDispatch ? '更改试卷信息' : '分发试卷'" :visible.sync="isEdit">
      <div v-if="isDispatch">
        <dispatch 
          v-if="isDispatch && isEdit" 
          :paperId = "nowPaperID"
          @success = "successDisp"></dispatch>
      </div>
      <div v-else class="form">
        <el-form :model="editForm" label-width="120px">
          <el-form-item label="试卷名称:" prop="paperName">
            <el-input v-model="editForm.paperName"></el-input>
          </el-form-item>
          <el-form-item label="总分数:" prop="score">
            <el-slider :max="Number(150)" v-model="editForm.score"></el-slider>
          </el-form-item>
          <el-form-item label="总时长:" prop="time">
            <el-input v-model="editForm.time"></el-input>
          </el-form-item>
          <el-form-item label="有效时间：" prop="effect">
            <el-date-picker
              v-model="editTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="试卷描述:" prop="paperExplain">
            <el-input
              v-model="editForm.paperExplain"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="submit" type="primary" round>提交</el-button>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div> -->
      </div>
    </el-dialog>

    <div class="table">
      <div class="top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/teacher/paperManage' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search">
        <el-input placeholder="请输入试卷名称" v-model="name" clearable>
        </el-input>
        <el-button @click="query" type="primary" round>查询</el-button>
      </div>
      <el-table :data="formData">
        <el-table-column label="试卷名称" prop="paperName"> </el-table-column>
        <el-table-column label="试卷总时长" prop="time"> </el-table-column>
        <el-table-column label="试卷描述" prop="paperExplain">
        </el-table-column>
        <el-table-column label="试卷开始时间">
          <template slot-scope="scope">
            {{
              dayjs(scope.row.startTime * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </template>
        </el-table-column>
        <el-table-column label="试卷结束时间">
          <template slot-scope="scope">
            {{
              dayjs(scope.row.startTime * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </template>
        </el-table-column>
        <el-table-column label="试卷分数" prop="score"> </el-table-column>
        <el-table-column label="创建者名称" prop="creatorName">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="dispatch(scope.row)" type="text" size="small">
              <span class="el-dropdown-link" type="text" size="small">分发</span>
            </el-button>
            <el-dropdown>
              <span class="el-dropdown-link" type="text" size="small">
                编辑<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showQues(scope.row)">
                  查看
                </el-dropdown-item>
                <el-dropdown-item @click.native="edit(scope.row)">
                  修改
                </el-dropdown-item>
                <el-dropdown-item @click.native="del(scope.row)">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";
import Dispatch from './dispatch.vue';
export default {
  name: "PaperManage",
  data() {
    return {
      formData: [],
      name: "",
      isEdit: false,
      isDispatch: false,
      nowPaperID: '',
      editTime: [],
      editForm: {
        score: 0,
      },
    };
  },
  components: {
    Dispatch
  },
  watch: {
    editTime: {
      handler(val, oldVal) {
        if (!val) {
          return;
        } else {
          this.editForm.startTime = new Date(val[0]).getTime() / 1000;
          this.editForm.endTime = new Date(val[1]).getTime() / 1000;
        }
        console.log(val);
      },
    },
  },
  mounted() {
    this.getList();
  },

  methods: {
    query() {
      const params = { name: this.name };
      this.getList(params);
    },
    // 分发当前试卷
    dispatch(item) {
      this.isEdit = true
      this.isDispatch = true
      this.nowPaperID = item.paperId
    },
    // dispatch 发送来 dialog 取消显示
    successDisp() {
      this.isEdit = false
    },

    showQues(item) {
      const id = item.paperId
      this.$router.push(`/teacher/quesManage/${id}`)
    },

    edit(item) {
      this.isEdit = true;
      this.isDispatch = false;
      console.log(item);
      this.editForm = JSON.parse(JSON.stringify(item));
      const startTime = new Date(item.startTime * 1000);
      const endTime = new Date(item.endTime * 1000);
      this.$set(this.editTime, 0, startTime);
    },

    submit() {
      this.update(this.editForm);
    },
    del(item) {
      this.delPaper(item.paperId);
    },

    async getList(params) {
      const { data } = await httpServer(
        {
          url: "/exam/infoList",
        },
        params
      );
      this.formData = data.list;
      console.log(data.list);
    },
    async update(form) {
      const { data } = await httpServer(
        {
          url: "/exam/update",
        },
        form
      );
      if (data.respCode == 200) {
        this.isEdit = false;
        this.getList();
      }
    },

    async delPaper(id) {
      const params = {
        paperId: id,
      };
      const { data } = await httpServer(
        {
          url: "/exam/del",
        },
        params
      );
      console.log(data);
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