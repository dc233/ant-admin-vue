<template>
  <div class="excel-import">
    <a-upload accept=".xls,.xlsx" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button>
        <a-icon type="upload" />
        上传文件
      </a-button>
    </a-upload>
    <slot></slot>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'ExcelImport',
  props: {
    // 表名
    sheetNames: Array,
    // 是否移除空格
    removeBlankspace: {
      type: Boolean,
      default: false
    },
    // 是否移出特殊字符
    removeSpecialchar: {
      type: Boolean,
      default: true
    },
    //  导入前
    beforeImport: {
      type: Function,
      // file为导入文件
      default: (file) => {}
    },
    // 导入时
    onProgress: {
      type: Function,
      default: (event, file) => {}
    },
    // 状态改变
    onChange: {
      type: Function,
      default: (file) => {}
    },
    onSuccess: {
      type: Function,
      // response为生成的json数据
      default: (response, file) => {}
    },
    onError: {
      type: Function,
      // err为错误信息
      default: (err, file) => {}
    }
  },
  components: {},
  data() {
    return {
      fileList: [],
      xlsxJson: []
    }
  },

  methods: {
    importExcel(file) {
      this.file2Xce(file).then((tabJson) => {
        if (tabJson && tabJson.length > 0) {
          // 业务逻辑
          this.xlsxJson.push(...tabJson[0].sheet)
          console.log(this.xlsxJson)
        }
      })
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file)
        // reader.readAsBinaryString(file) // 传统input方法
      })
    },
    beforeUpload(file) {
      if (!/(\.xlsx)|(\.xls)/.test(file.name)) {
        this.$message.error('请上传.xls或.xlsx的文件')
        return false
      } else {
        if (this.fileList.length > 0) {
          this.$message.error('一次只能上传一个模板')
          return false
        }
        this.importExcel(file)
        this.fileList = [...this.fileList, file]
        return false
      }
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.xlsxJson = []
    },
    clearData() {
      this.fileList = []
      this.xlsxJson = []
    }
  }
}
</script>
<style lang="less" scoped>
.excel-import {
  position: relative;
}
</style>
