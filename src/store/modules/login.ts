import { defineStore } from 'pinia' // pinia
import type { CategoryList } from '@/types' // 返回类型自定义
import type { Info } from '@/types' // 返回类型自定义
import type { Universal, UserInfo } from '@/types' // 返回类型自定义

import { reactive } from 'vue'
import jwt_decode from 'jwt-decode' //解析token
import { useAuthStore } from '@/store/counter' // 自定义的token判断仓库
import { http } from '@/utils/request'
const authStore = useAuthStore()

const useLoginStore = defineStore('login', {
  state: () => ({
    code: 0, // 登录信息 200 为成功
    logoutCode: 0, // 登出信息 200 为成功
    registerCode: 0,
    userInfo: reactive({}) as Universal, // 用户信息
    categoryList: [] as CategoryList, //
    registerInfo: reactive({}) as Universal, // 注册信息
  }),
  getters: {
    //通过getters对状态state进行获取
    isLogout: (state) => state.logoutCode == 200,
    isLogin: (state) => state.code == 200,
  },
  actions: {
    setCode(code: number) {
      this.code = code
    },
    setRegisterCode(registerCode: number) {
      this.registerCode = registerCode
    },
    setLogoutCode(code: number) {
      this.logoutCode = code
    },
    setUserInfo(temp: any) {
      // 清空之前存在的信息
      if (this.userInfo) {
        this.userInfo = {}
      }
      // 存储当前获取的信息
      for (let key in temp) {
        this.userInfo[key] = temp[key]
      }
    },
    setCategoryList() {},
    setRegisterInfo(temp: any) {
      if (this.registerInfo) {
        this.registerInfo = reactive({}) as Universal
      }
      this.registerInfo = temp
    },
    //  登录请求
    async login(data: any) {
      await http('POST', '/login', data).then((res: any) => {
        const temp = res.data
        this.setUserInfo(temp)
        // 存储token
        const token = temp.data.token
        sessionStorage.setItem('token', token)
        localStorage.setItem('token', token)
        // 更新用户是否验证
        if (token) {
          authStore.setAuth(true)
          console.log('设置')
        }
        // 解析token
        const decode = jwt_decode(temp.data.token)
        console.log('decode', decode) //decode是一个对象
        authStore.setUser(decode)
        this.setCode(temp.code)
      })
    },
    // 注册请求
    async register(data: any) {
      await http('POST', '/login/register', data).then((res: any) => {
        const temp = res.data
        this.setRegisterInfo(temp)
        console.log('temp', temp)
        this.setRegisterCode(temp.code)
      })
    },
    // 登出请求
    async logout(data: any) {
      await http('POST', '/logout', data).then((res: any) => {
        console.log('登出结果:', res.data)
        this.setLogoutCode(res.data.code)
      })
    },
    // 更新用户信息
    updateUserInfo(temp: any) {
      this.setUserInfo(temp)
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['code', 'logoutCode', 'userInfo', 'categoryList', 'registerInfo'],
  },
})

export default useLoginStore
