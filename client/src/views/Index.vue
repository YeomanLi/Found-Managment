<template>
  <div class="index">
    <HeadNav></HeadNav>
    <SiderBar></SiderBar>
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
  },
  methods: {
      handleTest () {
        console.log(this.$store)
      }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
