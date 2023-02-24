import { defineStore } from 'pinia' // pinia
// 总仓库 存放公共数据
const useStore = defineStore('store', {
  state: () => ({
    menuIndex: '1', // 当前菜单 索引
  }),
  getters: {
    //通过getters对状态state进行获取
  },
  actions: {
    setMenuIndex(menuIndex: string) {
      this.menuIndex = menuIndex
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['menuIndex'],
  },
})

export default useStore
