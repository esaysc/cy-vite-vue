import { defineStore } from 'pinia' // pinia

const useCosStore = defineStore('cos', {
  state: () => ({
    imgUrl: '', //
  }),
  getters: {
    //通过getters对状态state进行获取
  },
  actions: {
    setImgUrl(imgUrl: string) {
      this.imgUrl = imgUrl
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['imgUrl'],
  },
})

export default useCosStore
