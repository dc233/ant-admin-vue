<template>
  <page-view :title="true">
    <div slot="headerContent">
      <div>单据详情：{{ tid }}</div>
      <detail-list size="small" :col="2" slot="headerContent">
        <detail-list-item term="创建人">曲丽丽</detail-list-item>
        <detail-list-item term="订购产品">XX服务</detail-list-item>
        <detail-list-item term="创建时间">2018-08-07</detail-list-item>
        <detail-list-item term="关联单据"><a>12421</a></detail-list-item>
        <detail-list-item term="生效日期">2018-08-07 ~ 2018-12-11</detail-list-item>
        <detail-list-item term="备注">请于两个工作日内确认</detail-list-item>
      </detail-list>
    </div>
    <template slot="extra">
      <a-input></a-input>
    </template>
    <a-card :bordered="false" title="流程进度">
      <a-steps :current="1" status="finish">
        <a-step title="创建项目">
          <a-step-item-group slot="description">
            <a-step-item link="/dashboard/workplace" title="曲丽丽" icon="dingding-o" />
            <a-step-item title="2016-12-12 12:32" />
          </a-step-item-group>
        </a-step>
        <a-step title="部门初审">
          <a-step-item-group slot="description">
            <a-step-item link="/form/step" title="周毛毛" icon="dingding-o" />
            <a-step-item link="/result/success" title="催一下" icon="bell" />
          </a-step-item-group>
        </a-step>
        <a-step title="财务复核"></a-step>
        <a-step title="完成"></a-step>
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
      <detail-list>
        <detail-list-item term="用户姓名">付晓晓</detail-list-item>
        <detail-list-item term="会员卡号">32943898021309809423</detail-list-item>
        <detail-list-item term="身份证">3321944288191034921</detail-list-item>
        <detail-list-item term="联系方式">18112345678</detail-list-item>
        <detail-list-item term="联系地址">浙江省杭州市西湖区黄姑山路工专路交叉路口</detail-list-item>
      </detail-list>
      <detail-list title="信息组">
        <detail-list-item term="某某数据">725</detail-list-item>
        <detail-list-item term="该数据更新时间">2018-08-08</detail-list-item>
        <detail-list-item>&nbsp;</detail-list-item>
        <detail-list-item term="某某数据">725</detail-list-item>
        <detail-list-item term="该数据更新时间">2018-08-08</detail-list-item>
        <detail-list-item>&nbsp;</detail-list-item>
      </detail-list>
      <a-card type="inner" title="多层信息组">
        <detail-list title="组名称" size="small">
          <detail-list-item term="负责人">林东东</detail-list-item>
          <detail-list-item term="角色码">1234567</detail-list-item>
          <detail-list-item term="所属部门">XX公司-YY部</detail-list-item>
          <detail-list-item term="过期时间">2018-08-08</detail-list-item>
          <detail-list-item term="描述"
            >这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</detail-list-item
          >
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="组名称" size="small" :col="1">
          <detail-list-item term="学名">林东东</detail-list-item>
          <detail-list-item term="角色码">1234567</detail-list-item>
          <detail-list-item term="所属部门">XX公司-YY部</detail-list-item>
          <detail-list-item term="过期时间">2018-08-08</detail-list-item>
          <detail-list-item term="描述"
            >这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</detail-list-item
          >
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="组名称" size="small" :col="2">
          <detail-list-item term="学名">林东东</detail-list-item>
          <detail-list-item term="角色码">1234567</detail-list-item>
          <detail-list-item term="所属部门">XX公司-YY部</detail-list-item>
          <detail-list-item term="过期时间">2018-08-08</detail-list-item>
          <detail-list-item term="描述"
            >这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</detail-list-item
          >
        </detail-list>
      </a-card>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="用户近半年来电记录">
      <a-list></a-list>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="
        (key) => {
          this.activeTabKey = key
        }
      "
    >
      <a-table v-if="activeTabKey === '1'" :columns="operationColumns" :dataSource="operation1" :pagination="false" />
      <a-table v-if="activeTabKey === '2'" :columns="operationColumns" :dataSource="operation2" :pagination="false" />
      <a-table v-if="activeTabKey === '3'" :columns="operationColumns" :dataSource="operation3" :pagination="false" />
    </a-card>
    <a-card>
      <taskTab :tabInfo="tabInfo"></taskTab>
    </a-card>
  </page-view>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
import AStepItem from '@/components/tools/AStepItem'
import taskTab from '../common/infoTab'
const DetailListItem = DetailList.Item
const AStepItemGroup = AStepItem.Group

const tabList = [
  {
    key: '1',
    tab: '操作日志一'
  },
  {
    key: '2',
    tab: '操作日志二'
  },
  {
    key: '3',
    tab: '操作日志三'
  }
]
const operationColumns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo'
  }
]
export default {
  name: 'content',
  components: { AStepItem, AStepItemGroup, DetailListItem, DetailList, taskTab },
  mounted() {
    console.log(this.$route.query.tid)
    this.tid = this.$route.query.tid
  },
  data() {
    return {
      titleInfo: `单据详情：`,
      tid: '',
      tabList,
      activeTabKey: '1',
      operation1: [],
      operation2: [],
      operation3: [],
      operationColumns,
      tabInfo: ['任务信息', '订单信息', '学生信息', '开课信息', '通话记录']
    }
  }
}
</script>

<style></style>
