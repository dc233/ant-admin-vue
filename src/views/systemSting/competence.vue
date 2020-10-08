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
                @click="handleroles(item)"
              >
                <template slot="actions">
                  <a-switch size="small" v-model="item.status" checked-children="开" un-checked-children="关" />
                </template>
                <a slot="actions">删除</a>
                <a-list-item-meta :description="item.allocation">
                  <template v-slot:title>
                    <a>{{ item.title }}</a>
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
      <a-row type="flex" justify="center" class="roles-btn">
        <a-col>
          <a-button type="primary">
            保存
          </a-button>
        </a-col>
      </a-row>
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
  components: {
    XktModal
  },
  data() {
    return {
      role: null,
      title: '新增角色',
      visible: false,
      modaldata: {
        status: true
      },
      width: 600,
      rules: {},
      defaultChecked: true,
      wrapperCol: { span: 21 },
      labelCol: { span: 3 },
      list: [
        {
          title: '系统管理员',
          allocation: '拥有最高权限，可操作任何页面',
          status: false
        },
        {
          title: '经理',
          allocation: '可进行部门数据查看，可导出数据',
          status: true
        },
        {
          title: 'CEO',
          allocation: '可查看整个公司数据，可导出数据',
          status: true
        },
        {
          title: 'Leader',
          allocation: '可查看整个团队数据，可导出数据',
          status: true
        },
        {
          title: '系统管理员',
          allocation: '拥有最高权限，可操作任何页面',
          status: true
        },
        {
          title: '经理',
          allocation: '可进行部门数据查看，可导出数据',
          status: true
        },
        {
          title: 'CEO',
          allocation: '可查看整个公司数据，可导出数据',
          status: true
        },
        {
          title: 'Leader',
          allocation: '可查看整个团队数据，可导出数据',
          status: true
        },
        {
          title: '系统管理员',
          allocation: '拥有最高权限，可操作任何页面',
          status: true
        },
        {
          title: '经理',
          allocation: '可进行部门数据查看，可导出数据',
          status: true
        },
        {
          title: 'CEO',
          allocation: '可查看整个公司数据，可导出数据',
          status: true
        },
        {
          title: 'Leader',
          allocation: '可查看整个团队数据，可导出数据',
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
    },
    handelDetermine(val) {
      console.log(val)
    },
    handelParntcancel(val) {
      this.visible = false
      this.modaldata = {
        status: true
      }
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
}
.roles-btn {
  padding: 20px 0;
}
</style>
