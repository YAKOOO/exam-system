<template>
  <div class="login">
    <div class="login-content-wrap">
      <div class="teacher">
        <p @click="Teacher">
          {{ !this.toTeacher ? "切换为教师端口" : "返回至学生端口" }}
        </p>
      </div>
      <div class="login-content">
        <p class="font">Log in your system account</p>
        <div class="login-from">
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="50px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号:" prop="id">
              <el-input
                v-model="ruleForm2.id"
                type="text"
                auto-complete="off"
                placeholder="请输入账号，学生端为学号"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                v-model="ruleForm2.password"
                type="password"
                auto-complete="off"
                placeholder=" 请输入密码"
              >
              </el-input>
            </el-form-item>
            <div v-if="toRegister">
              <el-form-item label="昵称:" prop="password">
                <el-input
                  v-model="ruleForm2.name"
                  type="text"
                  auto-complete="off"
                  placeholder=" 请输入昵称"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="班级:" prop="password">
                <el-input
                  v-model="ruleForm2.classId"
                  type="text"
                  auto-complete="off"
                  placeholder=" 请输入班级代号"
                >
                </el-input>
              </el-form-item>
            </div>
            <p class="register" @click="userRegister()">
              {{ this.toRegister ? "已有账号，立即登录" : "注册" }}
            </p>
            <el-form-item class="button">
              <el-button type="primary" @click="submitForm()"
                >{{ this.toRegister ? "注册" : "登录" }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpServer from "@/components/httpServer/httpServer.js";

export default {
  data() {
    return {
      ruleForm2: {
        id: "",
        password: "",
      },
      rules2: {
        id: [
          {
            require: true,
            trigger: "blur",
            message: "请输入学号",
          },
        ],
        password: [
          {
            require: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
      toRegister: false,
      toTeacher: false,
    };
  },
  methods: {
    submitForm() {
      this.toRegister ? this.register() : this.login();
    },
    register() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          const form = {
            sno: this.ruleForm2.id,
            name: this.ruleForm2.name,
            password: this.ruleForm2.password,
            classId: this.ruleForm2.classId,
          };
          httpServer(
            {
              url: "/user/register",
            },
            form
          ).then((res) => {
            if (res.status === 200) {
              this.userRegister();
            }
          });
        }
      });
    },
    login() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.toTeacher ? this.teacherLogin() : this.studentLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 控制注册
    userRegister() {
      this.toRegister = !this.toRegister;
      this.ruleForm2 = {};
    },

    Teacher() {
      this.toTeacher = !this.toTeacher;
    },

    async studentLogin() {
      const { data } = await httpServer(
        {
          url: "/user/login",
        },
        {
          sno: this.ruleForm2.id,
          password: this.ruleForm2.password,
        }
      );
      if (data.respCode == "1") {
        localStorage.username = data.studentInfo[0].name;
        localStorage.sno = data.studentInfo[0].sno;
        localStorage.token = `Bearer ${data.token}`;
        console.log(localStorage);
        this.$router.push("/student/home");
      }
    },

    async teacherLogin() {
      const { data } = await httpServer(
        {
          url: "/teacher/login",
        },
        {
          id: this.ruleForm2.id,
          password: this.ruleForm2.password,
        }
      );
      if (data.respCode == "1") {
        localStorage.username = data.teacherInfo.name;
        localStorage.id = data.teacherInfo.id;
        localStorage.token = `Bearer ${data.token}`;
        console.log(data)
        this.$router.push("/teacher/home");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
/* 登录界面 */

.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("../assets/images/bg.png");
  background-size: cover;
  min-height: 580px;
}

.teacher {
  position: fixed;
  right: 40px;
  top: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #c0c4cc;
}
.teacher :hover {
  color: #5890ff;
}

.teacher-icon {
  display: inline-block;
}

.register {
  position: fixed;
  right: 50px;
  cursor: pointer;
  font-size: 14px;
  color: #c0c4cc;
}

.register:hover {
  color: #5890ff;
}

.font {
  color: #5890ff;
  font-size: 30px;
  display: block;
  text-align: center;
}

.login .login-content-wrap {
  position: absolute;
  width: 800px;
  height: 100%;
  min-height: 580px;
  top: 0;
  right: 0;
}

.login .login-content {
  width: 500px;
  height: 600px;
  border-radius: 30px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 5px #e7eefc;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  font-size: 12px;
  transform: translateY(-50%);
}

.login .logo {
  display: block;
  margin: 0 auto;
  margin-top: 50px;
}

.login .login-form-button {
  width: 100%;
}

.login .login-from {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
}

.button {
  text-align: center;
  margin-top: 70px;
}

/deep/ .el-button--primary {
  width: 350px;
}
</style>
