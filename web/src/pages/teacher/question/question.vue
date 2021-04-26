<template>
  <div class="question">
    <div class="form">
      <p class="tip">填写试题相关信息</p>
      <div v-if="!chooseId">
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
      <div v-else>
        <el-form
          label-width="120px"
          :model="formdata"
          :rules="rules"
          ref="question"
          class="item"
        >
          <el-form-item label="试题题目:" prop="title">
            <el-input v-model="formdata.title"></el-input>
          </el-form-item>
          <el-form-item label="试题类型:">
            <el-radio-group
              v-model="formdata.type"
              @change="radioChange"
              :max="Number(1)"
            >
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
              <el-input v-model="formdata.optionAnswer[index]"></el-input>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                :disabled="del"
                @click.prevent="remove(item)"
              >
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain round @click="addOption">
                新增备选项</el-button
              >
            </el-form-item>
            <el-form-item label="正确选项:">
              <el-input v-model="formdata.answer"></el-input>
            </el-form-item>
          </div>
          <div v-if="formdata.type === 4">
            <el-form-item label="正确选项:">
              <el-radio v-model="formdata.answer" label="0">错</el-radio>
              <el-radio v-model="formdata.answer" label="1">对</el-radio>
            </el-form-item>
          </div>
          <el-form-item label="试题分数:">
            <el-input v-model="formdata.score"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="subQues" type="primary" round>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

export default {
  name: "Question",
  data() {
    return {
      formdata: {
        paperId: "",
        type: [],
        optionAnswer: [],
      },
      del: true,
      chooseId: false,
      warnStatus: false,
      paperId: "",
      paperData: [],
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
      rules: {},
      optionAnswer: [],
      options: [""],
      isSelect: false,
    };
  },
  mounted() {
    this.getList();
  },
  watch: {
    options: {
      handler(oldVal, newVal) {
        console.log(this.formdata);
        if (this.options.length <= 1) {
          this.del = true;
        } else {
          this.del = false;
        }
      },
    },
  },
  methods: {
    //提交关联试卷
    submit() {
      if (this.paperId) {
        this.formdata.paperId = this.paperId;
        this.chooseId = true;
        this.warnStatus = false;
      } else {
        this.warnStatus = true;
      }
    },
    // 提交一个题目
    subQues() {
      this.submitQues();
    },
    //增加候选项
    addOption() {
      this.options.push("");
    },
    //删除候选项
    remove(item) {
      const index = this.options.indexOf(item);
      if (index !== -1) {
        this.options.splice(index, 1);
      }
    },
    radioChange() {
      const flag = this.formdata.type;
      if (flag === 2 || flag === 3) {
        this.isSelect = true;
        console.log(111);
      } else {
        this.isSelect = false;
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

    async submitQues() {
      const { data } = await httpServer(
        {
          url: "/exam/subQuestion",
        },
        this.formdata
      );
      if (data.respCode === 200) {
        console.log("创建成功了");
        this.formdata = {
          paperId: this.paperId,
          type: [],
          optionAnswer: [],
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.question {
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

.warn {
  font-size: 16px;
  color: #dd001b;
}

.item {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
/deep/ .el-radio-group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

/deep/ .el-input {
  width: 200px;
}
</style>