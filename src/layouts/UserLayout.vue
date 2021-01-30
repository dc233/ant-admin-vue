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
      <router-view />
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
.user-layout-wrapper {
  width: 100%;
  height: 100%;
  background: url('../assets/bg.a382c67a.svg') no-repeat center 50% / cover;
}
.container {
  position: relative;
  z-index: 99;
  width: 100%;
  min-height: 100%;
  padding: 100px 0;
  .main {
    width: 448px;
    padding: 40px;
    margin: 0 auto;
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
  text-align: center;
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
