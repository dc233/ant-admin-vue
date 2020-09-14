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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: 0,
    // 添加⾃定义规则
    'prettier/prettier': [
      // eslint校验不成功后，error或2则报错，warn或1则警告，off或0则⽆提示
      'error',
      {
        singleQuote: true,
        semi: false, //结束是否加分号
        printWidth: 160 //每行最长字符
      }
    ]
  }
}
