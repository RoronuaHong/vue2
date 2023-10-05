<template>
  <div>
    <p>404</p>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',

  data () {
    return {

    }
  },

  created () {
    setTimeout(() => this.$router.push('/'), 3000)
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
