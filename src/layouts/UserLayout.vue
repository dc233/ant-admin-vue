<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class=" waveAnimation">
      <div class="waveWrapperInner bgTop">
        <div class="wave waveTop"></div>
      </div>
      <div class="waveWrapperInner bgMiddle">
        <div class="wave waveMiddle"></div>
      </div>
      <div class="waveWrapperInner bgBottom">
        <div class="wave waveBottom"></div>
      </div>
    </div>
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
@keyframes move_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.55);
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1);
  }
}
@media screen and (max-width: 670px) {
  .container {
    padding: 110px 0 110px !important;
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  }
  .container .main {
    width: 340px !important;
  }
  .waveWrapper,
  .waveWrapperInner,
  .waveTop,
  .waveMiddle,
  .waveBottom {
    display: none;
  }
  .container > .footer {
    bottom: 0 !important;
  }
  .footer {
    position: absolute;
    bottom: 0;
  }
}
@media screen and (max-width: 320px) {
  .container .main {
    width: 295px !important;
  }
  .container {
    padding: 38px 0 14px !important;
  }
}
.waveWrapper {
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.waveWrapperInner {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}
.bgTop {
  z-index: 15;
  opacity: 0.5;
}
.bgMiddle {
  z-index: 10;
  opacity: 0.75;
}
.bgBottom {
  z-index: 5;
}
.wave {
  position: absolute;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  transform-origin: center bottom;
}
.waveTop {
  background-image: url('../assets/wave-top.png');
  background-size: 50% 100px;
}
.waveAnimation .waveTop {
  animation: move-wave 3s;
  -webkit-animation: move-wave 3s;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.waveMiddle {
  background-image: url('../assets/wave-mid.png');
  background-size: 50% 120px;
}
.waveAnimation .waveMiddle {
  animation: move_wave 10s linear infinite;
}
.waveBottom {
  background-image: url('../assets/wave-bot.png');
  background-size: 50% 100px;
}
.waveAnimation .waveBottom {
  animation: move_wave 15s linear infinite;
}
.user-layout-wrapper {
  height: 100%;
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
    margin: 0 auto;
  }
  .footer {
    position: absolute;
    width: 100%;
    bottom: 100px;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: #fff;
        transition: all 0.3s;
      }
      a:not(:last-child) {
        margin-right: 40px;
      }
    }
    .copyright {
      color: #fff;
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
      color: rgba(255, 255, 255, 255);
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }
  .desc {
    font-size: 14px;
    color: #fff;
    margin-top: 12px;
    margin-bottom: 40px;
  }
}
</style>
