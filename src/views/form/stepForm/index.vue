<template>
  <page-view :title="true">
    <div slot="headerContent">
      <p>
        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
      </p>
    </div>
    <div class="step-from">
      <a-steps :current="currentTab" style="width:660px">
        <a-step title="填写转账信息" />
        <a-step title="确认转账信息" />
        <a-step title="完成" />
      </a-steps>
      <div class="area">
        <step1 v-if="currentTab === 0" @nextStep="nextStep" />
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" />
        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish" />
      </div>
    </div>
  </page-view>
</template>

<script>
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
export default {
  components: {
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      currentTab: 0
    }
  },
  methods: {
    nextStep() {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish() {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
.step-from {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  justify-content: center;
  align-items: center;
}
.area {
  padding-top: 60px;
}
</style>
