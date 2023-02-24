import { defineStore } from 'pinia' // pinia
import type { Universal, ArticleList, Articles, Article } from '@/types' // 返回类型自定义
import { reactive, toRaw } from 'vue'
import { useAuthStore } from '@/store/counter' // 自定义的登录判断仓库
import { http } from '@/utils/request'
const store = useAuthStore()

const useHotStore = defineStore('hot', {
  state: () => ({
    ArticleList: {} as ArticleList, // 所有文章
    Articles: [] as Articles, // 单个用户发布的所有文章
    userArticles: [] as Articles, // 单个用户发布的所有文章
    Article: reactive({}) as Article, // 单个文章（用户选择的文章标题所对应的）
    searchArticles: [] as Articles,
    searchUserArticles: [] as Articles,
    publishInfo: [] as Universal,
    ArticleAuthor: reactive({}) as Universal, // 存放该文章的作者详情
    ArticleInfo: reactive({}) as Article, // 存放该文章的详细信息
    articleId: String, // 存放当前的文章id
    HotArticles: [] as Articles, // 存放热门文章
  }),
  actions: {
    // 获取热门文章
    async getArticleList() {
      await http('get', '/article/hot').then((res: any) => {
        const temp = res.data
        console.log('getArticleList获取热门文章:', temp)

        // 如果this.Articles有值 则需要先清空
        if (this.Articles) {
          this.Articles.splice(0, this.Articles.length)
        }
        for (let checkin of temp) {
          this.Articles.push(checkin)
          console.log('Articles', this.Articles)
        }
      })
    },
    // 获取用户选择文章标题的ID 所对应的文章内容
    async getArticle(data: any) {
      await http('post', '/article/articleId', data).then((res: any) => {
        console.log(
          'getArticle获取用户选择文章标题的ID 所对应的文章内容:',
          res.data
        )
        const temp = res.data
        for (let key in temp) {
          this.Article[key] = temp[key]
        }
        this.articleId = this.Article.articleId
        // console.log('点击后的文章ID:', this.articleId)
      })
    },
    // 获取用户选择文章ID 所对应的文章内容
    async getArticleByArticleId(data: any) {
      await http('post', '/article/articleId', data).then((res: any) => {
        console.log(
          'getArticle获取用户选择文章标题 所对应的文章内容:',
          res.data
        )
        const temp = res.data
        for (let key in temp) {
          this.Article[key] = temp[key]
        }
      })
    },
    // 获取该用户发布过的所有文章
    async getArticleListByUserId(data: any) {
      await http('post', '/article/userId', data).then((res: any) => {
        const temp = res.data
        // console.log('getArticleListByUserId获取该用户发布过的所有文章:', temp)

        // 如果this.userArticles 则需要先清空
        if (this.userArticles) {
          this.userArticles.splice(0, this.userArticles.length)
        }
        for (let checkin of temp) {
          this.userArticles.push(checkin)
        }
        console.log('userArticles', this.userArticles)
      })
    },
    // 搜索文章列表
    async searchArticleList(data: any) {
      await http('post', '/article/search/articleAll', data).then(
        (res: any) => {
          const temp = res.data
          // console.log('searchArticleList搜索文章列表:', temp)

          // 如果this.searchArticles 则需要先清空
          if (this.searchArticles.length > 0) {
            this.searchArticles.splice(0, this.searchArticles.length)
          }
          for (let checkin of temp) {
            this.searchArticles.push(checkin)
          }
          console.log('searchArticles', this.searchArticles)
        }
      )
    },
    // 搜索用户文章列表
    async searchUserArticleList(data: any) {
      await http('post', '/article/search/articleUser', data).then(
        (res: any) => {
          const temp = res.data
          console.log('searchUserArticleList搜索用户文章列表:', temp)

          // 如果this.searchUserArticles 则需要先清空
          if (this.searchUserArticles.length > 0) {
            this.searchUserArticles.splice(0, this.searchUserArticles.length)
          }
          for (let checkin of temp) {
            this.searchUserArticles.push(checkin)
          }
          // console.log('searchUserArticles', this.searchUserArticles)
        }
      )
    },
    // 发布一篇文章
    async publishArticle(data: any) {
      await http('post', '/article/publish/article', data).then((res: any) => {
        const temp = res.data
        console.log('发布一篇文章publishArticle::', temp)
      })
    },
    // 获取用户详细信息 (通过文章ID)
    async getUserInfoByArticleId(data: any) {
      await http('POST', '/user/info/articleId', data).then((res: any) => {
        const temp = res.data
        console.log('getUserInfoByArticleId获取用户详细信息 (通过文章ID)', temp)

        if (this.ArticleAuthor) {
          this.ArticleAuthor = {}
        }
        for (let key in temp) {
          this.ArticleAuthor[key] = temp[key]
        }
      })
    },
    // 获取文章详细信息 (通过文章ID)
    async getArticleInfoByArticleId(data: any) {
      await http('POST', '/article/info/articleId', data).then((res: any) => {
        const temp = res.data
        // console.log(
        //   'getArticleInfoByArticleId获取文章详细信息 (通过文章ID):',
        //   temp
        // )

        for (let key in temp) {
          this.ArticleInfo[key] = temp[key]
        }
        console.log(
          'getArticleInfoByArticleId获取文章详细信息 (通过文章ID):',
          this.ArticleInfo
        )
      })
    },
    // 请求热门文章 (根据文章排名)
    async getHotArticle() {
      await http('POST', '/article/hot/article').then((res: any) => {
        const temp = res.data
        // console.log('请求热门文章 (根据文章排名):', temp)

        // 如果this.HotArticles 则需要先清空
        if (this.HotArticles) {
          this.HotArticles.splice(0, this.HotArticles.length)
        }
        for (let checkin of temp) {
          this.HotArticles.push(checkin)
          // console.log('HotArticles', this.HotArticles)
        }
      })
    },
  },

  // ArticleList: {} as ArticleList, // 所有文章
  //   Articles: [] as Articles, // 单个用户发布的所有文章
  //   userArticles: [] as Articles, // 单个用户发布的所有文章
  //   Article: reactive({}) as Article, // 单个文章（用户选择的文章标题所对应的）
  //   searchArticles: [] as Articles,
  //   searchUserArticles: [] as Articles,
  //   publishInfo: [] as Universal,
  //   ArticleAuthor: reactive({}) as Universal, // 存放该文章的作者详情
  //   ArticleInfo: reactive({}) as Article, // 存放该文章的详细信息
  //   articleId: String, // 存放当前的文章id
  //   HotArticles: [] as Articles, // 存放热门文章

  persist: {
    storage: sessionStorage,
    paths: [
      'ArticleList',
      'Articles',
      'userArticles',
      'Article',
      'searchArticles',
      'searchUserArticles',
      'publishInfo',
      'ArticleAuthor',
      'ArticleInfo',
      'articleId',
      'HotArticles',
    ],
  },
})

export default useHotStore
