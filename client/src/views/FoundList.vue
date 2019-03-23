<template>
  <div>
    {{infoList}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FoundList',
  created () {
    if (0 == this.infoList.length) {
      this.$store.dispatch('info/getAllInfo')
    }
  },

  computed: {
    ...mapGetters({
      infoList: 'info/getAllInfo'
    })
  }
}
</script>