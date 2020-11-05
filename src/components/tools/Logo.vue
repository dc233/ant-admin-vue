<template>
  <div class="logo">
    <router-link :to="{ name: 'dashboard' }">
      <img src="../../assets/logo.png" alt="" class="logoimg" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: 'Ant Admin Vue',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background-color: @layout-trigger-background;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  h1 {
    display: inline-block;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 0 12px;
    vertical-align: middle;
  }
}
.logoimg {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
</style>
