/**
 * 所有页面的表头配置
 */

// 客户管理
export const clientcloum = [
  {
    title: '客户编号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'create_time' }
  },
  {
    title: '数据来源',
    dataIndex: 'source',
    key: 'source',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'source' }
  },
  {
    title: '客户来源',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    width: 300,
    scopedSlots: { customRender: 'address' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    width: 300,
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'operation' }
  }
]
// 中心任务管理
export const taskCenterColumns = [
  {
    title: '任务编号',
    dataIndex: 'task_id',
    key: 'task_id',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'task_id' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '创建时间',
    dataIndex: 'task_create_time',
    key: 'task_create_time',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'task_create_time' }
  },
  {
    title: '分配时间',
    dataIndex: 'allocated_time',
    key: 'allocated_time',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'allocated_time' }
  },
  {
    title: '客户来源',
    dataIndex: 'source_txt',
    key: 'source_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'source_txt' }
  },
  {
    title: '客户来源',
    dataIndex: 'customer_type_txt',
    key: 'customer_type_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'customer_type_txt' }
  },
  {
    title: '坐席',
    dataIndex: 'assignee_id',
    key: 'assignee_id',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'assignee_id' }
  },
  {
    title: '部门',
    dataIndex: 'receiving_department_id',
    key: 'receiving_department_id',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'receiving_department_id' }
  },
  {
    title: '任务状态',
    dataIndex: 'task_state_txt',
    key: 'task_state_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'task_state_txt' }
  },
  {
    title: '任务类别',
    dataIndex: 'task_type_txt',
    key: 'task_type_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'task_type_txt' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'operation' }
  }
]
// 部门任务列表
export const defColumns = [
  {
    title: '任务编号',
    dataIndex: 'task_id',
    key: 'task_id',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'task_id' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '创建时间',
    dataIndex: 'task_create_time',
    key: 'task_create_time',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'task_create_time' }
  },
  {
    title: '分配时间',
    dataIndex: 'assign_time',
    key: 'assign_time',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'assign_time' }
  },
  {
    title: '客户来源',
    dataIndex: 'source_txt',
    key: 'source_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'source_txt' }
  },
  {
    title: '客户来源',
    dataIndex: 'customer_type_txt',
    key: 'customer_type_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'customer_type_txt' }
  },
  {
    title: '坐席',
    dataIndex: 'assignee_id',
    key: 'assignee_id',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'assignee_id' }
  },
  {
    title: '部门',
    dataIndex: 'receiving_department_id',
    key: 'receiving_department_id',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'receiving_department_id' }
  },
  {
    title: '任务状态',
    dataIndex: 'task_state_txt',
    key: 'task_state_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'task_state_txt' }
  },
  {
    title: '任务类别',
    dataIndex: 'task_type_txt',
    key: 'task_type_txt',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'task_type_txt' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'operation' }
  }
]
// 我的待办
export const operationColumns = [
  {
    title: '姓名',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '年龄',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年级',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '微信',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '网络',
    dataIndex: 'operator',
    key: 'operator'
  },
  {
    title: '成绩',
    dataIndex: 'processingstate',
    key: 'processingstate'
  },
  {
    title: '出生日期',
    dataIndex: 'remark',
    key: 'remark'
  },
  {
    title: '兴趣爱好',
    dataIndex: 'hob',
    key: 'hob'
  }
]
// 我的订单
export const ordecolumns = [
  {
    title: '订单编号',
    dataIndex: 'order_no',
    key: 'order_no',
    align: 'center',
    scopedSlots: { customRender: 'order_no' }
  },
  {
    title: '客户姓名',
    dataIndex: 'c_name',
    key: 'c_name',
    align: 'center',
    scopedSlots: { customRender: 'c_name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '下单时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    scopedSlots: { customRender: 'create_time' }
  },
  {
    title: '客户来源',
    dataIndex: 'source',
    key: 'source',
    align: 'center',
    scopedSlots: { customRender: 'source' }
  },
  {
    title: '订单状态',
    dataIndex: 'state_text',
    key: 'state_text',
    align: 'center',
    scopedSlots: { customRender: 'state_text' }
  },
  {
    title: '区域',
    dataIndex: 't_name',
    key: 't_name',
    align: 'center',
    scopedSlots: { customRender: 't_name' }
  },
  {
    title: '坐席',
    dataIndex: 's_name',
    key: 's_name',
    align: 'center',
    scopedSlots: { customRender: 's_name' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]
// 发货管理
export const shipcolumns = [
  {
    title: '订单编号',
    dataIndex: 'order_no',
    key: 'order_no',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'order_no' }
  },
  {
    title: '客户姓名',
    dataIndex: 'customer_name',
    key: 'customer_name',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'customer_name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '下单时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'create_time' }
  },
  {
    title: '客户来源',
    dataIndex: 'source',
    key: 'source',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'source' }
  },
  {
    title: '课程名称',
    dataIndex: 'p_name',
    key: 'p_name',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'p_name' }
  },
  {
    title: '订单状态',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '区域',
    dataIndex: 't_name',
    key: 't_name',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 't_name' }
  },
  {
    title: '坐席',
    dataIndex: 's_name',
    key: 's_name',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 's_name' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'operation' }
  }
]
// 产品管理
export const productcolumns = [
  {
    title: '产品编号',
    dataIndex: 'product_num',
    key: 'product_num',
    align: 'center',
    scopedSlots: { customRender: 'product_num' }
  },
  {
    title: '产品类别',
    dataIndex: 'product_type',
    key: 'product_type',
    align: 'center',
    scopedSlots: { customRender: 'product_type' }
  },
  {
    title: '产品名称',
    dataIndex: 'product_name',
    key: 'product_name',
    align: 'center',
    scopedSlots: { customRender: 'product_name' }
  },
  {
    title: '产品状态',
    dataIndex: 'product_state',
    key: 'product_state',
    align: 'center',
    scopedSlots: { customRender: 'product_state' }
  },
  {
    title: '单价',
    dataIndex: 'product_price',
    key: 'product_price',
    align: 'center',
    scopedSlots: { customRender: 'product_price' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]
// 岗位管理
export const joblistcolumns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '岗位名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '岗位说明',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '所属部门',
    dataIndex: 't_name',
    key: 't_name',
    align: 'center',
    scopedSlots: { customRender: 't_name' }
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]
// 成员管理
export const membercolumns = [
  {
    title: '工号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    filterMultiple: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    align: 'center',
    scopedSlots: { customRender: 'phone' }
  },
  {
    title: '分机号',
    dataIndex: 'extension_num',
    key: 'extension_num',
    align: 'center',
    scopedSlots: { customRender: 'extension_num' }
  },
  {
    title: '部门',
    dataIndex: 't_name',
    key: 't_name',
    align: 'center',
    scopedSlots: { customRender: 't_name' }
  },
  {
    title: '角色',
    dataIndex: 'p_name',
    key: 'p_name',
    align: 'center',
    scopedSlots: { customRender: 'p_name' }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    align: 'center',
    scopedSlots: { customRender: 'gender' }
  },
  {
    title: '出生年月',
    dataIndex: 'birthday',
    key: 'birthday',
    align: 'center',
    scopedSlots: { customRender: 'birthday' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '登录状态',
    dataIndex: 'login_state',
    key: 'login_state',
    align: 'center',
    scopedSlots: { customRender: 'login_state' }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'operation' }
  }
]
// 菜单管理
export const menuecolumns = [
  {
    title: '菜单名称',
    dataIndex: 'meta',
    align: 'left',
    scopedSlots: { customRender: 'meta' }
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    align: 'center',
    scopedSlots: { customRender: 'path' }
  },
  {
    title: '功能类别',
    dataIndex: 'features',
    align: 'center',
    scopedSlots: { customRender: 'features' }
  },
  {
    title: '排序',
    dataIndex: 'sort',
    align: 'center',
    scopedSlots: { customRender: 'sort' }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]
// 任务信息表头
export const task = [
  {
    title: '任务编号',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '任务类型',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '分配时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '操作员',
    dataIndex: 'operator',
    key: 'operator'
  },
  {
    title: '任务状态',
    dataIndex: 'processingstate',
    key: 'processingstate'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  }
]
// 订单信息表头
export const order = [
  {
    title: '订单编号',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '下单时间',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '支付金额',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '课程名称',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '班类',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '学科',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '产品名称',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '操作员',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '订单状态',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo'
  }
]
// 学生信息表头
export const student = [
  {
    title: '姓名',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '年龄',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年级',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '微信',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '网络',
    dataIndex: 'operator',
    key: 'operator'
  },
  {
    title: '成绩',
    dataIndex: 'processingstate',
    key: 'processingstate'
  },
  {
    title: '出生日期',
    dataIndex: 'remark',
    key: 'remark'
  },
  {
    title: '兴趣爱好',
    dataIndex: 'hobby',
    key: 'hobby'
  }
]
// 开课信息表头
export const startclass = [
  {
    title: '课程编号',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '学科',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '课程名称',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '开课时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '结课时间',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '学生昵称',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '学生姓名',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '微信号',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '手机号',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '班类',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '年级组',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '操作员',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo'
  }
]
// 通话记录信息表头
export const call = [
  {
    title: '时间',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '进线',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '通话时长',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作员',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  }
]
// 客户信息表头
export const client = [
  {
    title: '客户编号',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '客户姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '客户来源',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '数据类型',
    dataIndex: 'operator',
    key: 'operator'
  },
  {
    title: '详细地址',
    dataIndex: 'processingstate',
    key: 'processingstate'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  }
]
// 发货信息表头
export const shipments = [
  {
    title: '订单编号',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '支付金额',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '课程名称',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '产品名称',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '收货人',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '收货地址',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '快递公司',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '快递单号',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '操作员',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '发货状态',
    dataIndex: 'memo',
    key: 'memo'
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo'
  }
]
// 操作记录
export const operation = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department'
  },
  {
    title: '操作员',
    dataIndex: 'oprater',
    key: 'oprater'
  },
  {
    title: '操作内容',
    dataIndex: 'oprationContent',
    key: 'oprationContent'
  }
]
// 字典管理
export const dictionaryColumns = [
  {
    title: '字典名称',
    dataIndex: 'dict_name',
    align: 'left',
    width: 150,
    scopedSlots: { customRender: 'dict_name' }
  },
  {
    title: '键',
    dataIndex: 'key',
    align: 'left',
    width: 150,
    scopedSlots: { customRender: 'key' }
  },
  {
    title: '值',
    dataIndex: 'val',
    align: 'left',
    width: 80,
    scopedSlots: { customRender: 'val' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'left',
    ellipsis: true,
    width: 150,
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'create_time' }
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'update_time' }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 100,
    scopedSlots: { customRender: 'operation' }
  }
]

export const addOrderColumns = [
  {
    title: '班级类型',
    dataIndex: 'classType',
    key: 'classType',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'classType' }
  },
  {
    title: '课程年级',
    dataIndex: 'classGrade',
    key: 'classGrade',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'classGrade' }
  },
  {
    title: '学科',
    dataIndex: 'classSubject',
    key: 'classSubject',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'classSubject' }
  },
  {
    title: '版本',
    dataIndex: 'classVersion',
    key: 'classVersion',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'classVersion' }
  },
  {
    title: '课程名称',
    dataIndex: 'classLesson',
    key: 'classLesson',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'classLesson' }
  },
  {
    title: '课程周期',
    dataIndex: 'classCycle',
    key: 'classCycle',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'classCycle' }
  },
  {
    title: '课程时段',
    dataIndex: 'classTime',
    key: 'classTime',
    align: 'center',
    width: 200,
    scopedSlots: { customRender: 'classTime' }
  },
  {
    title: '赠品',
    dataIndex: 'gifts',
    key: 'gifts',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'gifts' }
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'productName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'operation' }
  }
]
