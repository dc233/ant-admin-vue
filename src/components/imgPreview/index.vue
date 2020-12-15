<template>
  <div>123</div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    //  组件是否显示
    isShow: {
      type: Boolean,
      default: false
    },
    // 图片展示列表
    datas: {
      type: [Array, String],
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less" scoped></style>
