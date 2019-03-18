<template>
  <div>
    <h1>{{ isAuthenticated }}</h1>
    <h1>{{ user }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'test',
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/getAuthenticated',
      user: 'user/getUser'
    })
  }
}
</script>

