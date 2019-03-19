<template>
  <header class="header-container">
    <el-row type="flex" justify="space-between">
      <el-col :span="12" class="site-title-container">
        <img class="logo" src="../assets/logo.png" alt="logo">
        <span class="title">资金流水管理系统</span>
      </el-col>
      <el-col :span="6" class="user-container">
        <img class="user-avatar" src="../assets/logo.png" alt="avatar">
        <div class="welcome-container">
          <p class="welcome-banner">欢迎</p>
          <p class="user-name">Yeoman</p>
        </div>
        <el-dropdown @command='setDialogInfo' trigger="click" class="drop-down">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='info'>个人信息</el-dropdown-item>
            <el-dropdown-item command='logout'>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'HeadNav',
  methods: {
    setDialogInfo (cmdItem) {
      if (!cmdItem) {
        console.log('test')
        return
      }
      switch (cmdItem) {
        case 'info':
          this.showInfoList()
          break
        case 'logout':
          this.logout()
          break
        default:  console.log('default error')
      }
    },

    showInfoList () {
      console.log('show info')
    },

    logout () {
      console.log('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
  $maximum: 100%;
  $header-color: #324057;
  $bottom-color: #1f2d3d;
  $name-color: #409eff;
  $header-height: 60px;
  $logo-size: 50px;
  $f-weight: 900;

  .header-container {
    width: $maximum;
    height: $header-height;
    background: $header-color;
    border-bottom: 1px solid $bottom-color;
  }

  .site-title-container {
    line-height: $header-height;
    .logo {
      display: inline-block;
      width: $logo-size;
      height: $logo-size;
      vertical-align: middle;
      margin: 0 5px;
    }
    .title {
      vertical-align: middle;
      font-size: 22px;
      font-family: 'Microsoft YaHei';
      color: #fff;
      font-weight: $f-weight;
      letter-spacing: 3px;
    }
  }

  .user-container {
    line-height: $header-height;
    text-align: right;
    padding-right: 10px;
    .user-avatar {
      width: $logo-size - 10;
      height: $logo-size - 10;
      vertical-align: middle;
      margin: 0 10px;
      border-radius: 50%;
    }
  }

  .welcome-container {
    display: inline-block;
    vertical-align: middle;
    .welcome-banner,
    .user-name {
      text-align: center;
      line-height: 20px;
    }
    .welcome-banner {
      color: #fff;
      font-weight: $f-weight - 200;
    }
    .user-name {
      color: $name-color;
      font-weight: $f-weight;
    }
  }

  .drop-down {
    margin-left: 15px;
    color: #fff;
  }

  .drop-down:hover {
    cursor: pointer;
  }
</style>
