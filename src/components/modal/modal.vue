<template>
  <a-modal :visible="visible" :title="title" :width="width" @ok="handelok" @cancel="handelCancel">
    <slot :data="data"></slot>
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
