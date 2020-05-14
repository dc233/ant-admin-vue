<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ user.name
        }}<span class="welcome-text">，{{ welcome }}</span>
      </div>
      <div>前端搬砖党 | 打工仔 - 某某某公司 - VUE</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info
            title="项目"
            content="56"
            :center="false"
            :bordered="false"
          />
        </a-col>
        <a-col :span="8">
          <head-info
            title="团队排名"
            content="8/24"
            :center="false"
            :bordered="false"
          />
        </a-col>
        <a-col :span="8">
          <head-info title="项目数" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>
    <!-- conduct project -->
    <div>
      <a-row :gutter="24">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
          <!-- 项目 -->
          <a-card
            size="default"
            title="进行中的项目"
            style="margin-bottom: 24px;"
          >
            <a slot="extra" href="#">全部项目</a>
            <a-card-grid style="width:33.33%;text-align:center">
              Content
            </a-card-grid>
            <a-card-grid style="width:33.33%;text-align:center">
              Content
            </a-card-grid>
            <a-card-grid style="width:33.33%;text-align:center">
              Content
            </a-card-grid>
            <a-card-grid style="width:33.33%;text-align:center">
              Content
            </a-card-grid>
            <a-card-grid style="width:33.33%;text-align:center">
              Content
            </a-card-grid>
            <a-card-grid style="width:33.33%;text-align:center">
              Content
            </a-card-grid>
          </a-card>
          <!-- 动态 -->
          <a-card :loading="loading" title="动态" :bordered="false">
            whatever content
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
          Col
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from "@/utils/util";
import { mapState } from "vuex";
import { PageView } from "@/layouts";
import HeadInfo from "@/components/tools/HeadInfo";
export default {
  components: {
    PageView,
    HeadInfo
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  created() {
    this.user = this.userInfo;
    this.avatar = this.userInfo.avatar;
  },
  data() {
    return {
      timeFix: timeFix(),
      user: {},
      avatar: "",
      loading: true
    };
  }
};
</script>

<style></style>
