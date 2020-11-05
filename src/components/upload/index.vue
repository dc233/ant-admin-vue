<script>
export default {
  name: 'UploadImg',
  props: {
    // 接受上传的文件类型
    accept: {
      type: String,
      default: ''
    },
    //action 图片上传的地址
    action: {
      type: [String, Function]
    },
    // 上传请求的 http method
    method: {
      type: String
    },
    // 支持上传文件夹
    directory: {
      type: Boolean
    },
    // 上传文件之前的钩子
    beforeUpload: {
      type: Function
    },
    // 通过覆盖默认的上传行为，可以自定义自己的上传实现
    customRequest: {
      type: Function
    },
    // 是否禁用
    disabled: {
      type: Boolean
    },
    // 自定义文件预览逻辑
    previewFile: {
      type: Function
    },
    // 在上传之前转换文件。支持返回一个 Promise 对象
    transformFile: {
      type: Function
    },
    // 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
    listType: {
      type: String
    }
  },
  data() {
    return {
      imgurl: '',
      loading: false
    }
  },
  methods: {
    handleChange(info) {
      this.loading = true
      console.log(info.file)
      this.getBase64(info.file, (imageUrl) => {
        this.imgurl = imageUrl
        this.loading = false
      })
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    async handlePreview(file) {}
  },
  render() {
    const {
      handleChange,
      handlePreview,
      $props: { accept, action, method, directory, beforeUpload, customRequest, disabled, previewFile, listType },
      $data: { imgurl, loading }
    } = this
    let imgdom
    if (this.imgurl) {
      imgdom = <img src={imgurl} alt="avatar" />
    } else {
      imgdom = (
        <div>
          <a-icon type={loading ? 'loading' : 'plus'} />
          <div class="ant-upload-text">上传图片</div>
        </div>
      )
    }
    return (
      <a-upload
        list-type={listType}
        class="avatar-uploader"
        show-upload-list={false}
        before-upload={beforeUpload}
        {...{ on: { change: handleChange, preview: handlePreview } }}>
        {imgdom}
      </a-upload>
    )
  }
}
</script>
