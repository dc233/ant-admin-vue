<template>
  <div class="main">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="账号密码登录">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [{ required: true, message: '请输入账户名邮箱地址!' }]
                }
              ]"
              placeholder="账号"
              @focus="fixScroll"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item style="margin-bottom:10px">
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码!' }]
                }
              ]"
              type="password"
              placeholder="密码"
              @focus="fixScroll"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item style="margin-bottom:10px">
            <a-checkbox
              v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true
                }
              ]"
            >
              自动登录
            </a-checkbox>
            <a class="login-form-forgot" href="">
              忘记密码
            </a>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              block
              :loading="loading"
            >
              登录
            </a-button>
            其它登录方式
            <a-icon type="alipay-circle" class="item-icon" />
            <a-icon type="taobao-circle" class="item-icon" />
            <a-icon type="wechat" class="item-icon" />
            <a href="" class="login-form-forgot">
              注册账户
            </a>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机号登录" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    fixScroll() {
      var originHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      console.log(originHeight);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  .login-form-forgot {
    float: right;
    color: #fff;
  }
  .item-icon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.2);
    margin-left: 16px;
    vertical-align: middle;
    cursor: pointer;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
  }
}
.main {
  /deep/ .ant-tabs {
    color: #fff;
  }
  /deep/ .ant-tabs-nav .ant-tabs-tab-active {
    color: #fff;
  }
  /deep/ .ant-tabs-nav .ant-tabs-tab:hover {
    color: #fff;
  }
  /deep/ .ant-tabs-nav-scroll {
    text-align: center;
  }
  /deep/ .ant-tabs-bar {
    border-bottom: none;
  }
}
</style>
