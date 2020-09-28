<template>
  <page-view :title="true">
    <div class="content-layouts">
      <div class="operating">
        <a-space>
          <a-button type="primary" @click="handelAddMechanism">
            添加
          </a-button>
          <a-button type="primary" @click="handelEditMechanism" :disabled="disabled">
            修改
          </a-button>
          <a-button type="danger" :disabled="disabled" @click="showDeleteConfirm">
            删除
          </a-button>
        </a-space>
      </div>
      <a-row type="flex" :gutter="16">
        <a-col :span="6">
          <div class="tree">
            <a-input-search style="margin-bottom: 8px" placeholder="请搜索机构名" @change="onChange" />
            <a-tree
              v-if="showTree"
              v-model="checkedKeys"
              :checkable="true"
              :tree-data="treedata"
              :replaceFields="replaceFields"
              :expandedKeys="expandedKeys"
              :autoExpandParent="autoExpandParent"
              :checkStrictly="checkStrictly"
              :blockNode="true"
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
            <a-empty :image="simpleImage" v-else description="没有检索到相关数据  " />
          </div>
        </a-col>
        <a-col :span="18">
          <xkt-table
            :columns="columns"
            :data="data"
            :pagination="pagination"
            @tableChange="handelPaginationChange"
            :rowKey="
              (record, index) => {
                return index
              }
            "
          >
            <a slot="name" slot-scope="text">{{ text.tableRow.name }}</a>
            <template slot="loginnum" slot-scope="text">
              {{ text.tableRow.loginnum }}
            </template>
            <template slot="status" slot-scope="text">
              {{ text.tableRow.status }}
            </template>
            <template slot="creatTime" slot-scope="text">
              {{ text.tableRow.creatTime }}
            </template>
          </xkt-table>
        </a-col>
      </a-row>
    </div>
    <!-- 弹框 -->
    <xkt-modal :title="title" :visible="visible" :data="modaldata" :width="width" @Modelok="handelDetermine" @Modecancel="handelParntcancel">
      <template v-slot="{ data }">
        <a-form-model ref="ruleFrom" :rules="rules" :model="data" :wrapper-col="wrapperCol" :label-col="labelCol">
          <a-form-model-item ref="name" prop="name" label="机构名" labelAlign="left">
            <a-input v-model="data.name" placeholder="请输入机构名"></a-input>
          </a-form-model-item>
          <a-form-model-item ref="value" prop="value" label="上级机构" labelAlign="left">
            <a-tree-select
              :treeData="treedata"
              v-model="data.value"
              show-search
              :replaceFields="replaceFields2"
              placeholder="请选择上级机构"
              searchPlaceholder="请搜索机构名"
              :treeExpandedKeys="treeExpandedKeys"
              @search="handelSearch"
              @treeExpand="handelExpand"
              @change="handelChange"
            ></a-tree-select>
          </a-form-model-item>
          <a-form-model-item ref="sort" prop="sort" label="机构排序" labelAlign="left">
            <a-input-number id="inputNumber" v-model="data.sort" :min="1" :max="1000" />
          </a-form-model-item>
          <a-form-model-item ref="status" prop="status" label="状态" labelAlign="left">
            <a-switch v-model="data.status" checked-children="启用" un-checked-children="停用" default-checked />
          </a-form-model-item>
        </a-form-model>
      </template>
    </xkt-modal>
  </page-view>
</template>

