<template>
  <div class="login-page">
    <div class="form-container">
      <div class="login-page-title">
        <span class="title">Yeoman's System</span>
      </div>
      <el-form class="login-form" ref="loginForm" :rules="rules" :model="loginUser" label-width="90px" status-icon>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="loginUser.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginUser.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="handleLogin('loginForm')">登录</el-button>
        </el-form-item>
        <p class="register-tip">还没有账号?现在<a href="/register">注册</a></p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_WARNING } from '../store/modules/User/mutation-types'
export default {
  name: 'login',
  data () {
    return {
      loginUser: {
        email: '',
        password: ''
      },

      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请您设置密码', trigger: 'blur'},
          { min: 6, max: 25, message: '密码长度在6至25位之间', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleStatus (status) {
      if (200 == status) {
        Notification({
          title: '登录成功😃',
          message: '正在为您跳转',
          type: 'success',
          duration: 2500,
          showClose: false,
          onClose: () => this.$router.push('/index')
        })
      } else if (400 == status) {
          Notification({
            title: '密码错误😢',
            message: '请填写正确的密码',
            type: 'error',
            duration: 2500,
            showClose: false
          })
      } else if (404 == status) {
          Notification({
            title: '该邮箱尚未注册😪',
            message: '请前往注册',
            type: 'error',
            duration: 2500,
            showClose: false,
            onClose: () => this.$router.push('/register')
          })
      }
    },

    handleLogin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // to do
          this.$store.dispatch('user/login', this.loginUser)
                     .then(successStatus => this.handleStatus(successStatus))
                     .catch(errorStatus => this.handleStatus(errorStatus))
        } else {
          Notification({
            title: '信息尚未填写完整😳',
            message: '请正确填写信息',
            type: 'warning',
            duration: 2500,
            showClose: false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $maximum : 100%;
  $white : #fff;
  $redirectColor : #409eff;

  .login-page {
    position: relative;
    width: $maximum;
    height: $maximum;
    background-image: url(../assets/bg.jpg);
    background-size: $maximum $maximum;
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
      color: $white;
    }
    .login-form {
      margin-top: 20px;
      padding: 20px 40px 20px 5px;
      border-radius: 5px;
      box-shadow: 0px 5px 10px #cccccc;
      background-color: $white;
    }
    .loginBtn {
      width: $maximum;
    }
  }

  .register-tip {
    text-align: right;
    font-size: 12px;
    a {
      text-decoration: none;
      color: $redirectColor;
    }
  }
</style>
