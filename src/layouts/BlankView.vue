<template>
  <PageToggleTransition>
    <router-view />
  </PageToggleTransition>
</template>

<script>
import PageToggleTransition from '@/components/transition/PageToggleTransition'
export default {
  components: { PageToggleTransition }
}
</script>

<style></style>
