<template>
  <div>
    <h1>{{ isAuthenticated }}</h1>
    <h1>{{ user }}</h1>
    <h1>fffsdf</h1>
    <button @click="handleTest">click</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'index',
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
