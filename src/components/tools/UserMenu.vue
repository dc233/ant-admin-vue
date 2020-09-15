<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-tooltip>
        <template slot="title">
          系统布局
        </template>
        <a target="_blank" @click="taggelshowLayaout">
          <span class="hoveraction">
            <a-icon type="layout" />
          </span>
        </a>
      </a-tooltip>
      <notice-icon class="hoveraction" />
      <a-dropdown>
        <span class="hoveraction ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span class="username">{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '../NoticeIcon/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import { mixin } from '@/utils/mixin'
export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  mixins: [mixin],
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['Logout']),
    taggelshowLayaout() {
      this.$store.dispatch('showLayout', true)
    },
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch((err) => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hoveraction {
  cursor: pointer;
  padding: 0 12px;
  display: inline-block;
  transition: all 0.3s;
  height: 100%;
  color: rgba(0, 0, 0, 0.65);
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
