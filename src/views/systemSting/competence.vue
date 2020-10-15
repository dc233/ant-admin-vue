<template>
  <page-view :title="false">
    <a-card :bordered="false">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col :span="6">
          <a-input-search placeholder="搜索角色名称" enter-button="搜索" size="large" @search="onSearch" />
        </a-col>
        <a-col :span="6" style="text-align: right;">
          <a-button type="primary" icon="plus" @click="hanelAddRoles">
            添加角色
          </a-button>
        </a-col>
      </a-row>
    </a-card>
    <div class="roles">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card bordered class="card-roles">
            <a-list item-layout="horizontal" :data-source="list">
              <a-list-item
                class="selected"
                slot="renderItem"
                :class="{ selectedckecd: role == item }"
                slot-scope="item, index"
                :key="index"
                @click.stop="handleroles(item)"
              >
                <a slot="actions" @click.stop="handelrolesEdit(item)">编辑</a>
                <a slot="actions" @click.stop="hadnelrolesDelet(item)">
                  <a-popconfirm title="您确定要删除该角色？" ok-text="确定" cancel-text="取消" @confirm="confirm(item)" @cancel="cancel">
                    删除
                  </a-popconfirm>
                </a>

                <a-list-item-meta :description="item.remarks">
                  <template v-slot:title>
                    <a>{{ item.name }}</a>
                  </template>
                  <template v-slot:avatar>
                    <a-avatar icon="user" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card bordered class="tree-roles">
            <a-button-group>
              <a-button type="primary" @click="handelSelectAll">
                全选
              </a-button>
              <a-button @click="handleReset">重置</a-button>
            </a-button-group>
            <a-tree
              v-model="checkedKeys"
              checkable
              :blockNode="true"
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :selected-keys="selectedKeys"
              :tree-data="treeData"
              @select="onSelect"
              @expand="onExpand"
              @check="onCheck"
            />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card bordered class="tree-roles">
            <div>
              <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                全选
              </a-checkbox>
            </div>
            <a-divider />
            <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange">
              <template slot="label" slot-scope="option">
                {{ option.label }}
              </template>
            </a-checkbox-group>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="roles-btn">
      <a-button type="primary">
        保存
      </a-button>
    </div>
    <xkt-modal :title="title" :visible="visible" :data="modaldata" :width="width" @Modelok="handelDetermine" @Modecancel="handelParntcancel">
      <template v-slot="{ data }">
        <a-form-model ref="ruleFrom" :rules="rules" :model="data" :wrapper-col="wrapperCol" :label-col="labelCol">
          <a-form-model-item ref="name" prop="name" label="角色名" labelAlign="left">
            <a-input v-model="data.name" placeholder="请输入角色名"></a-input>
          </a-form-model-item>
          <a-form-model-item ref="status" prop="status" label="状态" labelAlign="left">
            <a-switch v-model="data.status" checked-children="启用" un-checked-children="停用" />
          </a-form-model-item>
          <a-form-model-item ref="remarks" prop="remarks" label="备注" labelAlign="left">
            <a-textarea v-model="data.remarks" placeholder="请填写备注信息" :auto-size="{ minRows: 3, maxRows: 5 }" />
          </a-form-model-item>
        </a-form-model>
      </template>
    </xkt-modal>
  </page-view>
</template>

