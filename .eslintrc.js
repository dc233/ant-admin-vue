/*
 * @Author: Dingcong
 * @Date: 2020-09-14 14:39:58
 * @LastEditTime: 2020-09-23 17:13:19
 * @LastEditors: Dingcong
 * @Description: In User Settings Edit
 * @FilePath: \xkt-project\ant-admin-vue\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',  // 禁用 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用 debugger
    'no-empty': process.env.NODE_ENV === 'production' ? 'warn' : 'off',  // 禁止出现空语句块
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁止出现未使用过的变量
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-const-assign': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁止修改 const 声明的变量
    'no-undef':process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'vue/no-side-effects-in-computed-properties':process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/valid-v-else':process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   "no-constant-condition": ["error", { "checkLoops": true }], // 禁止在条件中使用常量表达式
   "no-dupe-args": ["error"], // 禁止 function 定义中出现重名参数
   "no-dupe-keys": ["error"], // 禁止对象字面量中出现重复的 key
   "no-duplicate-case": ["error"], // 禁止出现重复的 case 标签
   "no-extra-boolean-cast": ["error"], // 禁止不必要的布尔转换
   "no-unexpected-multiline": ["error"], // 禁止出现令人困惑的多行表达式
  /**
   * 风格指南
  */
 "space-in-parens": ["error", "never"], // 强制在圆括号内使用一致的空格
 "linebreak-style": ["error", "unix"], // 换行符风格
 "no-mixed-spaces-and-tabs": ["error"], // 禁止空格和 tab 的混合缩进
 "no-multiple-empty-lines": ["error"], // 禁止出现多行空行
 "space-infix-ops": ["error"], // 要求操作符周围有空格
  /**
    * ECMAScript 6
  */
 "arrow-spacing": ["error", { "before": true, "after": true }], // 强制箭头函数的箭头前后使用一致的空格
 "no-var": ["error"], // 要求使用 let 或 const 而不是 var
  }
}
