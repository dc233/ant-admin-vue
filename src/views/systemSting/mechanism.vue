<template>
  <page-view :title="false">
    <div class="content-layouts">
      <a-input-search style="margin-bottom: 8px" placeholder="请搜索机构名" @change="onChange" />
      <a-tree :tree-data="treedata" :replaceFields="replaceFields" checkable :defaultExpandAll="true" :expandedKeys="expandedKeys" />
    </div>
  </page-view>
</template>

<script>
export default {
  data() {
    return {
      treedata: [
        {
          name: '江西新课堂总部',
          key: '1',
          id: 1,
          status: 1,
          add_time: 1576578795,
          isdel: 0,
          children: [
            {
              name: '南昌新课堂',
              key: '1-1',
              id: '1-1',
              status: 1,
              add_time: 1576578795,
              isdel: 0,
              children: [
                {
                  name: '红谷滩新课堂',
                  key: '1-1-1',
                  id: '1-1-1',
                  status: 1,
                  add_time: 1576578795,
                  isdel: 0
                }
              ]
            },
            {
              name: '九江新课堂',
              key: '1-2',
              id: '1-2',
              status: 1,
              add_time: 1576578795,
              isdel: 0
            }
          ]
        }
      ],
      replaceFields: {
        title: 'name',
        children: 'children',
        key: 'key'
      },
      expandedKeys: [],
      backupsExpandedKeys: []
    }
  },
  methods: {
    onChange(e) {
      const value = e.target.value
      //如果搜索值为空，则不展开任何项，expandedKeys置为空
      //如果搜索值不位空，则expandedKeys的值要为搜索值的父亲及其所有祖先
      //   if (value === '') {
      //     this.expandedKeys = []
      //   } else {
      //     this.expandedKeys = []
      //     this.backupsExpandedKeys = []
      //     let allkeyList = this.getkeyList(value, this.treedata, [])
      //     console.log(allkeyList)
      //   }
    },
    getkeyList(value, tree, keylist) {
      // 遍历所有同一级的树形节点
      for (let i = 0; i < tree.length; i++) {
        let node = tree[i]
        //如果该节点存在value值则push
        if (node.name.indexOf(value) > -1) {
          keylist.push(node.key)
        }
        // 如果拥有children 继续遍历
        if (node.children) {
          //   this.getkeyList(value, tree, keylist)
        }
      }
      return keylist
    }
  }
}
</script>

<style></style>
