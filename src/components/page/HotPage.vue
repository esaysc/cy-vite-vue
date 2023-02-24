<!-- 热门文章页面 左边存放排名热门信息 中间使用上中下容器分别存放 => 文章标题 内容 评论 -->
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import LeftContentVue from '@/components/contents/LeftContent.vue'
import ResponsiveLayoutVue from '@/components/layout/ResponsiveLayout.vue'
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
import useHotStore from '@/store/modules/hot'
const input = ref('')

// 控制显示
let showArticle = ref(true)

// 路由
const router = useRouter()

// hot Store
const hotStore = useHotStore()
// 取出 请求文章列表和文章函数 所有文章列表 一个文章
const {getArticle,getArticleList,searchArticles,Articles,Article,searchArticleList} = hotStore
const { getUserInfoByArticleId,getArticleInfoByArticleId } = hotStore

// 获取文章内容
const {contentMarkdown} = toRefs(Article)
// 调取函数获取数据
const getNewList = () => {
  // 获取热门文章列表数据
  getArticleList().then((res:any) => {
    console.log(res)
  })
}
// 调用
onMounted(getNewList)
// 函数：通过文章id 获取文章
const toArticle = (articleId:any) => {
  console.log("点击的文章ID:",articleId);
  
  // 获取对应文章id 请求文章
  const params = {
    articleId: articleId
  }
  // 发送请求
  getArticle(params).then((res:any) => {
  })
  getUserInfoByArticleId(params)
  getArticleInfoByArticleId(params)
  // 显示文章
  setTimeout(()=>{
    router.push({path:'/article', query:{articleId:articleId }})
  },500)

  // router.push("/article")
  // 搜索文章

}
const search = () => {
  if(input.value){
    // 通过输入框的值 搜索对应标题的文章
    const params = {
      title: input.value,
    }
    searchArticleList(params).then((res:any) => {
    console.log("搜索成功")
  })
    console.log("searchArticles:::",searchArticles);
    
    showArticle.value = false
    console.log("showArticle:",showArticle.value);
  }
}
</script>
<template>
  <div class="container">
    <!-- 响应式布局 -->
    <ResponsiveLayoutVue>
        <!-- 左侧区域 -->
      <template #lefter>
        <LeftContentVue class="left-content-vue">
        </LeftContentVue>
      </template>

      <!-- 主要内容区域 -->
      <template #main>
        <!-- 文章列表 -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>推荐文章</span>
              <el-row :gutter="12">
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                  <el-input
                    v-model="input"
                    class="el-input"
                    placeholder="请输入标题"
                    :prefix-icon="Search"
                  />
                </el-col>
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                  
                  <el-button class="button" text @click="search">搜索</el-button>
                
            </el-col>
            
          </el-row>
          
            </div>
          </template>
          <div v-if="showArticle==true" v-for="Article in Articles" :key="Article.articleId" class="user-article text item hoverChange" @click="toArticle(Article.articleId)">
            {{ Article.title }}
          </div>

          <div v-else v-for="searchArticle in searchArticles" :key="searchArticle.articleId" class="search-article text item hoverChange" @click="toArticle(searchArticle.articleId)">
            {{ searchArticle.title }}
          </div>
        </el-card>
        

      </template>

    </ResponsiveLayoutVue>
    
  </div>
</template>

<style scoped>
/* 总布局 */
.container{
  color: rgb(122, 210, 216);
  height:100%;
  background-color: blanchedalmond;
}
/* 左侧区域 */
.left-content-vue
{
  height: 100%-2px;
  display: none;

}
.reply-input-vue{
  height: 200px;
  background-color: chocolate;
}

/* 文章区域 */
.header-main-footer-vue{
  display: none;
}

/* 文章列表样式 */
.card-header {
  display: flex;
  justify-content: space-between;

  align-items: center;
}

.text {
  font-size: 14px;
}

.item{
  margin-bottom: 18px;
  /* 元素高度 和 文字高度一致时 文字可相当于垂直居中 */
  height: 36px;
  line-height:36px;
  
}
.hoverChange:hover{
  background-color: rgb(166, 189, 179);

}

.box-card {
  width: 480px;
}
</style>
