<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-tooltip>
        <template slot="title">
          系统主题设置
        </template>
        <span
          class="hoveraction"
          @click="
            () => {
              visbil = true;
            }
          "
        >
          <a-icon type="layout" />
        </span>
      </a-tooltip>

      <a href="#" target="_blank">
        <span class="hoveraction">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <notice-icon class="hoveraction" />
      <a-dropdown>
        <span class="hoveraction ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span>{{ nickname }}</span>
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
    <setting-drawe
      :syncVisible.sync="visbil"
      ref="drawer"
      @close="handeloClose"
    />
  </div>
</template>

<script>
import NoticeIcon from "../NoticeIcon/NoticeIcon";
import { mapActions, mapGetters } from "vuex";
import SettingDrawe from "../SettingDrawe";
export default {
  name: "UserMenu",
  components: {
    NoticeIcon,
    SettingDrawe
  },
  computed: {
    ...mapGetters(["nickname", "avatar"])
  },
  data() {
    return {
      visbil: false
    };
  },
  methods: {
    ...mapActions(["Logout"]),
    handleLogout() {
      this.$confirm({
        title: "提示",
        content: "真的要注销登录吗 ?",
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 16);
            })
            .catch(err => {
              this.$message.error({
                title: "错误",
                description: err.message
              });
            });
        },
        onCancel() {}
      });
    },
    handeloClose() {
      this.visbil = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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
