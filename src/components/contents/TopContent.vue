<!-- 顶部导航栏 -->
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
  <!--导航栏-->
  
    <el-menu-item index="0" @click="jump('home')">
      LOGO
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="jump('home')">	
        主页
    </el-menu-item>
    <el-menu-item index="2" @click="jump('hot')">
        热门
    </el-menu-item>
    <el-menu-item index="3" @click="jump('publish')">
        发布
    </el-menu-item>
    <!-- <el-menu-item index="4" @click="jump('login')">
        登录
    </el-menu-item> -->
<!-- 导航栏菜单 -->
    <el-sub-menu index="5">
      <template #title >个人中心</template>
      <el-menu-item index="11" @click="jump('user')">个人信息</el-menu-item>
      <el-menu-item index="22" @click="jump('special')">特别页面</el-menu-item>
      <el-menu-item index="33" @click="jump('piano')">钢琴</el-menu-item>

      <el-menu-item index="2-4" @click="todoLogout">登出</el-menu-item>

      
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref,toRefs } from 'vue'
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import useLoginStore from '@/store/modules/login';
import useStore from '@/store/modules/store';
// 通过登录仓库获取用户基本信息 用以 请求用户详细信息
const loginStort = useLoginStore()
const { userInfo } = loginStort
// 通过用户仓库 调用请求用户详细信息








const userStore = useUserStore()
const {setMenuIndex} = useStore()
const {menuIndex} = toRefs(useStore())

const loginStore = useLoginStore()

const {user} = userStore
const {logout} = loginStore
const {isLogout} = toRefs(loginStore)

let index:string
const activeIndex = ref(menuIndex)
const handleSelect = (key: string, keyPath: string[]) => {
  index=key
  console.log(key, keyPath)
  setMenuIndex(key)

}
const router = useRouter()
// jump函数 跳转到指定路由
const jump = (e:String) => {
  if(index=='11'){
    const {getUserInfo,saveUserInfo} = userStore
    const toRequestInfo = () => {
      // 用户名参数 json格式
      const params = {
        username: userInfo.data.username
      }
      console.log('params',params)

      // 发送请求
      getUserInfo(params)
    } 
    toRequestInfo()
  }
  if(index=='22'){
    
    const result = "/"+e
    router.push({
      path:result,
      query:{ toNum:1 }
    }) 
  }else{
    console.log('e',e);
    const result = "/"+e
    router.push(result) 
  }
  
}
const todoLogout = () => {
  logout(user).then(()=>{
    if (isLogout) {
          router.push({
            path: '/login',
          })
          localStorage.clear();
          sessionStorage.clear();
        }
  })
  
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
