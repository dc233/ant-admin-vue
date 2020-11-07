<template>
  <transition name="fade" :enter-active-class="`${disable ? 'animate__animated' : ''}  ${animatename}`">
    <slot></slot>
  </transition>
</template>

<script>
import { mixin } from '@/utils/mixin'
export default {
  name: 'PageToggleTransition',
  mixins: [mixin]
}
</script>

<style></style>
