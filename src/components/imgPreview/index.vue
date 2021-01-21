<template>
  <div class="image-preview">
    <div class="image-content">
      <img
        class="img-preview-image"
        ref="img"
        :src="previewFile.url"
        alt=""
        @mousewheel="handelwheel($event)"
        id="ScrollImg"
      />
      <!-- 图片相关操作 -->
      <div class="img-preview__controller">
        <div class="img-preview__controller-item" @click="handelimgenlarge"><a-icon type="plus" /></div>
        <div class="img-preview__controller-item" @click="handelimgshrink"><a-icon type="minus" /></div>
        <div class="img-preview__controller-item" @click="handelrecovery"><a-icon type="fullscreen-exit" /></div>
        <div class="img-preview__controller-item" @click="handelspin(0)"><a-icon type="retweet" /></div>
        <div class="img-preview__controller-item" @click="handelspin(1)"><a-icon type="sync" /></div>
      </div>
      <!-- 图片切换左按钮 -->
      <div class="img-preview__arrow left" v-if="isShowIndex != 0" @click="change(showIndex - 1)">
        <a-icon type="arrow-left" />
      </div>
      <!-- 图片切换右按钮 -->
      <div class="img-preview__arrow right" v-if="showIndex != computedDatas.length - 1" @click="change(showIndex + 1)">
        <a-icon type="arrow-right" />
      </div>
      <!-- 图片计数器 -->
      <div class="img-preview__index" v-if="isShowIndex">{{ showIndex + 1 }} / {{ computedDatas.length }}</div>
      <!-- 图片预览关闭-->
      <div class="image-preview_close" @click="handelCloseimg">
        <span class="image-preview_close-icon">
          <a-icon type="close" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { isArray, isString } from '@/utils/util.js'
export default {
  name: 'ImagePreview',
  props: {
    //  组件是否显示
    isShow: {
      type: Boolean,
      default: false
    },
    // 图片展示列表
    datas: {
      type: [Array, String],
      default: () => []
    },
    // 图片数组下标位置
    index: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data() {
    return {
      max: 1,
      current: 0,
      showIndex: -1,
      previewFile: {}
    }
  },
  computed: {
    computedDatas() {
      // 判断参数是否是字符串或数组
      if (isString(this.datas)) {
        return [this.datas]
      } else if (isArray(this.datas)) {
        return this.datas
      }
      return []
    },
    isShowIndex() {
      return !isString(this.datas)
    }
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.change(this.index)
    })
  },
  methods: {
    // 图片等比例放大
    handelimgenlarge() {
      let img = document.getElementById('ScrollImg').style
      this.max += 0.2
      img.transform = `scale(${this.max})`
    },
    // 图片等比例缩小
    handelimgshrink() {
      let img = document.getElementById('ScrollImg').style
      if (this.max <= 1) {
        this.$message.warning('图片已是原始尺寸，无法在缩小')
        return false
      }
      this.max -= 0.2
      img.transform = `scale(${this.max})`
    },
    // 等比例还原图片
    handelrecovery() {
      let img = document.getElementById('ScrollImg').style
      this.max = 1
      img.transform = `scale(${this.max})`
    },
    // 图片向左右旋转90度
    handelspin(angle) {
      let img = document.getElementById('ScrollImg').style
      // 左旋转
      if (angle === 0) {
        this.current = (this.current - 90) % 360
      } else if (angle === 1) {
        // 右旋转
        this.current = (this.current + 90) % 360
      }
      img.transform = `scale(${this.max}) rotate(${this.current}deg)`
    },
    // 鼠标滚轮等比例缩放图片
    handelwheel(event) {
      let delta = 0
      if (!event) event = window.event
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120
        if (window.opera) delta = -delta
      } else if (event.detail) {
        delta = -event.detail / 3
      }
      let img = document.getElementById('ScrollImg').style
      if (delta > 0) {
        this.max += 0.2
        img.transform = `scale(${this.max})`
      } else if (delta < 0) {
        if (this.max <= 1) {
          return false
        }
        this.max -= 0.2
        img.transform = `scale(${this.max})`
      }
    },
    // 销毁图片组件
    handelCloseimg() {
      this.$emit('close')
    },
    // 执行方法
    change(index) {
      if (index < 0 || index > this.computedDatas.length - 1) {
        return false
      }
      this.showIndex = index
      this.updatePreview()
    },
    // 渲染图片
    updatePreview() {
      if (this.computedDatas.length === 0 || this.isShow === false) {
        return {}
      }
      let data = this.computedDatas[this.showIndex]
      let previewFile = isString(data) ? { url: data } : data
      this.previewFile = previewFile
    }
  },
  // 销毁监听事件
  beforeDestroy() {}
}
</script>
<style lang="less" scoped>
.image-preview {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  top: 0;
  left: 0;
  color: #fff;
  z-index: 1000;
  text-align: center;
  .image-content {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    color: #fff;
    justify-content: center;
    align-items: center;
    user-select: none;
    .img-preview-image {
      cursor: pointer;
      transition: transform 0.3s;
    }
    .image-preview_close {
      position: absolute;
      top: -40px;
      right: -40px;
      width: 80px;
      height: 80px;
      overflow: hidden;
      color: #fff;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transition: 0.2s;
      .image-preview_close-icon {
        position: absolute;
        top: 46px;
        left: 16px;
        font-size: 16px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    .img-preview__controller {
      position: absolute;
      bottom: 10%;
      left: 50%;
      display: flex;
      width: 260px;
      height: 44px;
      padding: 0 22px;
      margin-left: -139px;
      background: rgba(109, 109, 109, 0.6);
      border-radius: 22px;
      justify-content: space-between;
      .img-preview__controller-item {
        display: flex;
        height: 100%;
        padding: 0 9px;
        font-size: 24px;
        cursor: pointer;
        transition: 0.2s;
        align-items: center;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .img-preview__index {
      position: absolute;
      bottom: 5%;
      left: 50%;
      padding: 0 22px;
      font-size: 16px;
      background: rgba(109, 109, 109, 0.6);
      border-radius: 15px;
      transform: translateX(-50%);
      cursor: default;
    }
    .img-preview__arrow {
      position: absolute;
      top: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      font-size: 28px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transition: 0.2s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    .left {
      left: 50px;
    }
    .right {
      right: 50px;
    }
  }
}
</style>