<script>
import XktModal from '@/components/modal/modal.vue'
export default {
  name: 'competence',
  components: {
    XktModal
  },
  data() {
    return {
      role: null,
      title: '新增角色',
      visible: false,
      modaldata: {},
      width: 600,
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }
        ],
        remarks: [
          {
            required: true,
            message: '请填写备注信息',
            trigger: 'blur'
          }
        ]
      },
      defaultChecked: true,
      wrapperCol: { span: 21 },
      labelCol: { span: 3 },
      list: [
        {
          name: '系统管理员',
          remarks: '拥有最高权限，可操作任何页面',
          status: false
        },
        {
          name: '经理',
          remarks: '可进行部门数据查看，可导出数据',
          status: true
        },
        {
          name: 'CEO',
          remarks: '可查看整个公司数据，可导出数据',
          status: true
        },
        {
          name: 'Leader',
          remarks: '可查看整个团队数据，可导出数据',
          status: true
        },
        {
          name: '系统管理员',
          remarks: '拥有最高权限，可操作任何页面',
          status: true
        },
        {
          name: '经理',
          remarks: '可进行部门数据查看，可导出数据',
          status: true
        },
        {
          name: 'CEO',
          remarks: '可查看整个公司数据，可导出数据',
          status: true
        },
        {
          name: 'Leader',
          remarks: '可查看整个团队数据，可导出数据',
          status: true
        },
        {
          name: '系统管理员',
          remarks: '拥有最高权限，可操作任何页面',
          status: true
        },
        {
          name: '经理',
          remarks: '可进行部门数据查看，可导出数据',
          status: true
        },
        {
          name: 'CEO',
          remarks: '可查看整个公司数据，可导出数据',
          status: true
        },
        {
          name: 'Leader',
          remarks: '可查看整个团队数据，可导出数据',
          status: true
        }
      ],
      treeData: [
        {
          title: '仪表盘',
          key: '0-0',
          children: [
            {
              title: '工作台',
              key: '0-0-0'
            }
          ]
        },
        {
          title: '表单页',
          key: '1-1',
          children: [
            {
              title: '基础表单',
              key: '1-1-1'
            },
            {
              title: '分步表单',
              key: '1-1-2'
            },
            {
              title: '高级表单',
              key: '1-1-3'
            }
          ]
        },
        {
          title: '表格',
          key: '2-1',
          children: [
            {
              title: '查询表格',
              key: '2-1-1'
            }
          ]
        },
        {
          title: '系统设置',
          key: '3-1',
          children: [
            {
              title: '机构管理',
              key: '3-1-1'
            },
            {
              title: '权限配置',
              key: '3-1-2',
              children: [
                {
                  title: '测试',
                  key: '23-123',
                  children: [
                    {
                      title: '测试2',
                      key: '6798-123'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      plainOptions: [
        {
          label: '导入',
          value: '1'
        },
        {
          label: '导出',
          value: '2'
        },
        {
          label: '查询',
          value: '3'
        }
      ],
      checkedList: [],
      indeterminate: false,
      checkAll: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      const allKey = this.getAllKey(this.treeData, [])
      this.expandedKeys = allKey
    })
  },
  methods: {
    handleroles(item) {
      this.role = item
      console.log('click', item)
    },
    onSearch(value) {
      console.log(value)
    },
    // 全选
    handelSelectAll() {
      const allKey = this.getAllKey(this.treeData, [])
      this.checkedKeys = allKey
    },
    // 重置
    handleReset() {
      this.checkedKeys = []
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys, e) {
      console.log(e.halfCheckedKeys, checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
      this.plainOptions = [
        {
          label: '客户批量导入',
          value: '0'
        },
        {
          label: '客户批量导入',
          value: '1'
        },
        {
          label: '客户批量导入',
          value: '2'
        }
      ]
    },
    getAllKey(tree, keyList) {
      for (let i = 0; i < tree.length; i++) {
        let node = tree[i]
        if (node.key) {
          keyList.push(node.key)
        }
        if (node.children) {
          this.getAllKey(node.children, keyList)
        }
      }
      return keyList
    },
    onChange(checkedList) {
      console.log(checkedList)
    },
    onCheckAllChange(e) {
      console.log(e)
      let arr = []
      const arrList = this.plainOptions.forEach((item) => {
        arr.push(item.value)
      })
      Object.assign(this, {
        checkedList: e.target.checked ? arr : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    hanelAddRoles() {
      this.visible = true
      this.title = '新增角色'
      this.modaldata = {
        status: true
      }
    },
    handelDetermine(val) {
      if (this.title === '新增角色') {
        this.$refs.ruleFrom.validate((valid) => {
          if (valid) {
            console.log('新增OJBK')
            console.log(val)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs.ruleFrom.validate((valid) => {
          if (valid) {
            console.log('编辑OJBK')
            console.log(val)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    handelParntcancel(val) {
      this.visible = false
      if (this.title === '新增角色') {
        this.modaldata = {
          status: true
        }
      }
      this.$refs.ruleFrom.resetFields()
    },
    // 删除角色
    hadnelrolesDelet(item) {
      return item
    },
    // 编辑角色
    handelrolesEdit(item) {
      const obj = Object.assign({}, item)
      this.visible = true
      this.modaldata = obj
      this.title = '编辑角色'
    },
    handelStausChange(checked, event) {
      event.stopPropagation()
    },
    confirm(val) {
      console.log(val)
    },
    cancel(e) {
      e.stopPropagation()
    }
  }
}
</script>

<style lang="less">
.card-roles {
  height: 600px;
  padding: 10px;
  overflow: auto;
  .ant-card-body {
    padding: 0;
  }
}
.tree-roles {
  height: 600px;
  overflow: auto;
}
.card-roles::-webkit-scrollbar,
.tree-roles::-webkit-scrollbar {
  width: 4px;
}

.card-roles::-webkit-scrollbar-thumb,
.tree-roles::-webkit-scrollbar-thumb {
  background-color: #ddd;
}

.card-roles::-webkit-scrollbar-track,
.tree-roles ::-webkit-scrollbar-track {
  background-color: transparent;
}
.selected {
  padding: 12px 12px;
  cursor: pointer;
}
.selectedckecd {
  background-color: #ebedf0;
}
.selected:hover {
  background-color: #ebedf0;
}
.roles {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
}
.roles-btn {
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
}
</style>
