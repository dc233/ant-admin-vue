<template>
  <div>
    <a-space>
      <a-tooltip>
        <template slot="title">
          密度
        </template>
        <a-dropdown :trigger="['click']">
          <a-icon type="column-height" class="table-icon" />
          <a-menu slot="overlay" @click="handelDrown">
            <a-menu-item key="default">
              <a>默认</a>
            </a-menu-item>
            <a-menu-item key="middle">
              <a>中等</a>
            </a-menu-item>
            <a-menu-item key="small">
              <a>紧凑</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-tooltip>
      <!-- 列设置 -->
      <a-tooltip>
        <template slot="title">
          列设置
        </template>
        <a-dropdown :trigger="['click']">
          <a-icon type="setting" class="table-icon" />
          <a-menu slot="overlay" @click="handelDrown">
            <a-menu-item key="default">
              <a>默认</a>
            </a-menu-item>
            <a-menu-item key="middle">
              <a>中等</a>
            </a-menu-item>
            <a-menu-item key="small">
              <a>紧凑</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-tooltip>
    </a-space>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handelDrown(val) {
      this.$emit('Tablesize', val.key)
    }
  }
}
</script>

<style lang="less" scoped>
.table-icon {
  font-size: 22px;
  cursor: pointer;
}
</style>
