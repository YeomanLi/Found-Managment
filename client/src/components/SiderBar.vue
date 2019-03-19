<template>
  <el-row class="menu-container">
    <el-col :span="6">
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical">
        <router-link to="/home">
          <el-menu-item index="0">
            <fai class="fa-icon" icon="server" />
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <fai class="fa-icon" :icon="item.icon" />
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link v-for="(citem, cindex) in item.children"
              :to="citem.path" :key="cindex">
              <el-menu-item
                :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SiderBar',
  data () {
    return {
      items: [
        {
          icon: 'money-bill-alt',
          name: '资金管理',
          path: 'fund',
          children: [{ path: "foundlist", name: "资金流水" }]
        },
        {
          icon: 'sitemap',
          name: '信息管理',
          path: 'info',
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  $icon-color: lightslategray;
  a {
    text-decoration: none;
  }

  .menu-container {
    position: fixed;
    top: 60.8px;
    left: 0;
    min-height: 100%;
    z-index: 99;
    background-color: #324057;
  }

  .fa-icon {
    color: $icon-color;
    margin-right: 5px;
  }

  .el-menu {
    border: none;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }

  .el-submenu .el-menu-item {
    min-width: 180px;
  }

</style>

