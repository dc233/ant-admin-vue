<template>
  <page-view :title="false">
    <div class="content-layouts">
      <div class="tree">
        <a-input-search style="margin-bottom: 8px" placeholder="请搜索机构名" @change="onChange" />
        <a-tree
          v-model="checkedKeys"
          :tree-data="treedata"
          :replaceFields="replaceFields"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          :defaultExpandedKeys="['1', '1-1']"
          @select="onSelect"
          @check="onCheck"
          @expand="onExpand"
          class="treestyle"
        >
          <a-icon slot="switcherIcon" type="down" />
          <template slot="title" slot-scope="{ name }">
            <span v-html="name.replace(new RegExp(searchValue, 'g'), '<span style=color:#f50>' + searchValue + '</span>')"></span>
          </template>
        </a-tree>
      </div>
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
          scopedSlots: { title: 'title' },
          icon: 'mail',
          isdel: 0,
          children: [
            {
              name: '南昌新课堂',
              scopedSlots: { title: 'title' },
              key: '1-1',
              id: '1-1',
              status: 1,
              add_time: 1576578795,
              isdel: 0,
              icon: null,
              children: [
                {
                  name: '红谷滩新课堂',
                  scopedSlots: { title: 'title' },
                  key: '1-1-1',
                  id: '1-1-1',
                  status: 1,
                  add_time: 1576578795,
                  icon: null,
                  isdel: 0,
                  children: [
                    {
                      name: 'xxx-部门',
                      scopedSlots: { title: 'title' },
                      key: '1-1-1-1',
                      id: '1-1-1-1',
                      add_time: 1576578795,
                      icon: null,
                      isdel: 0
                    }
                  ]
                }
              ]
            },
            {
              name: '九江新课堂',
              scopedSlots: { title: 'title' },
              key: '1-2',
              id: '1-2',
              status: 1,
              add_time: 1576578795,
              icon: null,
              isdel: 0,
              children: [
                {
                  name: '九江xxxx新课堂',
                  scopedSlots: { title: 'title' },
                  key: '1-2-1',
                  id: '1-2-1',
                  status: 1,
                  add_time: 1576578795,
                  icon: null,
                  isdel: 0
                }
              ]
            }
          ]
        }
      ],
      replaceFields: {
        title: 'name',
        children: 'children',
        key: 'key'
      },
      checkedKeys: [],
      expandedKeys: [],
      backupsExpandedKeys: [],
      autoExpandParent: true,
      searchValue: ''
    }
  },
  mounted() {
    this.$nextTick(function() {
      const allKey = this.getAllKey(this.treedata, [])
      this.expandedKeys = allKey
    })
  },
  methods: {
    onChange(e) {
      this.searchValue = e.target.value
      if (this.searchValue === '') {
        this.expandedKeys = this.getAllKey(this.treedata, [])
      } else {
        this.expandedKeys = []
        this.backupsExpandedKeys = []
        let candidateKeysList = this.getkeyList(this.searchValue, this.treedata, [])
        candidateKeysList.map((item) => {
          let key = this.getParentKey(item, this.treedata)
          if (key && !this.backupsExpandedKeys.some((item) => item === key)) {
            this.backupsExpandedKeys.push(key)
          }
        })
        let length = this.backupsExpandedKeys.length
        for (let i = 0; i < length; i++) {
          this.getAllParentKey(this.backupsExpandedKeys[i], this.treedata)
        }
        this.expandedKeys = this.backupsExpandedKeys.slice()
      }
    },
    //获取节点中含有value的所有key集合
    getkeyList(value, tree, keyList) {
      //遍历所有同一级的树
      for (let i = 0; i < tree.length; i++) {
        let node = tree[i]
        //如果该节点存在value值则push
        if (node.name.indexOf(this.searchValue) > -1) {
          keyList.push(node.key)
        } else {
          // 逻辑判断
        }
        //如果拥有子节点继续遍历
        if (node.children) {
          this.getkeyList(value, node.children, keyList)
        }
      }
      //因为是引用类型，所有每次递归操作的都是同一个数组
      return keyList
    },
    // 默认展开所有父节点
    getAllKey(tree, keyList) {
      for (let i = 0; i < tree.length; i++) {
        let node = tree[i]
        if (node.children) {
          keyList.push(node.key)
          this.getAllKey(node.children, keyList)
        }
      }
      return keyList
    },
    //该递归主要用于获取key的父亲节点的key值
    getParentKey(key, tree) {
      let parentKey, temp
      //遍历同级节点
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          //如果该节点的孩子中存在该key值，则该节点就是我们要找的父亲节点
          //如果不存在，继续遍历其子节点
          if (node.children.some((item) => item.key === key)) {
            parentKey = node.key
          } else if ((temp = this.getParentKey(key, node.children))) {
            //parentKey = this.getParentKey(key,node.children)
            //改进，避免二次遍历
            parentKey = temp
          }
        }
      }
      return parentKey
    },
    //获取该节点的所有祖先节点
    getAllParentKey(key, tree) {
      var parentKey
      if (key) {
        //获得父亲节点
        parentKey = this.getParentKey(key, tree)
        if (parentKey) {
          //如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
          if (!this.backupsExpandedKeys.some((item) => item === parentKey)) {
            this.backupsExpandedKeys.push(parentKey)
          }
          //继续向上查找祖先节点
          this.getAllParentKey(parentKey, tree)
        }
      }
    },
    onSelect(selectedKeys, info) {
      console.log(selectedKeys, info)
    },
    onCheck(checkedKeys, info) {
      console.log(checkedKeys, info)
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = true
    }
  }
}
</script>

<style lang="less" scoped>
.tree {
  width: 30%;
}
.treestyle {
  border-right: 1px solid #d9d9d9;
}
</style>
