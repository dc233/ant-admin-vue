<template>
  <page-view :title="true">
    <div>123</div>
    <a-card>OJBK</a-card>
    <a-card>OJBK</a-card>
    <a-card>OJBK</a-card>
    <div>123123</div>
    <a-card>OJBK</a-card>

    <a-card>OJBK</a-card>
    <a-dropdown-button @click="handleButtonClick">
      Dropdown
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
        <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
        <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
      </a-menu>
    </a-dropdown-button>
  </page-view>
</template>

<script>
export default {
  name: 'newPage',
  created() {
    console.log('ojbk')
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleButtonClick(e) {
      console.log('click left button', e)
    },
    handleMenuClick(item, key, keyPath) {
      console.log('click', item, key, keyPath)
    }
  }
}
</script>
