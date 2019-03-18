<template>
  <div class="index">
    <HeadNav></HeadNav>
  </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'indedx',
  components: {
    HeadNav
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/getAuthenticated',
      user: 'user/getUser'
    })
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
