<template>
  <page-view :title="true">
    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.title">
          <img :src="item.imgurl" alt="" srcset="" />
        </a-card>
      </a-list-item>
    </a-list>
  </page-view>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      list: [
        {
          title: 'Title 1',
          imgurl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock'
        },
        {
          title: 'Title 2',
          imgurl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock'
        },
        {
          title: 'Title 3',
          imgurl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock'
        },
        {
          title: 'Title 4',
          imgurl: 'http://dummyimage.com/200x200/50B347/FFF&text=FastMock'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped></style>
