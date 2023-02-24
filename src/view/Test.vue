
<script lang="ts" >
import { onMounted, reactive, toRefs } from 'vue'
import { getArticleList } from '../api/article'
export default {
  name: 'Home',
  setup () {
    var state = reactive({
      list: []
    })
    // 调取api获取数据
    const getNewsList = () => {
      const params = {
        page: 1,
        pageSize: 5
      }
      getArticleList(params).then(res => {
        console.log(res)
        // state.list = res
        console.log(state.list)
      })
      console.log(params)
    }
    onMounted(getNewsList)
    // ...toRefs()将state里面得对象解构
    return {
      ...toRefs(state)
    }
  }
}
</script>
<template>
  <div class="home">
    <!-- <ul>
      <li v-for="item in list" :key="item.id">
        <a href="">{{item.username}}</a>
      </li>
    </ul> -->
  </div>
</template>
