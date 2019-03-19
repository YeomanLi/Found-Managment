<template>
  <div class="index">
    <HeadNav></HeadNav>
    <SiderBar></SiderBar>
    <div class="right-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue'
import SiderBar from '../components/SiderBar.vue'
export default {
  name: 'indedx',
  components: {
    HeadNav,
    SiderBar
  }
}
</script>

<style lang="scss" scoped>
  $thisTop: 60.8px;
  $thisLeft: 180px;
  $right-container-width: calc(100% - 180px);
  $right-container-height: calc(100% - 60.8px);
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .right-container {
    position: absolute;
    top: $thisTop;
    left: $thisLeft;
    width: $right-container-width;
    height: $right-container-height;
    overflow: auto;
  }
</style>
