<template>
  <div>
    <test-children :visbile.sync="database" />
    <xkt-upload listType="picture-card" :beforeUpload="beforeUpload" />
    <sprite-animate
      style="opacity:0.6"
      spriteName="moreSprite"
      :scale="0.5"
      :isTrigger="isTrigger"
      @click="handeltest"
    ></sprite-animate>
    <button @click="handeltest">123</button>
  </div>
</template>

<script>
import Vue from 'vue'
import TestChildren from './testChildren'
import XktUpload from '@/components/upload'
import { getRole } from '@/api/login'
import { BlankView, RouteView } from '@/layouts'
import AdmintestDome from './test2'
import SpriteAnimate from '@/components/spriteAnimate/spriteAnimate'
import Footer from './Footer'
const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 200
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 100
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 100
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer'
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer'
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer'
  }
]

const draggingMap = {}
columns.forEach((col) => {
  draggingMap[col.key] = col.width
})
const draggingState = Vue.observable(draggingMap)
const resizeableTitle = (h, props, children) => {
  let thDom = null
  const { key, ...restProps } = props
  const col = columns.find((col) => {
    const k = col.dataIndex || col.key
    return k === key
  })
  if (!col.width) {
    return <th {...restProps}>{children}</th>
  }
  const onDrag = (x) => {
    draggingState[key] = 0
    col.width = Math.max(x, 1)
  }
  const onDragstop = () => {
    draggingState[key] = thDom.getBoundingClientRect().width
  }
  return (
    <th {...restProps} v-ant-ref={(r) => (thDom = r)} width={col.width} class="resize-table-th">
      {children}
      <vue-draggable-resizable
        key={col.key}
        class="table-draggable-handle"
        w={10}
        x={draggingState[key] || col.width}
        z={1}
        axis="x"
        draggable={true}
        resizable={false}
        onDragging={onDrag}
        onDragstop={onDragstop}></vue-draggable-resizable>
    </th>
  )
}
export default {
  name: 'test',
  components: {
    TestChildren,
    XktUpload,
    SpriteAnimate,
    // eslint-disable-next-line vue/no-unused-components
    AdmintestDome,
    // eslint-disable-next-line vue/no-unused-components
    Footer
  },
  data() {
    this.components = {
      header: {
        cell: resizeableTitle
      }
    }
    return {
      database: 'dartalist',
      asdas: '23',
      data,
      columns,
      isTrigger: true,
      msg: '我就草了',
      form: {}
    }
  },
  created() {
    this.handelgetrole()
    console.log('123' + this.$test)
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
    },
    hadelecesi() {
      console.log(this.$refs.ruleForm.handetest())
    },
    handeltest() {
      let self = this
      let dome = this.$createAntdModal({
        modalProps: {
          title: '新增',
          width: '500px',
          mask: true
        },
        content: {
          template: AdmintestDome,
          props: {
            form: self.form
          },
          ref: 'ruleForm'
        },
        // footer: {
        //   template: Footer,
        //   props: {
        //     cancelText: '自定义取消',
        //     okText: '自定义确定',
        //     ruleFormobj: dome
        //   }
        // },
        beforeClose: function() {
          console.log('我要关闭了')
          dome.$refs.ruleForm.resetForm()
        },
        afterClose: function() {
          console.log('我已经关闭了')
        },
        async onOk() {
          // dome.$refs.ruleForm.submitForm()
          // return false
          await new Promise((resolve) => {
            setTimeout(() => {
              console.log('点了确定')
              resolve()
            }, 3000)
          })
        }
      })
      console.log(dome)
    }
  }
}
</script>

<style lang="less">
.resize-table-th {
  position: relative;
  .table-draggable-handle {
    transform: none !important;
    position: absolute;
    height: 100% !important;
    bottom: 0;
    left: auto !important;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
  }
}
</style>
