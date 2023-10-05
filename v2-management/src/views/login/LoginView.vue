<template>
  <div class="login-page">
    <div class="login-box">
      <h1>Vue2后台管理系统</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item :label="'密\xa0\xa0\xa0码'" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchacode">
          <el-input v-model.number="ruleForm.captchacode" clearable></el-input>
          <img height=40 :src="captchaSrc" alt="" @click="getCaptchacode">
        </el-form-item>
        <el-form-item id="login-button-box">
          <el-button class="login-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCaptchaCodeApi, loginApi } from '@/request/api'
import { validateUsername } from '@/utils/validate'
import { mapMutations } from 'vuex'

export default {
  name: 'Vue2LoginView',

  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        captchacode: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            validator: validateUsername,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ],
        captchacode: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }
        ]
      },
      captchaSrc: ''
    }
  },

  created () {
    this.getCaptchacode()

    // 清除menuData的数据
    this.handleMenuData([])
  },

  methods: {
    ...mapMutations('userMenuData', ['handleMenuData']),
    async getCaptchacode () {
      try {
        const res = await getCaptchaCodeApi()
        this.captchaSrc = 'data:image/gif;base64,' + res.img
        localStorage.setItem('edb-captcha-uuid', res.uuid)
      } catch (err) {
        console.log(err)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        try {
          if (valid) {
            const res = await loginApi({
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code: this.ruleForm.captchacode,
              uuid: localStorage.getItem('edb-captcha-uuid')
            })

            if (!res) {
              this.$message.error('返回数据错误!')

              return
            }

            // 1. 提示用户登录成功
            this.$message.success('登录成功!')
            // 2. 清除uuid
            localStorage.removeItem('edb-captcha-uuid')
            // 3. 保存token
            localStorage.setItem('edb-auth-authorization', res.token)
            // 4. 获取用户信息

            // 5. 跳转首页
            this.$router.push('/')

            console.log(res)
          } else {
            this.$message.error('请输入正确的信息后再进行提交!')

            return false
          }
        } catch (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-page {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f96;
    h1 {
      text-align: center;
      margin-bottom: 20px;
      padding-left: 40px;
      font-size: 20px;
    }
    .login-box {
      position: absolute;
      width: 400px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding-top: 20px;
      padding: 40px;
      padding-left: 0px;
      background: #fff;
      border-radius: 5px;
    }
    .login-button {
      width: 100%;
    }
    ::v-deep #login-button-box .el-form-item__content {
      margin-left: 40px !important;
    }
  }
</style>
