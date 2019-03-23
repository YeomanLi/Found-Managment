<template>
  <div>{{infoList}}</div>
</template>

<script>
export default {
  name: 'FoundList',
  data () {
    return {
      infoList: {}
    }
  },

  created () {
    this.$store.dispatch('info/getAllInfo')
               .then(res => {
                 console.log(res)
                 this.infoList = res
               })
               .catch(err => console.log(err))
  }
}
</script>