<template>
  <div>
    <p class="animate__animated animate__fadeInLeft">我是visbile的值{{ visbile }}</p>
    <button @click="handelChange">改变父组件的值</button>
  </div>
</template>

<script>
export default {
  props: {
    visbile: {
      type: String,
      default: '123'
    }
  },
  methods: {
    handelChange() {
      this.$emit('update:visbile', 'changeFather')
    }
  }
}
</script>

<style></style>
