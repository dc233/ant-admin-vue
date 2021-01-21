<template>
  <page-view :title="true">
    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.title">
          <img :src="item.imgurl" alt="" srcset="" @click="handelPrivewimg(item.imgurl)" />
        </a-card>
      </a-list-item>
    </a-list>
  </page-view>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      showimg: false,
      list: [
        {
          title: 'Title 1',
          imgurl: 'http://dummyimage.com/200x200/50B647/FFF&text=FastMock1'
        },
        {
          title: 'Title 2',
          imgurl: 'http://dummyimage.com/200x200/51B347/FFF&text=FastMock2'
        },
        {
          title: 'Title 3',
          imgurl: 'http://dummyimage.com/200x200/52B347/FFF&text=FastMock3'
        },
        {
          title: 'Title 4',
          imgurl: 'http://dummyimage.com/200x200/53B347/FFF&text=FastMock4'
        }
      ]
    }
  },
  methods: {
    handelPrivewimg(val) {
      // this.$imagePreview([
      //   'http://dummyimage.com/200x200/50B647/FFF&text=FastMock1',
      //   'http://dummyimage.com/200x200/51B347/FFF&text=FastMock2',
      //   'http://dummyimage.com/760x4000/52B347/FFF&text=FastMock3'
      // ])
      this.$imagePreview('http://dummyimage.com/200x200/50B647/FFF&text=FastMock1')
    }
  }
}
</script>
<style lang="less" scoped></style>
