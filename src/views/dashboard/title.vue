<template>
  <div class="drawer-title">
    <div class="left-btn">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'drawerTitle',
  props: {
    btnText: {
      type: String,
      default: '确认'
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      // 接收 close 事件，来关闭弹框
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.drawer-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-btn {
  cursor: pointer;
}
</style>
