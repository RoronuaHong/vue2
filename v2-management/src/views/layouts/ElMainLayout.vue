<template>
  <!-- @open="handleOpen" -->
  <!-- @close="handleClose" -->
  <div class="main-layout">
    <el-container>
      <el-aside :class="{ isCollapse: isCollapse }">
        <el-menu
          :router="true"
          text-color="#fff"
          default-active="0"
          :collapse="isCollapse"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#304156"
          :collapse-transition="false"
          active-text-color="#ffd04b"
        >
          <div v-for="(item, idx) in menuData" :key="`${idx}-${item.title}`">
            <el-submenu :index="item.id" v-if="item.children">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="cItem.id"
                  v-for="(cItem, cIdx) in item.children"
                  :key="`${cIdx}-${cItem.title}`"
                  >{{ cItem.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.id" v-else>
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-top">
            <div class="header-fl">
              <el-button
                icon="el-icon-s-unfold"
                v-if="!isCollapse"
                @click="toggleShow()"
              ></el-button>
              <el-button
                icon="el-icon-s-fold"
                v-if="isCollapse"
                @click="toggleShow()"
              ></el-button>
            </div>
            <div class="header-fl">
              <CrumbComponent></CrumbComponent>
            </div>
            <div class="header-fr avatar-box">
              <!-- {{ userInfo.user?.nickName }} -->
              <img :src="IMG_BASEURL + (userInfo.user?.avatar || '/profile/avatar/2022/10/10/blob_20221010200353A001.jepg')" alt="" width="40">
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
          <div class="header-bottom">

          </div>
        </el-header>
        <el-main>
          Main
          <svg-icon icon-name="GIS" style="margin-right: 10px"></svg-icon>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import CrumbComponent from '@/components/CrumbComponent'

import { IMG_BASEURL } from '@/utils/baseUrl'

export default {
  name: 'ElMainLayout',

  components: {
    CrumbComponent
  },

  data () {
    return {
      IMG_BASEURL
    }
  },

  computed: {
    ...mapState({
      isCollapse: state => state.navCollapse.isCollapse,
      menuData: state => state.userMenuData.menuData,
      userInfo: state => state.userInfo.userInfo
    })
  },

  methods: {
    ...mapMutations('navCollapse', ['toggleCollapse']),
    toggleShow () {
      this.toggleCollapse()
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-layout {
    height: 100vh;
  }
  .el-header,
  .el-footer {
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

  .el-menu {
    border: none;
    text-align: left;
  }

  .el-aside {
    width: 180px !important;
    background-color: #304156;
    box-sizing: border-box;
    transition: all 0.3s;
    color: #333;
    text-align: center;
    line-height: 200px;
    &.isCollapse {
      width: 64px !important;
    }
  }

  .el-main {
    height: 100vh;
    background-color: #e9eef3;
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

  .isCollapse .el-submenu__title span, ::v-deep .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
  .header-top {
    height: 50px;
    box-shadow: 0px 3px 3px #eee;
    .header-fl {
      float: left;
    }
    .header-fr {
      width: 60px;
      float: right;
    }
    .avatar-box {
      padding: 5px 20px 0 0;
      img {
        cursor: pointer;
        border-radius: 5px;
      }
      i {
        cursor: pointer;
      }
    }
  }
</style>
