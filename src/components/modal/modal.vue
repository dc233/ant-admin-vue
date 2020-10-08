<template>
  <a-modal :visible="visible" :okText="okText" :title="title" :width="width" @ok="handelok" @cancel="handelCancel" :zIndex="zIndex">
    <slot :data="data"></slot>
    <slot name="customize"></slot>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object
    },
    width: {
      type: [String, Number]
    },
    okText: {
      type: String
    },
    zIndex: {
      type: Number
    }
  },
  methods: {
    handelok(e) {
      this.$emit('Modelok', this.data)
    },
    handelCancel(e) {
      this.$emit('Modecancel', e)
    }
  }
}
</script>

<style></style>
