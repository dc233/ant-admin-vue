<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="../assets/logo.png" class="logo" alt="logo" />
            <span class="title">Ant Admin</span>
          </a>
        </div>
        <div class="desc">
          Ant Admin 是一个开箱即用的中后台脚手架
        </div>
      </div>
      <a-row type="flex" justify="space-around" align="center">
        <a-col :span="6">
          <img class="loginimg" src="../assets/24271-teamwork.gif" alt="" />
        </a-col>
        <a-col :span="6">
          <router-view />
        </a-col>
      </a-row>

      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2020 路人丁个人开源出品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
export default {
  name: 'UserLayout',
  mixins: [mixinDevice],
  data() {
    return {
      imgSrc: require('../assets/logo.png')
    }
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
.loginimg {
  width: 520px;
  height: auto;
}
.container {
  position: relative;
  z-index: 99;
  width: 100%;
  min-height: 100%;
  padding: 110px 0 144px;
  // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  .main {
    min-width: 260px;
    width: 368px;
    padding: 40px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // margin: 0 auto;
  }
  .footer {
    position: absolute;
    width: 100%;
    bottom: 20px;
    padding: 0 16px;
    text-align: center;
    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: rgba(0, 0, 0, 0.65);
        transition: all 0.3s;
      }
      a:not(:last-child) {
        margin-right: 40px;
      }
    }
    .copyright {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
  }
}
.top {
  padding-left: 200px;
  .header {
    height: 44px;
    line-height: 44px;
    .logo {
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
      border-style: none;
    }
    .title {
      font-size: 33px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }
  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 12px;
    margin-bottom: 40px;
  }
}
</style>
