<template>
  <div class="ant-pro-footer-toolbar" v-if="visible">
    <div style="float: right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableBatch',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less"></style>
