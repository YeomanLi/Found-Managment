<template>
  <div class="index">
    <HeadNav></HeadNav>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue'
export default {
  name: 'indedx',
  components: {
    HeadNav
  },
  methods: {
      handleTest () {
        console.log(this.$store)
      }
  }
}
</script>

<style lang="scss" scoped>
</style>
