<!-- 热门文章页面 左边存放排名热门信息 中间使用上中下容器分别存放 => 文章标题 内容 评论 -->
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import ResponsiveLayoutVue from '../layout/ResponsiveLayout.vue'
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user'
import useHotStore from '@/store/modules/hot'
import { Search } from '@element-plus/icons-vue'
let showArticle = ref(true)
const input = ref('')
// 通过用户仓库 获取用户信息
const userStore = useUserStore()
const {user} = userStore
const { userId } = user
// 路由
const router = useRouter()

// hot Store
const hotStore = useHotStore()
// 取出 请求文章列表和文章函数 所有文章列表 一个文章
const {getArticle,userArticles,getArticleListByUserId,searchUserArticleList,searchUserArticles} = hotStore
const { getUserInfoByArticleId,getArticleInfoByArticleId } = hotStore

// 调取函数获取数据
const getNewList = () => {
  console.log("开始执行");
  
  const params = {
        userId: userId,
      }
  // 获取用户文章列表数据
  getArticleListByUserId(params).then((res:any) => {
    console.log("获取成功");
    
  })
}
// 调用
setTimeout(() => {
  getNewList()
    }, 100)
// onMounted(getNewList)
// 函数：通过文章id 获取文章
const toArticle = (articleId:any) => {
  // 获取对应文章id 请求文章
  const params = {
    articleId: articleId
  }
  // 发送请求
  getArticle(params).then((res:any) => {
    console.log(res)
  })
  getUserInfoByArticleId(params)
  getArticleInfoByArticleId(params)
  // 显示文章
  setTimeout(()=>{
    router.push({path:'/article', query:{articleId:articleId }})
  },500)
}

// 搜索文章
const search = () => {
  if(input.value){
    // 通过输入框的值 搜索对应标题的文章
    const params = {
      title: input.value,
      userId: userId,
    }
    searchUserArticleList(params).then((res:any) => {
    console.log("搜索成功")
  })
    console.log("searchUserArticles:::",searchUserArticles);
    
    showArticle.value = false
    console.log("showArticle:",showArticle.value);
    
    
  }
}
</script>
<template>
  <div class="container">
  <!-- 主要内容区域 -->
    <!-- 文章列表 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>我的文章</span>
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
      <div v-if="showArticle==true" v-for="Article in userArticles" :key="Article.articleId" class="user-article text item hoverChange" @click="toArticle(Article.articleId)">
        {{ Article.title }}
      </div>

      <div v-else v-for="searchArticle in searchUserArticles" :key="searchArticle.articleId" class="search-article text item hoverChange" @click="toArticle(searchArticle.articleId)">
        {{ "search:"+searchArticle.title }}
      </div>
      
    </el-card>
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
  width: 100%;
}
/* 搜索框样式 */
</style>
