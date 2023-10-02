<template>
  <!-- @open="handleOpen" -->
  <!-- @close="handleClose" -->
  <div class="main-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :collapse="isCollapse"
          uniqued-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航三</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">选项3</el-menu-item>
              <el-menu-item index="3-2">选项4</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button icon="el-icon-s-unfold" v-if="!isShow" @click="isShow=!isShow"></el-button>
          <el-button icon="el-icon-s-fold" v-if="isShow" @click="isShow=!isShow"></el-button>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ElMainLayout',

  data () {
    return {
      isShow: true,
      isCollapse: true
    }
  },

  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // }
  }
}
</script>

<style lang="scss" scoped>
  .main-layout {
    height: 100vh;
  }
  .el-header, .el-footer {
    margin-left: 0;
    padding-left: 0;
    text-align: left;
    line-height: 60px;
    .el-button {
      width: 50px;
      height: 50px;
      margin: 0;
      padding: 10px 12px;
      box-sizing: border-box;
      font-size: 20px;
      border: none;
    }
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    height: 100vh;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
