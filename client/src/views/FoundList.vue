<template>
  <div>
    {{infoList}}
    <button @click="handleTest">click</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FoundList',
  // created () {
  //   if (0 == infoList.length) {
  //     this.$store.dispatch('info/getAllInfo')
  //   }
  // },

  computed: {
    ...mapGetters({
      infoList: 'info/getAllInfo'
    })
  },

  methods: {
    handleTest () {
      alert('test')
      this.$store.dispatch('info/getAllInfo')
    }
  }
}
</script>