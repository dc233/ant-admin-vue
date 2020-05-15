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
            <a-card-grid
              style="width:33.33%;"
              v-for="(item, i) in projetc"
              :key="i"
            >
              <a-avatar :src="item.project_urlimg" />
              <span class="usename">{{ item.project_name }}</span>
              <p class="pt-xs">
                {{ item.project_text }}
              </p>
              <div class="pt-xs">
                <a href="/#/">{{ item.project_username }}</a>
                <span class="datetime">{{ item.project_time }}</span>
              </div>
            </a-card-grid>
          </a-card>
          <!-- 动态 -->
          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list item-layout="horizontal" :data-source="dynamic">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.dynamic_time">
                  <a slot="title" href="https://www.antdv.com/">{{
                    item.dynamic_title
                  }}</a>
                  <a-avatar slot="avatar" :src="item.dynamic_avtr" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
          <a-card title="项目时间" :bordered="false">
            <a-statistic-countdown
              title="Day Level"
              :value="deadline"
              format="D 天 H 时 m 分 s 秒"
            />
          </a-card>
          <a-card title="Card Title" :bordered="false" style="margin-top:40px">
            <a-card-grid style="width:50%;text-align:center">
              <a-statistic
                title="Feedback"
                :value="11.28"
                :precision="2"
                suffix="%"
                :value-style="{ color: '#3f8600' }"
                style="margin-right: 50px"
              >
                <template #prefix>
                  <a-icon type="arrow-up" />
                </template>
              </a-statistic>
            </a-card-grid>
            <a-card-grid style="width:50%;text-align:center">
              <a-statistic
                title="Idle"
                :value="9.3"
                :precision="2"
                suffix="%"
                class="demo-class"
                :value-style="{ color: '#cf1322' }"
              >
                <template #prefix>
                  <a-icon type="arrow-down" />
                </template>
              </a-statistic>
            </a-card-grid>
          </a-card>
          <a-card
            title="XX 指数"
            style="margin-top: 24px"
            :loading="radarLoading"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div style="min-height: 484px;">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <radar :data="radarData" />
            </div>
          </a-card>
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
import { getProjecyt, getDynamic } from "@/api/workplace.js";
import { Radar } from "@/components";
const DataSet = require("@antv/data-set");
export default {
  components: {
    PageView,
    HeadInfo,
    Radar
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
    this.getinfo();
    this.initRadar();
  },
  data() {
    return {
      timeFix: timeFix(),
      user: {},
      avatar: "",
      loading: true,
      projetc: null,
      dynamic: null,
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      radarLoading: true,
      radarData: [
        { item: "引用", 个人: 70, 团队: 30, 部门: 60 },
        { item: "口碑", 个人: 80, 团队: 10, 部门: 20 },
        { item: "产量", 个人: 30, 团队: 20, 部门: 10 },
        { item: "贡献", 个人: 10, 团队: 30, 部门: 30 },
        { item: "热度", 个人: 20, 团队: 30, 部门: 20 }
      ]
    };
  },
  methods: {
    getinfo() {
      getProjecyt().then(res => {
        this.projetc = res.data;
      });
      getDynamic().then(res => {
        if (res.code === 200) {
          this.dynamic = res.data;
          this.loading = false;
        }
      });
    },
    initRadar() {
      this.radarLoading = true;
      const dv = new DataSet.View().source(this.radarData);
      dv.transform({
        type: "fold",
        fields: ["个人", "团队", "部门"],
        key: "user",
        value: "score"
      });
      this.radarData = dv.rows;
      this.radarLoading = false;
    }
  }
};
</script>

<style lang="scss">
.usename {
  padding-left: 20px;
  font-size: 16px;
}
.datetime {
  float: right;
}
</style>
