import { defineStore } from 'pinia' // pinia
import type { Universal } from '@/types' // 返回类型自定义
import { reactive } from 'vue'
import { http } from '@/utils/request'

const useUserStore = defineStore('user', {
  state: () => ({
    user: reactive({}) as Universal,
    result: reactive({}) as Universal,
  }),
  getters: {},
  actions: {
    setUser(temp: any) {
      // 清空之前存在的信息
      if (this.user) {
        this.user = {}
      }
      // 存储当前获取的信息
      for (let key in temp) {
        this.user[key] = temp[key]
      }
    },
    setResult(temp: any) {
      // 清空之前存在的信息
      if (this.result) {
        this.result = {}
      }
      // 存储当前获取的信息
      for (let key in temp) {
        this.result[key] = temp[key]
      }
    },
    // 获取用户详细信息 (通过用户名)
    async getUserInfo(data: any) {
      await http('POST', '/user/info', data).then((res: any) => {
        const temp = res.data
        console.log('res.dat:', temp)

        this.setUser(temp)
        console.log('this.user', this.user)
      })
    },
    // 获取用户详细信息 (通过用户ID)
    async getUserInfoByUserId(data: any) {
      await http('POST', '/user/info/userId', data).then((res: any) => {
        const temp = res.data
        console.log('res.dat:', temp)

        this.setUser(temp)
        console.log('this.user', this.user)
      })
    },
    // 保存用户修改信息
    async saveUserInfo(data: any) {
      await http('POST', '/user/saveInfo', data).then((res: any) => {
        const temp = res.data
        console.log('res.dat:', temp)

        this.setResult(temp)
      })
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['user', 'result'],
  },
})

export default useUserStore
