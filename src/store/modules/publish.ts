import { defineStore } from 'pinia' // pinia
import { http } from '@/utils/request'
const usePublish = defineStore('publish', {
  state: () => ({
    text: '', //
    flag: false,
  }),
  getters: {
    //通过getters对状态state进行获取
  },
  actions: {
    setFlag(flag: boolean) {
      this.flag = flag
    },
    setText(text: string) {
      this.text = text
    },
    // 发布作品
    async publish(data: any) {
      await http('POST', '/article/publish', data).then((res: any) => {
        const temp = res.data
        console.log('发布一篇文章publishArticle::', temp)
      })
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['text'],
  },
})

export default usePublish
