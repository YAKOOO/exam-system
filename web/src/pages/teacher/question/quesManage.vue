// 试题列表
<template>
  <div class="wrapper">
    <el-dialog title="更改试题信息" :visible.sync="isEdit">
      <div class="form">
        <el-form :model="editForm" label-width="120px">
          <el-form-item label="试题题目:" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="试题类型:" prop="type">
            <el-radio-group v-model="editForm.type" :max="Number(1)">
              <el-radio
                v-for="item in checkType"
                :key="item.key"
                :label="item.key"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="isSelect">
            <el-form-item
              v-for="(item, index) in options"
              :label="'备选项:' + index"
              :key="index"
              :prop="'option' + index"
              :rules="{
                require: true,
                message: '备选项不得为空',
                trigger: 'blur',
              }"
            >
              <el-input v-model="editForm.optionAnswer[index]"></el-input>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                :disabled="del"
                @click.prevent="remove(index)"
              >
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain round @click="addOption">
                新增备选项</el-button
              >
            </el-form-item>
            <el-form-item label="正确选项:">
              <el-input v-model="editForm.answer"></el-input>
            </el-form-item>
          </div>
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
          <el-breadcrumb-item :to="{ path: '/teacher/paperManage' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item :to="{ path: `/teacher/quesManage/${paperId}` }"
            >题目管理</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="search">
        <el-input
          placeholder="请输入试题题目进行搜索"
          v-model="title"
          clearable
        >
        </el-input>
        <el-button @click="query" type="primary" round>查询</el-button>
      </div>
      <el-table :data="formData">
        <el-table-column label="试题题目" prop="title"> </el-table-column>
        <el-table-column label="试题类型">
          <template slot-scope="scope">
            {{ typeList[scope.row.type - 1] }}
          </template>
        </el-table-column>
        <el-table-column label="备选选项" prop="optionAnswer">
        </el-table-column>
        <el-table-column label="正确答案" prop="answer"></el-table-column>
        <el-table-column label="试题分数" prop="score"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">
              修改
            </el-button>
            <el-button @click="removeQues(scope.row)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";
export default {
  name: "PaperManage",
  data() {
    return {
      paperId: 0,
      formData: [],
      typeList: ["填空题", "单选题", "多选题", "判断题", "简答题", "程序题"],
      checkType: [
        {
          key: 1,
          label: "填空题",
        },
        {
          key: 2,
          label: "单选题",
        },
        {
          key: 3,
          label: "多选题",
        },
        {
          key: 4,
          label: "判断题",
        },
        {
          key: 5,
          label: "简答题",
        },
        {
          key: 6,
          label: "程序题",
        },
      ],
      title: "",
      options: [""],
      isSelect: false,
      isEdit: false,
      editForm: {
        score: 0,
        type: 1,
      },
      del: false,
    };
  },

  watch: {
    options: {
      handler(oldVal, newVal) {
        if (this.options.length <= 1) {
          this.del = true;
        } else {
          this.del = false;
        }
      },
    },
    "editForm.type": {
      handler(oldVal, newVal) {
        const flag = this.editForm.type;
        if (flag === 2 || flag === 3) {
          this.isSelect = true;
          console.log(111);
        } else {
          this.isSelect = false;
        }
      },
    },
  },

  mounted() {
    this.paperId = this.$route.params.paperId;
    this.query();
  },

  methods: {
    query() {
      const params = {
        title: this.title,
        paperId: this.paperId,
      };
      console.log(this.paperId);
      this.getList(params);
    },

    showQues(item) {
      const id = item.paperId;
      this.$router.push(`/teacher/quesManage/${id}`);
    },

    edit(item) {
      this.isEdit = true;
      console.log(item);
      this.editForm = JSON.parse(JSON.stringify(item));
      this.editForm.optionAnswer = JSON.parse(
        String(this.editForm.optionAnswer)
      );
      const len = this.editForm.optionAnswer.length;
      console.log(len);
      this.options = [""];
      for (let i = 1; i < len; i++) {
        this.options.push("");
      }
      console.log(this.editForm.optionAnswer);
    },
    // // 试题类型修改
    // radioChange() {
    //   const flag = this.editForm.type;
    //   if (flag === 2 || flag === 3) {
    //     this.isSelect = true;
    //     console.log(111);
    //   } else {
    //     this.isSelect = false;
    //   }
    // },
    // 处理数组
    splitOption(str) {
      console.log(str);
    },
    //增加候选项
    addOption() {
      this.options.push("");
    },

    //删除候选项
    remove(index) {
      console.log(index);
      if (index !== -1) {
        this.options.splice(index, 1);
        this.editForm.optionAnswer.splice(index, 1);
      }
    },

    submit() {
      this.update(this.editForm);
    },

    removeQues(item) {
      this.delQues(item.qid);
    },

    async getList(params) {
      const { data } = await httpServer(
        {
          url: "/ques/infoList",
        },
        params
      );
      if (data.respCode === 200) {
        this.formData = data.list;
      }
      console.log(params);
    },

    async update(form) {
      form.optionAnswer = JSON.stringify(form.optionAnswer);
      delete form.paperId;
      delete form.creator;
      delete form.paperName;
      const { data } = await httpServer(
        {
          url: "/ques/update",
        },
        form
      );
      if (data.respCode === 200) {
        this.isEdit = false;
        this.query();
      }
    },

    async delQues(id) {
      const params = {
        qid: id,
      };
      const { data } = await httpServer(
        {
          url: "/ques/del",
        },
        params
      );
      if (data.respCode === 200) {
        this.query();
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