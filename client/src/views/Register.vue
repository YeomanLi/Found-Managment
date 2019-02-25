<template>
  <div class="register-page">
    <section class="form-container">
      <div class="register-page-title">
        <span class="title">Yeoman在线后台管理系统</span>
      </div>
      <el-form class="register-form" status-icon :model="registerUser" :rules="rules" ref="registerForm" label-width="90px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" type="password" autocomplete="off" placeholder="请设置密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" type="password" autocomplete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <!-- todo
        fix: 身份选择框未撑满整个容器宽度 -->
        <el-form-item label="身份">
          <el-select v-model="registerUser.identity" placeholder="请选择你的身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="emloyee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister('registerForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',

  data () {
      const checkPass = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    };
    
    return {
      registerUser: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      },

      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在2至3个字符之间', trigger: 'change' }
        ],

        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请您设置密码', trigger: 'blur'},
          { min: 6, max: 25, message: '密码长度在6至25位之间', trigger: 'blur' }
        ],

        password2: [
          { required: true, message: '请确认您的密码', trigger: 'blur'},
          { min: 6, max: 25, message: '密码长度在6至25位之间', trigger: 'blur' },
          { validator: checkPass, message: '两次密码不一致', trigger: 'blur' }
        ]
      }
    }
  },
  
  methods: {
    handleRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
              .post('/api/user/register', this.handleRegister)
              .then(res => {
                console.log(res)
              })
        } else {
          console.log('not valid!')
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  .register-page {
    position: relative;
    width: 100%;
    height: 100%;
    // background-image: url(../assets/bg.jpg) no-repeat center center;
    background-image: url(../assets/bg.jpg);
    background-size: 100% 100%;
  }

  .form-container {
    position: absolute;
    width: 370px;
    height: 210px;
    top: 10%;
    left: 34%;
    padding: 25px;
    text-align: center;
    .title {
      font-family: "Microsoft YaHei";
      font-weight: bold;
      font-size: 26px;
      color: #fff;
    }

    .register-form {
      margin-top: 20px;
      padding: 20px 40px 20px 20px;
      border-radius: 5px;
      box-shadow: 0px 5px 10px #cccccc;
      background-color: #fff;
    }
  }
</style>
