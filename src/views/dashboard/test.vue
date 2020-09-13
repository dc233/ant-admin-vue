<template>
  <div>
    <test-children :visbile.sync="database" />
  </div>
</template>

<script>
import TestChildren from './testChildren'
export default {
  components: {
    TestChildren
  },
  data() {
    return {
      database: 'dartalist',
      asdas: '23'
    }
  }
}
</script>

<style></style>
