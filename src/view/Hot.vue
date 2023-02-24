<script setup lang="ts">
  import HotPage from '@/components/page/HotPage.vue';
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
  onMounted(()=>{ 
    // 获取li 行 元素列表
    const rows = document.querySelectorAll('#box div') as NodeListOf<HTMLElement>
      console.log('rows', rows)
    // 获取文档元素
    const html = document.documentElement
    // 监听滚动事件
    document.addEventListener('scroll',(e) => {
      // 计录滚动条的 变化 0~1
      let scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight) // 0~1表示滚动条顶点位置 0/793~793/793
      // 存储列表每一个元素 所占的比值
      let total = 1 / rows.length
      // 计算滚动条的位置 添加样式
      rows.forEach(function f(row, index, list) {
        // 计算每一行从起始位置到结束位置 区间范围 将所有行的区间范围 相加为 1
        let start = total * index
        let end = total * (index + 1)
        
        let progress:number = (scrolled - start) / (end - start)
        
        // 对超出范围的向下取值0/1
        if(progress >=1) progress = 1
        if(progress <=0) progress = 0
        row.style.setProperty('--progress',progress + "")
      }, this);

    })
  })
  
  
</script>

<template>
  <div class="container">
    <!-- 响应式布局 -->
    <ResponsiveLayoutVue>
        <!-- 左侧区域 -->
      <template #lefter>
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
          <div id="box">
            <div v-if="showArticle==true" v-for="Article in Articles" :key="Article.articleId" class="user-article text item hoverChange" @click="toArticle(Article.articleId)"
            style="--progress: 0;">
            <span>{{ Article.title }}</span>
          </div>

          <div v-else v-for="searchArticle in searchArticles" :key="searchArticle.articleId" class="search-article text item hoverChange" @click="toArticle(searchArticle.articleId)">
            {{ searchArticle.title }}
          </div>
          </div>
        </el-card>
        

      </template>

    </ResponsiveLayoutVue>
    
  </div>

  
</template>

<style lang="scss" scoped >
  $device-width: 700px;
  $device-height: 1336px;
  $ui-width: 640px;
  $progress: var(--progress,0.5);
  // $progress: 0.5;

  #box{
    width: 120%;
    padding: 0;
  }
  #box div{
    font-size: 1em;
    // background-color: #fd6262;
  }
  ::v-deep .el-card__body{
    // background-color: blueviolet;
    padding: 0;
    padding-top: 20px ;
  }
  #box div span{
    // background-color:aqua;
    margin-left: 20px;
  }
  
  $main-color: var(--mainColor,#fd6262);
  :root{
    font: size 15px;
    

  }
  h2{
    font-size: 64px;
    color: #FFF;
  }

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
  background-color: rgb(94, 199, 218);

}

.box-card {
  width: 480px;
}




</style>
