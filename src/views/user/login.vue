<template>
  <div class="main">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-tabs default-active-key="1" @change="handleTabClick">
        <a-tab-pane key="1" tab="账号密码登录">
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [{ required: true, message: '请输入账户名邮箱地址!' }]
                }
              ]"
              size="large"
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
              size="large"
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
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机号登录" force-render>
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-decorator="[
                'mobile',
                {
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '请输入正确的手机号'
                    }
                  ],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="[
                    'captcha',
                    {
                      rules: [{ required: true, message: '请输入验证码' }],
                      validateTrigger: 'blur'
                    }
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    :style="{ color: 'rgba(0,0,0,.25)' }"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="
                  (!state.smsSendBtn && '获取验证码') || state.time + ' s'
                "
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
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
        <router-link class="login-form-forgot" :to="{ name: 'register' }"
          >注册账户</router-link
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      customActiveKey: "1",
      loading: false,
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  mounted() {},
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    ...mapActions(["Login", "Logout"]),
    handleTabClick(key) {
      this.customActiveKey = key;
    },
    handleSubmit(e) {
      e.preventDefault();
      const { Login } = this;
      const validateFieldsKey =
        this.customActiveKey === "1"
          ? ["userName", "password"]
          : ["mobile", "captcha"];
      this.form.validateFields(
        validateFieldsKey,
        { force: true },
        (err, values) => {
          if (!err) {
            Login(values).then(res => {
              console.log(res);
            });
          }
        }
      );
    },
    fixScroll() {}
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
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
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
