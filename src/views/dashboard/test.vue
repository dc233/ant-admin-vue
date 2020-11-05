<template>
  <div>
    <test-children :visbile.sync="database" />
    <xkt-upload listType="picture-card" :beforeUpload="beforeUpload" />
  </div>
</template>

<script>
import TestChildren from './testChildren'
import XktUpload from '@/components/upload'
import { getRole } from '@/api/login'
import { BlankView, RouteView } from '@/layouts'
export default {
  name: 'test',
  components: {
    TestChildren,
    XktUpload
  },
  data() {
    return {
      database: 'dartalist',
      asdas: '23'
    }
  },
  created() {
    this.handelgetrole()
  },
  methods: {
    beforeUpload(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大于 2MB!')
      }
      return false
    },
    treeFilter(tree, func) {
      // 使用map复制一下节点，避免修改到原树
      return tree
        .map((node) => ({ ...node }))
        .filter((node) => {
          node.children = node.children && this.treeFilter(node.children, func)
          return func(node) || (node.children && node.children.length)
        })
    },
    loadView(view) {
      return () => import(`@/views/${view}`)
    },
    // 遍历菜单
    treejson(tree) {
      tree.map((item) => {
        delete item['id']
        delete item['p_id']
        delete item['url']
        delete item['sort']
        delete item['action']
        delete item['create_time']
        delete item['update_time']
        delete item['is_del']
        if (item.hidden) {
          if (item.hidden === 2) {
            item.hidden = false
          } else if (item.hidden === 1) {
            item.hidden = true
          }
        }
        if (item.component === 'RouteView') {
          item.component = RouteView
        } else if (item.component === 'BlankView') {
          item.component = BlankView
        } else {
          item.component = this.loadView(item.component)
        }
        if (item.children) {
          item.children.map((val) => {
            if (val.featuresurl != '') {
              delete item.children
            }
          })
        }

        item.children && this.treejson(item.children)
      })
      return tree
    },
    // 遍历树形
    treeForeach(tree, func) {
      tree.forEach((data) => {
        func(data)
        data.children && this.treeForeach(data.children, func) // 遍历子树
      })
    },
    handelgetrole() {
      getRole().then((res) => {
        console.log(res.data)
        let arr = this.treejson(res.data)
        console.log(arr)
      })
    }
  }
}
</script>

<style></style>
