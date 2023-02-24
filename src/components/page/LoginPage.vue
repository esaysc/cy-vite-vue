<script lang="ts" setup>
import { ref,reactive,toRefs } from 'vue'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/modules/login'
import axios, { type Method } from 'axios'

import '@/assets/style/css/login.css'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
const loginStore = useLoginStore()
const {login,updateUserInfo} = loginStore
// 实现解构后保持响应式
// const {userInfo,getCode} = storeToRefs(loginStore)
const {userInfo,isLogin} = toRefs(loginStore)
// 订阅状态 执行跳转页面
loginStore.$subscribe((mutation,state) => {
  if (state.code == 200){
      console.log("toHome");
      toHome()
      console.log("登录成功");
    }
    else{
      console.log("登录失败");
    }
})

// home.getAllCategory()

// 路由跳转
const router = useRouter();
const toHome = () => router.replace({ 
    path:'/home',
    query:{ id:1 } 
}) 

const input = ref('')
var user = reactive({
  username: "",
  password: ''
})


function submit(){
  const params = {
    username: user.username,
    password: user.password
  }
  login(params).then(()=>{
    // 判断登录是否成功执行跳转 方案二
    // if (isLogin){
    //   console.log("toHome");
      
    //   toHome()
    //   console.log("成功");
    // }
    // else{
    //   console.log("失败");
    // }
  })


  
  // requestLogin()
}
const register = () => {
  router.push("/register")
}
// 发送登录请求 页面发送版
const requestLogin = () => {
  const params = {
    username: user.username,
    password: user.password
  }
  instance.request({
    url:'/login',
    method: 'post',
    data:params
  }).then((res:any) => {
    const temp = res.data
    updateUserInfo(temp)
    sessionStorage.setItem('token', res.data.data.token)
    localStorage.setItem('token', res.data.data.token)
    if (res.data.code == 200){
      console.log("toHome");
      toHome()
      console.log("成功");
    }
    else{
      console.log("失败");
    }
  })
}

</script>

<template>

<main>
  
      <section class="glass">
            <div class="login-container">
                <div class="left-container">
                    <div class="title"><span>
                    </span></div>
                    <el-form
                      ref="ruleFormRef"
                      status-icon
                      label-width="100%"
                      class="demo-ruleForm"
                    >
                    <div class="input-container">
                      <el-input v-model="user.username" placeholder="请输入账号" class="el-input"/>
                      
                        <el-input
                        v-model="user.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                        class="el-input"
                      />

                    </div>

                  </el-form>

                    <div class="message-container">
                        <span>--</span>
                        <el-button type="primary" @click="submit" class="action">登录</el-button>
                        <el-button type="primary" @click="register" class="register">注册</el-button>
                    </div>
                    

                </div>
                <div class="right-container">
                    <div class="action-container">
                      
                    </div>
                </div>

            </div>

    </section>


 
    
</main>
<div class="circle1"></div>
<div class="circle2"></div>
<div class="circle3"></div>
<div class="circle4"></div>
<div class="circle5"></div>
</template>

<style scoped>
.container{
  margin: auto;
  margin-top: 20%;

}
.but{
  margin-top: 2%;
  display: flex;
  justify-content: center;/*垂直居中*/
  align-items: center;/*水平居中*/
}
.el-input {
  z-index: 10;
  border: 0;
  background: none;
  outline: none;
  color: #fff;
  margin: 20px 0;
  display: block;
  width: 100%;
  padding: 5px 0;
  transition: 0.2s;
  border-bottom: 1px solid rgb(199, 191, 219);
}
.el-input:hover {
  border-bottom-color: #fff;
}
</style>
