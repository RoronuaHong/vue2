<template>
  <div class="crumb-container">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in titles" :key="item">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'CrumbComponent',

  data () {
    return {
      titles: []
    }
  },

  watch: {
    $route: {
      immediate: true, // 立即监听
      handler (val, oldVal) {
        this.titles = this.$route.meta.titles
      }
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .crumb-container .el-breadcrumb {
    line-height: 55px;
    font-size: 15px;
  }
</style>
