<template>
  <page-toggle-transition>
    <router-view />
  </page-toggle-transition>
</template>

<script>
import PageToggleTransition from '@/components/transition/PageToggleTransition'
export default {
  components: { PageToggleTransition }
}
</script>

<style></style>
