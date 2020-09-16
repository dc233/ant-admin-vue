<template>
  <page-view :title="true">
    <div slot="headerContent">
      <p>
        高级表单常见于一次性输入和提交大批量数据的场景
      </p>
    </div>
    <a-card class="card" title="仓库管理" :bordered="false">
      <repository-form ref="repository" />
    </a-card>
  </page-view>
</template>

<script>
import RepositoryForm from './RepositoryForm'
export default {
  components: {
    RepositoryForm
  }
}
</script>

<style></style>