<script>
import { Empty } from 'ant-design-vue'
import XktTable from '@/components/Table/Table.vue'
import XktModal from '@/components/modal/modal.vue'
export default {
  components: {
    XktModal,
    XktTable
  },
  data() {
    return {
      treedata: [
        {
          name: '江西新课堂总部',
          value: '江西新课堂总部',
          key: '1',
          id: 1,
          status: true,
          add_time: 1576578795,
          scopedSlots: { title: 'title' },
          icon: 'mail',
          isdel: 0,
          disableCheckbox: true,
          children: [
            {
              name: '南昌新课堂',
              value: '南昌新课堂',
              scopedSlots: { title: 'title' },
              key: '1-1',
              id: '1-1',
              status: true,
              add_time: 1576578795,
              isdel: 0,
              icon: null,
              children: [
                {
                  name: '红谷滩新课堂',
                  value: '红谷滩新课堂',
                  scopedSlots: { title: 'title' },
                  key: '1-1-1',
                  id: '1-1-1',
                  status: true,
                  add_time: 1576578795,
                  icon: null,
                  isdel: 0,
                  children: [
                    {
                      name: 'xxx部门',
                      value: 'xxx部门',
                      scopedSlots: { title: 'title' },
                      key: '1-1-1-1',
                      id: '1-1-1-1',
                      add_time: 1576578795,
                      icon: null,
                      isdel: 0,
                      status: true
                    }
                  ]
                }
              ]
            },
            {
              name: '九江新课堂',
              value: '九江新课堂',
              scopedSlots: { title: 'title' },
              key: '1-2',
              id: '1-2',
              status: true,
              add_time: 1576578795,
              icon: null,
              isdel: 0,
              children: [
                {
                  name: '九江xxxx新课堂',
                  value: '九江xxxx新课堂',
                  scopedSlots: { title: 'title' },
                  key: '1-2-1',
                  id: '1-2-1',
                  status: true,
                  add_time: 1576578795,
                  icon: null,
                  isdel: 0,
                  sort: 66
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
      replaceFields2: {
        title: 'name',
        value: 'name',
        children: 'children',
        key: 'key'
      },
      checkedKeys: [],
      expandedKeys: [],
      backupsExpandedKeys: [],
      autoExpandParent: true,
      searchValue: '',
      showTree: true,
      simpleImage: '',
      disabled: true,
      visible: false,
      title: '新增机构',
      modaldata: {},
      width: 600,
      wrapperCol: { span: 21 },
      labelCol: { span: 3 },
      backupsExpandedKeys2: [],
      treeExpandedKeys: [],
      checkStrictly: true,
      rules: {
        name: [
          {
            required: true,
            message: '请输入机构名',
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: '请选择上级机构',
            trigger: 'change'
          }
        ],
        sort: [
          {
            required: true,
            message: '请输入排序数字',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择机构状态',
            trigger: 'change'
          }
        ]
      },
      columns: [
        {
          title: '序号',
          customRender: (value, row, index) => `${(this.pagination.current - 1) * 10 + index + 1}`,
          align: 'center'
        },
        {
          title: '成员名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          filterMultiple: true,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '登录次数',
          dataIndex: 'loginnum',
          key: 'loginnum',
          align: 'center',
          scopedSlots: { customRender: 'loginnum' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'creatTime',
          key: 'creatTime',
          align: 'center',
          scopedSlots: { customRender: 'creatTime' }
        }
      ],
      data: [
        {
          name: '咨询一部-小王',
          loginnum: 23,
          status: 0,
          creatTime: '2020-8-23'
        },
        {
          name: '咨询一部-小刘',
          loginnum: 9999,
          status: 0,
          creatTime: '2010-5-23'
        },
        {
          name: '咨询一部-小美',
          loginnum: 511,
          status: 0,
          creatTime: '2016-5-23'
        }
      ],
      pagination: {
        showSizeChanger: true,
        total: 100,
        pageSize: 10,
        current: 1,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total) => `共 ${total} 条`,
        showQuickJumper: true
      },
      selectedRowKeys: []
    }
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  mounted() {
    this.$nextTick(function() {
      const allKey = this.getAllKey(this.treedata, [])
      this.expandedKeys = allKey
      this.treeExpandedKeys = allKey
    })
  },
  methods: {
    onChange(e) {
      this.searchValue = e.target.value
      if (this.searchValue === '') {
        this.showTree = true
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
        if (node.name.indexOf(value) > -1) {
          this.showTree = true
          keyList.push(node.key)
        } else {
          // 逻辑判断
          this.showTree = false
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
      console.log(checkedKeys, info.node.dataRef)
      if (checkedKeys.checked.length > 1) {
        this.checkedKeys.checked = []
        this.disabled = true
        this.$message.error('不能选择多个同时编辑')
      } else {
        this.disabled = !this.disabled
        this.modaldata = info.node.dataRef
      }
    },
    onExpand(expandedKeys, info) {
      console.log(expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    handelAddMechanism() {
      this.visible = true
      this.title = '新增机构'
    },
    handelEditMechanism() {
      this.visible = true
      this.title = '编辑机构'
    },
    handelDetermine(val) {
      if (this.title === '编辑机构') {
        this.$refs.ruleFrom.validate((valid) => {
          if (valid) {
            console.log('编辑ojbk')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs.ruleFrom.validate((valid) => {
          if (valid) {
            console.log('ojbk')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    handelParntcancel(val) {
      this.visible = false
      this.modaldata = {}
      this.checkedKeys.checked = []
      this.disabled = true
      this.$refs.ruleFrom.resetFields()
    },
    handelSearch(val) {},
    handelExpand(expandedKeys) {
      this.treeExpandedKeys = expandedKeys
    },
    handelChange(value, label, extra) {
      console.log(value, label, extra)
    },
    showDeleteConfirm() {
      let that = this
      this.$confirm({
        title: '你确定要删除此机构?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          that.checkedKeys.checked = []
          that.disabled = true
        }
      })
    },
    handelPaginationChange() {},
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
.treestyle {
  border-right: 1px solid #d9d9d9;
}
.operating {
  padding-bottom: 10px;
}
</style>
